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


/*app.get("/crearPartida/:num/:nick",function(request,response){
	let owner = request.params.nick;
	let num = request.params.num;
	let codigo = juego.crearPartida(num,new Usuario(owner));

	response.send({"codigo":codigo});
});

app.get("/unirAPartida/:codigo/:nick",function(request,response){
	let codigo = request.params.codigo;
	let nick = request.params.nick;
	let msg = "";
	let encontrado = juego.partidaExiste(codigo)
	if(encontrado[0] == true){
		msg = juego.partidas[encontrado[1]].fase.agregarUsuario(new Usuario(nick),juego.partidas[encontrado[1]].usuarios,juego.partidas[encontrado[1]].numUsuario);
		response.send({"unida":msg});
	} else
		response.send({"error":msg});
});

app.get("/iniciarPartida/:codigo",function(request,response){
	let codigo = request.params.codigo;
	let encontrado = juego.partidaExiste(codigo)
	if(encontrado[0] == true){
		juego.partidas[encontrado[1]].iniciarPartida();
		response.send({"Inicia":"La partida es iniciado"});
	 } else
		response.send({"error":"no hay partida con este codigo"});
});

app.get("/listaDePartidas",function(request,response){
	response.send({"partidas":juego.getPartidas()});
});*/
