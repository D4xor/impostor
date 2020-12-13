module.exports = class Inicial {
	constructor(){
		this.estado = "Inicial";
	}

	agregarUsuario(nick,usuarios,maximo){
		if(usuarios.length != maximo){
			usuarios.push(nick);
			return {"msg": "Se ha unidado a la partida","unida":true,"id":nick.getId()};
		}
		else
			return {"msg": "Partida con maximo usuario","unida":false};
	} //metodo terminado, para anadir jugadores

	validarPartida(usuarios,maximo){
		if(usuarios.length != maximo)
			return {"msg": "Falta jugadores","validar":false};
		else {
			this.estado = "Completado";
			return {"msg": "Partida preparada a empezar","validar":true};
		}
	} //metodo terminado, para comprobar si se puede validar la partida
	
	//--------------getters------------------------
	getEstado(){
		return this.estado;
	}

	setEstado(estado){
		this.estado = estado;
	}
}