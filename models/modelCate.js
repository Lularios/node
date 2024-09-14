const mongoose = require("../config/mongoDB");

const schemaCat = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model("categorias", schemaCat)