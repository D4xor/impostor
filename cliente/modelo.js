function Juego(){
	this.partidas={}; //que coleccion ? 
	this.crearPartida=function(num,owner){
		//generar un codigo de 6 letras
		//comprobar que no esta en uso
		//crear el objeto partida: num  owner
		//this.partidas[codigo] = nueva partida
	}
}

function Partida(num,owner){
	this.numUsuarios=num;
	this.owner=owner;
	
}