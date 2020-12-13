module.exports = class Jugando{
	constructor(){
		this.estado = "Jugando";
	}

	matar(nickImpostor,nickMata){
		if(nickImpostor.getTripulacion().getPapel() == true){
			nickMata.setIsAlive(false);
			return {"matar": "Has matado : "+nickMata.getNombre()};
		} else
			return{"msg":"No puedes hacer este accion"};
	} // metodo terminado, matar alguien

	mandarUnaVota(nick){
		if(nick.getIsAlive() == true)
			return {"vota": true};
		else
			return {"vota": false, "msg":"No puedes mandar una vota"};
	} //metodo terminado, para mandar una votacion

	//sabotar(nick)
	//hacerTarea(nick)

	//-------------------getters---------------
	getEstado(){
		return this.estado;
	}

	setEstado(estado){
		this.estado = estado;
	}
}