
function crearObjAjax(){
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}



function registrarse(form){
	var fd = new FormData();
	var xmlhttp = crearObjAjax();
	var url="rest/usuario/";
	var u = document.getElementById("usu").value;
	var p = document.getElementById("pwd").value;
	var p2 = document.getElementById("pwd2").value;
	var n = document.getElementById("nombre").value;
	var e = document.getElementById("email").value;
	var f = document.getElementById("foto").value;

	alert(document.getElementById("usu").value+" "+document.getElementById("pwd").value+" "+document.getElementById("pwd2").value+" "+document.getElementById("nombre").value+" "+document.getElementById("email").value);

	var args = "pwd=" + p+"&login=" + u +"&pwd2="+p2+"&nombre="+n+"&email="+e;

	xmlhttp.onreadystatechange = procesarCambioReg;
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(args);

	function procesarCambioReg(){
		alert(xmlhttp.readyState+"."+xmlhttp.status);
		
		if(xmlhttp.readyState == 4){
			alert(xmlhttp.status);
			if(xmlhttp.status == 200){
				//var usuario = validarUsuario(document.getElementById("usu").value);
				alert("Usted se ha registrado correctamente.");
				sessionStorage.setItem('nombre', n);	
				sessionStorage.setItem('foto', f);
				document.getElementById("regisok").innerHTML="Usted se ha registrado correctamente.";
				document.getElementById("regisok").style.display="inital";
			}else{
				alert(document.getElementById("pwd").value+" "+document.getElementById("pwd2").value+" estoy comparando las cotnraseñas");
				validarPassword(document.getElementById("pwd").value, document.getElementById("pwd2").value);
				//alert("Hubo algun problema, tu lo crees?");

			}
		}
	}
	//console.log(xmlhttp);
	return false;
}
/*
function validarUsuario(user){
	//wtf como pido el usuario?
	xmlhttp=new crearObjAjax();
	var url="";
	xmlhttp.onreadystatechange = procesarUsuario;
	xmlhttp.open("GET", )



}*/

function validarPassword(pwd1, pwd2){
	if(pwd1.localeCompare(pwd2)!=0){
		//mensaje de error
		
		document.getElementById("msgpwd").style.display="inital";
		document.getElementById("msgpwd").style.color="#F00";
		alert("las contraseñas no coindicen");
	}
}