var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/prueba");

var userSchemaJson = {
    name: {type: String, required: "el nombre es obligatorio"},
    email: {type: String, required: "El email es obligatorio"},
    password: {type: String, required: "El password es obligatorio", minlength: [8, "el password debe tener 8 caracteres como minimo"]}
};
var userSchema = new Schema(userSchemaJson);
var User = mongoose.model("User",userSchema);

module.exports.User = User;