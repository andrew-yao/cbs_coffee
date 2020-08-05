module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Get all farms:
    function getFarms(res, mysql, context, complete){
        var sql = "SELECT farm_id AS id, farm_name, farm_region, farm_country FROM cbs_farms"
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.farms = results
            complete();
        });
    }

    // Get one specific farm to update it:
    function getFarm(res, mysql, context, id, complete) {
        var sql = "SELECT farm_id AS id, farm_name, farm_country, farm_region FROM cbs_farms WHERE farm_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.farm = results[0];
            complete();
        });
    }


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFarm.js"];
        var mysql = req.app.get('mysql');
        var handlebars_file = 'farms'
        getFarms(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render(handlebars_file, context);
            }
        }
    });


    // Retrieves one specific farm to UPDATE:
    router.get('/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateFarm.js"];
        var mysql = req.app.get('mysql');
        getFarm(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('update-farm', context);
            }
        }
    });

    // to INSERT a customer
    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO cbs_farms (farm_name, farm_region, farm_country) VALUES (?,?,?)";
        var inserts = [req.body.farm_name, req.body.farm_region, req.body.farm_country];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/farms');
            }
        });
    });


    // To update a farm:
    router.put('/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE cbs_farms SET farm_name=?, farm_country=?, farm_region=? WHERE farm_id=?";
        var inserts = [req.body.farm_name, req.body.farm_country, req.body.farm_region, req.params.id];
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

    // DELETE
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM cbs_farms WHERE farm_id = ?";
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