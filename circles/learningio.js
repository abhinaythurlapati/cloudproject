var prompt = require('sync-prompt').prompt;
//var dburl = "localhost/abhi";
//var db = require('mongojs').connect(dburl);

var fs = require('fs');
var path = require('path');
var circle = "Karnataka";
var operator= "Vodafone";

/*
var price = { localIn : "0" ,localOut : "0" ,stdIn : "0" , stdOut : "0" ,landLine : "0" ,roamningIn : "0" ,
               roamingStd : "0" ,freeMins : "0" , freeSecondsLocal : "0" , freeSecondsStd : "0" , LocalSms : "0" ,
              StdSms : "0" , data : "20" }
 */         
var filename = operator + "_allplans.json" ;
var file = path.join(__dirname,circle,operator,filename);

fs.readFile(file,function(err,rec){
	if(err){
		console.log(err);
		
	}
	else
	{
		
		var newfile = operator + "_tmp.json";
		var newdir = path.join(__dirname,circle,operator,newfile);
		
		        console.log("hello world"); 
			fs.writeFileSync( newdir, rec);
			

			fs.readFile(newdir,function(err,rec1){
				if(err)
				{
					console.log(err);
				}
				else
				{
					var json = JSON.parse(rec1);
					console.log(json);	
					console.log("Circle" + json.data[0].operator_master);

					for (var i = 0; i < json.data.length; i++){
						json.data[i].locaIn = 0;
						json.data[i].localOut = 0;
						json.data[i].stdIn = 0;
						json.data[i].stdOut = 0;
						json.data[i].landLine = 0;
						json.data[i].roamningIn = 0;
						json.data[i].roamingStd = 0;
						json.data[i].freeMins = 0;
						json.data[i].freeSecondsLocal = 0;
						json.data[i].freeSecondsStd = 0;
						json.data[i].LocalSms = 0;
						json.data[i].StdSms = 0;
						json.data[i]. data  = 0;
					}
					var filename2 = operator + "_backup.json";
					var file2 =  path.join(__dirname,circle,operator,filename2);
					fs.writeFileSync(file2,JSON.stringify(json));

					//	var collName = circle + operator_master + "all";
					//	var col = db.connection(collName);
					//	db.collName.find({},function(err,docs){
					for (var i = 0; i < json.data.length; i++){
						console.log("operator : " + json.data[i].operator_master);
						console.log("recharge type" + json.data[i].recharge_short_description);
						console.log("recharge short description" + json.data[i].recharge_description) ;
						json.data[i].locaIn = prompt("Enter local In network plan Usage : /min or /sec or /2sec");
						console.log();
						json.data[i].localOut = prompt("Enter local Out network charge Usage :  /min or /sec or /2sec");
						console.log();
						json.data[i].stdIn = prompt("Enter Std In network charge Usage :  /min or /sec or /2sec ");
						console.log();
						console.log("same recharge short description" + json.data[i].recharge_description) ;
						console.log();
						json.data[i].stdOut = prompt("Enter Std out network Usage :  /min or /sec or /2sec");
						console.log();
						json.data[i].landLine = prompt("Enter landline charge Usage :  /min or /sec or /2sec");
						console.log();
						json.data[i].roamningIn = prompt("Enter roaming Incoming charge Usage :  /min or /sec or /2sec or free");
						console.log("same recharge short description" + json.data[i].recharge_description) ;
						console.log();
						json.data[i].roamingStd = prompt("Enter raoming std network charge Usage :  /min or /sec or /2sec");
						console.log();
						json.data[i].freeMins = prompt("Enter first free minutes usage : 0 otherwise ");
						console.log();
						json.data[i].freeSecondsLocal = prompt("Enter free seconds local ");
						console.log();
						console.log("same recharge short description" + json.data[i].recharge_description) ;
						console.log();
						json.data[i].freeSecondsNational = prompt("Enter free seconds National");
						console.log();
						json.data[i].LocalSms = prompt("Enter number of local std sms for this plan");
						console.log();
						json.data[i].StdSms = prompt("Enter number of free std sms for this plan");
						console.log();
						json.data[i].dataOffered  = prompt("Enter 0 for now ");
						console.log();
						json.data[i].dataCharge = prompt("Enter 0 for  now");
					}
						fs.writeFileSync(file2,JSON.stringify(json));
					//})
				}
			});

	}
});










