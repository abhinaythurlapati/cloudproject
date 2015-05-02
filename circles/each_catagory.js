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
							console.log(key);


						}
						else if(key == 2){
							console.log("saved to local");
							local.push(docs[0].data[i]);
							local[0].count = local[0].count + 1;

						}
						else if(key == 3){
							console.log("saved to local+std");
							localstd.push(docs[0].data[i]);
							localstd[0].count = localstd[0].count + 1;

						}
					}
					else {
						console.log("hello world");
						i=i-1;
						console.log("invalid entry");
						continue;
					}

				}
			}

			console.log(local[0].count);
			console.log(localstd[0].count);	
			db.close();
		});

