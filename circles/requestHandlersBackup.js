	var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable");
	var circle = "Karnataka";
	var database = "localhost/" + "users" ;
	var dburl = database;
	var db = require('mongojs').connect(dburl);
	var path = require('path');
	var coll =  "logs";
	
	var getlogs = db.collection(coll);
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
				//console.log("posted = ", received.data[0].std_intra_sec);
				var tmp = {"operator" : "Vodafone", "data" : [{ "local_intra_sec" : 0 , "local_inter_sec" : 0, "std_intra_sec" : 11973 , "std_inter_sec" : 1778},
				                                              { "local_intra_2sec" : 0 , "local_inter_2sec" : 0 , "std_inter_2sec" : 5986, "std_intra_2sec" : 889 },
				                                              { "local_intra_minute" : 0 , "local_inter_minute" : 0 , "std_inter_minute" : 36 , "std_intra_minute" : 260},
				                                              ]}
	
	
				var filename1 = path.join(__dirname,circle,tmp.operator,"local.json" );
				var filename2 = path.join(__dirname,circle,tmp.operator,"localstd.json" );
				fs.readFile(filename1, function(err, data1) {	
					if(err)
					{
						console.log(err);
					}
					else
					{
	
						fs.readFile(filename2, function(err,data2){
							if(err){
								console.log(err);
							}
							else
							{
								data1 = JSON.parse(data1);
								data2 = JSON.parse(data2);
								//console.log(data1);
								//console.log(data2);
	
	
								for (var i = 1; i <= data1[0].count; i++) {
	
													received.data[0].local_intra_2sec =  received.data[0].local_intra_sec/2 ;
													received.data[0].local_inter_2sec =  received.data[0].local_inter_sec/2 ;
													received.data[0].std_intra_2sec   =  received.data[0].std_intra_2sec/2 ;
													received.data[0].std_inter_2sec   =  received.data[0].std_inter_2sec/2 ; 
	
										// data1[i].localinsec = Number(data1[i].localinsec);
										// data1[i].localin2sec = Number(data1[i].localin2sec);
										// data1[i].localinmin = Number(data1[i].localinmin);
										// data1[i].localoutsec = Number(data1[i].localoutsec);
										// data1[i].localout2sec = Number(data1[i].localout2sec);
										// data1[i].localoutmin = Number(data1[i].localoutmin);
										// data1[i].threshold = Number(data1[i].threshold);
										 //console.log("type of  " + typeof(data1[i].localinsec));
										
										 									 
										var tmp1 = data1[i].localinsec  * received.data[0].local_intra_sec ;  
									//	var tmp2 = data1[i].localin2sec * received.data[0].local_intra_2sec ;
										var tmp3 = data1[i].localinmin  * received.data[0].local_intra_minute ;
										var tmp4 = data1[i].localoutsec * received.data[0].local_inter_sec ;
									//	var tmp5 = data1[i].localout2sec * received.data.local_inter_2sec ;
										var tmp6 = data1[i].localoutmin * received.data[0].local_inter_minute ; 
										var estimated_cost = data1[i].threshold + tmp1 + tmp3 + tmp4 + tmp6;	
										console.log("estimated cost =" , estimated_cost ); 
										
										// console.log("tmp1" + typeof(received.data[0].local_intra_sec));
										// console.log("tmp3" + typeof(received.data[0].local_intra_minute));
										// console.log("tmp4" + typeof(received.data[0].local_inter_sec));
										// console.log("tmp6" + typeof(received.data[0].local_inter_minute));
								}
								
							}
						});
					}
	
				});
			});
		}
	}
	
	function upload(response, request) {
		console.log("Request handler 'upload' was called.");
		var form = new formidable.IncomingForm();
		console.log("about to parse");
		form.parse(request, function(error, fields, files) {
			console.log("parsing done");
			/* Possible error on Windows systems:
			tried to rename to an already existing file */
			fs.rename(files.upload.path, "/tmp/test.png", function(error) {
				if (error) {
					fs.unlink("/tmp/test.png");
					fs.rename(files.upload.path, "/tmp/test.png");
				}
			});
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("received image:<br/>");
			response.write("<img src='/show' />");
			response.end();
		});
	}
	function show(response) {
		console.log("Request handler 'show' was called.");
		fs.readFile("/tmp/test.png", "binary", function(error, file) {
			if(error) {
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(error + "\n");
				response.end();
			} else {
				response.writeHead(200, {"Content-Type": "image/png"});
				response.write(file, "binary");
				response.end();
			}
		});
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
	exports.upload = upload;
	exports.show = show;
	exports.register = register;		
	
	 

