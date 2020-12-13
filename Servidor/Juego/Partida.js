//Esta clase sirve para gestionar la partida
var randomInt = require("./utils/randomInt.js");
var tripulacion = require("./Usuario/tripulacion.js");
var Missiones = require("./Usuario/missiones.js");
var Usuario = require("./Usuario/Usuario.js");
var Inicial = require("./fases/inicial.js");
var Jugando = require("./fases/Jugando.js");
var Votacion = require("./fases/votacion.js");

module.exports = class Partida {
	constructor(numUsuario){
		this.fase = null; //actual fase de la partida (objeto)
		this.numUsuario = numUsuario; //numero de usuarios (number)
		this.nickOwner = 0; //Usuario owner = 0 porque primero usuario en el array usuarios (number)
		this.usuarios = []; //array of Usuario (array)
		this.codigo = ""; //codigo de la partida (string)
		this.Uids = 0; //numero total de Uids (number)
	}

	unirAPartida(nick){
		let usuario = new Usuario(nick);
		this.asignarUid(usuario);
		return this.fase.agregarUsuario(usuario,this.usuarios,this.numUsuario);
	} //metodo terminado, para anadir un usuario a la partida

	asignarUid(usuario){
		usuario.setId(this.Uids);
		this.Uids++;
		if(this.Uids == this.numUsuario)
			this.Uids--;
	} //metodo terminado para definir un Uid

	updateUidIfAlguienAbandona(){
		this.Uids--;
		if(this.Uids < 0)
			this.Uids = 0; //evitar -1 si owner quita

		this.usuarios.forEach((usuario,index) => usuario.setId(index));
	} //metodo terminado para actualizar Uid

	abandonarPartida(nick){
		if(this.fase.getEstado() == "Inicial" || this.fase.getEstado() == "Completado"){
			if(this.usuarios[nick] != this.usuarios[0]){
				let nombre = this.deleteUsuario(nick);
				this.updateUidIfAlguienAbandona();
				return {"msg": nombre +" ha quitado la partida"};
			} else {
				let nombre = this.deleteUsuario(nick);
				this.usuarios[0].setIsOwner(true);
				this.updateUidIfAlguienAbandona();
				return {"msg": nombre +" ha quitado la partida. " + this.usuarios[0].nombre +" es el nuevo owner de la partida"};
			}
		} else
			return {"msg":"No es posible quitar la partida"};
	} //metodo terminado, borrar el usuario que quita la partida, atribuir un nuevo owner si owner quita

	deleteUsuario(nick){
		let nombre = this.usuarios[nick].getNombre();
		this.usuarios.splice(nick,1)
		this.fase.setEstado("Inicial");
		return nombre;
	} //metodo terminado, para supprimar un usuario y borrar

	iniciarPartida(){
		let iniciar = this.fase.validarPartida(this.usuarios,this.numUsuario);
		if(iniciar.validar == true && this.fase.getEstado() == "Completado"){
			this.asignarImpostor();
			this.asignarMissiones();
			this.fase = new Jugando();
			return {"msg":"La partida ha empezado"};
		}
		else
			return iniciar;
	} //metodo terminado, cambiar fase de inicial a jugando

	asignarImpostor(){
		if(this.numUsuario >= 4 && this.numUsuario <= 6)
			this.usuarios[randomInt(0,this.numUsuario)].getTripulacion().setPapel(true);
		else{
			for(let i = 0; i < 2; i++){
				let j = randomInt(0,this.numUsuario);
				if(this.usuarios[j].getTripulacion().getPapel() != true)
					this.usuarios[j].getTripulacion().setPapel(true);
				else
					i--;
			}
		}
	} //metodo terminado, para asignar un impostor

	//-------------------------No terminado pero sera en la proxima actualizacion-------
	//Todo: mejorla
	asignarMissiones(){
		for(let i = 0; i < this.usuarios.length; i++){
			this.usuarios[i].getTripulacion().setMissiones(new Missiones());
		}
	}
	//estas funciones iran en la class missiones
	//getRandomIndividualMissiones(){} <-- lista differente para cada usuario
	//getRandomCommunMissiones(){} <-- lista misma para cada usario, lista da a impostores
	//getSabojateMissiones(){} <-- lista de missiones de sabotajes para impostores
	//----------------------------------------------------------------------------------

	comprobarNumImpOIn(numImpoIn){
		numImpoIn = [0,0];
		this.usuarios.forEach(usuario => {
			if(usuario.getIsAlive() == true){
				if(usuario.getTripulacion().getPapel() == true)
					numImpoIn[1]++;
				else if(usuario.getTripulacion().getPapel() == false)
					numImpoIn[0]++;
			}
		});
		return numImpoIn;	
	} //metodo terminado, volver numero de inocentes y impostores

	//------------Falta cambia de fase por final, creer objeto final----------------------------------------
	comprobarQuienGagna(){
		var numImpOIn = this.comprobarNumImpOIn(numImpOIn);
		this.usuarios.forEach(usuario => usuario.setVotaContra());
		if(numImpOIn[1] == 0)
			return {"msg":"Inoncentes gagnan"};
		else if(numImpOIn[0] < numImpOIn[1])
			return {"msg":"Impostores gagnan"};
		else if(numImpOIn[0] == numImpOIn[1])
			return {"msg":"Partida termina con egalidad"};
		else
			return {"msg":"La partida continua"};
	} //metodo terminado, para comprobar quien gagna
	//---------------------------------------------------------------------------------

//---------Getters de los parametros-------------------
	getNickOwner(){
		return this.nickOwner;
	}

	getUsuarios(){
		return this.usuarios;
	}

	getNumUsuarios(){
		return this.numUsuario;
	}

	getCodigo(){
		return this.codigo;
	}

	setCodigo(codigo){
		this.codigo = codigo;
	}

	getFase(){
		return this.fase;
	}

	setFase(fase){
		this.fase = fase;
	}

	getUids(){
		return this.Uids;
	}
}