
window.onload = pedirInfoViaje();
var mostrar="";

function pedirInfoViaje(){
	if(localStorage.getItem("idviaje") == null){
		window.location = "index.html";
	}

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onload = function(){

		var res = JSON.parse(xmlhttp.responseText);
		console.log(res);
		/*Los atributos de la respuesta que forman parte del array
			DESCRIPCION
			FECHA_FIN
			FECHA_INICIO
			ID
			LOGIN
			NOMBRE
			VALORACION
		*/
		//falta formatear las fechas
		var mostrar="";
		var aux=res.FILAS[0].FECHA_INICIO;
		var parts = aux.split(' ');
		var parts2= parts[0].split('-');

		mostrar="<h2>"+res.FILAS[0].NOMBRE+"</h2><br><div><b>Desde</b>:<time datetime='"+res.FILAS[0].FECHA_INICIO+"'> ";
		mostrar+=""+parts2[0]+"/"+parts2[1]+"/"+parts2[2]+"</time><b> hasta: </b><time datetime='"+res.FILAS[0].FECHA_FIN+"'> ";
		var aux=res.FILAS[0].FECHA_FIN;
		var parts = aux.split(' ');
		var parts2= parts[0].split('-');
		
		mostrar+=""+parts2[0]+"/"+parts2[1]+"/"+parts2[2]+"</time></div>";
		mostrar+="<p><b>Descripci&oacute;n</b>: "+res.FILAS[0].DESCRIPCION+"</p><br><div><b>Valoraci&oacute;n</b>:</div><div class='star-rating'>";
		for(i=0; i<res.FILAS[0].VALORACION; i++){
			mostrar+="<a class='pintada'>&#9733;</a>";
		}
		for(j=0;j<(5-res.FILAS[0].VALORACION); j++){
			mostrar+="<a>&#9733;</a>";
		}
		mostrar+="</div><div><a>"+res.FILAS[0].LOGIN+"</a></div>";
	
		document.getElementById("idParaImprimirElViaje").innerHTML=mostrar;

	}

	xmlhttp.open('GET', 'rest/viaje/'+localStorage.getItem("idviaje"), true);
	xmlhttp.send();


}






