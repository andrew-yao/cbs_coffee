const express = require('express');
const mysql = require('./db/config.js');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({
        defaultLayout:'main'
    });

const jQuery = require('jquery');

const app = express();

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);


// Home/Index page:
app.get('/', function(req,res){
    res.render('home');
});
app.get('/index', function(req,res){
    res.render('home');
});

// app.use('/', express.static('public'));
app.use('/products', require('./products.js'));
app.use('/farms', require('./farms.js'));
app.use('/customers', require('./customers.js'));
app.use('/orders', require('./orders.js'));




// Errors:
app.use(function(req,res){
    res.status(404);
    res.render('404');
});
  
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
  
app.listen(app.get('port'), function(){
    console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.');
});
  