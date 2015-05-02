var fs = require('fs');
var path = require('path');
var circle = "Karnataka";
var operator = "Airtel";

/*
var price = { localIn : "0" ,localOut : "0" ,stdIn : "0" , stdOut : "0" ,landLine : "0" ,roamningIn : "0" ,
               roamingStd : "0" ,freeMins : "0" , freeSecondsLocal : "0" , freeSecondsStd : "0" , LocalSms : "0" ,
              StdSms : "0" , data : "20" }
 */         
var filename = operator + "_allplans.json" ;
var file = path.join(__dirname,circle,operator,filename);

fs.readFile(file,function(err,rec){
	if(err){
		console.log(err);
	}
	else
	{
		var newfile = operator + "_tmp.json";
		var newdir = path.join(__dirname,circle,operator,newfile);
		if(fs.stat(newdir)) console.log(newdir + " already exists");
		else
			fs.writeFile( newfile, rec);
	}
})

var filename = operator + "_tmp.json" ;
var file = path.join(__dirname,circle,operator,filename);


fs.readFile(file,function(err,rec){
	if(err)
	{
		console.log(err);
	}
	else
	{
		var json = JSON.parse(rec);
		console.log("Circle" + rec.data[0].opreator_master);

		for (var i = 0; i < json.data.length; i++){
			rec.data[i].locaIn = 0;
			rec.data[i].localOut = 0;
			rec.data[i].stdIn = 0;
			rec.data[i].stdOut = 0;
			rec.data[i].landLine = 0;
			rec.data[i].roamningIn = 0;
			rec.data[i].roamingStd = 0;
			rec.data[i].freeMins = 0;
			rec.data[i].freeSecondsLocal = 0;
			rec.data[i].freeSecondsStd = 0;
			rec.data[i].LocalSms = 0;
			rec.data[i].StdSms = 0;
			rec.data[i]. data  = 0;
		}
		for (var i = 0; i < json.data.length; i++){
			rec.data[i].locaIn = 0;
			rec.data[i].localOut = 0;
			rec.data[i].stdIn = 0;
			rec.data[i].stdOut = 0;
			rec.data[i].landLine = 0;
			rec.data[i].roamningIn = 0;
			rec.data[i].roamingStd = 0;
			rec.data[i].freeMins = 0;
			rec.data[i].freeSecondsLocal = 0;
			rec.data[i].freeSecondsStd = 0;
			rec.data[i].LocalSms = 0;
			rec.data[i].StdSms = 0;
			rec.data[i]. data  = 0;
		}
	}
})








/*function algo()
{

	product= localIn	*	recLocalIn	*
		 localOut	*	recLocalOut 	*
		 stdIn	        *	recStdIn	*
		 stdOut	        *	recStdOut	*
		 landLine	*	reclandLine	*
		 roamningIn	*	recroamingIn	*
		 roamingLocal	* 	recRoamingLocal *
		 roamingStd	*	roamingStd ;
	          
	console.log(product);
} 

algo();
*/


