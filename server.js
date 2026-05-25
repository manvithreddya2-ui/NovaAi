const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* SERVE STATIC FILES */

app.use(express.static(path.join(__dirname)));

/* OPENAI */

const client = new OpenAI({
  apiKey: "PUT_YOUR_API_KEY_HERE"
});

/* HOME PAGE */

app.get("/", (req, res) => {

  res.sendFile(
    path.join(__dirname, "index.html")
  );
});

/* CHAT */

app.post("/chat", async (req, res) => {

  try {

    const completion =
      await client.chat.completions.create({

      model: "gpt-4.1-mini",

      messages: [

        {
          role: "system",

          content:
            "You are TeenChat, a smart friendly AI assistant."
        },

        ...req.body.messages
      ]
    });

    res.json({
      reply:
        completion.choices[0].message.content
    });

  } catch (err) {

    console.log(err);

    res.json({
      reply:
        "Error connecting to TeenChat AI."
    });
  }
});

/* START SERVER */

app.listen(3000, () => {

  console.log(
    "TeenChat AI server running on port 3000"
  );
});
