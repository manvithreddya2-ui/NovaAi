const micBtn =
  document.getElementById("mic-btn");
const chatBox =
  document.getElementById("chat-box");

const input =
  document.getElementById("user-input");

const sendBtn =
  document.getElementById("send-btn");

const recentChats =
  document.getElementById("recent-chats");

/* ALL CHATS */

let chats =
  JSON.parse(
    localStorage.getItem("teenchat_chats")
  ) || [];

/* CURRENT CHAT */

let currentChat = null;

/* CREATE FIRST CHAT */

createNewChat();

/* SHOW SIDEBAR */

renderRecents();

/* EVENTS */

sendBtn.addEventListener(
  "click",
  sendMessage
);

input.addEventListener(
  "keypress",

  function(e) {

    if (e.key === "Enter") {

      sendMessage();

    }

  }

);

/* NEW CHAT */

function createNewChat() {

  currentChat = {

    id: Date.now(),

    title: "New Chat",

    messages: []

  };

}

/* SEND */

async function sendMessage() {

  const text =
    input.value.trim();

  if (!text) return;

  addMessage(text, "user");

  /* AUTO TITLE */

  if (
    currentChat.messages.length === 0
  ) {

    currentChat.title =
      text.slice(0, 25);

    chats.unshift(currentChat);

    saveChats();

    renderRecents();

  }

  currentChat.messages.push({

    role: "user",

    content: text

  });

  input.value = "";

  const thinking =
    addMessage(
      "TeenChat is typing...",
      "ai"
    );

  try {

    const response =
      await fetch("/chat", {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          messages:
            currentChat.messages

        })

      });

    const data =
      await response.json();
      

    thinking.remove();

    typeMessage(
      data.reply,
      "ai"
    );

    currentChat.messages.push({

      role: "assistant",

      content: data.reply

    });

    saveChats();

  } catch (error) {

    thinking.innerText =
      "Could not connect.";

  }

}

/* RECENTS */

function renderRecents() {

  recentChats.innerHTML = "";

  chats.forEach(chat => {

    const item =
      document.createElement("div");

    item.classList.add(
      "chat-item"
    );

    item.innerHTML = `

      <span>${chat.title}</span>

      <button class="dots">

        x

      </button>

    `;

    /* OPEN CHAT */

  item.onclick = () => {

  openChat(chat.id);

};
    /* DELETE CHAT */

    item.querySelector(".dots")
      .onclick = (e) => {

      e.stopPropagation();

      chats = chats.filter(

        c => c.id !== chat.id

      );

      saveChats();

      renderRecents();

      chatBox.innerHTML = "";

      createNewChat();

    };

    recentChats.appendChild(item);

  });

}

/* OPEN CHAT */

function openChat(id) {

  const chat =
    chats.find(c => c.id === id);

  if (!chat) return;

  currentChat = chat;

  chatBox.innerHTML = "";

  chat.messages.forEach(msg => {

    addMessage(

      msg.content,

      msg.role === "user"
        ? "user"
        : "ai"

    );

  });

}
function saveChats() {

  localStorage.setItem(

    "teenchat_chats",

    JSON.stringify(chats)

  );

}

/* TYPE EFFECT */

function typeMessage(
  text,
  sender
) {

  const msg =
    document.createElement("div");

  msg.classList.add(
    "message",
    sender
  );

  chatBox.appendChild(msg);

  let i = 0;

  const interval =
    setInterval(() => {

     if (sender === "ai") {

  msg.innerHTML = `

    <div class="message-logo">

      NovaAI

    </div>

    ${text.slice(0, i)}

  `;

} else {

  msg.innerText =
    text.slice(0, i);

}
      i++;

      chatBox.scrollTop =
        chatBox.scrollHeight;

      if (i > text.length) {

        clearInterval(interval);

      }

    }, 15);

}

/* ADD */

function addMessage(
  text,
  sender
) {

  const msg =
    document.createElement("div");

  msg.classList.add(
    "message",
    sender
  );

  if (sender === "ai") {

  msg.innerHTML = `

    <div class="message-logo">

      NovaAI

    </div>

    ${text}

  `;

} else {

  msg.innerText = text;

}

  chatBox.appendChild(msg);

  chatBox.scrollTop =
    chatBox.scrollHeight;

  return msg;

}
const recognition =

  new webkitSpeechRecognition();

recognition.continuous = false;

recognition.lang = "en-US";

micBtn.addEventListener(

  "click",

  () => {

    recognition.start();

  }

);

recognition.onresult =

  (event) => {

    input.value =

      event.results[0][0]
      .transcript;

  };
  newChatBtn.addEventListener(

  "click",

  createNewChat

);
const newChatBtn =

  document.getElementById(
    "new-chat-btn"
  );
  newChatBtn.addEventListener(

  "click",

  createNewChat

);