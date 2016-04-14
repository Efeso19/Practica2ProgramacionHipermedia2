//ESTE FICHERO COMPRUEBA SI ESTAS LOGUEADO

if(window.localStorage){
	var nav="";
	var cuerpo="hola";

	function mostrarFotoM(){
		document.getElementById("avatar").style.display = "initial";
		var fr = new FileReader(),
		mostrarFoto=document.getElementById("foto").files[0];
		
		fr.onload = function(){
			document.getElementById("mostrarFoto").src=fr.result;
		};

		fr.readAsDataURL(mostrarFoto);

	}

	function eliminarFoto(){
		document.getElementById("avatar").style.display = "none";
		document.getElementById("foto").value ="";
		document.getElementById("mostrarFoto").src="";
	}


	if(sessionStorage.getItem('logged')){
		//menu para cuando estemos logeados
		nav="<input type='checkbox' id='menu-trigger'><ul><li><label for='menu-trigger'><span>&equiv;</span></label></li><li><a href='index.html'><i class='fa fa-home'></i> <span>Inicio</span></a></li><li><a href='registro.html'><i class='fa fa-user'></i> <span>Perfil</span></a></li><li><a href='javascript:logout()'><i class='fa fa-sign-out'></i> <span>Logout</span></a></li><li><a href='buscar_viajes.html'><i class='fa fa-search'></i> <span>Buscar viajes</span></a></li><li><a href='crear_viaje.html'><i class='fa fa-plane'></i> <span>Crear viaje</span></a></li></ul>";
		cuerpo="estoy logueado";

		document.getElementById("usu").value=sessionStorage.getItem('login');
		document.getElementById("usu").disabled=true;
		document.getElementById("email").value=sessionStorage.getItem('email');
		document.getElementById("nombre").value=sessionStorage.getItem('nombre');
		document.getElementById("avatar").style.display = "initial";
		//document.getElementById("foto").value=sessionStorage.getItem('foto');
		document.getElementById("mostrarFoto").src="fotos/usu/"+sessionStorage.getItem('foto');
		document.getElementById("pwd").required=false;
		document.getElementById("pwd2").required=false;






	}else{
		//menu para cuando no estamos logeados
		nav="<input type='checkbox' id='menu-trigger'><ul><li><label for='menu-trigger'><span>&equiv;</span></label></li><li><a href='index.html'><i class='fa fa-home'></i> <span>Inicio</span></a></li><li><a href='login.html'><i class='fa fa-sign-in'></i> <span>Login</span></a></li><li><a href='registro.html'><i class='fa fa-plus'></i> <span>Registrarse</span></a></li> <li><a href='buscar_viajes.html'><i class='fa fa-search'></i> <span>Buscar viajes</span></a></li></ul>";
		/*
		cuerpo="<h2>Registrarse</h2><form name='regisform' id='regisform' onsubmit='registrarse(this)' >";
		cuerpo+="<label for='usu'>Nombre de usuario:</label><br>";
		cuerpo+="<input type='text' id='usu' name='usu' placeholder='Usuario' required autofocus pattern='[a-zA-Z0-9]{5,20}'' maxlength='20'><br>";
		cuerpo+="<label for='pwd'>Contrase&ntilde;a:</label><br>";
		cuerpo+="<input type='password' id='pwd' name='pwd' placeholder='*******' required pattern='[a-zA-Z][a-zA-Z0-9_-]{5,20}' maxlength='20'><br>";
		cuerpo+="<div id='msgpwd'></div>";
		cuerpo+="<label for='pwd2'>Repetir contrase&ntilde;a:</label><br>";

		cuerpo+="<input type='password' id='pwd2' name='pw2' placeholder='*******' required pattern='[a-zA-Z][a-zA-Z0-9_-]{5,20}' maxlength='20'><br>";
		
		cuerpo+="<label for='nombre'>Nombre completo:</label><br>";
		cuerpo+="<input type='text' id='nombre' name='nombre' placeholder='Nombre completo' required><br>";
		cuerpo+="<label for='email'>Email:</label><br><input type='email' id='email' name='email' placeholder='Email' required><br>";
		cuerpo+="<label for='foto'>Foto:</label><br><input type='file' id='foto' name='foto'><br><input type='submit' id ='regristrarboton' value='Registrarse'>";
		cuerpo+="</form>";
		*/
	}
	//imprimimos el CONTENIDO de la etiqueta nav ya que ésta lleva el id
	document.getElementById("navegacion").innerHTML=nav;
	//document.getElementById("idParaImprimir").innerHTML=cuerpo;
	

	
	
}else{
	alert("Tu navegador no soporta Web Storage");
}

function logout(){

	sessionStorage.clear();
	//location.replace("index.html");
	location.reload(); 

}