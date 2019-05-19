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



}