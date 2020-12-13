var Juego = require(".././Juego/Juego.js");
var Usuario = require(".././Juego/Usuario/Usuario.js");
var Votacion = require(".././Juego/fases/votacion.js")
var Jugando = require(".././Juego/fases/Jugando.js")

describe("El juego del impostor",function(){
	var juego;
	var owner;
	var numeroJugador;
	var result;
	var socketId;
	var usuario;
	var msgUnidad;
	var error;

	beforeEach(function(){
		juego = new Juego();
		owner = "Pepe";
		numeroJugador = 4;
	});

	it("comprobar valores iniciales del juego",function(){
		expect(juego.getPartidas().length).toEqual(0);
		expect(juego).not.toBe(undefined);
	});

  	describe("el owner Pepe es en fase de creacion de una partida de 4 a 10 jugadores",function(){
		//cuando se prueba las votacion es mas facil.
		beforeEach(function() {
			result = juego.crearPartida(numeroJugador,owner);
	});

		it("se comprueba la partida",function(){ 	
		  	expect(result.codigoPartida).not.toBe(undefined);
		  	expect(juego.getPartidas()[0].getNickOwner()).toEqual(0);
		  	expect(juego.getPartidas()[0].getUsuarios()[juego.getPartidas()[0].getNickOwner()].getNombre()).toEqual("Pepe");
		  	expect(juego.getPartidas()[0].getNumUsuarios()).toEqual(numeroJugador);
		  	expect(juego.getPartidas()[0].getFase().getEstado()).toEqual("Inicial");
		  	expect(juego.getPartidas()[0].getUsuarios().length).toEqual(1);
		  	expect(juego.partidaExiste("eeoji").msg).toBe("No partida con este codigo");
		  	expect(juego.getPartidas()[juego.partidaExiste(result.codigoPartida)].getCodigo()).toEqual(juego.getPartidas()[0].getCodigo());
		});

		it("el owner borra la partida, comprobar si no es el owner o no esta en la partida", function(){
			expect(juego.borrarPartida(result.codigoPartida,juego.getPartidas()[0].getUsuarios()[0].getId()).msg).toEqual("Partida abandonada");
			expect(juego.getPartidas().length).toEqual(0);
			result = juego.crearPartida(numeroJugador,owner);
			expect(juego.borrarPartida(result.codigoPartida,2).msg).toEqual("No està en la partida o no eres el owner");
		});

		it("no se puede crear partida si el num no esta entre 4 y 10 o si nombre no es string", function(){
			error = juego.crearPartida(3,owner);
			expect(error.msg).toEqual("Obligatorio un numero entre 4 y 10");
			error = juego.crearPartida(11,owner);
			expect(error.msg).toEqual("Obligatorio un numero entre 4 y 10");
			error = juego.crearPartida(5,true);
			expect(error.msg).toEqual("Nombre escrito es falso");
		});

		it("varios usuarios se unen a la partida y uno no se puede",function(){
			expect(juego.getPartidas()[0].getFase().getEstado()).toEqual("Inicial");
			for(let i = 1; i < numeroJugador; i++){
				if(juego.getPartidas()[0].getCodigo() == result.codigoPartida){
					msgUnidad = juego.getPartidas()[0].unirAPartida("Pedro" + i);
					expect(msgUnidad.msg).toEqual("Se ha unidado a la partida");
					expect(msgUnidad.unida).toEqual(true);
					expect(juego.getPartidas()[0].getUsuarios()[i].getId()).toEqual(i);
					expect(msgUnidad.msg).toEqual("Se ha unidado a la partida");
				}
			}
			expect(juego.getPartidas()[0].getUsuarios().length).toEqual(numeroJugador);
			msgUnidad = juego.getPartidas()[0].unirAPartida("Pedro"+numeroJugador++);
			expect(msgUnidad.msg).toEqual("Partida con maximo usuario");
		});

		it("Abandonar partida en fase Inicial o Completado y comprobar si owner quita hay un nuevo owner y comproba si Ids se actualizan", function(){
			for(let i = 1; i < numeroJugador; i++)
				juego.getPartidas()[0].unirAPartida("Pedro" + i);
			
			expect(juego.getPartidas()[0].abandonarPartida(1).msg).toEqual("Pedro1 ha quitado la partida");
			expect(juego.getPartidas()[0].getFase().getEstado()).toEqual("Inicial");
			expect(juego.getPartidas()[0].getUsuarios().length).toEqual(numeroJugador-1);
			expect(juego.getPartidas()[0].abandonarPartida(0).msg).toEqual("Pepe ha quitado la partida. Pedro2 es el nuevo owner de la partida");
			expect(juego.getPartidas()[0].getUsuarios().length).toEqual(numeroJugador-2);
			juego.getPartidas()[0].getUsuarios().forEach((usuario,index) => expect(usuario.getId()).toEqual(index));
		});

		it("Usuarios reciben un papel y una conjunto de missiones",function(){
			for(let i = 1; i < numeroJugador; i++){
				juego.getPartidas()[0].unirAPartida("Pedro" + i);
			}
			expect(juego.getPartidas()[0].getFase().validarPartida(juego.getPartidas()[0].getUsuarios(),juego.getPartidas()[0].getNumUsuarios()).msg).toEqual("Partida preparada a empezar");
			for(let i = 0; i < juego.getPartidas()[0].getUsuarios().length; i++){
				expect(juego.getPartidas()[0].getUsuarios()[i].getTripulacion().getMissiones()).not.toBe(undefined);
			}
		});

		it("Comprobar hay un impostor entre 4-6 usarios y dos entre 7-10",function(){
			let numImpostor = 0;
			let numInocente = 0;
			for(let i = 1; i < numeroJugador; i++){
				juego.getPartidas()[0].unirAPartida("Pedro" + i);
			}
			juego.getPartidas()[0].iniciarPartida();
			let numUsuariosTab = juego.getPartidas()[0].getUsuarios().length;
			for(let i = 0; i < numUsuariosTab; i++){
				if(juego.getPartidas()[0].getUsuarios()[i].getTripulacion().getPapel() == true)
					numImpostor++;
				else
					numInocente++;
			}
			expect(numImpostor).toEqual((numeroJugador - numInocente));
		});

		it("Pepe inicia la partida",function(){
			for(let i = 1; i < numeroJugador; i++)
				juego.getPartidas()[0].unirAPartida("Pedro" + i);
			
			let msgIniciar = juego.getPartidas()[0].iniciarPartida();
			expect(msgIniciar.msg).toEqual("La partida ha empezado");
			expect(juego.getPartidas()[0].getFase().getEstado()).toEqual("Jugando");
		});
	});

	describe("Los jugadores estan en la fase de jugando y pueden hacer cosas y votar (fase Votacion)",function(){
		beforeEach(function() {
			result = juego.crearPartida(numeroJugador,owner);
			for(let i = 1; i < numeroJugador; i++){
				juego.getPartidas()[0].unirAPartida("Pedro" + i);
			}
			juego.getPartidas()[0].getFase().validarPartida(juego.getPartidas()[0].getUsuarios(),juego.getPartidas()[0].getNumUsuarios());
			let msgIniciar = juego.getPartidas()[0].iniciarPartida();
	});
		it("Un impostor ha matado alguien",function(){
			for(let i = 0; i < juego.getPartidas()[0].getUsuarios().length; i++){
				if(juego.getPartidas()[0].getUsuarios()[i].getTripulacion().getPapel() == true){
					if(juego.getPartidas()[0].getUsuarios()[i+1] != undefined || juego.getPartidas()[0].getUsuarios()[i+1] != null){
						let msg = juego.getPartidas()[0].getFase().matar(juego.getPartidas()[0].getUsuarios()[i],juego.getPartidas()[0].getUsuarios()[i+1])
						expect(msg.matar).toEqual("Has matado : "+juego.getPartidas()[0].getUsuarios()[i+1].nombre)
					}
				}
			}
		});
		it("Mandar una vota y una persona skip",function(){
			let haMandataVoto = juego.getPartidas()[0].getFase().mandarUnaVota(juego.partidas[0].usuarios[0]);
			if (haMandataVoto.vota == true)
				juego.getPartidas()[0].setFase(new Votacion());
			expect(juego.getPartidas()[0].getFase().getEstado()).toEqual("Votacion");
			let haSkip = juego.getPartidas()[0].getFase().skip(juego.getPartidas()[0].getUsuarios()[0]);
			expect(haSkip.skip).toEqual(true);
			expect(haSkip.msg).toEqual(juego.getPartidas()[0].getUsuarios()[0].getNombre() + " ha skip la votacion")
		});
		it("Probar alguien murio por votacion y comprobar si un equipo ha gagnado despues dos votacion",function(){
			let haMandataVoto = juego.getPartidas()[0].getFase().mandarUnaVota(juego.getPartidas()[0].getUsuarios()[0]);
			if (haMandataVoto.vota == true){
				juego.getPartidas()[0].setFase(new Votacion());
				juego.getPartidas()[0].getFase().setnbVotadores(juego.getPartidas()[0].getUsuarios());
			}
			while(juego.getPartidas()[0].getFase().getCntHaVotado() < juego.getPartidas()[0].getFase().getnbVotadores()){
				for(let i = 0; i < juego.getPartidas()[0].getUsuarios().length; i++){
					if(juego.getPartidas()[0].getUsuarios()[i].getIsAlive() == true){
						let msg = juego.getPartidas()[0].getFase().votar(juego.getPartidas()[0].getUsuarios()[i],juego.getPartidas()[0].getUsuarios()[0]);
						juego.getPartidas()[0].getFase().setCntHaVotado();
						expect(juego.getPartidas()[0].getUsuarios()[i].getNombre() + " ha votado contra: "+juego.getPartidas()[0].getUsuarios()[0].getNombre()).toEqual(msg.msg);
					}
				}
			}
			let msg = juego.getPartidas()[0].getFase().comprobarVotacion(juego.getPartidas()[0].getUsuarios());
			expect(msg.msg == "Un inocente es eliminado" || msg.msg == "Un impostor es eliminado").toEqual(true);
			console.log(juego.getPartidas()[0].getUsuarios())
			msg = juego.getPartidas()[0].comprobarQuienGagna();
			console.log(msg.msg);
			
			juego.getPartidas()[0].setFase(new Jugando());
			expect(juego.getPartidas()[0].getFase().getEstado()).toEqual("Jugando");

			haMandataVoto = juego.getPartidas()[0].getFase().mandarUnaVota(juego.getPartidas()[0].getUsuarios()[1]);
			if (haMandataVoto.vota == true){
				juego.getPartidas()[0].setFase(new Votacion());
				juego.getPartidas()[0].getFase().setnbVotadores(juego.getPartidas()[0].getUsuarios());
			}
			while(juego.getPartidas()[0].getFase().getCntHaVotado() < juego.getPartidas()[0].getFase().getnbVotadores()){
				for(let i = 0; i < juego.getPartidas()[0].getUsuarios().length; i++){
					if(juego.getPartidas()[0].getUsuarios()[i].getIsAlive() == true){
						let msg = juego.getPartidas()[0].getFase().votar(juego.getPartidas()[0].getUsuarios()[i],juego.getPartidas()[0].getUsuarios()[1]);
						juego.getPartidas()[0].getFase().setCntHaVotado();
						expect(juego.getPartidas()[0].getUsuarios()[i].getNombre() + " ha votado contra: "+juego.getPartidas()[0].getUsuarios()[1].getNombre()).toEqual(msg.msg);
					}
				}
			}
			msg = juego.getPartidas()[0].getFase().comprobarVotacion(juego.getPartidas()[0].getUsuarios());
			expect(msg.msg == "Un inocente es eliminado" || msg.msg == "Un impostor es eliminado").toEqual(true);
			console.log(juego.getPartidas()[0].getUsuarios())
			msg = juego.getPartidas()[0].comprobarQuienGagna();
			console.log(msg.msg);
		});
	});
});