var vectorFoto = [];
var vectorDesc = [];
var numFotos=0;

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



function anyadirFoto(){

	var div = document.createElement("DIV");//creo el div contenedor
	
	var input = document.createElement("INPUT");//creo el input 
	input.setAttribute("type", "file"); //modifico sus atributps
	input.setAttribute("name", "foto");
	input.setAttribute("id", "foto");
	input.setAttribute("onchange", "mostrarFotoM(this);");
	div.appendChild(input);//lo anyado al div

	var img = document.createElement("IMG");//creo la imagen
	img.setAttribute("id", "mostrarFoto"); //modifico sus atbos
	img.setAttribute("name", "mostrarFoto");
	img.setAttribute("class", "fotossubidas");
	div.appendChild(img); //la anyado al div

	var desc = document.createElement("TEXTAREA");//creo la imagen
	desc.setAttribute("id", "descripcion"); 
	desc.setAttribute("name", "descripcion");
	desc.setAttribute("class", "textpadding");
	desc.setAttribute("palceholder", "Descripci&oacute;n de la foto"); 
	desc.setAttribute("rows", 6);
	desc.setAttribute("cols", 20);
	div.appendChild(desc);

	var fecha = document.createElement("INPUT");
	fecha.setAttribute("id", "descripcion"); 
	fecha.setAttribute("name", "descripcion");
	fecha.setAttribute("type", "date");
	div.appendChild(fecha);

	var button = document.createElement("INPUT");
	button.setAttribute("type", "button");
	button.setAttribute("onclick", "eliminarFoto(this);");
	button.setAttribute("id", "button");
	button.setAttribute("value", "Eliminar");
	div.appendChild(button);

	document.getElementById("zonaParaFotos").appendChild(div);

/*
	var mostrar = <input type='file' 
	name='foto"+numFotos+"' id='foto"+numFotos+"' 
	onchange='mostrarFotoM("+numFotos+");'/>";
	mostrar+= "<img src='' id='mostrarFoto"+numFotos+"' name='mostrarFoto"+numFotos+"' class='fotossubidas'/>
	<textarea class='textpadding' name='descripcion"+numFotos+"' id='descripcion"+numFotos+"' 
	placeholder='Descripci&oacute;n de la foto' cols='20' rows='6' onchange='desc
	("+numFotos+")'></textarea>
	<button onclick='eliminarFoto("+numFotos+");' id='button"+numFotos+"'>X</button ></div><br>";
*/
	//alert("Estoy mostrando el html "+mostrar);
	//document.getElementById("zonaParaFotos").innerHTML+=mostrar;


}

function main(frm){

	crearViaje(frm);
	//subirFotos();


}

function crearViaje(frm){
	
	var fd = new FormData();
	xmlhttp = new crearObjAjax();
	var url = "rest/viaje/";


	fd.append("nombre", document.getElementById("nombre").value);
	fd.append("descripcion", document.getElementById("descripcion").value);

	fd.append("fi", document.getElementById("fi").value);

	fd.append("ff", document.getElementById("ff").value);
		alert("aaaaasdada");
	fd.append("v", document.getElementById("valnum").value);
	alert(document.getElementById("valnum").value);
	fd.append("login", sessionStorage.getItem("login"));
	fd.append("clave", sessionStorage.getItem("clave"));
	

	xmlhttp.onload = function(){
		alert(xmlhttp.readyState+" "+xmlhttp.status);
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				alert("asdsadas");
			//var res = eval( '('+xmlhttp.responseText+')');				alert(res);

				alert(sessionStorage.getItem("login")+" "+sessionStorage.getItem("clave"));
			}else{

			}
		}


	};

	xmlhttp.open("POST", url, true);
	console.log(fd)
	xmlhttp.send(fd);

	return false;

}

function subirFotos(){

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