//import de objetos de MongoDB
var Account = require("../models/accounts").Account;
var User = require("../models/users").User;

//modulo principal donde van todas las url de "users"
module.exports= function(app){

    app.get("/users", function(req, res){

        User.findOne({email: req.body.email,password: req.body.password},function(err, userDoc){
    
            if(err){
                console.log("error");
                res.status(300).send('error');
            }else{
                if( userDoc==null){
                    console.log("no encontrado");
                    res.status(404).send('not found');
                }
                if(!err & userDoc!=null){
                    console.log("devolviendo");
                    res.status(200).send(JSON.stringify(userDoc));
                }
            }
        })
    
    });

    app.post("/users", function(req, res){

        //console.log("entre4");
    
        User.findOne({email: req.body.email, password: req.body.password}, function(err, userDoc){
    
            if(!err){
                if( userDoc!=null){
                    console.log("El usuario ya existe");
                    res.status(401).send('El usuario ya está registrado'); 
                    //res.status(401).send('unauthorized');
                    
                    //res.writeHead(200, { 'Content-Type': 'application/json' }); 
                    //res.end(JSON.stringify('Logueado ok'));
                }else{
                    var user = new User({name: req.body.name, email: req.body.email,
                                         password: req.body.password, saldo: req.body.saldo});
    
                    user.save().then(function(us){
                        console.log("Usuario Creado");
                        res.status(200).send('Usuario Creado'); 
                    },function(err){
                        if(err){
                            console.log("Error de Creacion: "+String(err));
                            res.status(403).send(String(err));
                            
                            //res.writeHead(200, { 'Content-Type': 'application/json' }); 
                            //res.end(JSON.stringify('Hola mundo'));
                            //res.end('{"success" : "Error de Guardado", "status" : 403}');
                            //res.end(JSON.stringify('{"success" : "Error de Guardado", "status" : 403}'));
                            //res.status(403).send(String(err)); 
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

                    var nameReq = req.body.name;
                    var saldoReq = req.body.saldo;
    
                    if(nameReq!=null){
                        userDoc.name = nameReq;
                    }

                    if(saldoReq!=null){
                        userDoc.saldo = saldoReq;
                    }

                    if(nameReq!=null | saldoReq!=null){
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


    app.post("/login", function(req, res){
        User.findOne({email: req.body.email, password: req.body.password}, function(err, userDoc){
    
            if(!err){
                if( userDoc!=null){

                    console.log("Login Ok");
                    res.status(200).send(JSON.stringify({"status":"Login Ok","user": userDoc.name,"email": userDoc.email,"saldo":userDoc.saldo })); 

                }else{
                    
                    console.log("Error de login");
                    res.status(401).send("El usuario o password es incorrecto");
                       
                } 
            }
    
            if(err){

                console.log("error");
                res.status(403).send('unexpected error');

            }
    
        })
    
    });

}