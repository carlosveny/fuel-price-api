const express = require('express')
const axios = require('axios')

const APP = express()
const PORT = 3000
const FUEL_STATIONS_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'
const EESS_IDS = ['2651']

APP.get('/', (req, res) => {
  axios.get(FUEL_STATIONS_URL).then(response => {
    const fuelStationsList = response.data.ListaEESSPrecio
    console.log(fuelStationsList[0])
    res.send(fuelStationsList[0])
    return
  })
})


APP.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
