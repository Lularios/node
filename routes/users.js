var express = require('express');
var router = express.Router();

const userController = require ("../controllers/userController")

router.post('/', userController.crearUsuario);
router.post('/login', userController.ingresar);

module.exports = router;
