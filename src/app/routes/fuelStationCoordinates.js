const common = require('../common.js');

module.exports = (APP => {
  () => { },
    APP.get('/fuelStationCoordinates', (req, res) => {
      const actualLat = parseFloat(req.body.latitude)
      const actualLong = parseFloat(req.body.longitude)
      if (!actualLat || !actualLong) {
        common.sendError(res, 500, 'Missing or incorrect parameter latitude or longitude')
        return
      }

      common.getFuelStationsData().then(response => {
        const fuelStationsList = response.data.ListaEESSPrecio
        const closerFuelStation = fuelStationsList.reduce((previous, current) => {
          return haversine(actualLat, actualLong, common.convertToFloat(current.Latitud), common.convertToFloat(current['Longitud (WGS84)']))
            < haversine(actualLat, actualLong, common.convertToFloat(previous.Latitud), common.convertToFloat(previous['Longitud (WGS84)']))
            ? current
            : previous
        });
        res.send(common.converterToFuelStationDto(closerFuelStation))
      })
    })
})

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180
}

function haversine(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371

  const dLat = degreesToRadians(lat2 - lat1)
  const dLon = degreesToRadians(lon2 - lon1)

  lat1 = degreesToRadians(lat1)
  lat2 = degreesToRadians(lat2)

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadiusKm * c
}
