require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.ServerPort || 8080;
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
app.get("/", function (req, res) {
  res.send("Working");
})

require("./User/UserRoutes")(app);
require("./Recipe/RecipeRoutes")(app);

app.listen(PORT);
console.log('Server running at port: ' + PORT)