// server.js
var express  = require('express');
var app      = express();                           // create our app w/ express
app.use(express.static(__dirname + '/app'));

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
