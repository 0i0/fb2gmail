var DEBUG = process.env.NODE_ENV != 'production';

// Dependencies.
var express = require('express')
var sessionStore = new express.session.MemoryStore()
var app = express()

// Globals
var globals =
  { app: app
  , request : require('request')
  , config: require('./config')(DEBUG)
  , util: require('util')
  }

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser())
  app.use(express.session({store: sessionStore, secret: globals.config.sessionSecret}))
  app.use(app.router)
})

// Routes
require('./boot')(globals)

if (!module.parent) {
  var port = process.env.PORT || globals.config.port
  app.listen(port)
  console.log('app running on port %d', port)
}





