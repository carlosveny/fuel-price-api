# API Precios Gasolina España
API para obtener datos sobre el precio de la gasolina en España.
### Información básica
#### Servidor
El servidor está montado sobre un contenedor Ubuntu con las siguientes características:
Versión Ubuntu
```
command ubuntu version
```
Versión node
```

```
Versión npm
```

```
Para mantener siempre activo el servidor se usa [supervisorctl](http://supervisord.org/running.html).

#### Instalación
Pasos para instalar y ejecutar la API.
1. Clonar el repo en el servidor `git clone XXX`.
2. Instalar paquetes y dependencias `npm i`.
3. Arrancar la API `npm run start`.

### Endpoints
| Endpoint | Método | Query params | Body | Descripción |
|-----|---|---|---|---|
| /fuelStationId/:id | GET | None | None | Obtener gasolinera por ID |
| /fuelStationId | POST | None | `{"fuelStationIds": [1, 2]}` | Obtener gasolineras por ID |
| fuelStationCoordinates | GET | `?latitude=XX&longitude=XX` | None | Obtener gasolinera más cercana |
Para consultar los IDs de las gasolineras se puede realizar una petición GET al siguiente endpoint público: https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/
