# Tweety-five

Tweety-five is an AngularJS application that fetches the 25 most recent tweets from the timeline of a searched-for user.

## Requirements

### Backend
- [Node.js](https://nodejs.org/)
- [Express](http://expressjs.com/)
- [Socket.io](http://socket.io/)
- [twit](https://www.npmjs.com/package/twit)
- [dotenv](https://www.npmjs.com/package/dotenv)

### Frontend
- [AngularJS](https://angularjs.org/)
- [angular-socket-io](https://github.com/btford/angular-socket-io)

### Utilities
- [Bower](http://bower.io/)
- [npm](https://www.npmjs.com/)

## Local Development

### Environment Configuration File

Both of the Twitter APIs require calls to be authenticated using [OAuth](https://dev.twitter.com/oauth), so its necessary to: 1) have a Twitter account and 2) be signed in to your Twitter account before you can register an application and generate API keys. 

Once signed in, go to [Application Management](https://apps.twitter.com/) and click 'Create New App', then follow the steps. Once an application has been registered, go to 'Keys and Access Tokens' to generate keys for your app.

With API keys generated, add a file called `.env` in the root of the project with the following:
```
consumerKey = ''
consumerSecret = ''
accessToken = ''
accessTokenSecret = ''
```

With [Bower](http://bower.io/) and [npm](https://www.npmjs.com/#getting-started) installed globally, install dependencies by running the following commands from the terminal:
```
npm install
bower install
```

To start the server, run `node server/server.js`, then open the browser to `localhost:8000`. 

Optionally, [nodemon](http://nodemon.io/), installed globally, can be used for automatic reloads on file changes. Run `nodemon server/server.js`

## App Design

