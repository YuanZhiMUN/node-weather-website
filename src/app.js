const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;
//Define the express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//define the view pages for handlebar
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath);

//general views define
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
       title: "Weather App",
       name: "Peter" 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Peter"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:"Help",
        helptext: "There is no help file.",
        name: "peter"
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You should input a search item"
        })
    }

    res.send({
        products:[]
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"Please input an address." 
        })
    }

    geocode(req.query.address, (err, {latitude, longitude, location}={}) => {
        if(err){
           return res.send('The location is not right.')
        }
      
        forecast(longitude, latitude, (err, forecastdata) => {
            if(err){
                return res.send({err})
            }

            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address 
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "Error",
        error: "Help article is not found!",
        name: "peter"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        error: '404, page not found',
        name: 'peter'
    })
})
app.listen(port, () => {
    console.log('Server is up on port 3000' + port)
})