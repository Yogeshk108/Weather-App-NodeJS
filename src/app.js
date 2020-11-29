const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const publicdir = path.join(__dirname , '../public')
const viewpath = path.join(__dirname , '../templets/views')
const partialspath = path.join(__dirname , '../templets/partials')

app.set('view engine' , 'hbs')
app.set('views' , viewpath)
hbs.registerPartials(partialspath)

app.use(express.static(publicdir))

app.get('', (req,res) => {
    res.render('index' , {
        title: 'Weather App',
        name: 'Use this site to get weather'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Yogesh Kanjal'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Yogesh'
    })
})
app.get('/products', (req,res)=>{
    if(!req.query.search) {
        return res.send({
            error: 'yoou must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/weather' , (req , res)=>{
    if(!req.query.address) {
        return res.send({
            error:'Address not provided'
        })
    }

    console.log(req.query.address)
    geocode(req.query.address , (error , {longitude, latitude, place} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        } else {
            forecast(longitude , latitude , (error, fdata) => {
                if(error) {
                    return res.send({
                        ERROR: error
                    })
                } else {
                    return res.send({
                        forecast: fdata,
                        location: place,
                        address: req.query.address
                    })
                }
            })
        }
    })
})
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help Page',
        name: 'Yogesh',
        errormessage: 'Help page not found...'
    })
})
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'yogesh',
        errormessage: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('server is up on port 3000..')
})