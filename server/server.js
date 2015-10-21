// Load environmental variables
require('dotenv').load();

// Require (and instantiate) express, http, socket.io and twit
var express = require( 'express' );
var app = express();
var http = require( 'http' ).Server( app );
var io = require( 'socket.io' )( http );
var Twit = require( 'twit' );
var T = new Twit({
  consumer_key: process.env.consumerKey,
  consumer_secret: process.env.consumerSecret,
  access_token: process.env.accessToken,
  access_token_secret: process.env.accessTokenSecret
});

// Serve static assets from /client
app.use( express.static( __dirname + '/../client' ) );

// Listen for socket connection
io.on( 'connection', function( socket ) {
  console.log( 'Client connected' );

  // Listen for search event
  socket.on( 'search user', searchUserTimeline );

});

// Utility functions for searching timelines and processing the data returned  
function searchUserTimeline( screenName ) {
  // fetch user timeline from Twitter REST API
  T.get( 'statuses/user_timeline', { screen_name: screenName, count: 25 }, getTimeLineCB );
}

function getTimeLineCB( error, data, response ) {
  if ( error ) {
    console.log('Error: ', error );
    io.emit( 'search error', error.message );
  } else {
    var tweets = [];
    data.forEach( function( tweet ) {
      tweets.push( { 
        text: tweet.text,
        timeStamp: (new Date(tweet.created_at)),
        userName: tweet.user.name,
        userHandle: tweet.user.screen_name,
        description: tweet.user.description,
        profileImgUrl: tweet.user.profile_image_url_https.replace('_normal', '')
      });

    });
    io.emit( 'search results', tweets );
  }
}

// Set the port for http server 
http.listen( 8000, function() {
  console.log( 'Server listening on 8000' );
});