var querystring = require("querystring"),
fs = require("fs"),
formidable = require("formidable");
//var circle = "Karnataka";
var database = "localhost/" + "users" ;
var dburl = database;
var db = require('mongojs').connect(dburl);

var coll =  "logs";

var getlogs = db.collection(coll);
getlogs.ensureIndex([{"number" : 1 }, {unique : true}], function(err,docs){
	if(err){
		console.log(err);
	}
});

function want_plans(response,request) {
	
	
	console.log("Request handler 'want_plans' was called.");
/*	var received = { "operator" : "Vodafone", data :[{
		"local_intra_sec" : 0,
		"local_inter_sec" : 0,
		"std_intra_sec" : 11973,
		"std_inter_sec" : 1778,
	},
	{
		"local_intra_minute" : 0,
		"local_inter_minute" : 0,
		"std_inter_minute" : 36,
		"std_intra_minute" : 260
	
	}] 	
	}  
*/	
	console.log(received.operator);
	response.writeHead(200, {"Content-Type": "application/json"});

	fs.readFile("Tariff Voucher", function(err, data) {

		//response.writeHead(200, {"Content-Type": "application/json"});
		response.write(data);
		response.end();
	});

}



