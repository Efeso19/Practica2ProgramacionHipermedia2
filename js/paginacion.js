
mostrar="";
window.onload = viajes10();

var paginaActual = 1;
var paginasTotales;

function crearObjAjax(){
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}



function buscar(){

	var xmlhttp = crearObjAjax();
	url="rest/viaje/?";

	var tit = document.getElementById('n').value;
	var desc = document.getElementById('d').value;
	var fechaini = document.getElementById('fi').value;
	var fechafin = document.getElementById('ff').value;
	var valmin = document.getElementById('vi').value;
	var valmax = document.getElementById('vf').value;
	var autor = document.getElementById('l').value;
	var total = document.getElementById('bt').value;
	var pagina = 0;
	var pagPorRegis = 15;
	//alert(tit+" "+desc+" "+fechaini+" "+fechafin+" "+valmin+" "+valmax+" "+autor+" "+total);
	var aux=paginaActual-1//resta 1 a la pagina actual para poner pedirla

	url+="pag="+aux+"&";
	url+="lpag="+pagPorRegis+"&";

	if (total!="") {
		url+="bt="+total+"&";
	}else{
		if(tit!=""){
			url+="n="+tit+"&";
		}
		if(desc!=""){
			url+="d="+desc+"&";
		}
		if(fechaini!=null){
			url+="fi="+fechaini+"&";
		}
		if(fechafin!=null){
			url+="ff="+fechafin+"&";
		}
		if(valmin!=null){
			url+="vi="+valmin+"&";
		}
		if(valmax!=null){
			url+="vf="+valmax+"&";
		}
		if(autor!=""){
			url+="l="+autor+"&";
		}
	}

	xmlhttp.onreadystatechange = busqueda;
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
		function busqueda(){
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
				var res=JSON.parse(xmlhttp.responseText);
				console.log(res);
				if(res.TOTAL_COINCIDENCIAS<=pagPorRegis){
					paginasTotales=1;
				}else{
					paginasTotales=parseInt(res.TOTAL_COINCIDENCIAS/pagPorRegis);
					paginasTotales++;
				}
				
				var i=0;
				//Falta dar formato a la fecha
				for(i=0; i<res.FILAS.length;i++){
					var aux=res.FILAS[i].FECHA_INICIO;
					var parts = aux.split(' ');
					var parts2= parts[0].split('-');
					var pruebatonta="<a href='javascript:pasarvariable("+res.FILAS[i].ID+");'>";
					mostrar+="<article>"+pruebatonta+"<h3>"+res.FILAS[i].NOMBRE+"</h3></a><img src='fotos/"+res.FILAS[i].ID+"/"+res.FILAS[i].FOTO+"' alt='"+res.FILAS[i].DESCRIPCION_FOTO+"'/><div class='descripcionfoto'>"+res.FILAS[i].DESCRIPCION+" "+pruebatonta+"Ver más</a></div>Valoraci&oacute;n:<div class='star-rating'>"
					for(j=0; j<res.FILAS[i].VALORACION; j++){
						mostrar+="<a class='pintada'>&#9733;</a>"
					}
					for(j=0;j<(5-res.FILAS[i].VALORACION); j++){
						mostrar+="<a>&#9733;</a>"
					}
					mostrar+="</div>Fecha de creaci&oacute;n del viaje: <time datetime='"+res.FILAS[i].FECHA_INICIO+"'>";
					mostrar+=""+parts2[0]+"/"+parts2[1]+"/"+parts2[2]+"</time><br>"+res.FILAS[i].LOGIN+"</article>";
				}
				document.getElementById("imprimirBusqueda").innerHTML = mostrar;
				mostrar="";
				document.getElementById("ocultado").style.display = "block";
				document.getElementById("pagTot").innerHTML = " "+paginasTotales+" ";
				document.getElementById("pagActual").innerHTML = " "+paginaActual+" ";
				

			}
			else{
				alert("Hubo un problema con los datos devueltos");	
			}
		}
	}
	
	return false;

}

function updateMin(val, max){
	if(val<=max){
		document.getElementById('min').value=val; 
		document.getElementById('vi').value=val; 
	}else{
		document.getElementById('max').value=val;
		document.getElementById("vf").value=val; 
	}
}	

function updateMax(val, min){

	if(min>val){
		document.getElementById('max').value=min;
		document.getElementById("vf").value=min; 
	}else{
		document.getElementById('max').value=val; 
	}

	
}	


function viaje(id){	//GUARDA idruta EN WEBSTORAGE PARA RECUPERARLO EN ruta.html

	localStorage.setItem("idviaje", id);
	window.location.href="viaje.html";
	//window.location = "viaje.html?id=";

}

function viajes10(){
		
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
			mostrar+="<article><a href='javascript:pasarvariable("+res.FILAS[i].ID+");'><h3>"+res.FILAS[i].NOMBRE+"</h3></a><img src='fotos/"+res.FILAS[i].ID+"/"+res.FILAS[i].FOTO+"' alt='"+res.FILAS[i].DESCRIPCION_FOTO+"'/><div class='descripcionfoto'>"+res.FILAS[i].DESCRIPCION+" <a href='javascript:pasarvariable("+res.FILAS[i].ID+");'>Ver más</a></div>Valoraci&oacute;n:<div class='star-rating'>"
			for(j=0; j<res.FILAS[i].VALORACION; j++){
				mostrar+="<a class='pintada'>&#9733;</a>"
			}
			for(j=0;j<(5-res.FILAS[i].VALORACION); j++){
				mostrar+="<a>&#9733;</a>"
			}
			mostrar+="</div>Fecha de creaci&oacute;n del viaje: <time datetime='"+res.FILAS[i].FECHA_INICIO+"'>";
			mostrar+=""+parts2[0]+"/"+parts2[1]+"/"+parts2[2]+"</time><br>"+res.FILAS[i].LOGIN+"</article>";
		}
		
		//alert(mostrar);
		document.getElementById("imprimirBusqueda").innerHTML=mostrar;
		mostrar="";
	}

	xmlhttp.onreadystatechange = procesarCambio;
	xmlhttp.open('GET', 'rest/viaje/?u=10', true);	
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

paginasTotales=2;

function toPrev(){

	if(paginaActual>1){
		paginaActual-=1;
		buscar();
		console.log("he ido a la posicion anterior");
	}

}
function toFirst(){
	if(paginaActual>1){
		paginaActual=1;
		buscar();
		console.log("he ido a la primera pagina");
	}
}

function toNext(){
	if(paginaActual<paginasTotales){
		paginaActual+=1;
		buscar();
		console.log("he ido a la siguiente posicion");
	}
}

function toLast(){
	if(paginaActual<=paginasTotales){
		paginaActual=paginasTotales;
		buscar();
		console.log("he ido a la ultima");
	}
}

function mostrarOtrasOpciones(){

	document.getElementById("opcAvanzadas").style.display = "initial";
	document.getElementById("bt").value = "";
	document.getElementById("bt").disabled = true;
	document.getElementById("avanzada").style.display = "none";
	


}


function ocultarOtrasOpciones(){

	document.getElementById("opcAvanzadas").style.display = "none";
	document.getElementById("bt").value = "";
	document.getElementById("bt").disabled = false;
	document.getElementById("avanzada").style.display = "initial";
	


}

