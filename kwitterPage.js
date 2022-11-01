const firebaseConfig = {
    apiKey: "AIzaSyDfsfJRF2RN6zrIxwKRei_k4qkeY073x5g",
    authDomain: "kwitter-c09a0.firebaseapp.com",
    databaseURL: "https://kwitter-2-a6b98-default-rtdb.firebaseio.com/",
    projectId: "kwitter-c09a0",
    storageBucket: "kwitter-c09a0.appspot.com",
    messagingSenderId: "222828099762",
    appId: "1:222828099762:web:0a1857f4732e124943b1ab"
  };
  
  firebase.initializeApp(firebaseConfig);

	userName = localStorage.getItem("userName");
	roomName = localStorage.getItem("roomName");

function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(roomName).push({
    name:userName,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}
function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; 
snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
//Início do código
         console.log(firebaseMessageId);
	       console.log(messageData);
	       name = messageData['name'];
	       message = messageData['message']; 
         like = messageData['like']; 
         nameWithTag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
         messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
         like_button ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
         spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>"; 

        row = nameWithTag + messageWithTag +like_button + spanWithTag;       
        document.getElementById("output").innerHTML += row;

//Fim do código
      } });  }); }
getData();

function updateLike(messageId)
{
  console.log("botão de like pressionado - " + messageId);
	buttonId = messageId;
	likes = document.getElementById(buttonId).value;
	updatedLikes = Number(likes) + 1;
  /*Number() - é uma função JS para converter uma string em números.
○ Portanto, convertemos o valor de likes da string para número, isso é feito para caso
Exemplo: likes = 2 e 1 é adicionado a ela, seria 21 ao invés de 3, por esse motivo onvertemos o número de likes para números, para que possamos
 obter o valor correto, ou seja, 3.*/
	console.log(updatedLikes);

	firebase.database().ref(roomName).child(messageId).update({
		like : updatedLikes  
	 });

   /*● firebase é utilizada para ajustar a referência para adicionar os dados ao banco de dados.
● database() - significa que queremos adicionar os dados ao banco de dados.
● ref(roomName):
○ ref() significa a referência, ou seja, em qual sala a mensagem específica está para
atualizarmos os likes.
○ “roomName” - possui o nome da sala em que a mensagem está. Por isso, passamos
a variável roomName dentro de ref(), para que possamos encontrar a mensagem.
● child(messageId):
○ child() é a função utilizada para pesquisar uma mensagem específica presente na sala
selecionada.
○ messageId possui o identificador message da mensagem.
● update - é a função firebase utilizada para atualizar o banco de dados com os valores.
● Portanto, queremos atualizar os likes dentro da mensagem, por isso utilizamos a chave like.
E, o valor que queremos atualizar é o valor incrementado de like, por isso escrevemos a
variável updateLikes (a qual possui o valor incrementado de likes)*/
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
window.location.replace("index.html");
}