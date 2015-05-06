var url1= "http://mongodb-1.recharge-plan-reco.4054.mongodbdns.com:27000/users";
var url2 = "http://mongodb-2.recharge-plan-reco.4054.mongodbdns.com:27000/users";
var url3 = "http://mongodb-0.recharge-plan-reco.4054.mongodbdns.com:27000/users";



exports.db1 = function(){
	//first connection to users database which has logs
	var dburl1 = (url1,url2,url3);
	return require('mongojs').connect(dburl1);


}

//second connection to Circle database here it is Karnataka
exports.db2 = function(circle){

	var url4 = "http://mongodb-0.recharge-plan-reco.4054.mongodbdns.com:27000/" + circle;
	var url5 = "http://mongodb-1.recharge-plan-reco.4054.mongodbdns.com:27000/" + circle;
	var url6 = "http://mongodb-2.recharge-plan-reco.4054.mongodbdns.com:27000/" + circle;
	var dburl2 = (url4,url5,url6) ;
	return require('mongojs').connect(dburl2);
}

