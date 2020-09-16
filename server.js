const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(cors({
    origin: '**'
  }));


// Routes
console.log("Server working")

app.get("/", function (req, res) {
  res.send("Working");
})

app.listen(PORT);