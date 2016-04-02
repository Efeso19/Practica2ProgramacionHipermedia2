//JAVASCRIPT//
//ENVIO DE FORMULARIO DE LOGIN

function envio(formulario){

	var form = new FormData(formulario);	//DEFINICION DEL FormData
	var xrqst = new XMLHttpRequest();		//DEFINICION DE XMLHttpRequest
	
	xrqst.onload = function(){
		var res = eval( '('+xrqst.responseText+')'); //PROCESAMIENTO JSON
		//res.resultado
		//res.clave
		//res.login
		//res.nombre
		
		if(res.resultado == "ok"){	//EL USUARIO ES CORRECTO, ESTABLECER PARES Y REDIRECCION
			
			localStorage.setItem('logged', 'true');	//SE ESTABLECEN TODOS PARES
			localStorage.setItem('key', res.clave);
			localStorage.setItem('login', res.login);
			localStorage.setItem('nombre', res.nombre);
			alert("todo guay");
			/*document.getElementById('formlogin').style.opacity = '0';
			setTimeout(function(){document.getElementById('formlogin').style.display = 'none';}, 500);
			setTimeout(function(){document.getElementById('successMessage').style.opacity = '100';}, 400);
			setTimeout(function(){document.getElementById('successMessage').style.marginTop = '70px';}, 400);
			setTimeout(function(){document.getElementById('botonNormal').style.opacity = '100';}, 1000);
			*/
			
			//window.location = "index.html"	//REDIRECCION AL INICIO
			
		
		}
		else{	//EL USUARIO NO ES CORRECTO, PINTAR EFECTO CSS
				document.getElementById('login').style.backgroundColor="#FCC";
				/*document.getElementById('errorMessage').innerHTML = "El nombre de usuario o la contraseña no son correctos";
				document.getElementById('usu').style.backgroundColor = "#FCC";
				document.getElementById('usu').style.borderColor = "#E00";
				document.getElementById('pwd').style.backgroundColor = "#FCC";
				document.getElementById('pwd').style.borderColor = "#E00";
				*/

		}
		
	}

	xrqst.open('POST', 'rest/login/', true);	//DEFINICION DE LA PETICION HTML (ASYNC)
	xrqst.send(form);	//ENVIO DEL FORMULARIO AL SERVIDOR

return false;
}