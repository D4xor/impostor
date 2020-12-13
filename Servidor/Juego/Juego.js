var Partida = require("./Partida.js");
var Usuario = require("./Usuario/Usuario.js");
var Inicial = require("./fases/inicial.js")
var randomInt = require("./utils/randomInt.js");
var index = 0;

module.exports = class Juego {
	constructor(){
		this.partidas = [];
	}

	crearPartida(num,nombre){
		if(num >= 4 && num <= 10 && typeof num == "number"){
			if(typeof nombre == "string"){
				let nickOwner = new Usuario(nombre)
				let partida = new Partida(num);
				partida.asignarUid(nickOwner);
				nickOwner.setIsOwner(true);
				if(this.obtenerCodigo(partida) == true){
					partida.getUsuarios().push(nickOwner);
					partida.setFase(new Inicial());
					this.partidas.push(partida);
					return {"codigoPartida": partida.getCodigo()};
				} else
					return {"msg":"No hay más lobby disponible"};
			} else
				return {"msg": "Nombre escrito es falso"};
		} else
			return {"msg": "Obligatorio un numero entre 4 y 10"};
	} //metodo terminado, para crear la partida

	obtenerCodigo(partida) {
		let cadena=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','Z'];
		let codigo = "";
		for(let i = 0 ; i < 6 ; i++)
			codigo += cadena[randomInt(0,cadena.length)];
		return this.comprobarCodigo(codigo,partida);
	} // metodo terminado, para generar un codigo

	comprobarCodigo(codigo,partida){
		while(codigo == this.partidas.find(partida => partida.getCodigo() == codigo) && this.partidas.length < 15)
			codigo = this.obtenerCodigo();

		if(this.partidas.length < 15){
			partida.setCodigo(codigo);
			return true;
		} else
			return false;
	} //metodo terminado, para comprobar codigo no existe

	partidaExiste(codigo){
		index = this.partidas.findIndex(partida => partida.getCodigo() == codigo);
		if(index != -1)
			return index;
		else
			return {"msg":"No partida con este codigo"};
	} // metodo para comprobar si la partida existe (seguridad)

	comprobarOwner(index,idUsuario){
		index = this.partidas[index].getUsuarios().findIndex(usuario => usuario.getId() == idUsuario);
		if(index != -1 && index == this.partidas[index].getNickOwner())
			return this.partidas[index].getUsuarios()[index].getIsOwner();
		else
			return {"msg":"No està en la partida o no eres el owner"};
	} //metodo para comprobar si el usuario es el owner (seguridad)

	borrarPartida(codigo,idUsuario){
		let result = this.partidaExiste(codigo);
		if(typeof result == "number"){
			let resOwner = this.comprobarOwner(result,idUsuario);
			if(resOwner == true && typeof resOwner == "boolean") {
				this.partidas.splice(result,1);
				return {"msg":"Partida abandonada"};
			} else
			return resOwner;
		} else
			return result;
	} //metodo terminado, borrar la partida si nickOwner quita 
	//---------Getters de los parametros-------------------
	getPartidas(){
		return this.partidas;
	}
}