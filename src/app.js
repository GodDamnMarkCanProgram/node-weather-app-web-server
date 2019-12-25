const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000


//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static deirectory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Markus'
    })

})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me'
        , name: 'Markus'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Need help',
        title: 'Help',
        name: 'Markus'
    })
})




app.get('/weather', (req, res) => {

    address = req.query.address
    if (!address) {
        return res.send({
            error: "No address provided"
        })
    }

    geocode.geocode(address, (error, { longditude, latitude, location }={}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast.forecast(latitude, longditude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: forecastData,
                address
                
            })
        })
    })

})





//using req for the first time
app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })

    }
    res.send({
        products: []
    })
})



//matching any page that starts with /help/
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'watitdo',
        errorMessage: 'help page not found'
    })
})

//matches anything
app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'page not found',
        title: 'SUp'
    })
})



app.listen(port, () => {
    console.log('Server is up on port '+ port)
})

