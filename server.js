const chatBox =
  document.getElementById("chat-box");

const input =
  document.getElementById("user-input");

const sendBtn =
  document.getElementById("send-btn");

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

let messages = [];

async function sendMessage() {

  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");

  messages.push({
    role: "user",
    content: text
  });

  input.value = "";

  try {

    const response =
      await fetch("/chat", {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        messages
      })
    });

    const data =
      await response.json();

    addMessage(
      data.reply,
      "ai"
    );

    messages.push({
      role: "assistant",
      content: data.reply
    });

  } catch (err) {

    addMessage(
      "Could not connect to AI.",
      "ai"
    );
  }
}

function addMessage(text, sender) {

  const msg =
    document.createElement("div");

  msg.classList.add(
    "message"
  );

  msg.classList.add(sender);

  msg.innerText = text;

  chatBox.appendChild(msg);

  chatBox.scrollTop =
    chatBox.scrollHeight;
}
