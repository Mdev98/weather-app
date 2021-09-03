const request = require('request');

const mapboxKey= "pk.eyJ1IjoibWFtb3VyLWQiLCJhIjoiY2txaDF6b3VsMXprbjJybjBqYnY1YWF3dSJ9.18uZ2BKSuxUhc2oxcUsSCg"

const geoLoc = (adress, callback) => {
    const paramMap = {
        url  : `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=${mapboxKey}&limit=1`,
        json :  true
    }

    request(paramMap,(error, response)=>{
        if(error){
            callback("Enable to connect to service please verify your connection or contact us"),undefined;
        }else if(response.body.message || response.body.features.length == 0){
            callback("Unknow or empty entries",undefined);
        }else{
            const coord = response.body.features[0].center;
            const place = response.body.features[0].place_name;
            const [long,lat] = coord;
            callback(undefined, {lat : lat, long : long, place: place});
        }
    })
}

module.exports = geoLoc;