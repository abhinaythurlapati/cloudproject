
exports.getlogs = function(){
	//first connection to users database which has logs
	var dburl1 = "localhost/" + "users" ;
	var db1 = require('mongojs').connect(dburl1);
	var coll =  "logs";
	return db1.collection(coll);
	
}

//second connection to Circle database here it is Karnataka
exports.db2 = function(circle){
	var dburl2 = "localhost/" + circle ;
	return require('mongojs').connect(dburl2);
	
}

