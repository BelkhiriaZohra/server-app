const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Zohra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Zohra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        textHelp: 'Help Text here',
        name: 'Zohra'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){ 
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if (error) {
            return res.send({error})
        }
        console.log('geocode excecuted well')
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            console.log(forecastData)
            console.log(location)
            console.log(req.query.address)
            console.log('forecast excecuted ell')
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Zohra'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Zohra'
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+ port)
})
 
