const express = require("express");
const cors = require("cors");

const app = express();
const groqApiKey = process.env.GROQ_API_KEY;

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

app.use(express.static(__dirname));

/* CHAT */

app.post("/chat", async (req, res) => {

  try {

    const userMessage =
      req.body.messages.at(-1).content;

    const response = await fetch(

      "https://api.groq.com/openai/v1/chat/completions",

      {

        method: "POST",

        headers: {

          Authorization:
            `Bearer ${groqApiKey}`,

          "Content-Type":
            "application/json"

        },
 
        body: JSON.stringify({

          model:
            "llama-3.1-8b-instant",

          messages: [

            {
              role: "system",

              content:
                "You are NovaAi, a friendly AI assistant for Assist."
            },

            {
              role: "user",

              content:
                userMessage
            }

          ]

        })

      }

    );

    const data =
      await response.json();

    console.log(data);

    let reply =
      "i am broken right now come back later!.";

    if (

      data.choices &&

      data.choices[0] &&

      data.choices[0].message

    ) {

      reply =
        data.choices[0]
        .message.content;

    }

    /* AI TITLE */

const titleResponse =

  await fetch(

    "https://api.groq.com/openai/v1/chat/completions",

    {

      method: "POST",

      headers: {

        Authorization:
          `Bearer ${groqApiKey}`,

        "Content-Type":
          "application/json"

      },

      body: JSON.stringify({

        model:
          "llama-3.1-8b-instant",

messages: [

  {

    role: "system",

    content:
      "You are NovaAi, a friendly AI assistant for assist."

  },

  ...req.body.messages

]

      })

    }

);

const titleData =

  await titleResponse.json();

let title =
  "New Chat";

if (

  titleData.choices &&

  titleData.choices[0]

) {

  title =

    titleData.choices[0]
    .message.content;

}

res.json({

  reply,

  title

});

  } catch (error) {

    console.log(error);

    res.status(500).json({

      reply:
        "I am down right now."

    });

  }

});
/* START SERVER */

app.listen(3000, () => {

  console.log(
    "NovaAi running on port 3000"
  );

});