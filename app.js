//imports iniciales
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var User = require("./models/users").User;
var session = require("express-session");

app.use(session({
    secret: "qwer",
    resave: false , 
    saveUninitialized: false 
}));

app.set("view engine", "jade");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

    var user = new User({name: req.body.name, email: req.body.email, password: req.body.password});

    user.save().then(function(us){
        console.log("guardado"); 
    },function(err){
        if(err){
            console.log(String(err));
        }
    });

    res.render("init");
});

app.post("/init", function(req, res){

    User.findOne({email:req.body.email,password:req.body.password},function(err, userDoc){
        console.log("Sesion Iniciada");
        var nombre = userDoc.name;
        var emailDoc = userDoc.email;
  
        req.session.user_id = userDoc._id ;
        console.log(req.session.user_id);
        res.render("init", { nombre : String(nombre), email : String(emailDoc)});
    })

});

//listen final
app.listen(8080, function(){
    console.log("Inicio...");
});