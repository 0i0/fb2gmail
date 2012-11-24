Base Node on Heroku
========

This is my base setup to build node/heroku apps

## Requirments
* [NodeJS](http://github.com/ry/node)
* [NPM](http://github.com/isaacs/npm)
* [Heroku toolbelt](https://toolbelt.heroku.com/)

## Getting Started
    git clone git://github.com/0i0/BaseNode.git APPNAME
    cd APPNAME
    npm install
    
## Running Localy
    node app.js
Visit [http://localhost:8000](http://localhost:8000)

## Creating Heroku App

    heroku app:create APPNAME

## Deploy
    heroku config:add NODE_ENV=production
    git push heroku master