var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/prueba");

var accountSchemaJson = {
    id:{type: String, required: "el id es obligatorio"},
    email: {type: String, required: "el email es obligatorio"},
    alias: {type: String, required: "el nombre es obligatorio"},
    saldo: {type: Number, required: "El monto es obligatorio"}
};

var accountSchema = new Schema(accountSchemaJson);
var Account = mongoose.model("Account",accountSchema);

module.exports.Account = Account;