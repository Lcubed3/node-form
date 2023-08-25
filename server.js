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



app.post("/", async (req, res) => { // Marked function as async so we can do await
  console.log("A request was made! The body is", req.body);
  if (req.body.getNewLines == "f") {
    fs.appendFileSync("data/" + req.body.target + ".txt", JSON.stringify(req.body.payload) + "\n");
  } 
  if (req.body.getNewLines == "t") {
    let lineCountString = await countFileLines("data/" + req.body.target + ".txt"); // countFileLines returns the lines in a file; lineCountString puts this into a variable that is easier to work with.
    console.log("lineCountString is", lineCountString); // print lineCountString into console
    res.send({lineCountString}); // send lineCountString to client
  }
});

function countFileLines(filePath) {
  return new Promise((resolve, reject) => {
    let lineCount = 0;
    fs.createReadStream(filePath)
      .on("data", (buffer) => {
        let idx = -1;
        lineCount--; // Because the loop will run once for idx=-1
        do {
          idx = buffer.indexOf(10, idx + 1);
          lineCount++;
        } while (idx !== -1);
      })
      .on("end", () => {
        resolve(lineCount);
        console.log("Count of", filePath, "is", lineCount);
        return lineCount
      })
      .on("error", reject);
  });
}
