// Connect to backend
const socket = io("http://localhost:3000"); // backend URL

const chatMessages = document.getElementById("chat-messages");
const input = document.getElementById("message-input");

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const msgObj = {
        author: "xlays",
        text: text,
        avatar: "avatars/avatar1.png", // change if needed
        channel: "general"
    };

    socket.emit("chat message", msgObj);
    input.value = "";
}

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// Receive messages
socket.on("chat message", (msg) => {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message");
    msgDiv.innerHTML = `
        <img src="${msg.avatar}" width="40" height="40">
        <div class="msg-text"><b>${msg.author}</b>: ${msg.text}</div>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
