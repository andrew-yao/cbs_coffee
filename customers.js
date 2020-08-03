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

    // Get one customer:
    function getCustomer(res, mysql, context, id, complete){
        var sql = `SELECT customer_id AS id, customer_firstname AS fname, customer_lastname AS lname, 
                    customer_address AS address, customer_city AS city, customer_zip AS zip, customer_phone AS phone 
                    FROM cbs_customers
                    WHERE customer_id = ?`;
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customer = results[0];
            console.log(context.customer);
            complete();
        });
    }

    // Search: 
    function getCustomersFirstName(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
        var query = `SELECT customer_id, customer_firstname, customer_lastname, customer_address, 
                    customer_city, customer_zip, customer_phone FROM cbs_customers
                    WHERE customer_firstname = ${mysql.pool.escape(req.params.s)}`;
  
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
        context.jsscripts = ["deleteCustomer.js", "searchCustomers.js", "updateCustomer.js"];
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
        context.jsscripts = ["deleteCustomer.js","searchCustomers.js", "updateCustomer.js"];
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


    // Add Customer:
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var query = `INSERT INTO cbs_customers 
                    (customer_firstname, customer_lastname, customer_address, customer_city, customer_zip, customer_phone)
                    VALUES (?, ?, ?, ?, ?, ?)`;
        var inserts = [req.body.fname, req.body.lname, req.body.address, req.body.city, req.body.zip, req.body.phone];
        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/customers');
            }
        });
    });


    // Update Customer (requires its own page/view):
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateCustomer.js"];
        
        var mysql = req.app.get('mysql');
        getCustomer(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-customer', context);
            }
        }
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var query = `UPDATE cbs_customers 
                    SET customer_firstname=?, customer_lastname=?, 
                    customer_address=?, customer_city=?, customer_zip=?, customer_phone=? 
                    WHERE customer_id=?`;
        var inserts = [req.body.fname, req.body.lname, req.body.address, req.body.city, req.body.zip, req.body.phone,  req.params.id];
        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });


    return router;
}();