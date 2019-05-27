//import de objetos de MongoDB
var User = require("../models/users").User;
var Sell = require("../models/sells").Sell;

//modulo principal donde van todas las url de "users"
module.exports= function(app){

    app.get("/sells", function(req, res){

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

                        Sell.findOne({idComprador: Comprador,idVendedor: Vendedor, idItem: Item},function(err, sellDoc){
        
                            if(err){
                                console.log("error");
                                res.status(300).send('error');
                            }else{
                                if( sellDoc==null){
                                    console.log("no se encontro la venta");
                                    res.status(404).send('not found');
                                }
                                if(!err & userDoc!=null){
                                    console.log("devolviendo");
                                    res.status(200).send(JSON.stringify(sellDoc));
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
}