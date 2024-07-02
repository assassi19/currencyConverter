const BASE_URL =
   "https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
   for (currCode in countryList) { //currCode is like INR USD...
      let newOption = document.createElement("option"); //makes an option tag
      newOption.innerText = currCode; //gives the text under that tag
      newOption.value = currCode;   //gives it a value as attribute to that option tag
      if (select.name === "from" && currCode === "USD") {
         newOption.selected = "selected";       //to select USD as default 1st option
      } else if (select.name === "to" && currCode === "INR") { //for inr as default 2nd option
         newOption.selected = "selected";    
      }
      select.append(newOption); //inside the select tag we are adding options using this...
   }

   select.addEventListener("change", (evt) => {
      updateFlag(evt.target);// changes the flag using the function updateFlag
   });
}

const updateExchangeRate = async () => {
   let amount = document.querySelector(".amount input"); //inside the amount class we've accesssed input tag
   let amtVal = amount.value; //whatever is the input.value we'll give us the amtValue i guess
   if (amtVal === "") {
      amtVal = 1;
      amount.value = "1";
   }
   /*
   5 USD -> INR ? == 417.44 rupees 
   5USD/1.08854{value of usd/1eur} = 4.59 eur
   4.49*90.1429 {value of currency into which to be converted} = 

   */
   const URL = BASE_URL;
   let response = await fetch(URL);
   let data = await response.json(); //parses the data & converts it into readable json file...
   console.log(fromCurr.value.toLowerCase());
   // let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   let val1 = amtVal/(data.eur[fromCurr.value.toLowerCase()]);
   let finalAmount = val1 * data.eur[toCurr.value.toLowerCase()];
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(3)} ${toCurr.value}`;
};

const updateFlag = (element) => {
   let currCode = element.value;
   let countryCode = countryList[currCode]; // in country list we have currencyCode mapped to countries...
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; //we are obtaining countries & chaning flags here
   let img = element.parentElement.querySelector("img"); //image is in select-container class which is parent of img & select tag, hence
   //the need to access the parentElement & then through that "img" tag
   img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
   console.log("button was clicked");
   evt.preventDefault(); //default functions like reloading the whole page and all are disabled with this
   updateExchangeRate();   //only this action is performed 
});

window.addEventListener("load", () => { 
   updateExchangeRate(); // when we first load the page or refresh it then it does the job of USD TO INR
});
