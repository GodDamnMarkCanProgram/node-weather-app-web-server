const request = require('request')


const forecast = (longditude, latitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/365e05c764f6bbc5e349e7c9cb40ec7f/' + longditude + ',' + latitude + '?units=si'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
           
            callback(undefined, body.daily.data[0].summary + '\nIt is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}


module.exports = {
    forecast: forecast
}