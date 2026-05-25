const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let messages = [];

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {

  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");

  messages.push({
    role: "user",
    content: text
  });

  input.value = "";

  const thinking = addMessage("TeenChat is thinking...", "ai");

  try {

    const response = await fetch("http://localhost:3000/chat", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        messages
      })
    });

    const data = await response.json();

    thinking.remove();

    addMessage(data.reply, "ai");

    messages.push({
      role: "assistant",
      content: data.reply
    });

  } catch (error) {

    thinking.innerText = "Could not connect to TeenChat AI.";
  }
}

function addMessage(text, sender) {

  const msg = document.createElement("div");

  msg.classList.add("message");
  msg.classList.add(sender);

  msg.innerText = text;

  chatBox.appendChild(msg);

  chatBox.scrollTop = chatBox.scrollHeight;

  return msg;
}
