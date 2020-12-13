//generic function for clienteRest API
function request(method,url,datas){
	if(datas!=null){
		let concatParams = "";
		for(let i = 0; i < datas.length; i++){
			concatParams+= "/"+datas[i];
		}
		url = url+concatParams;
    }
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200)
			document.write = this.response;
	}
	xhttp.open(method,url,true);
	xhttp.send();
}

//---------All functions for specific actions---------
function iniciarJuego(){
	request("GET", "http://localhost:5000/juego", null);
}