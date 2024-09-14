const modelProd = require("../models/modelProd")

const obtenerProd = async function(req, res, next){
  try{
  const documents = await modelProd.find({"destacado": true}).populate("category");
  res.status(200).json(documents);
  }catch(e){next(error);}
};

const obtenerId = async function(req, res, next){
  try{
  const document = await modelProd.findById(req.params.id);
  res.status(200).json(document);
  }catch(e){next(error);}
};

  const crear = async function(req, res, next){
    try{
      console.log(req.body);
      const producto = new modelProd({
        title: req.body.title,
        sku: req.body.sku,
        price: req.body.price,
        description: req.body.description,
        type: req.body.type,
        category: req.body.category,
        destacado: req.body.destacado,
    });

    const document = await producto.save();
    res.status(201).json(document);
    }catch(error){
      res.status(400).json({message: error.message});
    }
  };

  const actualizar = async function(req, res, next){
    try{
      await modelProd.updateOne({_id:req.params.id},req.body)
        res.status(204);
    }catch(error){
      console.log(error);
      next(error);
    }
  }

  const eliminar = async function(req, res, next){
    try{
      await modelProd.deleteOne({_id:req.params.id});
        res.status(204);
    }catch(error){
      console.log(error);
      next(error);
    }
  }
    
  module.exports = {
    obtenerProd,
    obtenerId,
    crear,
    actualizar,
    eliminar,
  }