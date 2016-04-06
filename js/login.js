//JAVASCRIPT//
//ENVIO DE FORMULARIO DE LOGIN

function envio(formulario){

	var form = new FormData(formulario);	//DEFINICION DEL FormData
	var xrqst = new XMLHttpRequest();		//DEFINICION DE XMLHttpRequest

	alert(formulario[0].value+formulario[1].value);
	form.append(login, formulario[0].value);
	form.append(key, formulario[1].value);



	xrqst.onload = function(){
		var res = eval( '('+xrqst.responseText+')'); //PROCESAMIENTO JSON
		//res.resultado
		//res.clave
		//res.login
		//res.nombre
		console.log(res);
		if(res.resultado == "ok"){	//EL USUARIO ES CORRECTO, ESTABLECER PARES Y REDIRECCION
			
			localStorage.setItem('logged', 'true');	//SE ESTABLECEN TODOS PARES
			localStorage.setItem('key', res.clave);
			localStorage.setItem('login', res.login);
			localStorage.setItem('nombre', res.nombre);
			alert("todo guay");
		
		
		}
		else{	//EL USUARIO NO ES CORRECTO, PINTAR EFECTO CSS
				alert(res.login);
				document.getElementById('login').style.backgroundColor="#FCC";
				

		}
		
	}

	xrqst.open('POST', 'rest/login/', true);	//DEFINICION DE LA PETICION HTML (ASYNC)
	xrqst.send(form);	//ENVIO DEL FORMULARIO AL SERVIDOR

	return false;
}