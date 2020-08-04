module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // show all existing products
    function getProducts(res, mysql, context, complete) {
        sql = "SELECT product_id AS id, product_name, product_description, product_roast, product_weight, product_price, product_stock FROM cbs_products"
        mysql.pool.query(sql, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end()
            }
            context.products = results
            complete();
        });
    }

    // gets one specific product to update it
    function getProduct(res, mysql, context, id, complete) {
        var sql = "SELECT product_id AS id, product_name, product_description, product_roast, product_weight, product_price, product_stock FROM cbs_products WHERE product_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.product = results[0];
            complete();
        });
    }

    // display all the products
    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteProduct.js"];
        var mysql = req.app.get('mysql');
        var handlebars_file = 'products'
        getProducts(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render(handlebars_file, context);
            }
        }
    });

    // retrieves one specific product to UPDATE
    router.get('/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateProduct.js"];
        var mysql = req.app.get('mysql');
        getProduct(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('update-product', context);
            }

        }
    });

    // to INSERT a product
    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO cbs_products (product_name, product_description, product_roast, product_weight, product_price, product_stock) VALUES (?,?,?,?,?,?)";
        var inserts = [req.body.product_name, req.body.product_description, req.body.product_roast, req.body.product_weight, req.body.product_price, req.body.product_stock];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/products');
            }
        });
    });

        router.put('/:id', function (req, res) {
            var mysql = req.app.get('mysql');
            console.log(req.body)
            console.log(req.params.id)
            var sql = "UPDATE cbs_products SET product_name=?, product_description=?, product_roast=?, product_weight=?, product_price=?, product_stock=? WHERE product_id=?";
            var inserts = [req.body.product_name, req.body.product_description, req.body.product_roast, req.body.product_weight, req.body.product_price, req.body.product_stock, req.params.id];
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

        // to DELETE a product
        router.delete('/:id', function (req, res) {
            var mysql = req.app.get('mysql');
            var sql = "DELETE FROM cbs_products WHERE product_id = ?";
            var inserts = [req.params.id];
            sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
                if (error) {
                    console.log(error)
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