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
  socket.on( 'search user', function( screenName ) {

    T.get( 'statuses/user_timeline', { screen_name: screenName, count: 25 }, function( error, data, response ) {
      if ( error ) {
        console.log('Error: ', error );
        socket.emit( 'search error', error.message );
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
        socket.emit( 'search results', tweets );
      }
    });
    
  });

});

// Set the port for http server 
var port = process.env.PORT || 8000;
http.listen( port, function() {
  console.log( 'Server listening on port' );
});