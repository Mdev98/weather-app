const request = require('request');
const chalk = require("chalk");

const weatherstackKey = "6aaad58d869a4fe5a6a2bbf45cee6ca2";

const weatherForecast = (lat, long, callback) => {
    const params = {
        url  : `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${lat}, ${long}&units=m`, 
        json : true
    }

    request(params, (error, response) => {
        if(error){
            callback("Enable to connect to server");
        }else if(response.body.error){
            callback("unknow coordinates specify");
        }else {
            const data = response.body.current;
            dataWind = data.wind_speed;
            dataTemp = data.temperature;
            dataCondition = data["weather_descriptions"][0];
            dataRain = data.precip;
            callback(undefined,{temp : dataTemp, condition : dataCondition, precipitation : dataRain, wind : dataWind});
        }
    })
}

module.exports = weatherForecast;


// weatherstack documentation : http://api.weatherstack.com/ 