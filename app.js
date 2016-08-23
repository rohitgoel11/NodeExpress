var express = require('express');
var app = express();
//var AgGrid = require('ag-grid');
// var logger = require('./logger');
// app.use(logger);

app.use(express.static('public'));


app.listen(3000, function() {
  console.log('Listening on port 3000');
});
