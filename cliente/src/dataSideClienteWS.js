const cliSck = new clienteWS();
cliSck.initializarSocket();

function dataCrearPartida(){
	var nombre = document.getElementById("nombrePartOwnInit").value;
	var numero = document.getElementById("numJugPartInit").value;
	if(nombre !== "" && numero !== "")
		cliSck.crearPartida(numero,nombre);
	else
		console.log("falta informaciones");	
}

function dataUnirAPartida(codigo){
	var nombre = document.getElementById("inp"+codigo).value;
	if(nombre !== "")
		cliSck.unirAPartida(codigo,nombre);
	else
		console.log("falta informaciones");	
}

function lanzarPartida(codigo){
	cliSck.iniciarPartida(codigo);
}