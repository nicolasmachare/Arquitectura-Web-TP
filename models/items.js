var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/prueba",{ useNewUrlParser: true });

var itemSchemaJson = {
    id:{type: String, required: "el id es obligatorio"},
    email: {type: String, required: "el email es obligatorio"},
    alias: {type: String, required: "el nombre es obligatorio"},
    price: {type: Number, required: "El monto es obligatorio"},
    state: {type: String, required: "El estado es obligatorio"}
};

var itemSchema = new Schema(itemSchemaJson);
var Item = mongoose.model("Item",itemSchema);

module.exports.Item = Item;