var express = require('express');
var async = require('async');
var request = require('request');
var app = express();
//var AgGrid = require('ag-grid');
// var logger = require('./logger');
// app.use(logger);
app.locals.async=async;
app.locals.request=request;
app.use(express.static('public'));


app.listen(3000, function() {
  console.log('Listening on port 3000');
});
