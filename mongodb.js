var dburl = "localhost/abhi";
var db = require('mongojs').connect(dburl);
db.getCollectionNames( function(err,docs){
	if(err) console.log(err);
	else
		{
			docs.forEach(function(doc){
				console.log(doc);
				var doc = db.collection(doc);
				doc.find({},function(err,data){
					if(err) throw err;
					else 
						{
							console.log(data);
						}
				})
				
			})
		}
		console.log("success");
});
