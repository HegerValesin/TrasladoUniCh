const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ControllerUsers = require('./controllers/ControllerUsers');
const ControllerVeiculos = require('./controllers/ControllerVeiculos');
const ControllerDestinos = require('./controllers/ControllerDestinos');
const ControllerTraslado = require('./controllers/ControllerTraslado');
const SessionsController = require('./controllers/SessionsController');
const UsersProfile = require('./controllers/UsersProfile');


const ProfileUser = require('./controllers/ProfileUser');

const routes = express.Router();

//Rotas de login
routes.post('/session', SessionsController.create);

//Rotas de usuarios
routes.get('/users', ControllerUsers.index);
routes.post('/users', ControllerUsers.create);
//routes.put('/users', ControllerUsers.edit);
//routes.delete('/users', ControllerUsers.delete);

//Rotas de veiculos
routes.get('/veiculos', ControllerVeiculos.index);
routes.post('/veiculos', ControllerVeiculos.create);
//routes.put('/veiculos', ControllerVeiculos.edit);
//routes.delete('/veiculos', ControllerVeiculos.delete);

//Rotas de destinos
routes.get('/destinos', ControllerDestinos.index);
routes.post('/destinos', ControllerDestinos.create);
//routes.put('/destinos', ControllerDestinos.edit);
//routes.delete('/destinos', ControllerDestinos.delete);

//Rotas de translado
routes.get('/traslado', ControllerTraslado.index);
routes.post('/traslado', ControllerTraslado.create);
routes.delete('/traslado/:id', ControllerTraslado.delete);

//Rota de translado por usuario
routes.get('/profileuser', ProfileUser.index);

//Rota para usurios
routes.get('/usersprofiles', UsersProfile.index)
routes.get('/usersprofiles/:id', UsersProfile.indexid)
routes.put('/usersprofiles', UsersProfile.edit)
routes.delete('/usersprofiles/:id', UsersProfile.delete)






module.exports = routes; 