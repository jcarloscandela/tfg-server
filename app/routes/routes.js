var express     = require('express');
var apiRoutes = express.Router(); 

const userController = require('../controllers/user.js')
const nodosController = require('../controllers/node.js')
const payloadController = require('../controllers/payload.js')

apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Bienvenido a la api! Para ver las rutas acceda a /api/routes'});         
});
  
apiRoutes.get('/routes', function(req,res){
    res.json({message:[
        {
            route: 'get /user'
        },
        {
            route: 'post /user'
        },
        {
            route: 'put /user'
        },
        {
            route: 'get /nodes'
        },
        {
            route: 'get /nodes/:dev_id'
        },
        {
            route: 'post /nodes/:dev_id/downlink'
        },
        {
            route: 'get /payloads/:dev_id'
        },
        {
            route: 'get /payloads/:dev_id/last'
        }
        ]})
})

// Users api
apiRoutes.get('/users', userController.getUsers)
apiRoutes.get('/users/:user_id', userController.getUser)
apiRoutes.post('/users', userController.createUser)
apiRoutes.put('/users/:user_id', userController.updateUser)
apiRoutes.delete('/users/:user_id', userController.deleteUser)
  
//Sensors
apiRoutes.get('/nodes', nodosController.getNodes)
apiRoutes.get('/nodes/:dev_id', nodosController.getNode)
// apiRoutes.get('/songs', songController.getSongs)
// apiRoutes.get('/songs/:song_id', songController.getSong)
// apiRoutes.post('/songs', auth, songController.createSong)
// apiRoutes.put('/songs/:song_id', auth, songController.updateSong)
// apiRoutes.delete('/songs/:song_id', auth, songController.deleteSong)

//Paylods
apiRoutes.get('/payloads/:dev_id/last', payloadController.getLastPayload)
apiRoutes.get('/payloads/:dev_id', payloadController.getLastPayloads)


module.exports = apiRoutes

