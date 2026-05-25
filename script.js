const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {

  const text = input.value.trim();

  if (text === "") return;

  addMessage(text, "user");

  input.value = "";

  setTimeout(() => {

    const reply = getAIResponse(text);

    addMessage(reply, "ai");

  }, 700);
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

  const replies = {

    hello: [
      "yo 👋",
      "hey what's up",
      "heyyyy",
      "yooo 😎"
    ],

    how: [
      "pretty good ngl",
      "doing awesome today 😄",
      "kinda tired but vibing",
      "all good over here"
    ],

    school: [
      "school be stressful sometimes 😭",
      "what class though?",
      "homework is actually wild",
      "did you finish your assignments?"
    ],

    game: [
      "what games you play?",
      "gaming all night is elite",
      "W game choice honestly",
      "that sounds fun"
    ],

    bye: [
      "cya 👋",
      "later 😎",
      "bye bye",
      "talk again soon"
    ]
  };

  function randomReply(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  if (message.includes("hello") || message.includes("hey")) {
    return randomReply(replies.hello);
  }

  if (message.includes("how are you")) {
    return randomReply(replies.how);
  }

  if (message.includes("school")) {
    return randomReply(replies.school);
  }

  if (message.includes("game")) {
    return randomReply(replies.game);
  }

  if (message.includes("bye")) {
    return randomReply(replies.bye);
  }

  const randomResponses = [
    "that's actually crazy 😭",
    "lowkey interesting",
    "fr?",
    "tell me more",
    "nah that's wild",
    "W opinion honestly",
    "real 😭",
    "ok but explain"
  ];

  return randomReply(randomResponses);
}
