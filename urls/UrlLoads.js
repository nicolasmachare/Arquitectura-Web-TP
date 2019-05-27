//import de objetos de MongoDB
var Account = require("../models/accounts").Account;
var User = require("../models/users").User;
var Load = require("../models/loads").Load;

//modulo principal donde van todas las url de "users"
module.exports= function(app){

    app.get("/loads", function(req, res){

        User.findOne({email: req.body.email,password: req.body.password},function(err, userDoc){
    
            if(err){
                console.log("error");
                res.status(300).send('error');
            }else{
                if( userDoc==null){
                    console.log("no se encontro un user");
                    res.status(404).send('not found');
                }
                if(!err & loadDoc!=null){

                    Load.findOne({email: req.body.email, id:req.body.id},function(err, loadDoc){
    
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
                                res.status(200).send(JSON.stringify(loadDoc));
                            }
                        }
                    })

                }
            }
        })
    
    });

    app.post("/loads", function(req, res){

        console.log("entre3");

        var emailDoc = req.body.email;
        var monto = req.body.amount;
        var aliasDoc = req.body.alias;
        var cuentaDoc = "";
        var controlCuenta = false;
        var controlUser = false;
        var controlLocal = true;
        var userDoc;

        if(isNaN(req.body.amount) == true){
            monto = null;
        }else{
            monto = Number(req.body.amount);
        }

        if(emailDoc!=null & monto!=null & aliasDoc!=null){

            User.findOne({email: emailDoc}, function(err, userDoc){
                if( userDoc==null){
                    console.log("no existe el user");
                    res.status(403).send('forbidden');
                    controlLocal = false;
                }else{
            
                    console.log(controlLocal);

                    Account.findOne({email: emailDoc, alias: aliasDoc}, function(err, accountDoc){

                        if(!err){
                            if( accountDoc==null){
                                console.log("no existe la cuenta");
                                res.status(403).send('forbidden');
                                controlLocal = false;
                            }else{

                                userDoc.saldo =   (userDoc.saldo +  monto);
    
                                userDoc.save().then(function(us){
                                    console.log("carga acreditada al user");
                                    controlUser = true;
                                },function(err){
                                    if(err){
                                        console.log("entre por error de acreditacion al user");
                                        res.status(403).send(String(err)); 
                                    }
                                });
            
                                cuentaDoc = accountDoc.id;
                                accountDoc.saldo = (accountDoc.saldo + monto);
            
                                accountDoc.save().then(function(us){
                                    console.log("carga acreditada a la cuenta");
                                    controlCuenta = true;
            
                                },function(err){
                                    if(err){
                                        console.log("entre por error de acreditacion a la cuenta");
                                        res.status(403).send(String(err)); 
                                    }
                                });
            
                            } 
                        }
                
                        if(err){
                            console.log("error diferente");
                            res.status(405).send('unexpected error');
                        };
            
                    })
                    .then(function(){
                        if(controlLocal == true){
                            var fecha ="algun dia";
                            var estado ="";
                            var idDoc = "x";
                
                            monto = Number(monto);
                            console.log(monto);
                
                            if(controlCuenta == true & controlUser == true){
                                estado = "Acreditado";
                            }else{
                                estado = "falta acreditacion"
                            }
                
                            console.log(cuentaDoc);
                
                            var load = new Load({id: idDoc , email: emailDoc, account: cuentaDoc, amount: monto, 
                                                date: fecha, state : estado, controlAccount : controlCuenta, 
                                                controlUser: controlUser});
                
                                                    
                            load.save().then(function(us){
                                console.log("entre bien");
                                res.status(200).send('OK'); 
                            },function(err){
                                if(err){
                                    console.log("entre por error en guardado de load");
                                    res.status(403).send(String(err)); 
                                }
                            });  
                        }  
                    },function(){
                        console.log("error");
                    })

                }
            
            });

        }else{
            console.log("parametros mal enviados");
            res.status(403).send('forbidden'); 
        };
    
    });

}