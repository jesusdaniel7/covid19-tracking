const deathsRatio = document.getElementById("deaths-ratio");
const confirmed = document.getElementById("confirmed");
const tests = document.getElementById("tests");
const positivityRatio = document.getElementById("positivity-ratio");
const deaths = document.getElementById("deaths");
const recovered = document.getElementById("recovered");
const tbody = document.getElementById("tbody");
const searchInput = document.getElementById("search-bar-input");
const pieChart = document.getElementById("pie-chart");

//functions
//Functions that returns feth api
const get = (url) => fetch("https://cov19.cc/report.json");

//return de percentage between two numbers
const percentage = (num1, num2) => (num1 / num2 * 100).toFixed(1);

//adding the world data cards
const addCards = (globalInfo) => {
    deathsRatio.textContent = new Intl.NumberFormat("en-US").format(
        percentage(globalInfo.deaths, globalInfo.confirmed)
    );
    confirmed.textContent = new Intl.NumberFormat("en-US").format(
        globalInfo.confirmed
    );
    tests.textContent = new Intl.NumberFormat("en-US").format(
        globalInfo.tests
    );
    deaths.textContent = new Intl.NumberFormat("en-US").format(globalInfo.deaths);
    positivityRatio.textContent = new Intl.NumberFormat("en-US").format(
        percentage(globalInfo.confirmed, globalInfo.tests)
    );
    recovered.textContent = new Intl.NumberFormat("en-US").format(
        globalInfo.recovered
    );
};

//adding countries in the table
const showCountries = (countries, filter = "1") => {
    let countryTemplate = "";
    tbody.innerHTML = "";
    countries.map(function(val, index) {
        if (typeof val.country != 'undefined' && filter != 'undefined') {
            if (val.country.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                countryTemplate +=
                    `<tr>
                <td class="table-country"><img src="assets/country-icons/country-squared/${val.country_code}.png" alt="Bandera" class="country-icon">${val.country}</td>
                <td>${new Intl.NumberFormat("en-US").format(val.confirmed)}<span class="new-cases">${new Intl.NumberFormat("en-US").format(val.daily_confirmed)}</span></td>
                <td>${new Intl.NumberFormat("en-US").format(val.recovered)}</td>
                <td>${new Intl.NumberFormat("en-US").format(val.deaths)}<span class="new-cases">${new Intl.NumberFormat("en-US").format(val.daily_deaths)}</span></td>
                <td>${new Intl.NumberFormat("en-US").format(val.tests)}</td>
                <td>${parseFloat(val.deaths_ratio).toFixed(1)}</td>
                </tr>`;
                tbody.innerHTML = countryTemplate;
            }
        }
    });
};

Chart.defaults.global.defaultFontSize = "16";
//Creating a the graphic
const Showgraphic = (globalInfo) => {
    new Chart(pieChart, {
        type: "pie",
        data: {
            labels: ["Confirmados", "Recuperados", "Defunciones"],
            datasets: [{
                borderColor: "#d8dce6",
                label: ["Global Info", "sosjd", "jsdis", "ijasdioasjd"],
                backgroundColor: ["#347fd5", "#0ee9cb", "#f35353"],
                hoverBackgroundColor: ["#347fd5", "#0ee9cb", "#f35353"],
                data: [
                    globalInfo.confirmed,
                    globalInfo.recovered,
                    globalInfo.deaths,
                ],
            }, ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
                labels: {
                    fontColor: "#d8dce6",
                },
            },
            title: {
                display: true,
                boxWidth: "2",
                fontColor: "#d8dce6",

                text: "Relación",
            },
            tooltips: {
                enabled: false,
                backgroundColor: "#161e2c",
            },
        },
    });

};
//The Brain
let getSumaryArray;
get()
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        const globalInfo = response.regions.world.totals;
        const countries = response.regions.world.list;
        addCards(globalInfo);
        showCountries(countries, "");
        searchInput.addEventListener("keyup", (e) => {
            showCountries(countries, searchInput.value);
        });
    });