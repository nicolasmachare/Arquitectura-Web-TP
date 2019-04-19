//imports iniciales
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var User = require("./models/users").User;
var session = require("express-session");
var methodOverride = require("method-override");

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
            res.redirect("/");
        }
    });

    res.render("init");
});

app.post("/init", function(req, res){

    User.findOne({email:req.body.email,password:req.body.password},function(err, userDoc){

        if(!err & userDoc!=null ){
            console.log("Sesion Iniciada");
            var nombre = userDoc.name;
            var emailDoc = userDoc.email;
    
            req.session.user_id = userDoc._id ;
            console.log(req.session.user_id);
            res.render("init", { nombre : String(nombre), email : String(emailDoc)});    
        }else{
            res.render("index"); 
            console.log("entre aca");
        }
    })

});


app.put("/initActualizado", function(req, res){

    User.findById(req.session.user_id,function(err, userDoc){

        console.log("entre");

        if(!err & userDoc!=null ){

            console.log("cambiando");
            userDoc.name = req.body.newName;
            userDoc.save(function(err){
                
                var nombre = userDoc.name;
                var emailDoc = userDoc.email;
                res.render("init", { nombre : String(nombre), email : String(emailDoc)}); 
            })

        }else{
            res.render(test)
        }
    })

});



//listen final
app.listen(8080, function(){
    console.log("Inicio...");
});