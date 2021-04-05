const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/profileController');
const JobController = require('./controllers/JobController');


routes.get('/', JobController.index);

routes.get('/job', JobController.create);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);
routes.post('/job', JobController.save);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);




module.exports = routes;