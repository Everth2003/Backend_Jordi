const express = require('express');
const router = express.Router();


const estudianteController= require('../controllers/estudianteController');

// Ruta para insertar un nuevo profesor
router.post('/crear', estudianteController.crearEstudiante);

// Ruta para listar todos los profesores
router.get('/listar', estudianteController.listarEstudiantes);

module.exports = router;