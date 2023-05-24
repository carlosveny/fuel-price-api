const express = require('express')
const https = require('https');
const APP = express()
const PORT = 3000
const FUEL_STATIONS_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'
const EESS_IDS = ['2651']

APP.get('/', (req, res) => {
  https.get(FUEL_STATIONS_URL, (resp) => {
    let data = '';

    // Un fragmento de datos ha sido recibido.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      const fuelData = JSON.parse(data).ListaEESSPrecio
      // const filtered = fuelData.filter(fuelStation => fuelStation.Provincia === 'BALEARS (ILLES)'
      //   && fuelStation['Rótulo'] === 'REPSOL')
      const filtered = fuelData.filter(fuelStation => EESS_IDS.includes(fuelStation.IDEESS))
      console.log(filtered);
      res.send(filtered)
    });

  })
})


APP.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
