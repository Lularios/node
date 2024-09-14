const mongoose = require ("../config/mongoDB");
const bcrypt = require("bcrypt")

const schemaUsers = mongoose.Schema({
     name: String,
     email: {
        type: String,
        validate: {
            validator: function(value){
                const mailok = /(?=.*@)/;
                return mailok.test(value);
            },
            message: "El email debe tener un formato válido."
        },
     },
     password: {
        type: String,
        validate: {
            validator: function(password){
                const caracter = /(?=.*[a-z])(?=.*[A-Z]).{4,10}/;
                return caracter.test(password);
            },
            message: "La contraseña debe contener una letra minúscula, una mayúscula y entre 4 y 10 caracteres."
        },
    },
});

schemaUsers.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const modelUsers = mongoose.model("Usuarios", schemaUsers);

module.exports = modelUsers;

