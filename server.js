const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: "PASTE_YOUR_OPENAI_API_KEY_HERE"
});

app.post("/chat", async (req, res) => {

  try {

    const messages = req.body.messages;

    const completion = await client.chat.completions.create({

      model: "gpt-4.1-mini",

      temperature: 0.8,

      messages: [

        {
          role: "system",

          content: `
You are TeenChat.

You are a smart, friendly AI assistant for teens.

Talk naturally like a real person.
Be conversational and helpful.
Do NOT give random replies.
Keep responses clear and human-like.
Use casual language sometimes.
`
        },

        ...messages
      ]
    });

    const reply = completion.choices[0].message.content;

    res.json({
      reply
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      reply: "Something went wrong."
    });
  }
});

app.listen(3000, () => {
  console.log("TeenChat AI server running on port 3000");
});
