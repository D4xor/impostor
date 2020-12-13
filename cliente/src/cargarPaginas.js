// var div; var row; var col; var divElement; var h1; var h3; var input; var button; var span; var form;

// function alerta(data,typAlert){
// 	var alerta = `<div class="alert ${typAlert} alert-dismissible fade show" role="alert">`;
// 	alerta += '<strong>'+data+'</strong>';
// 	alerta +=  '<button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>';
// 	alerta += '</div>';

// 	document.getElementById("alert").innerHTML = alerta;
// } //metodo terminado, solo para alertar si una cosa no expecta pasa

// function cargarAcogida(){
// 	document.getElementById('acogida').innerHTML = '';
// 	document.getElementById('lobby').innerHTML = '';

// 	//Aqui titulo
// 	div = document.createElement("div");
// 	div.className = "container-fluid";
// 		h1 = document.createElement("h1");
// 		h1.className = "pt-4 text-center";
// 		h1.textContent = "Bienvenida al juego de Impostor";
// 	div.appendChild(h1);
// 	document.getElementById("acogida").appendChild(div);

// 	//Aqui creacion del formulario de creacion de partida
// 	div = document.createElement("div");
// 	div.className = "container-fluid";
// 		row = document.createElement("div");
// 		row.className = "pt-4 row";

// 	//creacion de col 1 creacion de partida
// 			col = document.createElement("div");
// 			col.id = "creacionPartida";
// 			col.className = "col-sm border-right";
// 				h1 = document.createElement("h1");
// 				h1.className = "mb-4";
// 				h1.textContent = "Crear una partida";
// 				col.appendChild(h1);

// 				input = document.createElement("input");
// 				input.id = "nombrePartOwnInit";
// 				input.className = "mb-4 form-control form-control-lg";
// 				input.type = "text";
// 				input.placeholder = "Escribe tu nombre";
// 				col.appendChild(input);

// 				input = document.createElement("input");
// 				input.id = "numJugPartInit";
// 				input.className = "mb-4 form-control form-control-lg";
// 				input.type = "text";
// 				input.placeholder = "Numero de jugadores";
// 				col.appendChild(input);

// 				button = document.createElement("button");
// 				button.style.width = "100%";
// 				button.id = "btnCrearPartida";
// 				button.className = "mb-4 btn btn-primary btn-lg";
// 				button.setAttribute('onclick',"dataCrearPartida()");
// 				button.textContent = "Crear partida";
// 				col.appendChild(button);
// 		row.appendChild(col);
// 	//creacion de col 2 unir y lista de partida
// 			col = document.createElement("div");
// 			col.id = "listaPartidas";
// 			col.className = "col-sm border-left";
// 				h1 = document.createElement("h1");
// 				h1.className = "mb-4";
// 				h1.textContent = "Lista de partida";
// 				col.appendChild(h1);
// 		row.appendChild(col);

// 		div.appendChild(row);
// 	document.getElementById("acogida").appendChild(div);
// } //metodo terminado, para cargar elementos principales de la pagina

// function cargarListaPartidas(data){
// 	if(data == false){
// 		if(!(document.getElementsByTagName("h3")[0])){
// 			h3 = document.createElement("h3");
// 			h3.textContent = "No hay partida disponible";
// 			document.getElementById("listaPartidas").appendChild(h3);
// 		}
// 	} else {
// 		if(document.getElementsByTagName("h3")[0])
// 			document.getElementsByTagName("h3")[0].remove();
// 		data.forEach( partida => {
// 			row = document.createElement("div");
// 			row.className = "mb-4 row";
// 				col = document.createElement("div");
// 				col.className = "col";

// 					input = document.createElement("input");
// 					input.id = `inp${partida.codigo}`;
// 					input.className = "form-control form-control-lg";
// 					input.type = "text";
// 					input.placeholder = "Escribe tu nombre";
// 					col.appendChild(input);
// 				col.appendChild(input);
// 			row.appendChild(col);

// 				col = document.createElement("div");
// 				col.className = "col";

// 					button = document.createElement("button");
// 					button.style.width = "100%";
// 					button.id = `btn${partida.codigo}`;
// 					button.className = "btn btn-lg btn-primary";
// 					button.setAttribute('onclick',`dataUnirAPartida("${partida.codigo}")`);
// 					button.textContent = `${partida.codigo}`;

// 					span = document.createElement("span");
// 					span.id = `span${partida.codigo}`;
// 					span.className = "ml-1 badge bg-secondary";
// 					span.textContent = `${partida.numJug}/${partida.numJugMax}`;

// 					if(partida.numJug == partida.numJugMax){
// 						button.disabled = true;
// 						button.className = "btn btn-lg btn-secondary";
// 						span.className = "ml-1 badge bg-dark";
// 					}

// 					button.appendChild(span);
// 				col.appendChild(button);
// 			row.appendChild(col);
// 			document.getElementById("listaPartidas").appendChild(row);
// 		});
// 	}
// } //metodo terminado, parar cargar la lista cuando se arriva en la acogida la primera vez

// function anadirPartida(data){
// 	if(document.getElementsByTagName("h3")[0])
// 		document.getElementsByTagName("h3")[0].remove();
	
// 	row = document.createElement("div");
// 		row.className = "mb-4 row";
// 			col = document.createElement("div");
// 			col.className = "col";

// 				input = document.createElement("input");
// 				input.id = `inp${data.codigo}`;
// 				input.className = "form-control form-control-lg";
// 				input.type = "text";
// 				input.placeholder = "Escribe tu nombre";
// 				col.appendChild(input);
// 			col.appendChild(input);
// 		row.appendChild(col);

// 			col = document.createElement("div");
// 			col.className = "col";

// 				button = document.createElement("button");
// 				button.style.width = "100%";
// 				button.id = `btn${data.codigo}`;
// 				button.className = "btn btn-lg btn-primary";
// 				button.setAttribute('onclick',`dataUnirAPartida("${data.codigo}")`);
// 				button.textContent = `${data.codigo}`;

// 				span = document.createElement("span");
// 				span.id = `span${data.codigo}`;
// 				span.className = "ml-1 badge bg-secondary";
// 				span.textContent = `${data.numJug}/${data.numJugMax}`;

// 				button.appendChild(span);
// 			col.appendChild(button);
// 		row.appendChild(col);
// 		document.getElementById("listaPartidas").appendChild(row);
// } // metodo terminado, para anadir la nueva partida creada a persona en sala de espera

// function refrescarNumeroUsuarioEnPartida(data){
// 	if(data.numJug == data.numJugMax){
// 		document.getElementById("btn"+data.codigo).disabled = true;
// 		document.getElementById("btn"+data.codigo).className = "btn btn-lg btn-secondary";
// 		document.getElementById("span"+data.codigo).className = "ml-1 badge bg-dark";
// 	}

// 	document.getElementById("span"+data.codigo).textContent = data.numJug+"/"+data.numJugMax;
// } // metodo terminado, para resfrescar sin refrescar la pagina el numero de usuario en una partida

// function cargarSalaEspera(data){
// 	//Aqui titulo
// 	document.getElementById("acogida").innerHTML = '';
// 	div = document.createElement("div");
// 	div.className = "container-fluid";
// 	row = document.createElement("div");
// 	row.id = "infosPartida";
// 	row.className = "row justify-content-center";

// 			h1 = document.createElement("h1");
// 			h1.className = "pt-4 text-center";
// 			h1.textContent = "Sala de espera";

// 		h3 = document.createElement("h3");
// 		h3.className = "pt-4 text-center";
// 		h3.textContent = "Creador: "+data.nombre+" | Codigo: "+data.codigo;

// 	row.appendChild(h1);
// 	row.appendChild(h3);

// 	div.appendChild(row);
// 	document.getElementById("lobby").appendChild(div);

// 	div = document.createElement("div");
// 	div.className = "container-fluid";
// 	div.id = "listaJugadores";

// 	document.getElementById("lobby").appendChild(div);
// 	alerta("Accesso a sala de espera","alert-success");
// } // metodo terminado, para crear la sala de espera

// function cargarListaJugSalaEsp(usuarios){
// 	usuarios.forEach(nombre => {
// 		h3 = document.createElement("h3");
// 		h3.className = "pt-4 text-center";
// 		h3.textContent = nombre;

// 		document.getElementById("listaJugadores").appendChild(h3);
// 	});
// }//metodo terminado para cargar jugadores antes de anadir a sala de espera

// function anadirASalaEspera(nombre){
// 	h3 = document.createElement("h3");
// 	h3.className = "pt-4 text-center";
// 	h3.textContent = nombre;

// 	document.getElementById("listaJugadores").appendChild(h3);
// }// metodo terminado para anadir a sala de espera

// function addBtnToOwner(isOwner){
// 		if(isOwner == true){

// 			button = document.createElement("button");
// 			button.id = "btnEspera";
// 			button.className = "btn btn-primary";
// 			button.type = "submit";
// 			button.disabled = true;
// 			button.style.width = "250px";
// 			button.textContent = "Esperando jugadores...";

// 			span = document.createElement("span");
// 			span.className="spinner-border spinner-border-sm"
// 			span.role = "status";
// 			span.ariaHidden = true;

// 			button.appendChild(span);

// 		document.getElementById("infosPartida").appendChild(button);
// 	}
// }

// function updateBtnLobby(codigo){
// 	if(document.getElementById("btnEspera")){
// 		button = document.getElementById("btnEspera");
// 		button.id = "btnLanzar";
// 		button.disabled = false;
// 		button.textContent = "Iniciar Partida"
// 		button.setAttribute('onclick',`lanzarPartida("${codigo}")`);
// 	}
// }

// function removeUsuarioFromList(data){
// 	document.querySelectorAll("h3")[data+1].remove();
// }