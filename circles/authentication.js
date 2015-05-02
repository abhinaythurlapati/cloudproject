var database = "localhost/" + "users" ;
var dburl = database;
var db = require('mongojs').connect(dburl);
var collName = "log";
var col = db.collection(collName);

		





function want_plans(response,request) {

	console.log("Request handler 'want_plans' was called.");

	response.writeHead(200, {"Content-Type": "application/json"});

	fs.readFile("Tariff Voucher", function(err, data) {

		//response.writeHead(200, {"Content-Type": "application/json"});
		response.write(data);
		response.end();

