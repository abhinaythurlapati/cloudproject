var url = 'mongodb://mongodb-1.recharge-plan-reco.4447.mongodbdns.com:27000,mongodb-0.recharge-plan-reco.4447.mongodbdns.com:27000,mongodb-2.recharge-plan-reco.4447.mongodbdns.com:27000/'
exports.db1 = function(){
	//first connection to users database which has logs
	var dburl1 = url + "users" ;

	return require('mongojs').connect(dburl1);
	
	
}

//second connection to Circle database here it is Karnataka
exports.db2 = function(circle){
	var dburl2 = url + circle ;
	return require('mongojs').connect(dburl2);
}

