// Gemini API and Google URL
const GEMINI_API = "AIzaSyBlw2EUAXXUiU_tCcqKiCKBUBR537B3ahM";
const GOOGLE_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API}`;

// Elements
const chatContainer = document.querySelector(".chat-container");
const chatSection = document.querySelector(".chat-section");
const textInput = document.getElementById("text-input");

let stayVal = 0; // The value will be changed based on textInput wrap

// Detect the wrap action and add more rows
textInput.addEventListener("input", e => {
    if (stayVal === 0) textInput.rows = 1;
    if (textInput.scrollHeight === 50) textInput.rows = 1;
    else if (textInput.scrollHeight === 69) textInput.rows = 2;
    else if (textInput.scrollHeight === 89) textInput.rows = 3;
    else if (textInput.scrollHeight === 108) textInput.rows = 4;
    else if (textInput.scrollHeight === 128) { 
        textInput.rows = 5; 
        if (stayVal === 0) stayVal = textInput.textLength;
        if (textInput.textLength < stayVal) stayVal = 0;
    }
});

// Greetings from the AI when loading
window.addEventListener("load", () => {
    const text = "Hello, I'm Gamma your assistant. How can i help you today?";
    createBotChat(text);
    chatContainer.style.height = chatSection.offsetTop - chatSection.offsetHeight - 7 + "px";
});

// Send a message to the AI and return the answer
async function sendMessage() {
    textInput.focus();
    if (textInput.value == "") return;
    let tempChat = textInput.value;
    textInput.rows = 1;
    textInput.value = "";
    createUserChat(tempChat); // Create new user chat box
    setTimeout(() => createBotChat("●●●"), 500);
    const response = await fetch(GOOGLE_URL, {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify({
            "contents": [{ "role": "user", "parts": [{ "text": tempChat }] }]
        })
    });
    response.json().then(chat => {
        const preChat = chat.candidates[0].content.parts[0].text;
        const modify = preChat.replace("Google", "Berkilau").replace("Gemini", "Gamma");
        chatContainer.lastChild.children[1].textContent = modify;
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
    });
}

// Create new chat for user inside chatContainer
function createUserChat(text) {
    const newChat = document.createElement("div");
    newChat.classList.add("user-chat");
    newChat.innerHTML = `
        <p>${text}</p>
        <i class="fa-solid fa-user"></i>
    `;
    chatContainer.appendChild(newChat);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

// Create new chat for bot inside chatContainer
function createBotChat(text) {
    const newChat = document.createElement("div");
    newChat.classList.add("bot-chat");
    newChat.innerHTML = `
        <span>Γ</span>
        <p>${text}</p>
    `;
    chatContainer.appendChild(newChat);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}