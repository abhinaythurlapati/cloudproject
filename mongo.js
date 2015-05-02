var dburl = "localhost/mongoapp"
var collections = ['users'];
var db = require('mongojs').connect(dburl,collections);
var JSONStream = require('JSONStream');
// short form
// var db= require('mongojs').connect('localhost/mongoapp',['users']);

// A user model object		

function user(firstname,lastname,email){
	this.firstname = firstname;
	this.lastname = lastname;
	this.email = email;
}

// {"firstname" : "abhinay", lastname : "thurlapati", "email": "abhinaythurlapati@gmail.com" }
/*
db.users.ensureIndex({email:1} , {unique : true });
 
 var user1= new user("abhinay","thurlapati","abhinaythurlapati@gmail.com");
 var user2 = new user("abhinay","thurlapati","abhinaythurlapati@gmail.com");

db.users.save(user1,function(err,savedUser){
	if(err || !savedUser) console.log("User"+ user.email+"not saved because of the error" + err);
	else console.log("User "+ savedUser.email +" saved succesfully"); 

});

db.users.save(user1,function(err,savedUser){
	if(err || !savedUser) console.log("User"+ user.email+"not saved because of the error" + err);
	else console.log("User "+ savedUser.email +" saved succesfully"); 

});

db.users.remove({ index : value})*/


db.users.find({},function(err,users) {
	if(err || ! users.length ) console.log("User"+ user.email+"not found"+ err);
	else users.forEach( function(useroo) {
	//var jsonstring = JSON.parse(user);
	console.log(useroo.occupation);
	} );
});

/*
db.users.find({},function(err,docs)
{
	if(err || !docs.length) console.log("not found");
	else
	{
		  console.log(docs);
		  console.log(JSON.stringify(docs));
		  } 
})
*/
/*db.users.aggregate([{$group : {_id : "$firstname", num_tutorial : {$sum : 1}}}],function(err,docs)
{
	if(err || !docs.length) console.log("not found");
	else
	{
		  console.log(docs[0].num_tutorial);
		  
		  } 

}); */	
//db.users.find({}).pipe(JSONStream.stringify()).pipe(process.stdout);	

