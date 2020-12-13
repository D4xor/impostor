/*Esta clase sirve para definir un usuario
el usuario tiene un papel*/
var Tripulacion = require("./tripulacion.js")

module.exports = class Usuario {
	constructor(nombre) {
		this.nombre = nombre;
		this.tripulacion = new Tripulacion();
		this.isOwner = false;
		this.isAlive = true;
		this.votaContra = 0;
		this.id = 0;
	}
	
//---------Getter de los parametros-------------------
	getNombre(nombre){
		return this.nombre;
	}

	getTripulacion() {
		return this.tripulacion;
	}

	setTripulacion(tripulacion){
		this.tripulacion = tripulacion;
	}

	getIsOwner(){
		return this.isOwner;
	}

	setIsOwner(heIs){
		this.isOwner = heIs;
	}

	getIsAlive(){
		return this.isAlive;
	}

	setIsAlive(isAlive){
		this.isAlive = isAlive;
	}

	getVotaContra(){
		return this.votaContra;
	}

	setVotaContra(action){
		if(action == true)
			this.votaContra++;
		else
			this.votaContra = 0;
	}

	getId(){
		return this.id;
	}

	setId(id){
		this.id = id;
	}
}