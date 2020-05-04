var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

// Add cors middleware to avoid cors issues at client side
app.use(cors());
// Add body parser middleware to pars requested data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Require controllers and routes.
require('./controllers')(app)
require('./routes.js')(app);

app.listen(7000, () => {
  console.info("========= Welcome to ATM assignment =========");
  console.info("Server running on port 7000");
});

