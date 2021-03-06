request = require('request')


//geocode takes an address and converts it into longditutde and latitude
const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaXRzbGl0IiwiYSI6ImNrNDg5NzRpMDBpYzgzbm9jOTdpYTV4anAifQ.jX0E3A5HGdF_f3N0CLfbdA&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect to error services', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        }else{
            latitude = body.features[0].center[1]
            longditude = body.features[0].center[0]
            location = body.features[0].place_name
            callback(undefined, {latitude,
                              longditude,
                              location
                                 })
        }
    })
}

module.exports = {
    geocode: geocode
}