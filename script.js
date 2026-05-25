const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const newChatBtn = document.getElementById("new-chat-btn");
const chatHistory = document.getElementById("chat-history");

let messages = [];

loadChats();

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

newChatBtn.addEventListener("click", () => {

  messages = [];

  chatBox.innerHTML = "";

  saveChats();
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

    saveChats();

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

function saveChats() {

  localStorage.setItem(
    "teenchat_messages",
    JSON.stringify(messages)
  );

  renderHistory();
}

function loadChats() {

  const saved = localStorage.getItem("teenchat_messages");

  if (saved) {

    messages = JSON.parse(saved);

    messages.forEach(msg => {
      addMessage(
        msg.content,
        msg.role === "user" ? "user" : "ai"
      );
    });
  }

  renderHistory();
}

function renderHistory() {

  chatHistory.innerHTML = "";

  const item = document.createElement("div");

  item.classList.add("chat-item");

  item.innerText = "Saved Chat";

  const del = document.createElement("button");

  del.innerText = "×";

  del.classList.add("delete-btn");

  del.onclick = () => {

    localStorage.removeItem("teenchat_messages");

    messages = [];

    chatBox.innerHTML = "";

    renderHistory();
  };

  item.appendChild(del);

  if (messages.length > 0) {
    chatHistory.appendChild(item);
  }
}
