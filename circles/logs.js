var MongoDB = require('winston-mongodb').MongoDB;
	
var logger = new(winston.Logger)({
    transports : [
        new(winston.transports.MongoDB)({
            db : 'logs',
            host : 'localhost',
           // username : 'username',
           // password : 'password'
        })
    ]
});
