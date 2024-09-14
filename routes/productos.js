const express = require('express');
const router = express.Router();

const prodsController = require ("../controllers/prodController")

router.get('/', prodsController.obtenerProd);

router.get('/:id', prodsController.obtenerId);

router.post('/', (req, res, next)=>req.app.verificarToken(req, res, next), prodsController.crear);

router.put('/:id', (req, res, next)=>req.app.verificarToken(req, res, next), prodsController.actualizar);

router.delete('/:id',(req, res, next)=>req.app.verificarToken(req, res, next), prodsController.eliminar);

module.exports = router;
