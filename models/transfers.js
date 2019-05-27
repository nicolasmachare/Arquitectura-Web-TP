var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/prueba");

var transferSchemaJson = {
    id:{type: String, required: "el id es obligatorio"},
    idComprador:{type: String, required: "el id del comprador es obligatorio"},
    idVendedor:{type: String, required: "el id del vendedor es obligatorio"},
    email: {type: String, required: "el email es obligatorio"},
    alias: {type: String, required: "el nombre es obligatorio"},
    price: {type: Number, required: "El monto es obligatorio"},
    state: {type: String, required: "El estado es obligatorio"},
    date: {type: String, required: "La fecha de la venta es obligatoria"}
};

var transferSchema = new Schema(transferSchemaJson);
var Transfer = mongoose.model("Transfer",transferSchema);

module.exports.Transfer = Transfer;