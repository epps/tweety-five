// Load environmental variables
require('dotenv').load();
// Require (and instantiate) express, http, socket.io and twit
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twit = require('Twit');
var T = new Twit({
  consumer_key: process.env.consumerKey,
  consumer_secret: process.env.consumerSecret,
  access_token: process.env.accessToken,
  access_token_secret: process.env.accessTokenSecret
});
// Serve static assets from /client
app.use(express.static(__dirname + '/../client'));
// Set .on method for socket connection to io
io.on('connection', function(socket) {
  console.log('Client connected');
});

// Create utility function for handling GET requests to Twitter API


// Set the port for http server 
http.listen(8000, function() {
  console.log('Server listening on 8000');
})