const axios = require('axios')

const FUEL_STATIONS_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'

module.exports = {
  getFuelStationsData() {
    return axios.get(FUEL_STATIONS_URL)
  },
  sendError(response, status, message) {
    response.status(status)
    response.send({ error: message })
  },
  converterToFuelStationDto(fuelStationBase) {
    return {
      address: fuelStationBase['Dirección'],
      zipCode: fuelStationBase['C.P.'],
      city: fuelStationBase.Localidad,
      municipality: fuelStationBase.Municipio,
      province: fuelStationBase.Provincia,
      latitude: convertToFloat(fuelStationBase.Latitud),
      longitude: convertToFloat(fuelStationBase['Longitud (WGS84)']),
      brand: fuelStationBase['Rótulo'],
      schedule: fuelStationBase.Horario,
      idEESS: fuelStationBase.IDEESS,
      idMunicipality: fuelStationBase.IDMunicipio,
      idProvince: fuelStationBase.IDProvincia,
      idCCAA: fuelStationBase.IDCCAA,
      priceDiesel: convertToFloat(fuelStationBase['Precio Gasoleo A']),
      priceDieselPremium: convertToFloat(fuelStationBase['Precio Gasoleo Premium']),
      pricePetrol95: convertToFloat(fuelStationBase['Precio Gasolina 95 E5']),
      pricePetrol98: convertToFloat(fuelStationBase['Precio Gasolina 98 E5']),
    }
  },
  convertToFloat
}

function convertToFloat(text) {
  return parseFloat(text.replace(',', '.'))
}
