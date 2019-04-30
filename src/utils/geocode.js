const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoieXVhbnpoaTE5MSIsImEiOiJjanV2Z2NmenkwMWU3NDNwZnZsNnh5YXB5In0.248E9RoAmtEkqzTY3c3axw&limit=1`;

    request({url, json: true}, (error, {body}={}) => {
        if (error){
            callback("The connection does not work!", undefined);
        } else if(body.features.length == 0){
            callback("Can not find the data.", undefined);
        } else {
            callback(undefined, {latitude: body.features[0].center[1],
                                longitude: body.features[0].center[0],
                            location: body.features[0].place_name}
                    );
        }
    })
}

module.exports = geoCode