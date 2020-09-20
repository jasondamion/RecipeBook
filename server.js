require('dotenv').config();
const express = require("express");
const app = express();
let isDev = process.env.isDev;
const PORT = isDev === "true" ? process.env.ServerPort : process.env.PORT;
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