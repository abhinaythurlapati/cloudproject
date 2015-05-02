var querystring = require("querystring"),
fs = require("fs"),
formidable = require("formidable");
var circle = "Karnataka";
//This code uses two mongodb connections


//first connection to users database which has logs
var dburl1 = "localhost/" + "users" ;
var db1 = require('mongojs').connect(dburl1);
var path = require('path');
var coll =  "logs";
var getlogs = db1.collection(coll);

//second connection to Circle database here it is Karnataka
	
var dburl2 = "localhost/" + circle ;
var db2 = require('mongojs').connect(dburl2);
var path = require('path');


getlogs.ensureIndex([{"number" : 1 }, {unique : true}], function(err,docs){
	if(err){
		console.log(err);
	}
});

function want_plans(response,request) {
	if (request.method == 'POST') {
		console.log("Request handler 'want_plans' was called.");

		var body = '';
		request.on('data', function (data) {
			body += data;

			// Too much POST data, kill the connection!
			if (body.length > 1e6)
				request.connection.destroy();
		});
		request.on('end', function () {
			var received = JSON.parse(body);
			console.log(received);
			var coll =  circle + received.operator +  "catagorized";
			console.log(coll);
			var plans = db2.collection(coll);
			plans.find(function(err,data){
				//console.log("hello abhi");
				if(err){
					console.log(err);
				}
				else{
					received.data[0].local_intra_2sec =  received.data[0].local_intra_sec/2 ;
					received.data[0].local_inter_2sec =  received.data[0].local_inter_sec/2 ;
					
					received.data[1].std_intra_2sec   =  received.data[1].std_intra_sec/2 ;
					received.data[1].std_inter_2sec   =  received.data[1].std_inter_sec/2 ; 

					if(received.plan == 'LOCAL'){

						var datatosend = {"count" : 0, data : [] }; 

						for (var i = 1; i <= data[0].localtariff[0].count; i++) {
							//converting string type to number data type
							data[0].localtariff[0].count = Number(data[0].localtariff[0].count);
							data[0].localtariff[i].intrasec = Number(data[0].localtariff[i].intrasec);
							data[0].localtariff[i].intra2sec = Number(data[0].localtariff[i].intra2sec);
							data[0].localtariff[i].intrainmin = Number(data[0].localtariff[i].intrainmin);
							data[0].localtariff[i].intersec = Number(data[0].localtariff[i].intersec);
							data[0].localtariff[i].inter2sec = Number(data[0].localtariff[i].inter2sec);
							data[0].localtariff[i].intermin = Number(data[0].localtariff[i].intermin);
							data[0].localtariff[i].threshold = Number(data[0].localtariff[i].threshold);

							var tmp1 = data[0].localtariff[i].intrasec  * received.data[0].local_intra_sec ;  
							var tmp2 = data[0].localtariff[i].intra2sec * received.data[0].local_intra_2sec ;
							var tmp3 = data[0].localtariff[i].intrainmin * received.data[0].local_intra_minute ;
							var tmp4 = data[0].localtariff[i].intersec * received.data[0].local_inter_sec ;
							var tmp5 = data[0].localtariff[i].inter2sec * received.data[0].local_inter_2sec ;
							var tmp6 = data[0].localtariff[i].intermin * received.data[0].local_inter_minute ; 
							var estimated_cost = data[0].localtariff[i].threshold + (tmp1 + tmp2 + tmp3 + tmp4 + tmp5 + tmp6)/100;	
							
							data[0].localtariff[i].estimated_cost = estimated_cost;
							datatosend.count = datatosend.count + 1 ;
							datatosend.data.push(data[0].localtariff[i]);
							
							console.log("threshold = " + data[0].localtariff[i].threshold );
							console.log("estimated cost =" + estimated_cost ); 

						}
						response.write(JSON.stringify(datatosend));
						response.end();
					}
					else if(received.plan == 'LOCAL & STD'){
						// algorithm for recommending local & std plans
						var datatosend = {"count" : 0, data : [] }; 
						for (var i = 1; i <= data[0].localstdtariff[0].count; i++) {
							//converting string type to number data type
							data[0].localstdtariff[0].count = Number(data[0].localstdtariff[0].count);
							data[0].localstdtariff[i].intrasec = Number(data[0].localstdtariff[i].intrasec);
							data[0].localstdtariff[i].intra2sec = Number(data[0].localstdtariff[i].intra2sec);
							data[0].localstdtariff[i].intrainmin = Number(data[0].localstdtariff[i].intrainmin);
							data[0].localstdtariff[i].intersec = Number(data[0].localstdtariff[i].intersec);
							data[0].localstdtariff[i].inter2sec = Number(data[0].localstdtariff[i].inter2sec);
							data[0].localstdtariff[i].intermin = Number(data[0].localstdtariff[i].intermin);
							data[0].localstdtariff[i].threshold = Number(data[0].localstdtariff[i].threshold);
							
						
							
							var tmp1 = data[0].localstdtariff[i].intrasec  * received.data[1].std_intra_sec ;  
							var tmp2 = data[0].localstdtariff[i].intra2sec * received.data[1].std_intra_2sec ;
							var tmp3 = data[0].localstdtariff[i].intrainmin * received.data[1].std_intra_minute ;
							var tmp4 = data[0].localstdtariff[i].intersec * received.data[1].std_inter_sec ;
							var tmp5 = data[0].localstdtariff[i].inter2sec * received.data[1].std_inter_2sec ;
							var tmp6 = data[0].localstdtariff[i].intermin * received.data[1].std_inter_minute ; 

							
							var estimated_cost = data[0].localstdtariff[i].threshold + (tmp1 + tmp2 + tmp3 + tmp4 + tmp5 + tmp6)/100;	
							data[0].localstdtariff[i].estimated_cost = estimated_cost;
							datatosend.count = datatosend.count + 1 ;
							datatosend.data.push(data[0].localstdtariff[i]);
							console.log("threshold = " + data[0].localstdtariff[i].threshold );
							console.log("estimated cost =" + estimated_cost );
							
							
						}
						response.write(JSON.stringify(datatosend));
						response.end();
					}

					else{
						response.write("{'status' : 'unexptected error haha' }");
					}
				}
			})
			//code to write to fetch from database



		});
	}
}		




function register(response, request) {
	if (request.method == 'POST') {
		var body = '';
		request.on('data', function (data) {
			body += data;

			// Too much POST data, kill the connection!
			if (body.length > 1e6)
				request.connection.destroy();
		});
		request.on('end', function () {
			var post = JSON.parse(body);
			console.log("posted = ", post);

			getlogs.find({"number" : post.number}, function(err,docs){
				if(err){
					console.log(err);
				}
				else {
					console.log(docs.length);
					if(docs.length == 0)
					{
						getlogs.save(post, function(err,data){
							if(err){
								console.log(err);
							}
							else {
								console.log("successfully registered " + post.number + " please login again");
								response.write(post.number + "Registerd Successfully");
								response.end();
							}
						});

					}
					else
					{
						console.log(post.number + " already registered");
						response.write(post.number  + " already registered");
						response.end();
					}



				}
			});


		});

	}
}
exports.want_plans = want_plans;
//exports.upload = upload;
//exports.show = show;
exports.register = register;	



//algorithm for recommending local plans
/*  std_inter_minute: 0,
   std_intra_minute: 300,
   local_intra_minute: 0,
   local_inter_minute: 0 
    local_intra_sec: 0,
   local_inter_sec: 0,
   std_inter_sec: 0,
   std_intra_sec: 13862 */

/* localtariff
 * 	"intrasec" : "0",
	"intra2sec" : "0",
	"intrainmin" : "0",
	"intersec" : "0",
	"inter2sec" : "0",
	"intermin" : "0",
	"threshold" : "0"
 */

/* localstdtariff
 * "intrasec" : "0",
	"intra2sec" : "0",
	"intrainmin" : "0",
	"intersec" : "0",
	"inter2sec" : "0",
	"intermin" : "0",
	"threshold" : "0
 */
/*	console.log("tmp1" + typeof(received.data[0].local_intra_sec));
console.log("tmp3" + typeof(received.data[0].local_intra_minute));
console.log("tmp4" + typeof(received.data[0].local_inter_sec));
console.log("tmp6" + typeof(received.data[0].local_inter_minute));
console.log("tmp1" + typeof(received.data[1].std_intra_sec));
console.log("tmp3" + typeof(received.data[1].std_intra_minute));
console.log("tmp4" + typeof(received.data[1].std_inter_sec));
console.log("tmp6" + typeof(received.data[1].std_inter_minute));

console.log(data[0].localtariff);

 console.log("tmp1" + typeof(data[0].localtariff[i].intrasec));
 console.log("tmp2" + typeof(data[0].localtariff[i].intra2sec));
 console.log("tmp3" + typeof(data[0].localtariff[i].intrainmin));
 console.log("tmp4" + typeof(data[0].localtariff[i].intersec));
 console.log("tmp5" + typeof(data[0].localtariff[i].inter2sec));
 console.log("tmp6" + typeof(data[0].localtariff[i].intermin)); */ 

//curl -X POST -d '{"operator" : "Tata Docomo GSM","my_num" : "8904765965","plan" : "LOCAL", "data" : [{ "local_intra_sec" : 0 , "local_inter_sec" : 0,"local_intra_minute" : 0 , "local_inter_minute" : 0},{  "std_intra_sec" : 11973 , "std_inter_sec" : 1778 , "std_inter_minute" : 0 ,"std_intra_minute" : 260}]}' http://localhost:8888/want_plans



