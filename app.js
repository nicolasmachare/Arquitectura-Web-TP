//imports generales

//importa express, y lo instancia en app
var express = require("express");
var app = express();

// parseador de url y manejador de sesiones
var bodyParser = require("body-parser");
var session = require("express-session");

var methodOverride = require("method-override");

//file system
var fs = require("fs");


//imports propios
//modelos de objetos cuenta y user
var User = require("./models/users").User;
var Account = require("./models/accounts").Account;
var Item = require("./models/items").Account;

//manejo de sesiones
app.use(session({
    secret: "qwer",
    resave: false , 
    saveUninitialized: false 
}));

app.set("view engine", "jade");
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//metodo para importar las url que esten en la  carpeta url
var routePath =  __dirname + '/urls/';
//esta linea recorre la carpeta y lee las url archivo por archivo
fs.readdirSync(routePath).forEach(function(file){
    require(routePath + file)(app);
});


//listen final
app.listen(8080, function(){
    console.log("Inicio...");
});