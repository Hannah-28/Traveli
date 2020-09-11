const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));


// Global variables
let allData =[];
let trip = {};

//  Setup Server
const port = 2304;
const server = app.listen(port, listening);

function listening() {
    console.log(`server is running on localhost: ${port}`);
}

/* GET METHOD */
app.get('/', function (request, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

/* POST METHOD */
app.post('/getLastData', async (request, response) => {
    response.send(JSON.stringify(allData[allData.length-1]));
});

app.post('/userInput', async (request, response) => {
    // trip = {};
    trip.city = request.body.city;
    trip.date = request.body.departDate;
    trip.timeZoneOffset = request.body.timeZoneOffset;

    const temp = await getDataFromGeoNames(request.body.city);
    setTimeout(function(){
        console.log("trip before: " +JSON.stringify(trip));
        allData.push(trip);
        console.log("array: " + JSON.stringify(allData[allData.length-1]));
        trip = {};
        console.log("trip after: " +JSON.stringify(trip));
        response.send(JSON.stringify(allData[allData.length-1]));
    }, 4000);
});


async function getDataFromGeoNames(city) {
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${process.env.goeNameUserNAme}`;
    axios.get(url)
        .then(function (response) {
            trip.lng = response.data.geonames[0].lng;
            trip.lat = response.data.geonames[0].lat;
            trip.country = response.data.geonames[0].countryName;

            getWeather(trip.lng, trip.lat);
        })
        .catch(function (error) {
            // handle error
            console.log("ERROR in axios.get(baseURL + city + '&maxRows=3&username=' + username) !!: " + error);
        })

}

async function getWeather(lng, lat) {

    const tempDate = new Date(trip.date)
    const departDate = tempDate.getTime();
    const endDate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDay();
    const todayDate = new Date().getTime();

    const diff = Math.ceil((departDate - todayDate + trip.timeZoneOffset)/(1000*60*60*24));
    trip.diff = diff;

    
    var url;
    url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&key=${process.env.weatherbitAPIkey}`;

    axios.get(url)
        .then(function (response) {

            if(diff < 0) {
                trip.weatherDescription = response.data.data[0].weather.description;
                trip.lowTemp = response.data.data[0].low_temp;
                trip.maxTemp = response.data.data[0].max_temp;
            } else if(diff < 17){
                trip.weatherDescription = response.data.data[diff].weather.description;
                trip.lowTemp = response.data.data[diff].low_temp;
                trip.maxTemp = response.data.data[diff].max_temp;
            } else {
                trip.weatherDescription = response.data.data[15].weather.description;
                trip.lowTemp = response.data.data[15].low_temp;
                trip.maxTemp = response.data.data[15].max_temp;
            }

             getPhoto();
        })
        .catch(function (error) {
            // handle error
            console.log("ERROR in getWeather!!  " + error);
        })
}

async function getPhoto() {

    url = `https://pixabay.com/api/?image_type=photo&key=${process.env.pixabayAPI}&q=${trip.city}`
    axios.get(url)
        .then(function (response) {

            if (response.data.totalHits < 1) {
                trip.imageUrl = 'https://cdn.pixabay.com/photo/2016/11/18/22/14/adventure-1837134_1280.jpg';
            } else {
                var random = Math.floor(Math.random() * 10) + 1;
                trip.imageUrl = response.data.hits[random].webformatURL;
                console.log(JSON.stringify(trip));
            }

        })
        .catch(function (error) {
            // handle error
            console.log("ERROR in getPhoto!!: " + error);
        })
}


//test
app.get('/text', async function (req, res) {
    res.send({});
});

app.get("/test", function(req, res) {
    res.json({
        status: 200,
    });
});

module.exports = server;