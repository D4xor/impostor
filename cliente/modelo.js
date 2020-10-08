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
	this.unirAPartida=function(codigo,nick){
		if (this.partidas[codigo]) {
			this.partidas[codigo].agregarUsuario(nick);
		}
	}

	this.obtenerCodigo=function(){
		let cadena = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
		let letras = cadena.split('');
		let maxCadena=cadena.length;
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
	this.nickOwner=owner;
	this.fase=new Inicial();
	this.usuarios={}; //el index 0 sera el owner
	this.agregarUsuario=function(){
		this.fase.agregarUsuario(nick,this);
	}
	this.puedeAgregarUsuario=function(nick){
		let nuevo=nick;
		let contador=1;
		while(this.usuarios[nuevo]){
			nuevo=nick+contador;
			contador=contador+1;
		}
		this.usuarios[nuevo]=new Usuario(nuevo);
	}
	this.agregarUsuario(owner);
}

function Inicial(){
	this.agregarUsuario=function(nick,partida){
		partida.puedeAgregarUsuario(nick);
	}
}

function Jugando(){
	this.agregarUsuario=function(nick,partida){
		//this.puedeAgregarUsuario(nick);
	}
}

function Final(){
	this.agregarUsuario=function(nick,partida){
		//this.puedeAgregarUsuario(nick);
	}
}

function Usuario(nick){
	this.nick=nick;
}



function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}
