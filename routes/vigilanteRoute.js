const express = require('express');
const router = express.Router();

const vigilanteController= require('../controllers/vigilanteController')

router.post('/crear', vigilanteController.crearVigilante);


module.exports = router;