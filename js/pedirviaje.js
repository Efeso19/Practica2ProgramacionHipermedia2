





//Funcion para parsear las urls
function parseURLParams(url) {
	var queryStart = url.indexOf("?") + 1,
	queryEnd   = url.indexOf("#") + 1 || url.length + 1,
	query = url.slice(queryStart, queryEnd - 1),
	pairs = query.replace(/\+/g, " ").split("&"),
	parms = {}, i, n, v, nv;

	if (query === url || query === "") {
		return;
	}

	for (i = 0; i < pairs.length; i++) {
		nv = pairs[i].split("=");
		n = decodeURIComponent(nv[0]);
		v = decodeURIComponent(nv[1]);

		if (!parms.hasOwnProperty(n)) {
			parms[n] = [];
		}

		parms[n].push(nv.length === 2 ? v : null);
	}
	return parms;
}

//alert(window.location);



window.onload = pedirInfoViaje();
var mostrar="";

function pedirInfoViaje(){	
	/*var urlNum = window.location.href.split('?').pop();
	alert(urlNum[3]);*/
	//alert(window.location.href);
	var idrec=parseURLParams(window.location.href);
	console.log(idrec);

	if(localStorage.getItem("idviaje") == null){
		window.location = "index.html";
	}else{

		if(idrec.id[0]==localStorage.getItem("idviaje")){
			//comprobamos que el id que nos pasan por parametro es el mismo que el que guardamos en el localStorage
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
		}else{
			window.location = "index.html";
		}
	}




}






