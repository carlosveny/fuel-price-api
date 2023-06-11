const common = require('../common.js');

module.exports = (APP => {
  () => { },
    APP.get('/fuelStationId/:id', (req, res) => getFuelStationsByIds([req.params.id], res)),
    APP.post('/fuelStationId', (req, res) => getFuelStationsByIds(req.body.fuelStationIds?.map(id => id.toString()), res))
})

function getFuelStationsByIds(fuelStationsIds, serverResponse) {
  if (!fuelStationsIds) {
    common.sendError(serverResponse, 500, 'Incorrect parameter. Expecting route param or body param fuelStationIds')
    return
  }
  common.getFuelStationsData().then(response => {
    const fuelStationsList = response.data.ListaEESSPrecio
    const filteredFuelStations = fuelStationsList.filter(fuelStation => fuelStationsIds.includes(fuelStation.IDEESS))
    if (filteredFuelStations?.length) {
      serverResponse.send(filteredFuelStations.map(fuelStation => common.converterToFuelStationDto(fuelStation)))
      return
    }
    common.sendError(serverResponse, 404, 'Fuel station ID not found')
  })
}
