// elements
const nav = document.querySelector(".navigation");
const returnBtn = document.querySelector(".return-btn");
const content = document.querySelectorAll(".transform");

// variables
let lastScrollY = 0;

// event handlers
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  
  if(scrollY > 50) returnBtn.classList.add("show");
  else returnBtn.classList.remove("show");
  
  if(scrollY > lastScrollY) nav.style.top = "-10%";
  else nav.style.top = "0px";
  
  lastScrollY = scrollY;
});

returnBtn.addEventListener("click", () => {
  window.scrollTo({
    "top": 0,
    "behavior": "smooth"
  });
});

setInterval(() => {
  content.forEach(i => {
    if(scrollY + window.innerHeight > i.getBoundingClientRect().y + 100) i.classList.remove("transform");
  });
}, undefined);

/* --- SLIDERS --- */
const slide = document.querySelector(".slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

const update = nextSlide();

function nextSlide(){
  setInterval(() => {
    const slides = document.querySelectorAll(".img-box");
    slide.appendChild(slides[0]);
  }, 7000);
}

nextBtn.onclick = () => {
  const slides = document.querySelectorAll(".img-box");
  slide.appendChild(slides[0]);
  clearInterval(update);
}

prevBtn.onclick = () => {
  const slides = document.querySelectorAll(".img-box");
  slide.prepend(slides[slides.length - 1]);
  clearInterval(update);
}