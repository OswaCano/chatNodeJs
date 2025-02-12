//conexion del front con el socket
const socket = io.connect('http://localhost:4000');

//elemetos del DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const button = document.getElementById('button');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

//envío de mensajes
button.addEventListener('click', function() {
    if (message.value.trim() !== "") {  // Evitar mensajes vacíos
        socket.emit('chat', {
            handle: handle.value || "Anónimo",
            text: message.value
        });
        message.value = "";
    }
});

//Manejo de Mensajes (Recibir mensajes)
socket.on('chat', (msg) => {
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong>${msg.handle}: </strong>${msg.text}</p>`;
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});