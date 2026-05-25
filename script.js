const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const typing = document.getElementById("typing");
const themeBtn = document.getElementById("theme-btn");
const voiceBtn = document.getElementById("voice-btn");

let memory = [];

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeBtn.innerText = "☀️";
  } else {
    themeBtn.innerText = "🌙";
  }
});

voiceBtn.addEventListener("click", () => {

  const speech = new webkitSpeechRecognition();

  speech.lang = "en-US";

  speech.onresult = function(event) {
    input.value = event.results[0][0].transcript;
  };

  speech.start();
});

function sendMessage() {

  const text = input.value.trim();

  if (text === "") return;

  addMessage(text, "user");

  memory.push(text);

  input.value = "";

  typing.classList.remove("hidden");

  setTimeout(() => {

    const reply = getAIResponse(text);

    typing.classList.add("hidden");

    addMessage(reply, "ai");

  }, 1000);
}

function addMessage(text, sender) {

  const msg = document.createElement("div");

  msg.classList.add("message");
  msg.classList.add(sender);

  msg.innerText = text;

  chatBox.appendChild(msg);

  chatBox.scrollTop = chatBox.scrollHeight;
}

function getAIResponse(message) {

  message = message.toLowerCase();

  if (message.includes("hello") || message.includes("hey")) {
    return "yooo 👋";
  }

  if (message.includes("how are you")) {
    return "pretty good ngl 😎";
  }

  if (message.includes("school")) {
    return "school homework is actually wild 😭";
  }

  if (message.includes("music")) {
    return "music hits different late at night";
  }

  if (message.includes("game")) {
    return "gaming all night sounds elite";
  }

  if (message.includes("sad")) {
    return "dang 😭 hope things get better soon";
  }

  if (message.includes("bye")) {
    return "later 😎";
  }

  const replies = [
    "nah that's crazy 😭",
    "fr?",
    "W opinion honestly",
    "real 😭",
    "ok but explain",
    "that's interesting",
    "tell me more"
  ];

  return replies[Math.floor(Math.random() * replies.length)];
}
