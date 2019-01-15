var socket = new WebSocket('ws://localhost:8080');


socket.onmessage = function(message){
      console.log(message);
      var messageobj = JSON.parse(message.data);
      console.log(messageobj);

      switch (messageobj.type) {
        case "msg":

                var plaintext  = CryptoJS.AES.decrypt(messageobj.text, "chit");
                console.log(plaintext);
                document.getElementById("messages").innerHTML += "<p class = 'received'>" + plaintext.toString(CryptoJS.enc.Utf8) + "</p>" + "<br>";

          break;
        case "arr":

                var userList = messageobj.data;
                console.log(userList);
                document.getElementById("column").innerHTML = "<p class = 'received'>" + userList + "</p>" + "<br>";


          break;
        default:

      }
}

var user = { person:"",type:"", userId:"" , text:""};


function getId(){
      var loginDiv = document.getElementById("loginpage");
      loginDiv.style.display = "none";
      var x = document.getElementById("name") ;
      user.person =  x.value;
      var y = document.getElementById("userId") ;
      user.userId = y.value;
      alert(user.person);
      sendId();
}

function sendId(){
      user.type = "id";
      var messageData = JSON.stringify(user);
      socket.send(messageData);
}


function myfunction() {
      var x = document.getElementById("form1") ;
      user.text = x.elements[0].value;
      user.text = user.person + " - " + user.text ;
      document.getElementById("messages").innerHTML += "<p class = 'sent'>" + user.text + "</p>" + "<br>";
      var ciphertext = CryptoJS.AES.encrypt(user.text, "chit").toString();
      user.text = ciphertext;
      user.type = "msg";
      console.log((ciphertext));
      var messageData = JSON.stringify(user);
      socket.send(messageData);
      document.getElementById("input").value = '';
}

///function loading(){
	 //   document.getElementById("myDialog").showModal();
//}
function onClick(e){

}
window.addEventListener("keydown", onClick);
