var express = require('express')
var app = express()
var ar=[];

app.get('/', function (req, res) {
  res.send(ar);
})

app.get('/:data',function(req,res){
	ar.push(req.params.data);
	res.send(ar);
})

app.post('/:data',function(req,res){
	ar.push(req.params.data);
	res.send(ar);
})

app.delete('/:data',function(req,res){
	var i=ar.indexOf(req.params.data);
	console.log("in delete" + i);
	if(i>-1)
	{
		ar.splice(i,1);
	}
	res.send(ar);
})

app.put('/update/:data/:data1',function(req,res){
	var i=ar.indexOf(req.params.data);
	if(i>-1)
	{
		ar.splice(i,1);
	}
	ar.push(req.params.data1);
	res.send(ar);

})
var server = app.listen(4000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
