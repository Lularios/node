const modelUsers = require("../models/modelUser");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken"); 

  const crearUsuario = async function(req, res, next){
    try{
    console.log(req.body);
    const usuario = new modelUsers(req.body);
    const document = await usuario.save();
    res.status(201).json(document);
    }catch(error){
      console.log("crear", error);
      next(error);
    }
  };

  const ingresar = async function(req, res, next){
    try{
    const user = await modelUsers.findOne({email: req?.body?.email});
    if(!user){
      return res.status(401).json({message:"Alguno de los datos ingresados no están registrados",});
      }
      if(!bcrypt.compareSync(req.body.password, user.password)){
      return res.status(401).json({message:"Alguno de los datos ingresados no están registrados"});
      }
      const token = jwt.sign({userId:user._id},req.app.get("key"),{expiresIn:"1h"});
      res.status(200).json(token);
    }catch(error){
      res.status(400).json({message: error.message});
    }
  };

  module.exports = {
    crearUsuario,
    ingresar,
  };