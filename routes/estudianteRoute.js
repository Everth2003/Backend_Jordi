const express = require('express');
const router = express.Router();


const estudianteController= require('../controllers/estudianteController');

router.post('/crear', estudianteController.crearEstudiante);



module.exports = router;