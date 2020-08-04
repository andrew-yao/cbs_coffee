module.exports = function () {
    var express = require('express');
    var router = express.Router();

    function getCustomers(res, mysql, context, complete) {
        sql = "SELECT customer_id AS id, customer_firstname, customer_lastname, customer_address, customer_city, customer_zip, customer_phone FROM cbs_customers"
        mysql.pool.query(sql, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end()
            }
            context.customers = results
            complete();
        });
    }

    // gets one specific customer to update it
    function getCustomer(res, mysql, context, id, complete) {
        var sql = "SELECT customer_id AS id, customer_firstname, customer_lastname, customer_address, customer_city, customer_zip, customer_phone FROM cbs_customers WHERE customer_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customer = results[0];
            complete();
        });
    }

    // displays all the customers
    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteCustomer.js"];
        var mysql = req.app.get('mysql');
        var handlebars_file = 'customers'

        getCustomers(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render(handlebars_file, context);
            }
        }
    });

        // retrieves one specific customer to UPDATE
        router.get('/:id', function (req, res) {
            callbackCount = 0;
            var context = {};
            context.jsscripts = ["updateCustomer.js"];
            var mysql = req.app.get('mysql');
            getCustomer(res, mysql, context, req.params.id, complete);
            function complete() {
                callbackCount++;
                if (callbackCount >= 1) {
                    res.render('update-customer', context);
                }
    
            }
        });

    // to INSERT a customer
    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO cbs_customers (customer_firstname, customer_lastname, customer_address, customer_city, customer_zip, customer_phone) VALUES (?,?,?,?,?,?)";
        var inserts = [req.body.customer_firstname, req.body.customer_lastname, req.body.customer_address, req.body.customer_city, req.body.customer_zip, req.body.customer_phone];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/customers');
            }
        });
    });

    router.put('/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        console.log("I'm in PUT");      // DELETE THIS
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE cbs_customers SET customer_firstname=?, customer_lastname=?, customer_address=?, customer_city=?, customer_zip=?, customer_phone=? WHERE customer_id=?";
        var inserts = [req.body.customer_firstname, req.body.customer_lastname, req.body.customer_address, req.body.customer_city, req.body.customer_zip, req.body.customer_phone, req.params.id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.status(200);
                res.end();
            }
        });
    });

    router.delete('/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM cbs_customers WHERE customer_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                res.status(202).end();
            }
        })
    });

    return router;
}();