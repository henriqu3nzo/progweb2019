const fs = require('fs');
var path = require('path');
var http = require('http');

var rota = [];

console.log("Iniciando servidor...")

var server = http.createServer(function(req,res){
	for(var i = 0; i < items.lengh; i++){
		res.write(items[i]);
	}
 	res.end();
}).listen(3000); //função que habilita a porta;

fs.readdir(rota, function(err, items){
	var server = http.createServer(function(req,res){
		for(var i = 0; i < items.lengh; i++){
			res.write(items[i]);
		}
		 res.end();
	}).listen(3000);	 
});