const socket = io();
let textarea = document.querySelector('#textarea')
let messageBody = document.querySelector('.messageBody')

let username;

do {
    username = prompt("Please enter your name...")
} while (!username);


textarea.addEventListener('keyup', (e) => {
    if ( e.key === "Enter") {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let messageParams = {
        user: username,
        message: message.trim()
    }

    // Append message to DOM
    appendMessage(messageParams, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server
    socket.emit('message', messageParams)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    mainDiv.classList.add(type, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markup

    messageBody.appendChild(mainDiv)
}

// Recieve Message

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageBody.scrollTop = messageBody.scrollHeight;
}