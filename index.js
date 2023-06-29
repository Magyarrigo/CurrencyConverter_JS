"use strict";

const link = "http://api.nbp.pl/api/exchangerates/tables/a/";
const dataEntryForm = document.forms[0];
let exchangeResult = document.querySelector("#conversionResult");

dataEntryForm.addEventListener("submit", getCurrencyListByAxios);

let targetCurrencyRate = 0;

function getCurrencyListByAxios(event) {
  event.preventDefault();
  if (isNaN(dataEntryForm[0].value)){
    
    alert("wprowadź poprawną wartość: LICZBA DODATNIA");
    clearForm();
    return;

  };
  if (dataEntryForm[0].value <= 0) {
    
    alert("wprowadź poprawną wartość: LICZBA DODATNIA");
    clearForm();
    return;
  }
  //if (dataEntryForm[0].value instanceof String || dataEntryForm[0].value == null) {
  //  console.log("hahahaha");
  //}

  const currencyCode = document.querySelector("#selectCurrency").value;

  axios
    .get(link)
    .then((response) => {
      const currencyList = response.data[0].rates;

      const targetCurrency = currencyList.filter((element) => {
        return element.code === currencyCode;
      });

      //console.log(dataEntryForm[0].value);

      targetCurrencyRate = targetCurrency[0].mid;
      //console.log(targetCurrencyRate);

      let nowyText = currencyConversion(
        targetCurrencyRate,
        dataEntryForm[0].value
      );
      nowyText = parseFloat(nowyText).toFixed(2);

      exchangeResult.innerText = `to: ${nowyText} zł`;

      //console.log(exchangeResult.innerText);
    })

    .catch((error) => console.error(error));
}

function currencyConversion(currencyRate, quantity) {
  const conversionResult = currencyRate * quantity;
  return conversionResult;
}
function clearForm() {
  dataEntryForm[0].value = "";
  exchangeResult.innerText = "";
}
