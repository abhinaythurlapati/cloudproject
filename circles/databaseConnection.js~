
exports.db1 = function(){
	//first connection to users database which has logs
	var dburl1 = "localhost/" + "users" ;
	return require('mongojs').connect(dburl1);
	
	
}

//second connection to Circle database here it is Karnataka
exports.db2 = function(circle){
	var dburl2 = "localhost/" + circle ;
	return require('mongojs').connect(dburl2);
}

