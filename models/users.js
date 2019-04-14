var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/prueba");

var userSchemaJson = {
    name: String,
    email: String,
    password: String
};
var userSchema = new Schema(userSchemaJson);
var User = mongoose.model("User",userSchema);

module.exports.User = User;