function Juego(){
	this.partidas={};
	this.crearPartida=function(num,owner){
		let codigo=this.obtenerCodigo();
		if (!this.partidas[codigo] && this.numeroValido(num)){
			this.partidas[codigo]=new Partida(num,owner.nick);
			owner.partida=this.partidas[codigo];
		}
		return codigo;
	}
	this.unirAPartida=function(codigo,nick){
		if (this.partidas[codigo]){
			this.partidas[codigo].agregarUsuario(nick);
		}
	}
	
	this.numeroValido=function(num){
		return (num>=4 && num <=10);
	}

	this.obtenerCodigo=function(){
		let cadena="ABCDEFGHIJKLMNOPQRSTUVXYZ";
		let letras=cadena.split('');
		let maxCadena=cadena.length;
		let codigo=[];
		for(i=0;i<6;i++){
			codigo.push(letras[randomInt(1,maxCadena)-1]);
		}
		return codigo.join('');
	}
	this.eliminarPartida=function(codigo){
		delete this.partidas[codigo];
	}
}

function Partida(num,owner){
	this.maximo=num;
	this.nickOwner=owner;
	this.fase=new Inicial();
	this.usuarios={};
	this.tareas=["Jardines", "Basuras","Calles","Mobiliario"];
	this.agregarUsuario=function(nick){
		this.fase.agregarUsuario(nick,this)
	}
	this.puedeAgregarUsuario=function(nick){
		let nuevo=nick;
		let contador=1;
		while(this.usuarios[nuevo]){
			nuevo=nick+contador;
			contador=contador+1;
		}
		this.usuarios[nuevo]=new Usuario(nuevo);
		//this.comprobarMinimo();
	}
	this.comprobarMinimo=function(){
		return Object.keys(this.usuarios).length>=4
	}
	this.comprobarMaximo=function(){
		return Object.keys(this.usuarios).length<this.maximo
	}
	this.numeroJugadores=function(){
		return Object.keys(this.usuarios).length;
	}
	this.iniciarPartida=function(){
		this.fase.iniciarPartida(this);
	}
	this.abandonarPartida=function(nick){
		this.fase.abandonarPartida(nick,this);
		if(this.partida.numeroJugadores()<=0){
			this.juego.eliminarPartida(this.partida.codigo);
		}
	}
	this.eliminarUsuario=function(nick){
		delete this.usuarios[nick];
	}
	this.asignarImpostor=function(){
		let numero = Object.keys(this.usuarios).length;
		let usr;
		if(numero>=4 && numero<7){ //1 impostor si hay 4-6 usuarios en un partida
			usr = Object.keys(this.usuarios)[randomInt(0,numero)];
			this.usuarios[usr].impostor=true;
		}
		else if(numero>=7 && numero<=10){//2 impostor si hay 7-10 usuarios en un partida
			let rd = randomInt(0,numero);
			let cnt = 0;
			while (cnt != 2){
				usr = Object.keys(this.usuarios)[rd];
				if(!this.usuarios[usr].impostor){
					this.usuarios[usr].impostor = true;
					cnt += 1;
					rd = randomInt(0,numero);
				}
			}
		}
	}
	this.asignarTareas=function(){
		let sizeTareas = this.tareas.length;
		let laTarea = tareas[randomInt(0,sizeTareas)];
		for(var usuar in this.usuarios){
			if(!this.usuarios[usuar].impostor){ // añadir solamente si el usuario no es un impostor
				this.usuarios[usuar].encargo=laTarea;
			}
		}
	}
	this.impostorVivo=function(){
		let count=0;
		for(var usr in this.usuarios){
			if(usr.impostor && usr.estado.nombre=="vivo"){
				count+=1;
			}
		}
		return count;
	}

	this.tripanteVivo=function(){
		return (Object.keys(this.usuarios).length - this.impostorVivo());
	}
	this.votar=function(){

	}
	this.report=function(){

	}
	this.emergencia=function(){

	}
	this.agregarUsuario(owner);
}

function Inicial(){
	this.nombre="inicial";
	this.agregarUsuario=function(nick,partida){
		partida.puedeAgregarUsuario(nick);
		if (partida.comprobarMinimo()){
			partida.fase=new Completado();
		}		
	}
	this.iniciarPartida=function(partida){
		console.log("Faltan jugadores");
	}
	this.abandonarPartida=function(nick,partida){
		partida.eliminarUsuario(nick);
		//comprobar si no quedan usr
	}
}

function Completado(){
	this.nombre="completado";
	this.iniciarPartida=function(partida){
		partida.fase=new Jugando();
	}
	this.agregarUsuario=function(nick,partida){
		if (partida.comprobarMaximo()){
			partida.puedeAgregarUsuario(nick);
		}
		else{
			console.log("Lo siento, numero máximo")
		}
	}
	this.abandonarPartida=function(nick,partida){
		partida.eliminarUsuario(nick);
		if (!partida.comprobarMinimo()){
			partida.fase=new Inicial();
		}
	}
}

function Jugando(){
	this.nombre="jugando";
	this.agregarUsuario=function(nick,partida){
		console.log("La partida ya ha comenzado");
	}
	this.iniciarPartida=function(partida){
		partida.asignarImpostor();
		partida.asignarTareas();
	}
	this.abandonarPartida=function(nick,partida){
		partida.eliminarUsuario(nick);
		//comprobar si termina la partida
	}
}

function Final(){
	this.final="final";
	this.agregarUsuario=function(nick,partida){
		console.log("La partida ha terminado");
	}
	this.iniciarPartida=function(partida){
	}
	this.abandonarPartida=function(nick,partida){
		//esto es absurdo
	}
}

function Usuario(nick,juego){
	this.nick=nick;
	this.juego=juego;
	this.partida;
	this.impostor=false;
	this.encargo="none";
	this.estado=new Vivo();
	this.crearPartida=function(num){
		return this.juego.crearPartida(num,this);
	}
	this.iniciarPartida=function(){
		this.partida.iniciarPartida();
	}
	this.abandonarPartida=function(){
		this.partida.abandonarPartida(this.nick);
		if(this.partida.numeroJugadores()<=0){
			this.juego.eliminarPartida();
		}
	}
}

function Vivo(){
	this.nombre = "vivo";
	this.votar = function(){

	}
	this.report = function(partida){

	}
	this.emergencia=function(partida){

	}
	this.matar=function(){
		this.estado=new Muerto();
	}

}

function Muerto(){
	this.function="muerto";
}

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

function inicio(){
	juego=new Juego();
	var usr=new Usuario("Pepe",juego);
	var codigo=usr.crearPartida(4);

	juego.unirAPartida(codigo,"max");
	juego.unirAPartida(codigo,"maxou");
	juego.unirAPartida(codigo,"maxime");

	usr.iniciarPartida();
}


module.exports.Juego=Juego;
module.exports.Usuario=Usuario;