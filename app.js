//imports iniciales
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "jade");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//urls
app.get("/", function(req, res){
    res.render("index");
});

app.get("/creations", function(req, res){
    res.render("newusers");
});

app.post("/inicioUsers", function(req, res){
    console.log("nombre:" + req.body.name);
    console.log("email:" + req.body.email);
    console.log("pass:" + req.body.password);
    res.render("init");
});

//listen final
app.listen(8080, function(){
    console.log("Inicio...");
});