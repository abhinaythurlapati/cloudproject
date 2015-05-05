var prompt = require('sync-prompt').prompt;
var fs = require('fs');
var circle = "Karnataka";
var path = require('path');
var database = "localhost/" + circle ;
var dburl = database;
var db = require('mongojs').connect(dburl);

var operator= "Aircel";
var collName = circle + operator + "all";
var col = db.collection(collName);

var dir1 = path.join(__dirname,circle,operator);
var file = path.join(dir1,"local.json") ;
var file1 = path.join(dir1,"localstd.json");
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


							docs.data[i].localinsec = prompt("Enter the local innetwork charge in 1sec, enter 0 otherwise ex: 1.2/0/free");
							docs.data[i].localin2sec = prompt("Enter the local in network in 2sec, enter 0 otherwise ex: 1/0/free ");
							docs.data[i].localinmin = prompt("Enter the local in network in min, enter 0 otherwise ex: 1/0/free");
							docs.data[i].localoutsec = prompt("Enter the local out network charge in 1sec, enter 0 otherwise ex: 1/0/free");
							docs.data[i].localoutsec = prompt("Enter the local out network in 2sec, enter 0 otherwise ex: 1/0/free");
							docs.data[i].localoutmin = prompt("Enter the local out network in min, enter 0 otherwise ex: 1/0/free");
							docs.data[i].threshold = prompt("Enter the value of the threshold");
							local.push(docs.data[i]);
							local[0].count = local[0].count + 1;

						}
						else if(key == 3){
							console.log("The plan is chosen to be local + std or std");
							docs.data[i].localstdinsec = prompt("Enter the local innetwork charge in 1sec, enter 0 otherwise ex: 1/0/free");
							docs.data[i].localstdin2sec = prompt("Enter the local in network in 2sec, enter 0 otherwise ex: 1/0/free");
							docs.data[i].localstdinmin = prompt("Enter the local in network in min, enter 0 otherwise ex: 1/0/free");
							docs.data[i].localstdoutsec = prompt("Enter the local out network charge in 1sec, enter 0 otherwise ex: 1/0/free");
							docs.data[i].localstdoutsec = prompt("Enter the local out network in 2sec, enter 0 otherwise ex: 1/0/free");
							docs.data[i].localstdoutmin = prompt("Enter the local out network in min, enter 0 otherwise ex: 1/0/free");
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

			fs.writeFileSync(file, 	JSON.stringify(local));
			fs.writeFileSync(file1, JSON.stringify(localstd));
			db.close();
		});

