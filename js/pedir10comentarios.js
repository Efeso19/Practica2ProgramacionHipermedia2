window.onload=comentarios();

var foo = [];
for (var i = 1; i <= 10; i++) {
   foo.push(i);
}
var mostrarC="";

function recargar(){
	var vacio="";
	
	document.getElementById("ultimos10comentariosID").innerHTML = vacio;
	comentarios();
			
}

function comentario(id){	//GUARDA idruta EN WEBSTORAGE PARA RECUPERARLO EN ruta.html

	localStorage.setItem("idcomentario", id);
	window.location = "viaje.html#cajaDeComentarios";

}

function viaje(id){	//GUARDA idruta EN WEBSTORAGE PARA RECUPERARLO EN ruta.html

	localStorage.setItem("idviaje", id);
	window.location = "viaje.html";

}

function comentarios(){
	//alert("he entrado a la funcion comentarios");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onload = function(){

		var res=JSON.parse(xmlhttp.responseText);
		//console.log(res);
		/*Los atributos de la respuesta que forman parte del array
			ID
			FECHAHORA
			ID_VIAJE
			LOGIN
			NOMBRE_VIAJE
			TEXTO
			TITULO
		*/
		//falta dar formato a la fecha
		mostrarC="";
		var i=0;
		for(i=0; i<res.FILAS.length;i++){
			var aux=res.FILAS[i].FECHAHORA;
			var parts = aux.split(' ');
			var parts2 = parts[0].split('-');
			var parts3 = parts[1].split(':')
			
			uno = res.FILAS[i].ID_VIAJE;
			dos = res.FILAS[i].ID;
//alert(res.FILAS[i].ID_VIAJE+","+res.FILAS[i].ID+","+i);
			mostrarC+="<article><a href='javascript:pasarvariable("+res.FILAS[i].ID_VIAJE+", "+res.FILAS[i].ID+");'><h4>"+res.FILAS[i].TITULO+"</h4></a><em>"+res.FILAS[i].TEXTO+"</em><br><p>"+res.FILAS[i].LOGIN+", <time datetime='"+res.FILAS[i].FECHAHORA+"'>";
			
			mostrarC+=""+parts2[2]+"/"+parts2[1]+"/"+parts2[0]+", "+parts3[0]+":"+parts3[1]+"</time></p><span class='cortar'><a href='javascript:viaje("+res.FILAS[i].ID_VIAJE+");''>"+res.FILAS[i].NOMBRE_VIAJE+"</a></span></article>";
			mostarC="";
		}
		//alert(mostrarC);
		document.getElementById("ultimos10comentariosID").innerHTML=mostrarC;
		delete xmlhttp;
	}

	xmlhttp.onreadystatechange = procesarCambio;
	xmlhttp.open('GET', 'rest/comentario/?u=10', true);
	xmlhttp.send();


	function procesarCambio(){
		/*el objeto tiene 5 estados y .readyState devuelve el valor del estado. Estos son sus estados:
			0: request not initialized 
			1: server connection established
			2: request received 
			3: processing request 
			4: request finished and response is ready
		el emtodo .status devuelve dos valores:
			200: "OK"
			404: Page not found
		*/	
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				
			}
			else{
				alert("Hubo un problema con los datos devueltos");	
			}
		}
	}
	
	return false;

}

function pasarvariable(valor, comen){
	//alert("he ntrado "+valor+ " "+comen);
	//alert(comen);
	console.log(comen);

	/*if(isNaN(comen)==false){
		alert("cargo en la puta");
		location.href="viaje.html?id="+valor+"";
	}else{
		alert("me vuelvo a cagar en la puta"+comen);
		location.href="viaje.html?id="+valor+"&comen="+comen+"";
	}*/
	location.href="viaje.html?id="+valor+"&comen="+comen+"";
	localStorage.setItem("idviaje", valor);
	localStorage.setItem("idcomentario", comen);
	return location.href;
}

