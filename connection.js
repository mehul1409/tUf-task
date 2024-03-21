const mysql = require('mysql');

var con = mysql.createConnection({
    host: "blv5lx0rjnhcru1pyist-mysql.services.clever-cloud.com",
    user: "ucpwpm8ucuvyhuao",
    password: "01R6IVcXp8cxHPM7gpxy",
    database: "blv5lx0rjnhcru1pyist"
});

module.exports = con;