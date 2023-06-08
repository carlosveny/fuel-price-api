const express = require('express')
const https = require('https');
const APP = express()
const PORT = 3000
const FUEL_STATIONS_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'
const EESS_IDS = ['2651']

APP.get('/', (req, res) => {
  res.send('hola funciona6')
  return
})


APP.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
