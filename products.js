module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // gather all information to show on the table
    function getProducts(res, mysql, context, complete){
        sql = "SELECT product_id AS id, product_name, product_description, product_roast, product_weight, product_price, product_stock FROM cbs_products"
         mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.products = results
            complete();
        });
    }
  
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteProduct.js"];
        var mysql = req.app.get('mysql');
        var handlebars_file = 'products'
        getProducts(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render(handlebars_file, context);
            }
        }
    });

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM cbs_products WHERE product_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
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