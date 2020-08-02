module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getFarms(res, mysql, context, complete){
        sql = "SELECT farm_id AS id, farm_name, farm_region, farm_country FROM cbs_farms"
         mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.farms = results
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