const express = require('express');
const router = express.Router();


const estudianteController= require('../controllers/estudianteController');

// Ruta para insertar un nuevo estudiante
router.post('/crear', estudianteController.crearEstudiante);

// Ruta para listar todos lo estudiante
router.get('/listar', estudianteController.listarEstudiantes);

// Ruta para editar un estudiante
router.put('/editar/:id', estudianteController.editarEstudiante)

// Ruta para eliminar un estudiante
router.delete('/eliminar/:id', estudianteController.eliminarEstudiante)
module.exports = router;