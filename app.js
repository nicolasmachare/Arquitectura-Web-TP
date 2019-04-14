//imports iniciales
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.set("view engine", "jade");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/prueba");

var userSchemaJson = {
    email: String,
    password: String
};
var Schema = mongoose.Schema
var userSchema = new Schema(userSchemaJson);
var User = mongoose.model("User",userSchema);

//urls
app.get("/", function(req, res){
    res.render("index");
});

app.get("/test", function(req, res){
    User.find(function(err,doc){
        console.log(doc)
    });
    res.render("test");
});

app.get("/creations", function(req, res){
    res.render("newusers");
});

app.post("/inicioUsers", function(req, res){
    console.log("nombre:" + req.body.name);
    console.log("email:" + req.body.email);
    console.log("pass:" + req.body.password);

    var user = new User({email: req.body.email, password: req.body.password});
    user.save(function(){
        console.log("guardado");
    });

    res.render("init");
});

//listen final
app.listen(8080, function(){
    console.log("Inicio...");
});