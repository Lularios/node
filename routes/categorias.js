var express = require('express');
var router = express.Router();
const catController = require("../controllers/catController")

router.get('/', catController.obtenerCat);
router.post('/', catController.crearCat);
module.exports = router;