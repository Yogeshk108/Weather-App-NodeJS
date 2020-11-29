const request = require('postman-request')



const forecast= (longitude , latitude , callback) => {
    const forecasturl = 'http://api.weatherstack.com/current?access_key=082ac69fdc63935998b59fa82ff73c35&query=' + latitude + ',' + longitude + '&units=m'
    request({url:forecasturl , json:true} , (error , {body}={}) => {
        console.log(longitude , latitude)
        console.log(forecasturl)
        if (error) {
            callback('unable to connect to weather service.' , undefined)
        } else if (body.error) {
            callback('unable to find location' , undefined)
        } else {
            callback(undefined , body.current.weather_descriptions[0] +'.It is currently ' + body.current.temperature + ' degrees and it feels like ' + body.current.feelslike + ' degrees.' + 'UV index is ' + body.current.uv_index + '.Wind speed is ' + body.current.wind_speed + ' KMPH and wind direction is ' + body.current.wind_dir + '.')
        }
    })
}
module.exports = forecast