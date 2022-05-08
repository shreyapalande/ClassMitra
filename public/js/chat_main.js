

// main.js is client side
const socket = io();

const chatMessage = document.getElementById('chatbox');
const chatForm = document.getElementById('send-container');
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users');
// get user name and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });


// const socket = io();

socket.emit('JoinRoom',{username,room})

// message from server
socket.on('message',message => {
    // console.log(message)
   outputMessage(message)

   // scroll down
//    chatMessage.scrollTop = chatMessage.scrollHeight;
})


// get room and users
// socket.on('roomUser',({room , users}) => {
//   outputRoomName(room);
// //   outputUsers(users); 
// })


socket.on('Welcomemessage',message => {
    const div = document.createElement('div');
    div.classList.add('chat')
   //  div.classList.add('outgoing');
    
    div.innerHTML = ` <p class="details" >${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`
   document.getElementById('chatbox').appendChild(div);
})
// message submit 
chatForm.addEventListener('submit',(e) => {
 e.preventDefault();

 const msg = e.target.elements.msg.value;
 
 // emit message to server
 socket.emit('chatMessage',msg)

 // clear input
 e.target.elements.msg.value = '';
 e.target.elements.msg.focus();
})

// print message in chatbox
function outputMessage(message){
 const div = document.createElement('div');
 div.classList.add('chat')
//  div.classList.add('outgoing');
 
 div.innerHTML = ` <p class="details" >${message.username} <span>${message.time}</span></p>
 <p class="text">${message.text}</p>`
document.getElementById('chatbox').appendChild(div);
}

// add room name to dom
function outputRoomName(room) {
    roomName.innerHTML = `<div>${room}</div>`;
}

// add user to dom
function outputUsers(users) {
    userList.innerHTML = `
     ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}