//imports iniciales
var express = require("express");
var app = express();

app.set("view engine", "jade");


//urls
app.get("/", function(req, res){
    res.render("index");
});

//listen final
app.listen(8080, function(){
    console.log("Inicio...");
});