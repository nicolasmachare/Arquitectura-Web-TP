//import de objetos de MongoDB
var Item = require("../models/items").Item;
var User = require("../models/users").User;

//modulo principal donde van todas las url de "items"
module.exports= function(app){

    app.get("/items", function(req, res){

        Item.findOne({email: req.body.email, id: req.body.id},function(err, itemDoc){
    
            if(err){
                console.log("error");
                res.status(300).send('error');
            }else{
                if( itemDoc==null){
                    console.log("no encontrado");
                    res.status(404).send('not found');
                }
                if(!err & itemDoc!=null){
                    console.log("devolviendo");
                    res.status(200).send(JSON.stringify(itemDoc));
                }
            }
        })
    
    });

    app.post("/items", function(req, res){

        console.log("entre3");
        var emailReq = req.body.email;
        var passReq = req.body.password;
        var aliasReq = req.body.alias;
        var priceReq = req.body.price;
        var idReq = req.body.id;
        var stateReq = req.body.state;
    
        User.findOne({email: emailReq, password: passReq}, function(err, userDoc){
    
            if(!err){
                if( userDoc!=null){
                    
                    Item.findOne({email: emailReq, id: idReq}, function(err, itemDoc){
    
                        if(!err){
                            if( itemDoc!=null){
                                console.log("repeat");
                                res.status(401).send('unauthorized');
                            }else{
                                var item = new Item({email: emailReq, id: idReq, 
                                    price: priceReq, alias: aliasReq, state: stateReq});
                
                                item.save().then(function(us){
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

    app.put("/items", function(req, res){

        Item.findOne({email: req.body.email, id: req.body.id}, function(err, itemDoc){
    
            if(!err){
                if( itemDoc==null){
                    console.log("not found");
                    res.status(404).send('not found');
                }else{
                    var aliasReq = req.body.alias;
                    var priceReq = req.body.price;
                    var stateReq = req.body.state;
    
                    if(aliasReq!=null){
                        
                        itemDoc.alias = aliasReq;
    
                        itemDoc.save().then(function(us){
                            console.log("entre bien");
                            res.status(200).send('OK'); 
                        },function(err){
                            if(err){
                                console.log("entre por error");
                                res.status(403).send(String(err)); 
                            }
                        });
                    }
    
                    if(priceReq!=null){
                        
                        itemDoc.price = priceReq;
    
                        itemDoc.save().then(function(us){
                            console.log("entre bien");
                            res.status(200).send('OK'); 
                        },function(err){
                            if(err){
                                console.log("entre por error");
                                res.status(403).send(String(err)); 
                            }
                        });
                    }

                    if(stateReq!=null){
                        
                        itemDoc.state = stateReq;
    
                        itemDoc.save().then(function(us){
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


    app.delete("/items", function(req, res){

        Item.findOne({email: req.body.email, id: req.body.id}, function(err, itemDoc){
    
            if(!err){
                if( itemDoc==null){
                    console.log("not found");
                    res.status(404).send('not found');
                }else{
    
                    if(itemDoc.state != "vendido"){
                        itemDoc.remove(function(err){
                
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