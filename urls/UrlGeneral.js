
//import de objetos de MongoDB
var Account = require("../models/accounts").Account;
var User = require("../models/users").User;
var Item = require("../models/items").Item;
var Load = require("../models/loads").Load;
var Buy = require("../models/buys").Buy;

//modulo principal donde van todas las url de pruebas
module.exports= function(app){

    //inicio para localhost
    app.get("/", function(req, res){
        res.render("index");
    });

    //url para poder ver todos los user en consola
    app.get("/test", function(req, res){
        Buy.find(function(err,doc){
            console.log(doc)
        });
        res.render("test");
    });
    

    //url para crear un usuario con jade
    app.get("/creations", function(req, res){
        res.render("newusers");
    });

    //url para entrar al inicio del usuario de un user nuevo
    app.post("/inicioUsers", function(req, res){
        console.log("nombre:" + req.body.name);
        console.log("email:" + req.body.email);
        console.log("pass:" + req.body.password);
    
        User.findOne({email: req.body.email, password: req.body.password}, function(err, userDoc){
    
            if(!err){
                if( userDoc!=null){
                    console.log("repeat");
                    res.render("newusers",{mensaje: "El email ya se encuentra registrado. Pruebe con otro"});
                }else{
                    var saldo = 0;
                    var user = new User({name: req.body.name, email: req.body.email, password: req.body.password,
                                        saldo: saldo});
    
                    user.save().then(function(us){ 
                        res.render("init", { nombre : String(req.body.name), email : String(req.body.email) , 
                                            saldo: String(saldo) , mensaje: String("")}); 
                    },function(err){
                        if(err){
                            console.log("entre por error");
                            res.render("newusers",{mensaje: "La contraseña debe tener 8 digitos como minimo"});
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

    //url para entrar al inicio del usuario a traves del loggeo
    app.post("/init", function(req, res){

        User.findOne({email:req.body.email,password:req.body.password},function(err, userDoc){
    
            if(!err & userDoc!=null ){
                console.log("Sesion Iniciada");
                var nombre = userDoc.name;
                var emailDoc = userDoc.email;
                var saldoDoc = userDoc.saldo;

                if(saldoDoc == null){
                    saldoDoc = 0;
                }
        
                req.session.user_id = userDoc._id ;
                console.log(req.session.user_id);
                res.render("init", { nombre : String(nombre), email : String(emailDoc), saldo : String(saldoDoc),
                                    mensaje: String("")});    
            }else{
                res.render("index"); 
                console.log("entre aca");
            }
        })
    
    });

    //url para actualizar el nombre del usuario
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

    //url para borrar un usuario
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


};