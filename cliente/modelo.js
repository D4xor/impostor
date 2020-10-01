function Juego(){
	this.partidas={}; //que coleccion ? 
	this.crearPartida=function(num,owner){
		let codigo=this.obtenerCodigo();
		if(!this.partidas[codigo]){
			this.partidas[codigo]=new Partida(num, owner);
		}
		//generar un codigo de 6 letras
		//comprobar que no esta en uso
		//crear el objeto partida: num  owner
		//this.partidas[codigo] = nueva partida
	}
	this.unirAPartida=function(nick){
		//TODO
	}

	this.obtenerCodigo=function(){
		let cadena = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
		let letras = cadena.split('');
		let codigo = [];

		for(i=0;i<6;i++){
			codigo.push(letras[randomInt(1,25)-1]);
		}
		return codigo.join('');
		//codigo1 = letras[randomInt(1,25)-1];
	}
}

function Partida(num,owner){
	this.numUsuarios=num;
	this.owner=owner;
	this.usuarios=[]; //el index 0 sera el owner
	this.agregarUsuario=function(nick){
		//comprobar nick unico
		//comprobar si el usuario num
		//TODO
	}

	this.agregarUsuario(owner);
}



function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}
