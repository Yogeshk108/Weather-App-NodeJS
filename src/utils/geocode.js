const request = require('postman-request')

const geocode = (address , callback) => {
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieW9nZXNoazEwOCIsImEiOiJja2h4OTNzNnkwaDM2MnFtcHZtZDkwd25xIn0.I7DZxiMZc7JAH7NS1yqo_g'
    request({url:geourl , json:true} , (error , {body}={}) => {
        if(error)
        {
            callback('unable to connect to location services' , undefined)
        }
        else if (body.message || body.features.length === 0 )
        {
            callback('unable to find location try another search' ,  undefined)
        }
        else
        {
            callback(undefined , {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            })
        }
    })
}
 module.exports = geocode