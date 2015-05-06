var url1= "mongodb://mongodb-1.recharge-plan-reco.4054.mongodbdns.com:27000/users";
var url2 = "mongodb://mongodb-2.recharge-plan-reco.4054.mongodbdns.com:27000/users";
var url3 = "mongodb://mongodb-0.recharge-plan-reco.4054.mongodbdns.com:27000/users";
var mongoose = require ("mongoose");
var getlogs=mongoose.connect(url1,url2,url3);
getlogs.logs.find({},function(err,data){
if(err){
console.log(err);
}
else
console.log(data);
})

