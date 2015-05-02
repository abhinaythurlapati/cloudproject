/* 
var dburl1 = "mongoload-234068463.ap-southeast-1.elb.amazonaws.com/" + "Karnataka" ;
var db1 = require('mongojs').connect(dburl1);
db1.getCollectionNames(function(err,data){
	console.log("first connection");
	console.log(data);
});
*/

var dburl2 = "mongodb-2.recharge-plan-reco.4054.mongodbdns.com:27000/" + "Karnataka" ;
var db2 = require('mongojs').connect(dburl2);
db2.getCollectionNames(function(err,data){
	console.log("second connection");
	console.log(data);
});

var dburl3 = "mongodb-0.recharge-plan-reco.4054.mongodbdns.com:27000/" + "Karnataka" ;
var db1 = require('mongojs').connect(dburl3);
db2.getCollectionNames(function(err,data){
	console.log("zero connection");
	console.log(data);
});

