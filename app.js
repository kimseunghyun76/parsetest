var parseId="FaVWE3aSquXD8mpmPL3iTsS9hbg6pLKYOyGOIKiQ";
var parseRestKey="Q8EMYcMyaqWD0mQE1L2U0b4dsPGCwGLQoyd4KxC6";
 
$(document).ready(function(){
getMessages();
 $("#send").click(function(){
	var username = $('#username').val();
	var message = $('#message').val();
	console.log(username);
	console.log(message);

	
	$.ajax({
		url : 'https://api.parse.com/1/classes/MessageBoard',
		headers:{
			'X-Parse-Application-Id' : parseId,
			'X-Parse-REST-API-Key': parseRestKey
		},
		contentType : 'application/json',
		dataType: 'json',
		processData:false,
		data : JSON.stringify({
			'username' : username,
			'message' : message
		}),
		type : 'POST',
		success : function(){
			console.log('sent');
			getMessages();
		},
		error : function(){
			console.log('error');
		}
		});
	});
});

function getMessages(){
	$.ajax({
		url: 'https://api.parse.com/1/classes/MessageBoard',
		headers : {
			'X-parse-Application-Id' : parseId,
			'X-parse-REST-API-Key' : parseRestKey
		},
		contentType : 'application/json',
		dataType : 'json',
		type : 'GET',
		success :function(data){
			console.log('get');
			updateView(data);
		},
		error : function(){
			console.log('getMessage error');
		}
		});
}
function updateView(messages){
	var table = $('.table tbody');
	table.html('');
	$.each(messages.results, function(index, value){
		var trEl = $('<tr><td>' + value.username + '</td><td>' + value.message + '</td></tr>');
		table.append(trEl);
	});
	console.log(messages);
}

