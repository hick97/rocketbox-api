const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const BoxController = require('../controllers/boxController');
const FileController = require('../controllers/fileController');

const routes = express.Router();

//CRUD

routes.get('/boxes/:id', BoxController.show);

routes.post('/boxes', BoxController.store);

//middleware para upload single (um arquivo por vez) e descrição do campo que o frontend deve mandar o arquivo ('file)
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store)


module.exports = routes;