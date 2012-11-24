fb2gmail
========

This will export all you friends from facebook including the desired @facebook addresses so you won't waste any more time on the newsfeed

## Requirments
* [NodeJS](http://github.com/ry/node)
* [NPM](http://github.com/isaacs/npm)
* [Heroku toolbelt](https://toolbelt.heroku.com/)

## Getting Started
    git clone https://github.com/0i0/fb2gmail.git
    cd APPNAME
    npm install
    
## Running Localy
    node app.js
Visit [http://localhost:8000](http://localhost:8000)

## Creating Heroku App

    heroku app:create APPNAME

## Deploy
    heroku config:add NODE_ENV=production
    heroku config:add FB_APP_ID=xxx FB_APP_SECRET=xxx
    git push heroku master