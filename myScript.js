var socket = new WebSocket('ws://localhost:8080');


socket.onmessage = function(message){
 console.log(message.data);
 var plaintext  = CryptoJS.AES.decrypt(message.data, "chit");
 console.log(plaintext);
 document.getElementById("messages").innerHTML += "<p class = 'received'>" + plaintext.toString(CryptoJS.enc.Utf8) + "</p>" + "<br>";
}

//var person = prompt("please enter your name","");



function getId(){
var x = document.getElementById("name") ;
person =  x.value;
var y = document.getElementById("userId") ;
var userId = y.value;
//alert(person);
var x = document.getElementById("myDialog") ;
x.close();
}


function myfunction() {
var x = document.getElementById("form1") ;
var text = "";
text = x.elements[0].value;
text = person + " - " + text ;
var ciphertext = CryptoJS.AES.encrypt(text, "chit");
socket.send(ciphertext);
document.getElementById("messages").innerHTML += "<p class = 'sent'>" + text + "</p>" + "<br>";
document.getElementById("input").value = '';
};

function loading(){
	document.getElementById("myDialog").showModal();
}
function onClick(e){
	//e.preventDefault();
}
window.addEventListener("keydown", onClick);