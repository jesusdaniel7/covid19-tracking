// fetch('https://www.trackcorona.live/api/countries')
// .then(response => response.json())
// .then(response  => {
//     console.log(response);
// })

//selecting cards ids

const newConfirmed = document.getElementById("new-confirmed");
const confirmed = document.getElementById("confirmed");
const newDeaths = document.getElementById("new-deaths");
const deaths = document.getElementById("deaths");
const newRecovered = document.getElementById("new-recovered");
const recovered = document.getElementById("recovered");
const tbody = document.getElementById("tbody");
const hol = document.getElementById("hol");
//Functions that returns feth
const getSumary = () => fetch("https://api.covid19api.com/summary");
const get = (url) => fetch("https://api.covid19api.com/" + url);
const test = () =>
  fetch(
    "https://api.covid19api.com/world?from=2020-02-01T00:00:00Z&to=2020-03-01T00:00:00Z"
  );
const GetCountryDayOne = () =>
  fetch("https://api.covid19api.com/auth/subscriptions");

//functions

//adding the world data cards
const addCards = (
  globalInfo,
  newConfirmed,
  confirmed,
  newDeaths,
  deaths,
  newRecovered,
  recovered
) => {
  newConfirmed.textContent = new Intl.NumberFormat("en-US").format(
    globalInfo.NewConfirmed
  );
  confirmed.textContent = new Intl.NumberFormat("en-US").format(
    globalInfo.TotalConfirmed
  );
  newDeaths.textContent = new Intl.NumberFormat("en-US").format(
    globalInfo.NewDeaths
  );
  deaths.textContent = new Intl.NumberFormat("en-US").format(
    globalInfo.TotalDeaths
  );
  newRecovered.textContent = new Intl.NumberFormat("en-US").format(
    globalInfo.NewRecovered
  );
  recovered.textContent = new Intl.NumberFormat("en-US").format(
    globalInfo.TotalRecovered
  );
};

//adding countries in the table
const showCountries = (countries) => {
  let countryTemplate = '';
  countries.map(function (val, index) {
    countryTemplate += `<tr>
  <td><i class="fas fa-globe"></i>${val.Country}</td>
  <td>${val.NewConfirmed}</td>
  <td>${val.TotalConfirmed}</td>
  <td>${val.TotalRecovered}</td>
  <td>${val.NewRecovered}</td>
  <td>${val.NewDeaths}</td>
  <td>${val.TotalDeaths}</td></tr>`;
    tbody.innerHTML = countryTemplate;
  });

};
//the brain code

let getSumaryArray;

//Obteniendo datos

get("summary")
  .then((response) => response.json())
  .then((response) => {
    let globalInfo;
    globalInfo = response.Global;
    console.log(response);

    addCards(
      globalInfo,
      newConfirmed,
      confirmed,
      newDeaths,
      deaths,
      newRecovered,
      recovered
    );
    showCountries(response.Countries);
    console.log(response.Countries);

  });
