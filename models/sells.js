var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/prueba");

var sellSchemaJson = {
    idComprador:{type: String, required: "el id del comprador es obligatorio"},
    idVendedor:{type: String, required: "el id del vendedor es obligatorio"},
    price: {type: Number, required: "El monto es obligatorio"},
    state: {type: String, required: "El estado es obligatorio"},
    idItem: {type: String, required: "El id del item es obligatorio"},
    date: {type: String, required: "La fecha de la venta es obligatoria"}
};

var sellSchema = new Schema(sellSchemaJson);
var Sell = mongoose.model("Sell",sellSchema);

module.exports.Sell = Sell;