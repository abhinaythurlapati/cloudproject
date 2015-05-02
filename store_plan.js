fs = require('fs')
var dburl = "localhost/cloudtest"
	var collections = ['karnataka_BSNL'];
var db = require('mongojs').connect(dburl,collections);
var file = JSON.parse(fs.readFileSync("karnataka_BSNL"));
//console.log(file)

db.karnataka_BSNL.save(file,function(err,docs){
	if(err || !docs )
		console.log("err")
		else
			console.log("saved successfully")
})
	
