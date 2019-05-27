//import de objetos de MongoDB
var Account = require("../models/accounts").Account;
var User = require("../models/users").User;
var Transfer = require("../models/transfers").Transfer;

//modulo principal donde van todas las url de "users"
module.exports= function(app){

    app.get("/transfers", function(req, res){

        Emisor = req.body.sender;
        idDoc = req.body.id;

        if(Emisor!=null & idDoc!=null ){

            User.findOne({email: Emisor},function(err, userDoc){
        
                if(err){
                    console.log("error");
                    res.status(300).send('error');
                }else{
                    if( userDoc==null){
                        console.log("no se encontro al user");
                        res.status(404).send('not found');
                    }
                    if(!err & userDoc!=null){

                        Transfer.findOne({idEmisor: Emisor,id: idDoc},function(err, transferDoc){
        
                            if(err){
                                console.log("error");
                                res.status(300).send('error');
                            }else{
                                if( transferDoc==null){
                                    console.log("no se encontro la transferencia");
                                    res.status(404).send('not found');
                                }
                                if(!err & transferDoc!=null){
                                    console.log("devolviendo");
                                    res.status(200).send(JSON.stringify(transferDoc));
                                }
                            }
                        })

                    }
                }
            })
        }else{
            console.log("parametros mal seteados");
            res.status(403).send('forbbiden');
        }
    
    });

    app.post("/transfers", function(req, res){

        console.log("entre3");

        var Emisor = req.body.sender;
        var Destinatario = req.body.reciever;
        var Monto = req.body.amount;
        var saldo = 0;

        if(isNaN(req.body.amount) == true){
            Monto = null;
        }else{
            Monto = Number(req.body.amount);
        }


        if(Emisor!=null & Destinatario!=null & Monto!=null){

            User.findOne({email: Emisor}, function(err, EmisorDoc){
                if( EmisorDoc==null){
                    console.log("no existe el emisor");
                    res.status(403).send('forbidden');
                }else{

                    saldo = EmisorDoc.saldo;

                    if(saldo >= Monto){

                        User.findOne({email: Destinatario}, function(err, DestinatarioDoc){
                            if( DestinatarioDoc==null){
                                console.log("no existe el destinatario");
                                res.status(403).send('forbidden');
                            }else{
                                EmisorDoc.saldo =   EmisorDoc.saldo - Monto;            
                                DestinatarioDoc.saldo =   DestinatarioDoc.saldo + Monto;  

                                var idDoc = "x";
                                var fecha ="algun dia";
                                var estado ="completado";
                                var transfer = new Transfer({idEmisor: Emisor, 
                                    idDestinatario: Destinatario, amount: Monto, 
                                    date: fecha, state : estado, id: idDoc});

                                    EmisorDoc.save().then(function(us){
                                        console.log("emisor guardado");
                                    },function(err){
                                        if(err){
                                            console.log("error en compra");
                                            res.status(403).send(String(err)); 
                                        }
                                    });

                                    DestinatarioDoc.save().then(function(us){
                                        console.log("destinatario guardado");
                                    },function(err){
                                        if(err){
                                            console.log("error en compra");
                                            res.status(403).send(String(err)); 
                                        }
                                    });

                                    transfer.save().then(function(us){
                                        console.log("transferencia guardada");
                                        res.status(200).send(String("OK")); 
                                    },function(err){
                                        if(err){
                                            console.log("error en transferencia");
                                            res.status(403).send(String(err)); 
                                        }
                                    });
                            }
                        });
                    }else{
                        console.log("saldo insuficiente");
                        res.status(403).send('forbidden');
                    }            
                
                }
            });
        }else{
            console.log("parametros mal seteados");
            res.status(403).send('forbidden');
        }
         
    });
}