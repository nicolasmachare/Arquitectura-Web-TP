//import de objetos de MongoDB
var Account = require("../models/accounts").Account;
var User = require("../models/users").User;

//modulo principal donde van todas las url de "accounts"
module.exports= function(app){

    app.get("/accounts", function(req, res){

        Account.findOne({email: req.body.email, id: req.body.id},function(err, accountDoc){
    
            if(err){
                console.log("error");
                res.status(300).send('error');
            }else{
                if( accountDoc==null){
                    console.log("no encontrado");
                    res.status(404).send('not found');
                }
                if(!err & accountDoc!=null){
                    console.log("devolviendo");
                    res.status(200).send(JSON.stringify(accountDoc));
                }
            }
        })
    
    });

    app.post("/accounts", function(req, res){

        console.log("entre3");
        var emailReq = req.body.email;
        var passReq = req.body.password;
        var aliasReq = req.body.alias;
        var saldoReq = req.body.saldo;
        var idReq = req.body.id;
    
        User.findOne({email: emailReq, password: passReq}, function(err, userDoc){
    
            if(!err){
                if( userDoc!=null){
                    
                    Account.findOne({email: emailReq, id: idReq}, function(err, accountDoc){
    
                        if(!err){
                            if( accountDoc!=null){
                                console.log("repeat");
                                res.status(401).send('unauthorized');
                            }else{
                                var account = new Account({email: emailReq, id: idReq, saldo: saldoReq, alias: aliasReq});
                
                                account.save().then(function(us){
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
    
                }else{
                    res.status(404).send('not found');
                } 
            }
    
            if(err){
                console.log("error diferente");
                res.status(405).send('unexpected error');
            }
    
        })
    
    });

    app.put("/accounts", function(req, res){

        Account.findOne({email: req.body.email, id: req.body.id}, function(err, accountDoc){
    
            if(!err){
                if( accountDoc==null){
                    console.log("not found");
                    res.status(404).send('not found');
                }else{
                    var aliasReq = req.body.alias;
                    var saldoReq = req.body.saldo;
    
                    if(aliasReq!=null){
                        
                        accountDoc.alias = aliasReq;
    
                        accountDoc.save().then(function(us){
                            console.log("entre bien");
                            res.status(200).send('OK'); 
                        },function(err){
                            if(err){
                                console.log("entre por error");
                                res.status(403).send(String(err)); 
                            }
                        });
                    }
    
                    if(saldoReq!=null){
                        
                        accountDoc.saldo = saldoReq;
    
                        accountDoc.save().then(function(us){
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


    app.delete("/accounts", function(req, res){

        Account.findOne({email: req.body.email, id: req.body.id}, function(err, accountDoc){
    
            if(!err){
                if( accountDoc==null){
                    console.log("not found");
                    res.status(404).send('not found');
                }else{
    
                    if(accountDoc.saldo == 0){
                        accountDoc.remove(function(err){
                
                            if(!err){
                                console.log("eliminando");
                                res.status(200).send('ok');
                            }else{
                                console.log("error diferente");
                                res.status(405).send('unexpected error');
                            }
        
                        });
                    }else{
                        res.status(403).send('forbbiden');    
                    }
                    
                } 
            }
    
            if(err){
                console.log("error diferente");
                res.status(405).send('unexpected error');
            }
    
        })
    
    });


}