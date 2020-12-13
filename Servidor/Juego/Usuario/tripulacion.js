module.exports = class tripulacion{
	constructor(){
		this.papel = false;
		this.missiones = null;
	}

	setPapel(papel){
		this.papel = papel;
	}

	getPapel(){
		return this.papel;
	}

	getMissiones(){
		return this.missiones
	}

	setMissiones(missiones){
		this.missiones = missiones
	}
}