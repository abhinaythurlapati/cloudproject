		var dburl1 = "mongodb://mongodb-1.recharge-plan-reco.4447.mongodbdns.com:27000/" + "Karnataka";
		var dburl2 = "mongodb-0.recharge-plan-reco.4447.mongodbdns.com:27000/" + "Karnataka";
		var dburl3 = "mongodb-2.recharge-plan-reco.4447.mongodbdns.com:27000/" + "Karnataka";	

var db2 = require('mongojs').connect('mongodb://mongodb-1.recharge-plan-reco.4447.mongodbdns.com:27000,mongodb-0.recharge-plan-reco.4447.mongodbdns.com:27000,mongodb-2.recharge-plan-reco.4447.mongodbdns.com:27000/Karnataka');


var con = db2.collection("KarnatakaAirtelcatagorized");
con.find({},function(err,data){
	if(err){
		console.log(err);
	}
	else{
		
		console.log(data[0]);
	}
})






