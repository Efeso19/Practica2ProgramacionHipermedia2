
function crearObjAjax(){
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}


function envio(form){
	var fd=new FormData(form);
	var objajax =  new crearObjAjax();
	var url="rest/login/";
	
	/*
	var login = document.getElementById("login").value;
	var pass = document.getElementById("pass").value;
	*/

	//var args = "l=" + login + "&p=" + pass;
	//args + = "&v=" + (new Date()).getTime();


	objajax.onreadystatechange = procesarCambio;
	objajax.open("POST", url, true);

	//objajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	objajax.send(fd);


	function procesarCambio(){

		if(objajax.readyState == 4){
			if(objajax.status == 200){
				var res = JSON.parse(objajax.responseText);				
				console.log(res);
				sessionStorage.setItem('logged', 'true');	//SE ESTABLECEN TODOS PARES
				sessionStorage.setItem('pass', res.CLAVE);
				sessionStorage.setItem('login', res.LOGIN);
				sessionStorage.setItem('texto', res);//almacenamos todo el JSON
				location.replace("index.html");
			}else{
				alert("Hubo algun problema"+objajax.status);
			}
		}

	}

	return false;

}

