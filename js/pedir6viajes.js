window.onload = viajes();
var mostrar="";

function viaje(id){	//GUARDA idruta EN WEBSTORAGE PARA RECUPERARLO EN ruta.html

	localStorage.setItem("idviaje", id);
	window.location.href="viaje.html";
	//window.location = "viaje.html?id=";

}


function viajes(){
		
	var xmlhttp = new XMLHttpRequest();		

	xmlhttp.onload = function(){
		
		var res = JSON.parse(xmlhttp.responseText);
		//console.log(res);
		/*Los atributos de la respuesta que forman parte del array
			ID
			NOMBRE
			DESCRIPCION
			FECHA_INICIO
			FECHA_FIN
			VALORACION
			LOGIN
			FOTO
			DESCRIPCION_FOTO
			NFOTOS
			NCOMENTARIOS
		*/
		var i=0;
		//Falta dar formato a la fecha
		for(i=0; i<res.FILAS.length;i++){
			var aux=res.FILAS[i].FECHA_INICIO;
			var parts = aux.split(' ');
			var parts2= parts[0].split('-');
			mostrar+="<article><a href='javascript:pasarvariable("+res.FILAS[i].ID+");'><h3>"+res.FILAS[i].NOMBRE+"</h3></a><img src='fotos/"+res.FILAS[i].ID+"/"+res.FILAS[i].FOTO+"' alt='"+res.FILAS[i].DESCRIPCION_FOTO+"'/><div class='descripcionfoto'>"+res.FILAS[i].DESCRIPCION+" <a href='javascript:viaje("+res.FILAS[i].ID+");'>Ver más</a></div>Valoraci&oacute;n:<div class='star-rating'>"
			for(j=0; j<res.FILAS[i].VALORACION; j++){
				mostrar+="<a class='pintada'>&#9733;</a>"
			}
			for(j=0;j<(5-res.FILAS[i].VALORACION); j++){
				mostrar+="<a>&#9733;</a>"
			}
			mostrar+="</div>Fecha de creaci&oacute;n del viaje: <time datetime='"+res.FILAS[i].FECHA_INICIO+"'>";
			mostrar+=""+parts2[0]+"/"+parts2[1]+"/"+parts2[2]+"</time><br>"+res.FILAS[i].LOGIN+"</article>";
		}
		
		
		document.getElementById("centrarultimos5viajes").innerHTML=mostrar;
		
	}

	xmlhttp.onreadystatechange = procesarCambio;
	xmlhttp.open('GET', 'rest/viaje/?u=6', true);	
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

function pasarvariable(valor){
	location.href="viaje.html?id="+valor+"";
	localStorage.setItem("idviaje", valor);
	return location.href;
}

