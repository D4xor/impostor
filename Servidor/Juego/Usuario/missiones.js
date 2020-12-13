module.exports = class missiones{
	constructor(){
		this.individual = null;
		this.communes = null;
		this.sabotajesTareas = null;
	}
	//-------------getters--------------
	getIndividual(){
		return this.individual;
	}

	getCommunes(){
		return this.communes;
	}

	getSabotajesTareas(){
		return this.sabotajesTareas;
	}
}