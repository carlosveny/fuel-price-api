const express = require('express')
const axios = require('axios')

const APP = express()
const PORT = 3000
const FUEL_STATIONS_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'
const EESS_IDS = ['2651', '11560']

APP.get('/', (req, res) => {
  axios.get(FUEL_STATIONS_URL).then(response => {
    const fuelStationsList = response.data.ListaEESSPrecio
    const filteredFuelStations = fuelStationsList.filter(fuelStation => EESS_IDS.includes(fuelStation.IDEESS))
    console.log(filteredFuelStations)
    res.send(filteredFuelStations.map(fuelStation => converterToFuelStationDto(fuelStation)))
  })
})


APP.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

function converterToFuelStationDto(fuelStationBase) {
  return {
    address: fuelStationBase['Dirección'],
    zipCode: fuelStationBase['C.P.'],
    city: fuelStationBase.Localidad,
    municipality: fuelStationBase.Municipio,
    province: fuelStationBase.Provincia,
    latitude: fuelStationBase.Latitud,
    longitude: fuelStationBase['Longitud (WGS84)'],
    brand: fuelStationBase['Rótulo'],
    schedule: fuelStationBase.Horario,
    idEESS: fuelStationBase.IDEESS,
    idMunicipality: fuelStationBase.IDMunicipio,
    idProvince: fuelStationBase.IDProvincia,
    idCCAA: fuelStationBase.IDCCAA,
    priceDiesel: fuelStationBase['Precio Gasoleo A'],
    priceDieselPremium: fuelStationBase['Precio Gasoleo Premium'],
    pricePetrol95: fuelStationBase['Precio Gasolina 95 E5'],
    pricePetrol98: fuelStationBase['Precio Gasolina 98 E5'],
  }
}
