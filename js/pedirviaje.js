window.onload = viaje();

function viaje(){

	if(localStorage.getItem("idviaje") == null){
		window.location = "index.html";
	}

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onload = function(){

		var res = eval ('('+xmlhttp.responseText+')');
		console.log(res);



	}

	xmlhttp.open('GET', 'rest/viaje/'+localStorage.getItem("idviaje"), true);
	xmlhttp.send();


}






