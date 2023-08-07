const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: true, // Allow any origin
};

app.use(cors(corsOptions));
app.use(express.json()); // parse request body as JSON

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/", (req, res) => {
  console.log("A request was made! The body is", req.body);
  fs.appendFileSync("data/" + req.body.target + ".txt", JSON.stringify(req.body.payload) + "\n");
  res.send("Hello World!");
});
