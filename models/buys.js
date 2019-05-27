var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/prueba");

var buySchemaJson = {
    id:{type: String, required: "el id es obligatorio"},
    idComprador:{type: String, required: "el id del comprador es obligatorio"},
    idCuentaComprador:{type: String, required: "el id del comprador es obligatorio"},
    idVendedor:{type: String, required: "el id del vendedor es obligatorio"},
    email: {type: String, required: "el email es obligatorio"},
    alias: {type: String, required: "el nombre es obligatorio"},
    price: {type: Number, required: "El monto es obligatorio"},
    state: {type: String, required: "El estado es obligatorio"},
    idItem: {type: String, required: "El id del item es obligatorio"},
    date: {type: String, required: "La fecha de la venta es obligatoria"}
};

var buySchema = new Schema(buySchemaJson);
var Buy = mongoose.model("Buy",buySchema);

module.exports.Buy = Buy;