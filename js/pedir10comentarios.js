window.onload=comentarios();

var mostrarC="";

function comentario(id){	//GUARDA idruta EN WEBSTORAGE PARA RECUPERARLO EN ruta.html

	localStorage.setItem("idcomentario", id);
	window.location = "viaje.html#cajaDeComentarios";

}

function viaje(id){	//GUARDA idruta EN WEBSTORAGE PARA RECUPERARLO EN ruta.html

	localStorage.setItem("idviaje", id);
	window.location = "viaje.html";

}

function comentarios(){

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onload = function(){

		var res=JSON.parse(xmlhttp.responseText);
		console.log(res);
		/*Los atributos de la respuesta que forman parte del array
			ID
			FECHAHORA
			ID_VIAJE
			LOGIN
			NOMBRE_VIAJE
			TEXTO
			TITULO
		*/
		/*
		<article>
					<a href="viaje.html#cajaDeComentarios"><h4>T&iacute;tulo del comentario</h4></a>
					<em>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em>
					<br>
					<p>AutorDelComentario, <time datetime="2015-05-26T23:50">2015/05/26 22:55</time>
					</p>
					<span class="cortar">
					 TituloDelViaje esto es una prueba para cortar el titulo del comentario y poner los ... al final de la linea.
					</span>
				</article>
		*/
		//Falta dar formato a la fecha
		var i=0;
		for(i=0; i<res.FILAS.length;i++){
			mostrarC+="<article><a href='javascript:comentario("+res.FILAS[i].ID_VIAJE+")'><h4>"+res.FILAS[i].TITULO+"</h4></a><em>"+res.FILAS[i].TEXTO+"</em><br><p>"+res.FILAS[i].LOGIN+", <time datetime='"+res.FILAS[i].FECHAHORA+"'>"+res.FILAS[i].FECHAHORA+"</time></p><span class='cortar'><a href='javascript:viaje("+res.FILAS[i].ID_VIAJE+");''>"+res.FILAS[i].NOMBRE_VIAJE+"</a></span></article>";
		}



		document.getElementById("ultimos10comentariosID").innerHTML=mostrarC;

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