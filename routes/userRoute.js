const express = require('express');
const router = express.Router();

const userController= require('../controllers/userController');


router.post('/crear',userController.crearUser)



module.exports = router;