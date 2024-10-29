const express = require('express');
const router = express.Router();

const vigilanteController= require('../controllers/vigilanteController')


// Ruta para insertar un nuevo vigilante
router.post('/crear', vigilanteController.crearVigilante);

// Ruta para listar los vigilantes
router.get('/listar',vigilanteController.listarVigilantes);

// Ruta para editar un vigilante existente por ID
router.put('/editar/:id', vigilanteController.editarVigilante);

// Ruta para eliminar un vigilante por ID
router.delete('/eliminar/:id',vigilanteController.eliminarVigilante)

module.exports = router;