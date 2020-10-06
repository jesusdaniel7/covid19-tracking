fetch('https://www.trackcorona.live/api/countries')
.then(response => response.json())
.then(response  => {
    console.log(response);
})

const GetSumary = () => fetch('https://api.covid19api.com/summary');
const GetCountryDayOne = () => fetch('https://api.covid19api.com/auth/subscriptions');

GetSumary().then(response => response.json())
.then(response  => {
    console.log(response);
})
