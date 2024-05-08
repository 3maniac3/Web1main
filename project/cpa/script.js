const url1 = "https://countriesnow.space/api/v0.1/countries/population/cities";
const data1 = fetch(url1).then(data => data.json());

const url2 = "https://restcountries.com/v3.1/all?fields=name,flags";
const data2 = fetch(url2).then(data => data.json());

// html elements
const inputCol = document.getElementById("input-col");
const submitBtn= document.getElementById("submit-btn");

const cityBox = document.querySelector(".city-box");

const img = document.getElementById("country-flag");
const cityName = document.getElementById("city-name");
const countryName = document.getElementById("country-name");

const cityPop = document.querySelector(".city-population");
const perYear = document.querySelector(".per-year");

const notFound = document.querySelector(".not-found");

const autoComplete = document.getElementById("auto-complete");

const datalist = document.getElementById("all-data");

const options = document.querySelectorAll(".option");

const countryBox = document.querySelector(".country-box");
const img2 = document.getElementById("cb-country-flag");
const countryName2 = document.getElementById("cb-country-name");
const cityLists = document.querySelector(".city-lists");

// main code
submitBtn.onclick = () => {
  if(options[0].classList.contains("active")){
    citySearch();
  }
  else if(options[1].classList.contains("active")){
    countrySearch();
  }
}

function citySearch(){
  console.clear();
  
  const search = inputCol.value.toUpperCase();
  let exists = false;
  let flag = false;
  let country = "";
  
  data1.then(item => {
    for(let i = 0; i < item.data.length; i++){
      if(item.data[i].city.toUpperCase() == search){
        exists = true;
        countryBox.style.display = "none";
        notFound.style.display = "none";
        cityBox.style.display = "flex";
        cityPop.innerHTML = "";
        
        country = item.data[i].country.toUpperCase();
        cityName.textContent = item.data[i].city.toLowerCase();
        countryName.textContent = item.data[i].country;
        console.log(item.data[i]);
        
        for(let j = 0; j < item.data[i].populationCounts.length; j++){
          const tempData = item.data[i].populationCounts[j];
          const year = document.createElement("div");
          
          year.classList.add("per-year");
          year.innerHTML = `
          <h3>${tempData.year}</h3>
          <div>
            <p>Value</p>
            <p>${tempData.value}</p>
          </div>
          <div>
            <p>Sex</p>
            <p>${tempData.sex}</p>
          </div>
          <div>
            <p>Reliabilty</p>
            <p>${tempData.reliabilty}</p>
          </div>
          `;
          
          cityPop.appendChild(year);
        }
        break;
      }
    }
    
    if(!(exists)){
      console.log("false");
    }
  });
  
  data2.then(item => {
    for(let i = 0; i < item.length; i++){
      const name = item[i].name.common.toUpperCase();
      
      if(name == country){
        flag = true;
        img.style.display = "block";
        img.src = item[i].flags.png;
        break;
      }
    }
    
    if(!(flag)){
      img.style.display = "none";
    }
  });
  
  if(!(exists) && !(flag)){
    cityBox.style.display = "none";
    notFound.style.display = "flex";
  }
}

function countrySearch(){
  console.clear();
  
  cityLists.innerHTML = "";
  
  const search = inputCol.value.toUpperCase();
  let exists = false;
  let flag = false;
  
  data1.then(item => {
    for(let i = 0; i < item.data.length; i++){
      if(item.data[i].country.toUpperCase() == search){
        exists = true;
        
        countryName2.textContent = item.data[i].country;
        
        for(let j = 0; j < item.data.length; j++){
          if(item.data[j].country.toUpperCase() == search){
            const newList = document.createElement("li");
            
            newList.textContent = item.data[j].city.toLowerCase();
            
            cityLists.appendChild(newList);
          }
        }
        
        break;
      }
    }
    
    if(exists){
      cityBox.style.display = "none";
      notFound.style.display = "none";
      countryBox.style.display = "flex";
    }
    else{
      countryBox.style.display = "none";
      notFound.style.display = "flex";
    }
  });
  
  data2.then(item => {
    for(let i = 0; i < item.length; i++){
      if(item[i].name.common.toUpperCase() == search){
        flag = true;
        img2.src = item[i].flags.png;
        img2.style.display = "block";
        break;
      }
    }
    
    if(!(flag)){
      img2.style.display = "none";
    }
  });
}

function autoCompleteList(){
  data1.then(item => {
    for(let i = 0; i < item.data.length; i++){
      const opt = document.createElement("option");
      
      opt.value = item.data[i].city;
      
      datalist.appendChild(opt);
    }
  });
}

autoCompleteList();

autoComplete.onclick = () => {
  if(autoComplete.checked){
    autoCompleteList();
  }
  else{
    datalist.innerHTML = "";
  }
}

options.forEach(option => {
  option.onclick = () => {
    options.forEach(opt => {
      opt.classList.remove("active");
    });
    option.classList.add("active");
    if(options[0].classList.contains("active")){
      getCityName();
    }
    else if(options[1].classList.contains("active")){
      getCountryName();
    }
  }
});

function getCityName(){
  datalist.innerHTML = "";
  inputCol.placeholder = "Search City";
  
  data1.then(item => {
    for(let i = 0; i < item.data.length; i++){
      const newVal = document.createElement("option");
      
      newVal.value = item.data[i].city;
      
      if(autoComplete.checked){
        datalist.appendChild(newVal);
      }
    }
  });
}

function getCountryName(){
  datalist.innerHTML = "";
  inputCol.placeholder = "Search Country";
  
  let checkSim = [];
  let similar = false;
  
  data1.then(item => {
    for(let i = 0; i < item.data.length; i++){
      const newVal = document.createElement("option");
      newVal.value = item.data[i].country;
      
      for(let j = 0; j < checkSim.length; j++){
        if(newVal.value == checkSim[j]){
          similar = true;
        }
      }
      
      if(similar){
        similar = false;
      }
      else{
        if(autoComplete.checked){
          checkSim.push(newVal.value);
          datalist.appendChild(newVal);
        }
      }
    }
  });
}