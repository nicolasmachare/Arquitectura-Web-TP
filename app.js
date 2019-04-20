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
            res.render("test");
        }
    })

});

app.delete("/usersBorrados", function(req, res){

    User.findOneAndDelete({_id: req.session.user_id},function(err){

        console.log("entre3");

        if(!err){
            console.log("eliminando");
            res.render("index");
        }else{
            res.render("test");
        }
    })

});

//endopoints
app.get("/users", function(req, res){

    User.findOne({email: req.body.email,password: req.body.password},function(err, userDoc){

        if(err){
            console.log("error");
            //res.statusCode = 301;
            //res.setHeader("Content-type","text/plain")
            //res.write("error");
            res.status(300).send('error');
        }else{
            if( userDoc==null){
                console.log("no encontrado");
                //res.statusCode = 404;
                //res.setHeader("Content-type","text/plain");
                //res.write("Not found");
                res.status(404).send('not found');
            }
            if(!err & userDoc!=null){
                console.log("devolviendo");
                //res.statusCode = 200;
                //res.setHeader('Content-type','application/json');
                //res.write(JSON.stringify( userDoc));
                //res.end;
                res.status(200).send(JSON.stringify(userDoc));
            }
        }
    })

});

app.post("/users", function(req, res){

    console.log("entre3");

    User.findOne({email: req.body.email, password: req.body.password}, function(err, userDoc){

        if(!err){
            if( userDoc!=null){
                console.log("repeat");
                res.status(401).send('unauthorized');
            }else{
                var user = new User({name: req.body.name, email: req.body.email, password: req.body.password});

                user.save().then(function(us){
                    console.log("entre bien");
                    res.status(200).send('OK'); 
                },function(err){
                    if(err){
                        console.log("entre por error");
                        res.status(403).send(String(err)); 
                    }
                });
            } 
        }

        if(err){
            console.log("error diferente");
            res.status(405).send('unexpected error');
        }

    })

});

app.put("/users", function(req, res){


    User.findOne({email: req.body.email, password: req.body.password}, function(err, userDoc){

        if(!err){
            if( userDoc==null){
                console.log("not found");
                res.status(404).send('not found');
            }else{
                userDoc.name = req.body.name;

                userDoc.save().then(function(us){
                    console.log("entre bien");
                    res.status(200).send('OK'); 
                },function(err){
                    if(err){
                        console.log("entre por error");
                        res.status(403).send(String(err)); 
                    }
                });
            } 
        }

        if(err){
            console.log("error diferente");
            res.status(405).send('unexpected error');
        }

    })

});

app.delete("/users", function(req, res){

    User.findOne({email: req.body.email, password: req.body.password}, function(err, userDoc){

        if(!err){
            if( userDoc==null){
                console.log("not found");
                res.status(404).send('not found');
            }else{

                userDoc.remove(function(err){
            
                    if(!err){
                        console.log("eliminando");
                        res.status(200).send('ok');
                    }else{
                        console.log("error diferente");
                        res.status(405).send('unexpected error');
                    }

                });
            } 
        }

        if(err){
            console.log("error diferente");
            res.status(405).send('unexpected error');
        }

    })

});




//listen final
app.listen(8080, function(){
    console.log("Inicio...");
});