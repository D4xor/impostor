var fs = require("fs");
var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require("body-parser");
var io = require("socket.io").listen(server);

var Juego = require("./Servidor/Juego/Juego.js");
var Usuario = require("./Servidor/Juego/Usuario/Usuario.js")
var wss = require("./Servidor/servidorWS.js");

app.set('port', process.env.PORT || 5000);

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var juego = new Juego();

app.get('/', function (request, response) {
    var contenido = fs.readFileSync(__dirname + "/Cliente/index.html"); 
    response.setHeader("Content-type", "text/html");
	response.send(contenido);
});

app.get("/juego",function(request,response){
	var contenido = fs.readFileSync(__dirname + "/Cliente/game2d/index-game.html"); 
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

server.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

var servidorWS = new wss(io);
servidorWS.lanzarSocketSrv(servidorWS,juego);
