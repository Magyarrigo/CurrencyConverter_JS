console.log("juz jestem");
const btn = document.querySelector(".askForCurrences");
console.log(btn);
//const link ='http://api.nbp.pl/api/exchangerates/rates/a/chf/';
const link = "http://api.nbp.pl/api/exchangerates/tables/a/";
btn.addEventListener("click", getCurrencyListByAxios);
let kursDolara = 0;
let kursFranka = 0;

function getCurrencyListByAxios() {
  axios
    .get(link)
    .then((response) => {
      const currencyList = response.data[0].rates;
      //console.log(currencyList);

      const usd = currencyList.filter((element) => {
        return element.code === "USD";
      });
      const chf = currencyList.filter((element) => {
        return element.code === "CHF";
      });

      //console.log(usd);
      console.log("kurs dolara to: " + usd[0].mid);
      console.log("kurs franka to:" + chf[0].mid);
      //mam kurs dolara
      kursDolara = usd[0].mid;
    })

    .catch((error) => console.error(error));
  return kursDolara;
}
console.log(kursDolara);
//console.log('kurs dolara to: ' + usd[0].mid);
//       console.log('kurs franka to:' + chf[0].mid);

/*const link = 'https://api.frankfurter.app/latest';

btn.addEventListener('click',getCurrencyList);

function getCurrencyList(){
    fetch(link)
.then(res => res.json())
.then(data => {
    const arrayOfCurrencies = Object.keys(data.rates);
    const select = document.createElement('select')
    arrayOfCurrencies.forEach((currencyCode) => {
        let option = document.createElement('option');
        option.value = currencyCode;
        option.innerHTML = currencyCode;
      
        select.appendChild(option);
    })    
    document.body.appendChild(select);
})
.catch(error => console.error(error))
}
*/
