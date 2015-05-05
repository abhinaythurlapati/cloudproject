var prompt = require('sync-prompt').prompt;
var fs = require('fs');
var circle = "Karnataka";
var path = require('path');
var database = "localhost/" + circle ;
var dburl = database;
var db = require('mongojs').connect(dburl);

var operator= "Airtel";
var collName = circle + operator + "all";
var col = db.collection(collName);

var dir1 = path.join(__dirname,circle,operator);
var file = path.join(dir1,"local.json") ;
var file1 = path.join(dir1,"localstd.json");

var json = { "types" : 2 , "localtariff" : [] , "localstdtariff" : [] }

var local = [{"count" : 0 }];
var localstd = [{"count" : 0 }];
var filename = operator + "_allplans.json";
filename = path.join(dir1,filename); 
console.log("filename = ",filename);
fs.readFile(filename , function(err,data){
			if(err){
				console.log(err);
			}
			else
			{
				docs = JSON.parse(data);
				for (var i = 0; i < docs.data.length; i++) {
					console.log(docs.data[i]);
					console.log("press 1 to skip this plan  ");
					console.log("press 2 to save to local");
					console.log("press 3 to save in to std or std + local");
					console.log("press ctrl + z to terminate");
					var key = prompt("enter your choice");
					if((key == 1) || (key == 2)|| (key == 3)){
						if(key == 1)
						{


						}
						else if(key == 2){
							console.log("The plan is chosen to be local");


							docs.data[i].intrasec = prompt("Enter the local innetwork charge (paise) paise in 1sec, enter 0 otherwise");
							docs.data[i].intra2sec = prompt("Enter the local in network charge (paise) in 2sec, enter 0 otherwise");
							docs.data[i].intrainmin = prompt("Enter the local in network charge (paise) in min, enter 0 otherwise");
							docs.data[i].intersec = prompt("Enter the local out network charge (paise) in 1sec, enter 0 otherwise");
							docs.data[i].inter2sec = prompt("Enter the local out network charge (paise) in 2sec, enter 0 otherwise");
							docs.data[i].intermin = prompt("Enter the local out network charge (paise) in min, enter 0 otherwise");
							docs.data[i].threshold = prompt("Enter the value of the threshold");
							local.push(docs.data[i]);
							local[0].count = local[0].count + 1;

						}
						else if(key == 3){
							console.log("The plan is chosen to be local + std or std");
							docs.data[i].intrasec = prompt("Enter the local innetwork charge in 1sec, enter 0 otherwise");
							docs.data[i].intra2sec = prompt("Enter the local in network charge in 2sec, enter 0 otherwise");
							docs.data[i].intrainmin = prompt("Enter the local in network charge in min, enter 0 otherwise");
							docs.data[i].intersec = prompt("Enter the local out network charge in 1sec, enter 0 otherwise");
							docs.data[i].inter2sec = prompt("Enter the local out network charge in 2sec, enter 0 otherwise");
							docs.data[i].intermin = prompt("Enter the local out network charge in min, enter 0 otherwise");
							docs.data[i].threshold = prompt("Enter the value of the threshold");	

							localstd.push(docs.data[i]);
							localstd[0].count = localstd[0].count + 1;

						}
					}
					else {
						if(i < docs.data.length - 1) {
							i=i-1;
							console.log("invalid entry");	
							continue;
						}
						
					}

				}
			}
			json.localtariff = local;
			json.localstdtariff = localstd;
			var tmp = operator + "catagorized.json";
			filename = path.join(dir1,tmp);
			fs.writeFile(filename, JSON.stringify(json), function(err) {
				if(err){
					console.log(err);
				}
				else {
					console.log(filename + " written sucessfully");
				}
			})
			
			db.close();
		});

