const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/684a354f0d8500a4ee5463507b52ddc6/${long},${lat}`;
    request({url, json: true}, (err, {body}) => {
    if(err){
        callback("The connection does not work!", undefined);
    } else if (body.error){
        callback("Can not find the location.", undefined);
    } else {
        callback(undefined, {temperature: body.currently.temperature,
                             chance: body.currently.precipIntensity
                            });
        }
    })
}

module.exports = forecast;