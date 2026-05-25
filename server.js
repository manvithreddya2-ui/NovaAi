const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

/* THIS SERVES YOUR FILES */
app.use(express.static("."));

const client = new OpenAI({
  apiKey: "PASTE_YOUR_OPENAI_API_KEY_HERE"
});

app.post("/chat", async (req, res) => {

  try {

    const messages = req.body.messages;

    const completion =
      await client.chat.completions.create({

      model: "gpt-4.1-mini",

      temperature: 0.8,

      messages: [

        {
          role: "system",

          content: `
You are TeenChat.

You are a smart friendly AI assistant.
Talk naturally.
Be helpful and conversational.
`
        },

        ...messages
      ]
    });

    res.json({
      reply:
        completion.choices[0].message.content
    });

  } catch (err) {

    console.log(err);

    res.json({
      reply: "AI error."
    });
  }
});

app.listen(3000, () => {
  console.log("TeenChat running");
});
