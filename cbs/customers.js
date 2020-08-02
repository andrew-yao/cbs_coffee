module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    // Get all customers
    function getCustomers(res, mysql, context, complete){
        var sql = "SELECT customer_id AS id, customer_firstname, customer_lastname, customer_address, customer_city, customer_zip, customer_phone FROM cbs_customers"
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.customers = results
            complete();
        });
    }

    // search: 
    function getCustomersFirstName(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
        var query = `SELECT customer_id, customer_firstname, customer_lastname, customer_address, 
                    customer_city, customer_zip, customer_phone FROM cbs_customers
                    WHERE customer_firstname = ${mysql.pool.escape(req.params.s)}`;
        console.log(query);
  
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log(results);
            context.searchresults = results;
            complete();
        });
    }


    // Get all
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteCustomer.js", "searchCustomers.js"];
        var mysql = req.app.get('mysql');

        getCustomers(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customers', context);
            }
        }
    });


    // Search
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteCustomer.js","searchCustomers.js"];
        var mysql = req.app.get('mysql');
        getCustomersFirstName(req, res, mysql, context, complete);
        
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customers', context);
            }
        }
    });

    // Delete Customer:
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM cbs_customers WHERE customer_id = ?";
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