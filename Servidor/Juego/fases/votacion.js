var nickEliminado = null; 
module.exports = class Votacion{
	constructor(){
		this.estado = "Votacion";
		this.nbVotadores = 0;
		this.cntHaVotado = 0;
	}

	votar(nick, nickEligido){
		if(nick.getIsAlive() == true){
			nickEligido.setVotaContra(true);
			return {"msg": nick.getNombre() + " ha votado contra: "+nickEligido.getNombre()};
		} else 
			return {"msg": "No puedes votar porque eres muerto"};	
	} //metodo terminado, para vota contra alguien

	skip(nick){
		if(nick.getIsAlive() == true)
			return {"skip": true, "msg":nick.getNombre() + " ha skip la votacion"};
	} //metodo terminado, un usuario puede pasar la votacion

	comprobarVotacion(usuarios){
		nickEliminado = this.getMasVotado(usuarios);
		if(nickEliminado.getTripulacion().getPapel() == false){
			nickEliminado.setIsAlive(false);
			return {"msg": "Un inocente es eliminado"};
		}
		else if (nickEliminado.getTripulacion().getPapel() == true){
			nickEliminado.setIsAlive(false);
			return {"msg": "Un impostor es eliminado"};
		} else 
			return {"msg":"Votacion termina con egalidad, nadie muere"};
	} //metodo terminado, para decir quien es eliminado

	getMasVotado(usuarios){
		let egalidad = 0;
		let max = 0;
		max = Math.max.apply(Math,usuarios.map(usuario => usuario.votaContra));
		usuarios.forEach(usuario => {
			if(max == usuario.getVotaContra()){
				egalidad++;
				if(egalidad == 1)
					nickEliminado = usuario;
				else
					nickEliminado = null;
			}
		});
		return nickEliminado;
	} //metodo terminado, para comprobar si alguien es eliminado o egalidad

	//--------------getters--------------
	getEstado(){
		return this.estado;
	}

	setEstado(estado){
		this.estado = estado;
	}

	getnbVotadores(){
		return this.nbVotadores;
	}

	setnbVotadores(usuarios){
		let cnt = 0;
		usuarios.forEach(function(usuario){
			if(usuario.getIsAlive() == true) 
			cnt++;	
		});
		this.nbVotadores = cnt;
	}

	getCntHaVotado(){
		return this.cntHaVotado;
	}

	setCntHaVotado(){
		this.cntHaVotado++;
	}
}