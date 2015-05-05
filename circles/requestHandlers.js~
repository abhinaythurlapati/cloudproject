var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var security = require("./encryption.js"); 
var database = require("./databaseConnection.js")
var circle = "Karnataka";

//This code uses two mongodb connections





//adding an index to the mobile number of user in logs
var getlogs = database.getlogs();
getlogs.ensureIndex([{"number" : 1 }, {unique : true}], function(err,docs){
	if(err){
		console.log(err);
	}
});

function want_plans(response,request) {
	if (request.method == 'POST') {
		var getlogs = database.getlogs();
		console.log("Request handler 'want_plans' was called.");
		var body = '';
		request.on('data', function (data) {
			body += data;
			// Too much POST data, kill the connection!
			if (body.length > 1e6)
				request.connection.destroy();

		});
		// once receiving message is finshed 
		request.on('end', function () {
			// decrypting the message received	
			
			body = security.decipher(body);
			// parsing the decrypted message
			var received = JSON.parse(body);
			console.log(received);
			getlogs.find({"number" : received.my_num}, function(err,docs){
				if(err){
					console.log(err);
				}
				else {
					if(docs.length == 0)
					{
						response.write("Register");
						response.end();

					}
					else
					{
						var coll =  circle + received.operator +  "catagorized";
						var db = database.db2(circle);
						var plans = db.collection(coll);
						plans.find(function(err,data){
							if(err){
								console.log(err);
							}
							else{
								// calculating the values for 2 seconds
								received.data[0].local_intra_2sec =  received.data[0].local_intra_sec/2 ;
								received.data[0].local_inter_2sec =  received.data[0].local_inter_sec/2 ;

								received.data[1].std_intra_2sec   =  received.data[1].std_intra_sec/2 ;
								received.data[1].std_inter_2sec   =  received.data[1].std_inter_sec/2 ; 

								if(received.plan == 'LOCAL'){

									var datatosend = {"count" : 0, data : [] }; 
									if(data[0].localtariff[0].count == 0)
									{
										response.write("No Plans");
										response.end();
									}
									else{
										for (var i = 1; i <= data[0].localtariff[0].count; i++) {
											//converting the database contents fetched in to number
											data[0].localtariff[0].count = Number(data[0].localtariff[0].count);
											data[0].localtariff[i].intrasec = Number(data[0].localtariff[i].intrasec);
											data[0].localtariff[i].intra2sec = Number(data[0].localtariff[i].intra2sec);
											data[0].localtariff[i].intrainmin = Number(data[0].localtariff[i].intrainmin);
											data[0].localtariff[i].intersec = Number(data[0].localtariff[i].intersec);
											data[0].localtariff[i].inter2sec = Number(data[0].localtariff[i].inter2sec);
											data[0].localtariff[i].intermin = Number(data[0].localtariff[i].intermin);
											data[0].localtariff[i].threshold = Number(data[0].localtariff[i].threshold);
											data[0].localtariff[i].recharge_validity = parseInt(data[0].localtariff[i].recharge_validity);


											var tmp1 = data[0].localtariff[i].intrasec  * received.data[0].local_intra_sec ;  
											var tmp2 = data[0].localtariff[i].intra2sec * received.data[0].local_intra_2sec ;
											var tmp3 = data[0].localtariff[i].intrainmin * received.data[0].local_intra_minute ;
											var tmp4 = data[0].localtariff[i].intersec * received.data[0].local_inter_sec ;
											var tmp5 = data[0].localtariff[i].inter2sec * received.data[0].local_inter_2sec ;
											var tmp6 = data[0].localtariff[i].intermin * received.data[0].local_inter_minute ; 


											var estimated_cost = Math.round((tmp1 + tmp2 + tmp3 + tmp4 + tmp5 + tmp6)/100);
											var tmp_cost;
											if(received.period != 0){
												console.log("equals non zero");
												console.log(received.period);
												tmp_cost =  Math.round(estimated_cost / received.period);
												
											}
											else if(received.period == 0){
												console.log("equals zero");
												console.log(received.period);
												tmp_cost =  Math.round(estimated_cost / 30);
											}
											estimated_cost = Math.round(data[0].localtariff[i].threshold +(tmp_cost * data[0].localtariff[i].recharge_validity )); 
											data[0].localtariff[i].estimated_cost = estimated_cost;
											datatosend.count = datatosend.count + 1 ;
											datatosend.data.push(data[0].localtariff[i]);
											console.log("threshold = " + data[0].localtariff[i].threshold );
											console.log("estimated cost =" + estimated_cost ); 

										}
									}

									datatosend = security.cipher(datatosend);
									response.write(datatosend);
									response.end();
								}
								else if(received.plan == 'LOCAL & STD'){
									// algorithm for recommending local & std plans
									var datatosend = {"count" : 0, data : [] }; 
									if(data[0].localstdtariff[0].count == 0)
									{
										response.write("sorry, No plans are available for this operator now, We will fix it soon");
										response.end();
									}
									else{
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
											data[0].localstdtariff[i].recharge_validity = parseInt(data[0].localstdtariff[i].recharge_validity);


											var tmp1 = data[0].localstdtariff[i].intrasec  * received.data[1].std_intra_sec ;  
											var tmp2 = data[0].localstdtariff[i].intra2sec * received.data[1].std_intra_2sec ;
											var tmp3 = data[0].localstdtariff[i].intrainmin * received.data[1].std_intra_minute ;
											var tmp4 = data[0].localstdtariff[i].intersec * received.data[1].std_inter_sec ;
											var tmp5 = data[0].localstdtariff[i].inter2sec * received.data[1].std_inter_2sec ;
											var tmp6 = data[0].localstdtariff[i].intermin * received.data[1].std_inter_minute ; 

											var estimated_cost = Math.round((tmp1 + tmp2 + tmp3 + tmp4 + tmp5 + tmp6)/100);
											var tmp_cost;
											if(received.period != 0){
												console.log("equals non zero");
												console.log(received.period);
												tmp_cost =  Math.round(estimated_cost / received.period);
											}
											else if(recieved.period == 0){
												console.log("equals zero");
												console.log(received.period);
												tmp_cost =  Math.round(estimated_cost / 30);
											}
											estimated_cost = Math.round(data[0].localstdtariff[i].threshold +(tmp_cost * data[0].localstdtariff[i].recharge_validity )); 
											data[0].localstdtariff[i].estimated_cost = estimated_cost;
											datatosend.count = datatosend.count + 1 ;
											datatosend.data.push(data[0].localstdtariff[i]);
											console.log("threshold = " + data[0].localstdtariff[i].threshold );
											console.log("estimated cost =" + estimated_cost );
										}
									}

									datatosend = security.cipher(datatosend);
									response.write(datatosend);
									response.end();	
								}

								else{
									response.write("{'status' : 'unexptected error haha' }");
								}
							}
						})
					}
				}
			});					
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
			
			body = security.decipher(body);

			console.log(body);


			var post = JSON.parse(body);
			console.log("posted = ", post);
			var getlogs = database.getlogs();
			getlogs.find({"number" : post.number}, function(err,docs){
				if(err){
					console.log(err);
				}
				else {
					console.log("haha");
					console.log(docs);
					if(docs.length == 0)
					{
						getlogs.save(post, function(err,data){
							if(err){
								console.log(err);
							}
							else {

								console.log("successfully registered " + post.number + " please login again");
								response.write(post.number + " Registerd Successfully");
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
//making the functions accessable
exports.want_plans = want_plans;
exports.register = register;	


//curl -X POST -d '{"operator" : "Tata Docomo GSM","my_num" : "8904765965","plan" : "LOCAL", "data" : [{ "local_intra_sec" : 0 , "local_inter_sec" : 0,"local_intra_minute" : 0 , "local_inter_minute" : 0},{  "std_intra_sec" : 11973 , "std_inter_sec" : 1778 , "std_inter_minute" : 0 ,"std_intra_minute" : 260}]}' http://localhost:8888/want_plans



