const express = require('express')
const app = express()
const axios = require('axios');
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

const getData = require('./modules/externApi')

let characters;
let planets;
let starships;
let vehicles;
let starfighters = []
let pageNumber = 1


async function getResponse() {
    characters = await getData.fetchChar(axios, pageNumber);
    planets = await getData.fetchPlanets(axios)
    starships = await getData.fetchStarships(axios)
    vehicles = await getData.fetchVehicles(axios)

}

getResponse()


app.post('/charsCard', (req, res) => {
    starfighters.push(req.body)
    res.redirect('pages/character')
})


app.get('/pages/character', async (req, res) => {

    res.render('pages/character', { starfighters })
})


app.post('/charDet', async (req, res) => {
    const { page } = req.body
    if (page) {
    let character = await getData.fetchChar(axios, page);

    characters = character

    pageNumber = page

    }else {
    console.log('no page found')
    }
    res.status(204).send();
})



app.get('/', (req, res) => {

res.render('pages/charDetails', { characters, planets, starships, vehicles,starfighters, pageNumber})

})




app.listen(5000)
console.log('server running on port 5000')