var Usuario = require("./Juego/Usuario/Usuario.js");
var msg = "";

module.exports = class ServidorWS{
	constructor(io){
		this.io = io;
	}

	lanzarSocketSrv(Servidor,juego){
		this.io.on("connection", (socket) => {
			Servidor.msgSocketOnConnection(Servidor,socket,juego);
			Servidor.msgSocketOnCrearPartida(Servidor,socket,juego);
			Servidor.msgSocketOnUnirAPartida(Servidor,socket,juego);
			Servidor.msgSocketAbandonarPartida(Servidor,socket,juego);
			Servidor.msgSocketOnIniciarPartida(Servidor,socket,juego);
		});
	}

	//---------On Servidor------------------
	msgSocketOnConnection(Servidor,socket,juego){
		socket.on("nuevaConexion", () => {
			console.log("nueva conexion", socket.id);
			Servidor.serverEnviarAcliente(socket,"conectado",Servidor.getNumJugInPartidas(juego));
			socket.join("acogida");
		});
	} //metodo terminado -> recuperar lista de partidas

	msgSocketOnCrearPartida(Servidor,socket,juego){
		socket.on("crearPartida", (num,nombre) => {
			let result = juego.crearPartida(parseInt(num),nombre);
			if(!("msg" in result)){
				console.log("Nueva partida : "+result.codigoPartida);
				socket.leave("acogida");
				socket.join(result.codigoPartida);
				Servidor.serverEnviarAcliente(socket,"partidaCreada",{"nombre":nombre,"codigo":result.codigoPartida,"isOwner":true});
				Servidor.serverEnviarARoom(socket,"acogida","nuevaPartidaDisponible",{"codigo":result.codigoPartida,"numJug":1,"numJugMax":num});
			}
			else
				Servidor.serverEnviarAcliente(socket,"partidaCreada",result);
		});
	} //metodo terminado, crear -> ir en lobby -> enviar nueva partida a otro jugadores en acogida

	msgSocketOnUnirAPartida(Servidor,socket,juego){
		socket.on("unirAPartida", (codigo,nick) => {
			var index = juego.partidaExiste(codigo);
			if(index.hasOwnProperty("msg")){
				console.log("No existe codigo "+codigo);
				Servidor.serverEnviarAcliente(socket,"unidoAPartida",{"msg":index.msg});
			} else {
				let partida = juego.getPartidas()[index];
				msg = partida.unirAPartida(nick);
				if(msg.unida == false){
					console.log("Partida completa: "+codigo);
					Servidor.serverEnviarAcliente(socket,"unidoAPartida",{"msg":msg.msg});
				} else {
					let usuarios = [];
					let ids = [];
					console.log(nick + " se unida a la partida con el codigo : " + codigo);
					socket.leave("acogida");
					socket.join(codigo);
					partida.getUsuarios().forEach(usuario => {usuarios.push(usuario.getNombre()); ids.push(usuario.getId())});
					msg = {"nombre":partida.getUsuarios()[partida.getNickOwner()].getNombre(),"codigo":partida.getCodigo(),"usuarios":usuarios, "ids":ids,"id":msg.id};
					Servidor.serverEnviarAcliente(socket,"unidoAPartida",msg);
					Servidor.serverEnviarARoom(socket,codigo,"UsuarioSeUnidaAPartida",{"nombre":nick,"estadoPartida":Servidor.getEstadoPartida(juego,index),"codigo":codigo,"ids":ids});
					Servidor.serverEnviarARoom(socket,"acogida","actualizarNumJug",{"codigo":partida.getCodigo(),"numJug":partida.getUsuarios().length,"numJugMax":partida.getNumUsuarios()});
				}
			}
		});
	} //metodo terminado -> unir a partida, enviar numJug para refrescar en acogida numero usuario en una partida

	msgSocketAbandonarPartida(Servidor,socket,juego){
		socket.on("abandonarPartida", (codigo,idBorrada) => {
			var index = juego.partidaExiste(codigo)
			let partida = juego.getPartidas()[index];
			partida.abandonarPartida(idBorrada);
			Servidor.serverEnviarARoom(socket,codigo,"UnUsuarioAbandonaPartida",idBorrada);
		});
	}

	msgSocketOnIniciarPartida(Servidor,socket,juego){
		socket.on("iniciarPartida", (codigo,id) => {
			var index = juego.partidaExiste(codigo);
			if(index.hasOwnProperty("msg")){
				console.log("No existe codigo "+codigo);
				Servidor.serverEnviarAcliente(socket,"unidoAPartida",{"msg":index.msg});
			} else {
				let isOwner = juego.comprobarOwner(index,id)
				if(id = isOwner){
					let result = juego.getPartidas()[index].iniciarPartida();
					Servidor.serverEnviarATodosEnRoom(codigo,"partidaIniciada",true);
				} else
					Servidor.serverEnviarAcliente(codigo,"partidaIniciada",isOwner.msg);
			}
		});
	} 

	//--------Emit Servidor-----------------
	serverEnviarARoom(socket,room,topic,msg){
		socket.to(room).emit(topic,msg);
	}

	serverEnviarATodosEnRoom(room,topic,msg){
		this.io.in(room).emit(topic,msg);
	}

	serverEnviarAcliente(socket,topic,msg){
		socket.emit(topic,msg);
	}

	serverEnviarATodos(topic,msg){
		this.io.sockets.emit(topic,msg);
	}

	serverEnviarASpecificcliente(socketId,topic,msg){
		this.io.to(socketId).emit(topic,msg);
	}

	//function del Servidor----------------
	getNumJugInPartidas(juego){
		let listaPartidas = [];
		juego.getPartidas().forEach(partida => {
			listaPartidas.push({"codigo":partida.getCodigo(),"numJug":partida.getUsuarios().length,"numJugMax":partida.getNumUsuarios()});
		});
		return listaPartidas;
	} //metodo terminado, para recuperar numero de jugadores antes de cargar la pagina de acogida

	getEstadoPartida(juego,index){
		juego.getPartidas()[index].getFase().validarPartida(juego.getPartidas()[index].getUsuarios(),juego.getPartidas()[index].getNumUsuarios());
		if(juego.getPartidas()[index].getFase().getEstado() == "Completado")
			return true;
		else
			return false;
	} //metodo para saber si partida con maximo usuario
}