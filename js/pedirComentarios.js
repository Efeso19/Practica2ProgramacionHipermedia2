window.onload = main();

var mostrar="";

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

	var idrec=parseURLParams(window.location.href);
	console.log(idrec);




function main(){

	pedirComentarios();
	cajaDeComentarios();

}
var hayComentario=false;
if(localStorage.getItem("idcomentario") != null && localStorage.getItem("idcomentario").localeCompare(undefined)!=0){
	hayComentario=true;
	console.log(hayComentario);
}
function pedirComentarios(){
	if(localStorage.getItem("id_viaje") == null){
		window.location = "index.html";
	}
	

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onload = function(){

		var res = JSON.parse(xmlhttp.responseText);
		console.log(res);
		/*Los atributos de la respuesta que forman parte del array
			FECHAHORA
			ID
			ID_VIAJE
			LOGIN
			TEXTO
			TITULO
		*/
		//falta formatear las fechas
		for(i=0; i<res.FILAS.length; i++){
			var aux=res.FILAS[i].FECHAHORA;
			var parts = aux.split(' ');
			var parts2= parts[0].split('-');
			mostrar+="<article id='"+res.FILAS[i].ID+"'><h4>"+res.FILAS[i].TITULO+"</h4><em>"+res.FILAS[i].TEXTO+"</em><br><p><button onclick='respondiendo("+res.FILAS[i].ID+")'>Responder</button>"+res.FILAS[i].LOGIN+", <time datetime='"+res.FILAS[i].FECHAHORA+"'>";
			mostrar+=""+parts2[0]+"/"+parts2[1]+"/"+parts2[2]+"</time></p>";
			mostrar+="</article>";	
		}




		document.getElementById("ParaImprimirLosComentarios").innerHTML=mostrar;
		if(hayComentario && localStorage.getItem("idcomentario").localeCompare(undefined)!=0){
			//no termina de hacer el foco!!!!!

			var idaux=idrec.comen[0];
			document.getElementById("ParaImprimirLosComentarios").focus();
		}else{
			//alert("no se ha actualizado la variable");
		}
location.hash="#"+localStorage.getItem('idcomentario');
	}
										
	xmlhttp.open('GET', 'rest/comentario/?id_viaje='+localStorage.getItem("idviaje"), true);
	xmlhttp.send();

}

function cajaDeComentarios(){
	if(sessionStorage.getItem('logged')){
		var mostrar="";
		mostrar+="<h2>¡Comenta!</h2><br><div class='paracentrar'><form name='formcomentario' id='formcomentario' onsubmit='return realizarComentario(this);'><label for='titulo'>T&iacute;tulo del comentario</label><br><input type='text' id='titulo' name='titulo' placeholder='Título' maxlength='50'><br><label for='texto'>Comentario</label><br><textarea id='texto' name='texto' maxlength='500' placeholder='Máximo 500 caractéres' rows='4' cols='50' required></textarea><input type='submit' value='Comentar'></form>";
		document.getElementById("mostrarCajadecomentarios").innerHTML = mostrar;
		//document.getElementById("ParaImprimirLosComentarios").innerHTML = aaaaaaa;
	}else{
		document.getElementById("mostrarCajadecomentarios").style.display = "none";
	}
}


function realizarComentario(form){

	var fd = new FormData();
	var xmlhttp = crearObjAjax();
	var url="rest/comentario/";
			
	fd.append('login', sessionStorage.login);
	fd.append('clave', sessionStorage.clave);
	fd.append('id_viaje', localStorage.idviaje);
	fd.append('titulo', document.getElementById('titulo').value);
	fd.append('texto', document.getElementById('texto').value);
	
	xmlhttp.onreadystatechange = procesarCambioComentario;
	xmlhttp.open("POST", url, true);
	xmlhttp.send(fd);

	function procesarCambioComentario(){
		//alert(xmlhttp.readyState+" "+xmlhttp.status+" "+xmlhttp.responseText);
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
			
			}else{
				//alert("Hubo algun problema, tu lo crees?");
			}
		}


	}
	form.reset();//para limpiar el formulario
	document.getElementById("ParaImprimirLosComentarios").innerHTML="";//para limpiar la zona de comentarios
	//pedirComentarios();
	comentarioyarealizado();
	
	return false;
	
}

function crearObjAjax(){
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;

}

function comentarioyarealizado(){
	//falta hacer
	location.reload();
	alert("jum");
	window.setTimeout(document.getElementById("mensajeComentarioOk").style.display="initial", 2000);
	

}

function respondiendo(id){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onload = function(){

		var res = JSON.parse(xmlhttp.responseText);
		
		document.getElementById("titulo").blur();
		document.getElementById("titulo").value="Re: "+res.FILAS[0].TITULO;
		document.getElementById("texto").focus();
		
		
	}
	xmlhttp.open('GET', 'rest/comentario/'+id, true);
	xmlhttp.send();

	

}



