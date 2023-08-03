var mySQL = require('mysql2');
var connection = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'challenge'
});

connection.connect(ERR => {
    if (ERR) throw ERR
});

module.exports = connection;