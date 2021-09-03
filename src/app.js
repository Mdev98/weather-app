const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoLoc = require('./modules/geoloc.js');
const weatherForecast = require('./modules/weatherforecast.js');



const app = express();
const port = process.env.PORT || 3000;

// setting path

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials")

// use to make  dynamic template
// setup hbs engine and view location

app.set('view engine', 'hbs')
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// use to serve the directory
// setting static directory to serve 
//for static thing like css and js client

app.use(express.static(publicDirectoryPath))

// help us configure when someone try to get data of a specific adress
// It takes 2 arguments the route and a function that describe whaat to send back
// will not be use if we set app.use

app.get('/', (req, res) =>{
    // Allows to send back something to the requester
    res.render('index',{
        title : "homepage",
        // header : "i am the homepage"
    });
})

app.get('/about', (req, res) =>{
    // Allows to send back something to the requester
    res.render('about',{
        title  : "about",
        header : "i am THE about page"
    });
})

app.get('/help', (req, res) =>{
    // Allows to send back something to the requester
    res.render('help',{
        title  : "help",
        header : "get help here"
    });
})

/* _____THIS IS A ENDPOINT____ */

app.get('/weather', (req, res) => {
    if(!req.query.adress){
        return res.send({error: "please provide a valid adress"})
    }
    // We can use it to send object

    geoLoc(req.query.adress, (error, geoData) => {
        if(error){
            return res.send({error : error})
        }

        weatherForecast(geoData.lat, geoData.long,(error,forecastData)=>{
            res.send({
                location      : geoData.place,
                adress        : req.query.adress,
                temperature   : forecastData.temp,
                precipitation : forecastData.precipitation,
                condition     : forecastData.condition,
                wind          : forecastData.wind,
                forecast      : `Currently the weather is ${forecastData.condition} , it is ${forecastData.temp} degrees out and there is ${forecastData.precipitation} chance of rain`
            })
        })
    })
})
/* ^^^^THIS IS A ENDPOINT^^^^ */


app.get('*', (req, res) => {
    res.render('error',{
        title     : "404 ERROR",
        statement : "PAGE NOT FOUND"
    })
})


// this is for start the server that takes a port and a callback for display thing

app.listen(port,() => {
    console.log("Let's gooooo");
});

