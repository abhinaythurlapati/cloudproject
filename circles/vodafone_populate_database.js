var prompt = require('sync-prompt').prompt;
var fs = require('fs');
var circle = "Karnataka";
var path = require('path');
var database = "localhost/" + circle ;
var dburl = database;
var db = require('mongojs').connect(dburl);

var operator= "Vodafone";
var collName = circle + operator + "all";
var col = db.collection(collName);

var dir1 = path.join(__dirname,circle,operator);
var file = path.join(dir1,"local.json") ;
var file1 = path.join(dir1,"localstd.json");
var local = [{"count" : 0 }];
var localstd = [{"count" : 0 }];
col.aggregate(
		[
		 { "$unwind": "$data" }, 
		 { "$match": { $and : [{ "data.recharge_master": "Bonus card" },{"data.recharge_short_description" : "Tariff Voucher" }]}}, 
		 {
			 "$group": {
				 "_id": {
					 "status_code": "$status_code",
					 "status_text": "$status_text"
				 }, 
				 "data": { "$push": "$data" }
			 }
		 }, 
		 {
			 "$project": {

				 "data": 1, 
				 "_id": 0,
				 "status_code": "$_id.status_code", 
				 "status_text": "$_id.status_text"
			 }
		 }
		 ], function(err,docs){
			if(err){
				console.log(err);
			}
			else
			{
				for (var i = 0; i < docs[0].data.length; i++) {
					console.log(docs[0].data[i]);
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


							docs[0].data[i].localinsec = prompt("Enter the local innetwork charge in 1sec, enter 0 otherwise ex: 1.2/0/free");
							docs[0].data[i].localin2sec = prompt("Enter the local in network in 2sec, enter 0 otherwise ex: 1/0/free ");
							docs[0].data[i].localinmin = prompt("Enter the local in network in min, enter 0 otherwise ex: 1/0/free");
							docs[0].data[i].localoutsec = prompt("Enter the local out network charge in 1sec, enter 0 otherwise ex: 1/0/free");
							docs[0].data[i].localout2sec = prompt("Enter the local out network in 2sec, enter 0 otherwise ex: 1/0/free");
							docs[0].data[i].localoutmin = prompt("Enter the local out network in min, enter 0 otherwise ex: 1/0/free");
							docs[0].data[i].threshold = prompt("Enter the value of the threshold");
							local.push(docs[0].data[i]);
							local[0].count = local[0].count + 1;

						}
						else if(key == 3){
							console.log("The plan is chosen to be local + std or std");
							docs[0].data[i].localstdinsec = prompt("Enter the local innetwork charge in 1sec, enter 0 otherwise ex: 1/0/free");
							docs[0].data[i].localstdin2sec = prompt("Enter the local in network in 2sec, enter 0 otherwise ex: 1/0/free");
							docs[0].data[i].localstdinmin = prompt("Enter the local in network in min, enter 0 otherwise ex: 1/0/free");
							docs[0].data[i].localstdoutsec = prompt("Enter the local out network charge in 1sec, enter 0 otherwise ex: 1/0/free");
							docs[0].data[i].localstdout2sec = prompt("Enter the local out network in 2sec, enter 0 otherwise ex: 1/0/free");
							docs[0].data[i].localstdoutmin = prompt("Enter the local out network in min, enter 0 otherwise ex: 1/0/free");
							docs[0].data[i].threshold = prompt("Enter the value of the threshold");	

							localstd.push(docs[0].data[i]);
							localstd[0].count = localstd[0].count + 1;

						}
					}
					else {
						if(i < docs[0].data.length - 1) {
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

