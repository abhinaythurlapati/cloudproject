var fs = require('fs');
var path = require('path');
var circle = "Karnataka";
var operator = "Airtel";
var localIn = 0 , localOut = 0,stdIn = 0, stdOut  = 0 , landLine = 0, roamningIn = 0, roamingLocal = 0,roamingStd = 0;
var freeMins = 0, freeSecondsLocal = 0, freeSecondsStd = 0, LocalSms = 0, StdSms = 0, data = 0;

var price = [ {}
             	
             ] 
//var filename = operator+"_allplans.json";
var filename = "tmp_all.json";
var file = path.join(__dirname,circle,operator,filename);
fs.readFile(file,function(err,rec){
	if(err)
		{
		console.log(err);
		}
	else
		{
		    var json = JSON.parse(rec);
		    console.log("Circle" + json.data[0].opreator_master);
		    
			//for (var i = 0; i < json.data.length; i++){
				json.data[0].locaIn = 0;
				json.data[0].localOut = 1.5;
				console.log(json.data[0]);
			//}
				
				
				
			
				
		}
})
/*
function ask(question, format, callback) {
 var stdin = process.stdin, stdout = process.stdout;

 stdin.resume();
 stdout.write(question + ": ");

 stdin.once('data', function(data) {
   data = data.toString().trim();

   if (format.test(data)) {
     callback(data);
   } else {
     stdout.write("It should match: "+ format +"\n");
     ask(question, format, callback);
   }
 });
}

ask("Name", /.+/, function(name) {
	  ask("Email", /^.+@.+$/, function(email) {
	    console.log("Your name is: ", name);
	    console.log("Your email is:", email);

	    process.exit();
	  });
	});


*/
