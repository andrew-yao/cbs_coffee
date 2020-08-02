module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getOrders(res, mysql, context, complete){
        sql = "SELECT order_id AS id, order_date, ship_date, customer_id, ship_firstname, ship_lastname, ship_address, ship_city, ship_zip, ship_phone, order_subtotal, order_shipcost, order_totalcost, order_quantity FROM cbs_orders"
         mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.orders = results
            complete();
        });
    }
  
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteOrder.js"];
        var mysql = req.app.get('mysql');
        var handlebars_file = 'orders'

        getOrders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render(handlebars_file, context);
            }
        }
    });

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM cbs_orders WHERE order_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400); 
                res.end(); 
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();