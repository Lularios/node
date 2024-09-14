const mongoose = require ("../config/mongoDB");

const schemaProd = mongoose.Schema({
        title: {
            type: String,
            required: ["El campo es obligatorio", true],
        },
        sku: Number,
        price: {
            type: Number,
            min: 0,
            get: function(value){
                return value * 1.21;
            },
        },
        description: String,
        type: String,
        category: {
            type: mongoose.Schema.ObjectId,
            ref: "categorias",
        },
        destacado: Boolean,
    });

    const modelProd = mongoose.model("Productos", schemaProd);

schemaProd.set("toJSON", {getters:true});

schemaProd.virtual("price_currency").get(function(){
    return `$ ${this.price}`;
});

module.exports = modelProd;

