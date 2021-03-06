const request = require('request')
const fahrenheitToCelsius = require('fahrenheit-to-celsius')
const kelvinToCelsius = require('kelvin-to-celsius');



const forecast = (latitude, longditude, callback) =>{
    const url = 'https://api.darksky.net/forecast/365e05c764f6bbc5e349e7c9cb40ec7f/' + latitude + ',' + longditude
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            const temperature = Math.round(fahrenheitToCelsius((body.currently.temperature)))
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'+
            '\n Wind speeds are ' + body.currently.windSpeed + 'm/s')
        }
    
}
    )}


module.exports = {
    forecast: forecast
}