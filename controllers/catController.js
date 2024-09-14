const modelCate = require("../models/modelCate");

module.exports = {
    obtenerCat:async function(req, res, next){
        try{
            const categorias = await modelCate.find()
            res.json(categorias);
        }catch(error){
            next(error)
        };
    },

    crearCat:async function(req, res, next){
        try{
            console.log(req.body)
            console.log(req.body.name)

            const document = new modelCate({name: req.body.name})

            const response = await document.save()

            res.json(response)
        }catch(error){
            next(error)
        }
    },
};