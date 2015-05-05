var MongoDB = require('winston-mongodb').MongoDB;
var winston = require('winston');
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
