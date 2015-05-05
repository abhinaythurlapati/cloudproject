var fs = require('fs');
var path = require('path');
var circle = "Karnataka";
var database = "localhost/" + circle ;
var dburl = database;
var db = require('mongojs').connect(dburl);
var operator = [ "Vodafone" , "Aircel" , "Airtel" , "BSNL" , "Idea" , "MTS" , "Reliance CDMA" , "Reliance GSM" , "T24" ,
 "Tata Docomo CDMA" , "Tata Docomo GSM" , "Vodafone"
            ]
for (var i = 0; i < operator.length; i++) {
	(function(i){
		
		var dir = path.join(__dirname,circle,operator[i]);
		var tmp_file = operator[i] + "catagorized.json";
		var file = path.join(dir,tmp_file);
		fs.readFile( file, function(err,data){
			if(err){
				console.log(err);
			}
			else
			{
				var collName = circle + operator[i] + "catagorized";
				var storeData = JSON.parse(data);
				var col = db.collection(collName);
				col.save(storeData,function(err,savedData){
					if(err)
						{
						 console.log(err + "saving in dabase failed");
						}
					else
						{
						    console.log(collName + "saved in database successfully");
						}
				});
				


			}
			

		});
		
		
	})(i);
	
}
