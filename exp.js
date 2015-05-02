var fs = require('fs');
var db= require('mongojs').connect('localhost/cloudtest',['karnataka_BSNL']);


var file = ["ISD Pack" ,
            "Seconds Pack",
            "SMS Pack",
            "3G Pack" ,
            "Combo Pack" ,
            "Tariff Voucher" ,
            "2G Pack"
            ]


for ( i=0; i< file.length;i++) {
	(function(i){ 
		db.karnataka_BSNL.aggregate(
				[
				 { "$unwind": "$data" }, 
				 { "$match": { "data.recharge_short_description": file[i] }}, 
				 {
					 "$group": {
						 "_id": {
							 "status_code": "$status_code",
							 "status_text": "$status_text"
						 }, 
						 "data": { "$push": "$data" }
					 }
				 }, 
				 {
					 "$project": {

						 "data": 1, 
						 "_id": 0,
						 "status_code": "$_id.status_code", 
						 "status_text": "$_id.status_text"
					 }
				 }
				 ],function(err,docs){
					if(err || !docs) console.log(err+"errors found");
					else
					{

						fs.writeFileSync(file[i], JSON.stringify(docs));
						//	console.log(i);
						//console.log("saved succesfully");
					}

				} );
	})(i);



}


/*db.plans.aggregate(
    [
        { "$unwind": "$data" }, 
        { "$match": { "data.recharge_short_description": "ISD Pack" }}, 
        {
            "$group": {
                          "_id": {
                                     "status_code": "$status_code",
                                     "status_text": "$status_text"
                                 }, 
                          "data": { "$push": "$data" }
                      }
        }, 
        {
            "$project": {
                           
                            "data": 1, 
                            "_id": 0,
                            "status_code": "$_id.status_code", 
                            "status_text": "$_id.status_text"
                        }
        }
    ]
)
*/
/*
for ( i=0; i< file.length;i++) {
	(function(i){ console.log(i);
		db.plans.find(     {"data.recharge_short_description": file[i]},      {_id: 0, data: {$elemMatch: { recharge_short_description: file[i]}}},function(err,docs){
			 if(err || !docs) console.log(err+"errors found");
			 else
				 {
					
				 	fs.writeFileSync(file[i], JSON.stringify(docs));
				 	//	console.log(i);
				 	//console.log("saved succesfully");
				 }
			  
		  } );
	})(i);
	
	

}

*/






/*
var file = 'ISD Pack'

db.plans.find(     {"data.recharge_short_description": "ISD Pack"},      {_id: 0, data: {$elemMatch: {"recharge_short_description": "ISD Pack"}}},function(err,docs){
	 if(err || !docs) console.log(err+"errors found");
	 else
		 {
		 	fs.writeFileSync(file, JSON.stringify(docs));
		 	console.log(docs);
		 	console.log("saved succesfully");
		 }
	  
  } );
*/



  /*
	db.plans.save(user1,function(err,savedUser){
		if(err || !savedUser) console.log( err+"error occured");
		else console.log(" saved succesfully"); 

	}); 
/*
db.plans.find({},function(err,docs) {
	if(err || ! docs.length ) console.log(err+"hello world");
	else docs.forEach(function(doc) {

		for (var i = 0; i < doc.data.length; i++) {
			console.log(doc.data[i].id); 

		}	
	   console.log()   


	} );
});
 */
/* db.plans.aggregate([{$unwind : "$data"},{$group : {"_id" : "$data.recharge_short_description",count : {$sum : 1}}}], function(err,docs){

	if(err || ! docs.length ) console.log(err+"hello world");
	else {
		var doc = JSON.stringify(docs); 		
		fs.writeFileSync("airtel_categories", doc);
		
		}

});
*/
