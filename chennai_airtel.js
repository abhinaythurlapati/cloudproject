var fs = require('fs')
 //file = "./hello/helloworld"

var request = require('request');
var operator = "Airtel"
	
request('http://api.dataweave.in/v1/telecom_data/listByCircle/?api_key=13c590840cdeb51e0d34f090667e1c411bfa6fa9&operator=' + operator + '&circle=Chennai&page=1&per_page=1000', function (error, response, chennai_airtel) {
  if (!error && response.statusCode == 200) {
	console.log(chennai_airtel);    
	console.log("success") 
    
  }
})
	
