var vectorFoto = [];
var vectorDesc = [];
var numFotos=0;
var idViajeCreado;
var x;
function declare(){
	x = document.querySelectorAll("#zonaParaFotos");
}



function updateValue(val){

	document.getElementById("valnum").value=val.value;

}

function mostrarFotoM(inp) {
	var div = inp.parentNode;
	
	var imagen = div.querySelector("img");
	
	fr = new FileReader();
		fr.onload = function() {
			imagen.src = fr.result;
		};

	fr.readAsDataURL(inp.files[0]);
}

function desc(cont){
	
	vectorDesc.push(document.getElementById("descripcion"+cont).value);
	//alert(vectorDesc[0]+" "+vectorDesc[1]+" "+vectorDesc[2]);
	console.log(vectorDesc);
}

function eliminarFoto(inp){
	var div = inp.parentNode.parentNode;
	div.removeChild(inp.parentNode);
	/*document.getElementById("avatar").style.display = "none";
	document.getElementById("foto").value ="";
	document.getElementById("mostrarFoto").src="";*/
}

function abrirFileDialog(){
	//falta por implementar

}



function anyadirFoto(){
	var div = document.createElement("DIV");//creo el div contenedor
	div.setAttribute("id","divcont");

	var input = document.createElement("INPUT");//creo el input 
	input.setAttribute("type", "file"); //modifico sus atributps
	input.setAttribute("name", "foto");
	input.setAttribute("id", "foto");
	input.setAttribute("onchange", "mostrarFotoM(this);");
	input.setAttribute("required", true);
	div.appendChild(input);//lo anyado al div

	var divimg = document.createElement("DIV");//contenedor de la iamgen y su error
	divimg.setAttribute("id", "divimg");

	var img = document.createElement("IMG");//creo la imagen
	img.setAttribute("id", "mostrarFoto"); //modifico sus atbos
	img.setAttribute("name", "mostrarFoto");
	img.setAttribute("class", "fotossubidas");
	img.setAttribute("src", "fotos/imagenNoDisponible.jpg");
	img.setAttribute("for", "foto");
	img.setAttribute("onclick", "abrirFileDialog();")
	divimg.appendChild(img); //la anyado al div

	var error = document.createElement("p");
	error.appendChild( document.createTextNode("Error. La imagen pesa mas de 2MB."));
	error.setAttribute("id", "perror");
	divimg.appendChild(error);

	div.appendChild(divimg);
	var desc = document.createElement("TEXTAREA");//creo la imagen
	desc.setAttribute("id", "descripcion"); 
	desc.setAttribute("name", "descripcion");
	desc.setAttribute("class", "textpadding");
	desc.setAttribute("placeholder", "Descripción de la foto"); 
	desc.setAttribute("rows", 6);
	desc.setAttribute("cols", 20);
	desc.setAttribute("required", true);
	div.appendChild(desc);

	var fecha = document.createElement("INPUT");
	fecha.setAttribute("id", "fecha"); 
	fecha.setAttribute("name", "fecha");
	fecha.setAttribute("type", "date");
	fecha.setAttribute("required", true);
	fecha.setAttribute("id", "fechafoto")
	div.appendChild(fecha);

	var button = document.createElement("INPUT");
	button.setAttribute("type", "button");
	button.setAttribute("onclick", "eliminarFoto(this);");
	button.setAttribute("id", "button");
	button.setAttribute("value", "Eliminar");
	div.appendChild(button);

	document.getElementById("zonaParaFotos").appendChild(div);
}

function main(frm){
		alert("aaaaaaa");
	crearViaje(frm);
		alert("asdasdsad");


}

function crearViaje(frm){
	
	var fd = new FormData();
	xmlhttp = new crearObjAjax();
	var url = "rest/viaje/";
	fd.append("nombre", document.getElementById("nombre").value);
	fd.append("descripcion", document.getElementById("descripcion").value);
	fd.append("fi", document.getElementById("fi").value);
	fd.append("ff", document.getElementById("ff").value);
	fd.append("v", document.getElementById("valnum").value);
	fd.append("login", sessionStorage.getItem("login"));
	fd.append("clave", sessionStorage.getItem("clave"));
	
	xmlhttp.onload = function(){
		//alert(xmlhttp.readyState+" "+xmlhttp.status);
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var res = JSON.parse(xmlhttp.responseText);
				console.log(res.ID_VIAJE);
				idViajeCreado=res.ID_VIAJE;
				var i=0;
				if(x[0].children.length<2){
					console.log(x[0].children);
					document.getElementById("transparencia").style.display = "block";
					document.getElementById("errorEnCrear").style.display="initial";
				}else{
					for(i=1; i<x[0].children.length; i++){
						subirFotos(i);
					}
					document.getElementById("transparencia").style.display = "block";
					document.getElementById("viajeCreado").style.display = "initial";
				}
				/*if(x){
						alert(x[0].children.length);
				}*/
				
				
			}else{

			}
		}


	};

	xmlhttp.open("POST", url, true);
	console.log(fd)
	xmlhttp.send(fd);

	return false;

}

function subirFotos(it){
	var xmlhttp = new crearObjAjax();
	var fd = new FormData();
	var url = "rest/foto/";
	//var x = document.querySelectorAll("#zonaParaFotos");//nos devuelve todos los divs
	console.log(x);
	//alert(x[0].children.length);
	//alert(x[0].children[0]);
	if(x[0].children[1].querySelector("#foto").files[0].size<=2*1024*1024){//IMPORTANTE cambia el 1 por un 2, ayq ue son 2 megas
		fd.append("clave", sessionStorage.getItem("clave"));
		fd.append("login", sessionStorage.getItem("login"));
		console.log(x[0]);
		console.log(x[0].children[it]);
		console.log(x[0].children[it].children[1]);
		console.log(x[0].children[it].children[1].querySelector("#perror"));
		console.log(x[0].children[it].children[1].querySelector("#perror").style.display);
		fd.append("foto", x[0].children[it].querySelector("#foto").files[0]);
		fd.append("fecha", x[0].children[it].querySelector("#fecha"));
		fd.append("descripcion", x[0].children[it].querySelector("#descripcion").value);
		fd.append("id_viaje", idViajeCreado);

		xmlhttp.onload = function(){
		//alert(xmlhttp.readyState+" "+xmlhttp.status);
			if(xmlhttp.readyState == 4){
				if(xmlhttp.status == 200){
					var res = eval( '(' + xmlhttp.responseText + ')' );

				}else{

				}
			}

		};

		xmlhttp.open("POST", url, true);
		xmlhttp.send(fd);	
	}else{

		x[0].children[it].children[1].querySelector("#mostrarFoto").style.opacity = 0.3;
		x[0].children[it].children[1].querySelector("#perror").style.border = "solid red";
		x[0].children[it].children[1].querySelector("#perror").style.backgroundColor = "rgba(255, 0, 0, 0.3)";
		x[0].children[it].children[1].querySelector("#perror").style.opacity = 1;
	}
	

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

function ToStateInitial(){
	document.getElementById("transparencia").style.display = "none";
	document.getElementById("errorEnCrear").style.display="none";
}

function ToInicio(){

	window.location.replace("index.html");

}