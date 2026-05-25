const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* SERVE FILES */

app.use(express.static(__dirname));

/* OPENAI */

const client = new OpenAI({
  apiKey: "PUT_API_KEY_HERE"
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
            "You are TeenChat, a smart friendly AI."
        },

        ...req.body.messages
      ]
    });

    res.json({
      reply:
        completion.choices[0]
        .message.content
    });

  } catch (err) {

    console.log(err);

    res.json({
      reply: "AI error."
    });
  }
});

/* START */

app.listen(3000, () => {

  console.log(
    "TeenChat running on port 3000"
  );
});
