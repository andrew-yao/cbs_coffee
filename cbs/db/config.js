var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_pembertj',
  password        : '6593',
  database        : 'cs340_pembertj'
});
module.exports.pool = pool;
