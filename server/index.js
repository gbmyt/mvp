// Import Express
var express = require("express");
var app = express();
var port = 3000;

// Set up some route handlers and middleware functions
app.use('/', express.static("client"));

app.get('/', (req, res) => {
  console.log("Testing Express install");Ï
});

// app.post()

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`App listening on port ${port}`);
});
