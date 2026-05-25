const express = require("express");

const app = express();

app.get("/", (req, res) => {

  res.send(`
    <h1>TeenChat Works!</h1>
  `);

});

app.listen(3000, () => {

  console.log(
    "TeenChat running on port 3000"
  );
});
