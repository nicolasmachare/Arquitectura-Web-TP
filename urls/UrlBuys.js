//import de objetos de MongoDB
var Account = require("../models/accounts").Account;
var User = require("../models/users").User;
var Item = require("../models/items").Item;
var Buy = require("../models/buys").Buy;
var Sell = require("../models/sells").Sell;

//modulo principal donde van todas las url de "users"
module.exports= function(app){

    app.get("/buys", function(req, res){

        Comprador = req.body.buyer;
        Vendedor = req.body.seller;
        Item = req.body.item;

        if(Comprador!=null & Vendedor!=null & Item!=null){

            User.findOne({email: Comprador},function(err, userDoc){
        
                if(err){
                    console.log("error");
                    res.status(300).send('error');
                }else{
                    if( userDoc==null){
                        console.log("no se encontro al user");
                        res.status(404).send('not found');
                    }
                    if(!err & userDoc!=null){

                        Buy.findOne({idComprador: Comprador,idVendedor: Vendedor, idItem: Item},function(err, buyDoc){
        
                            if(err){
                                console.log("error");
                                res.status(300).send('error');
                            }else{
                                if( buyDoc==null){
                                    console.log("no se encontro la compra");
                                    res.status(404).send('not found');
                                }
                                if(!err & userDoc!=null){
                                    console.log("devolviendo");
                                    res.status(200).send(JSON.stringify(buyDoc));
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

    app.post("/buys", function(req, res){

        console.log("entre3");

        var compradorDoc = req.body.buyer;
        var vendedorDoc = req.body.seller;
        var itemDoc = req.body.item;
        var precioDoc = 0;
        var saldoDoc = 0;
        var cuentaDoc = "";
        var controlLocal = true;


        if(compradorDoc!=null & vendedorDoc!=null & itemDoc!=null){

            User.findOne({email: vendedorDoc}, function(err, sellerDoc){
                if( sellerDoc==null){
                    console.log("no existe el vendedor");
                    res.status(403).send('forbidden');
                }else{
                    console.log("vendedor");
                    Account.findOne({email: vendedorDoc, cobro: true}, function(err,accountDoc){
                        if( accountDoc==null){
                            console.log("no existe la cuenta");
                            res.status(403).send('forbidden');
                            controlLocal = false;
                        }else{
                            cuentaDoc = accountDoc.id;
                        
                            console.log("item");
                            console.log(vendedorDoc);
                            console.log(itemDoc);
                            Item.findOne({email: vendedorDoc, id: itemDoc}, function(err, itemSale){
                                if( itemSale==null){
                                    console.log("no existe el item");
                                    res.status(403).send('forbidden');
                                    controlLocal = false;
                                }else{
                    
                                    precioDoc = itemSale.price;
                                    console.log("comprador");
                                    User.findOne({email: compradorDoc}, function(err, buyerDoc){
                                        if( buyerDoc==null){
                                            console.log("no existe el comprador");
                                            res.status(403).send('forbidden');
                                            controlLocal = false;
                                        }else{
                                            saldoDoc = buyerDoc.saldo;

                                            var fecha ="algun dia";
                                            var estado ="completado";

                                            if(saldoDoc >= precioDoc){
                                                var buy = new Buy({idComprador: compradorDoc , idCuenta: cuentaDoc, 
                                                    idVendedor: vendedorDoc, price: precioDoc, 
                                                    date: fecha, state : estado, idItem: itemSale.id});

                                                var sell = new Sell({idComprador: compradorDoc, 
                                                        idVendedor: vendedorDoc, price: precioDoc, 
                                                        date: fecha, state : estado, idItem: itemSale.id});

                                                itemSale.state = "vendido";
                                                buyerDoc.saldo = buyerDoc.saldo - precioDoc;
                                                cuentaDoc.saldo = cuentaDoc.saldo + precioDoc;
                                                sellerDoc.saldo = buyerDoc.saldo + precioDoc;

                                                itemSale.save().then(function(us){
                                                    console.log("item guardado");
                                                },function(err){
                                                    if(err){
                                                        console.log("error guardado item");
                                                        res.status(403).send(String(err)); 
                                                    }
                                                });

                                                buyerDoc.save().then(function(us){
                                                    console.log("comprador guardado");
                                                },function(err){
                                                    if(err){
                                                        console.log("error guardado comprador");
                                                        res.status(403).send(String(err)); 
                                                    }
                                                });

                                                sell.save().then(function(us){
                                                    console.log("venta guardada");
                                                },function(err){
                                                    if(err){
                                                        console.log("error en venta");
                                                        res.status(403).send(String(err)); 
                                                    }
                                                });

                                                accountDoc.save().then(function(us){
                                                    console.log("cuenta guardada");
                                                },function(err){
                                                    if(err){
                                                        console.log("error en cuenta");
                                                        res.status(403).send(String(err)); 
                                                    }
                                                });

                                                sellerDoc.save().then(function(us){
                                                    console.log("vendedor guardada");
                                                },function(err){
                                                    if(err){
                                                        console.log("error en vendedor");
                                                        res.status(403).send(String(err)); 
                                                    }
                                                });

                                                buy.save().then(function(us){
                                                    console.log("compra guardada");
                                                    res.status(200).send(String("OK")); 
                                                },function(err){
                                                    if(err){
                                                        console.log("error en compra");
                                                        res.status(403).send(String(err)); 
                                                    }
                                                });
                                            }else{
                                                console.log("el comprador no posee saldo suficiente");
                                                res.status(403).send('forbidden');
                                            }
                                        }
                                    });                            
                                }
                            });
                        }
                    });
                
                }
            });
        }else{
            console.log("parametros mal seteados");
            res.status(403).send('forbidden');
        }
         
    });
}