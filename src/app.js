const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
console.log(path.join(__dirname, '../public'))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public/')))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather Application',
        name:'Kristaly Elod'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help ',
        text: 'Helpful text',
        name:'Kristaly Elod'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name:'Kristaly Elod'
    })
})
app.get('/weather', (req, res) => {
  if (!req.query.adress) {
    return res.send({
        error:"Please give a adress"})
} else {
    geocode(req.query.adress, (error,{longitude,latitude,location} = {}) =>{
    if (error) {
        return res.send({
            error
        })
    }
    forecast(longitude,latitude, (error, forecastData) => {
    if (error) {
        return res.send({
         error
        })
        }
        res.send({
        location: location,
        forecast:forecastData
        })          
    })
})
}
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a seach term"
        })   
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Kristaly Elod',
        text:'Help page not found!'
    })
       
})
app.get('*', (req, res) => {
    res.render('error', {
        title:'404',
        text: 'Page not found',
        name:'Kristaly Elod'
    })
})


app.listen(port, () => {
    console.log('Server is run on port '+port)
})


