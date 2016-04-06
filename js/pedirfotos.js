window.onload = pedirInfoViaje();
var mostrarfotos="";

function pedirInfoViaje(){

	var xmlhttpf = new XMLHttpRequest();

	xmlhttpf.onload = function(){

		var resfoto = JSON.parse(xmlhttpf.responseText);
		console.log(resfoto);
		/*Los atributos de la respuesta que forman parte del array
			DESCRIPCION
			FECHA
			FICHERO
			ID
			ID_VIAJE
		*/
		//falta formatear la fecha
		for(i=0; i<resfoto.FILAS.length; i++){
			//debo mostrar un titulo? es que no hay al recuperar la foto y si no lo pongo al validarlo en w3c da error
			//mostrarfotos+="<article><h3 display='none'>TITULO</h3></article>";
			var aux=resfoto.FILAS[i].FECHA;
			var parts = aux.split(' ');
			var parts2= parts[0].split('-');
			mostrarfotos+="<article><br><img src='fotos/"+resfoto.FILAS[i].ID_VIAJE+"/"+resfoto.FILAS[i].FICHERO+"'>";
			mostrarfotos+="<br><p>Fecha de la publicación: <time datetime='"+resfoto.FILAS[i].FECHA+"'>";

			mostrarfotos+=""+parts2[0]+"/"+parts2[1]+"/"+parts2[2]+"</time></p>";
			mostrarfotos+="<div>"+resfoto.FILAS[i].DESCRIPCION+"</div></article>";
		}
		
		
		/*
		if(typeof aux == 'datetime' ){
			alert("la fecha es un datetime");
		}else if(typeof aux == 'string'){
			alert("la fecha es un string "+parts[0]+" "+parts[1]);
			alert(parts2[0]+parts2[1]+parts2[2]);
		}else{
			alert("no sé que tipo de dato es");
		}

		*/
		document.getElementById("paracentrar").innerHTML=mostrarfotos;



	}

	xmlhttpf.open('GET', 'rest/foto/?id_viaje='+localStorage.getItem("idviaje"), true);
	xmlhttpf.send();
	
	//alert('rest/foto/?id_viaje='+localStorage.getItem("idviaje"));

}