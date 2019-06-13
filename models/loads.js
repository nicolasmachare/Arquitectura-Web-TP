var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/prueba",{ useNewUrlParser: true });

var loadSchemaJson = {
    id:{type: String, required: "el id es obligatorio"},
    email: {type: String, required: "el email es obligatorio"},
    account: {type: String, required: "la cuenta es obligatoria"},
    amount: {type: Number, required: "El monto es obligatorio"},
    state: {type: String, required: "El estado es obligatorio"},
    date: {type: String, required: "La fecha de la venta es obligatoria"},
    controlAccount: {type: Boolean, required: "el control de cuenta es obligatoria"},
    controlUser: {type: Boolean, required: "el control de user es obligatoria"}
};

var loadSchema = new Schema(loadSchemaJson);
var Load = mongoose.model("Load",loadSchema);

module.exports.Load = Load;