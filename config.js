module.exports = function Config(debug) {
  var config =
    { dev :
      { debug : true
      , orign : 'http://127.0.0.1:8080'
      , port :8080
      , sessionSecret : '50m35ecr3t'
      , FB_APP_ID : ''
      , FB_APP_SECRET : ''
      }
    , prod :
      { debug : false
      , orign : 'http://SOMEAPP.herokuapp.com'
      , port : process.env.PORT
      , sessionSecret : '50m35ecr3t'
      , FB_APP_ID : process.env.FB_APP_ID
      , FB_APP_SECRET : process.env.FB_APP_SECRET
      }
    }
  return config[(debug)?'dev':'prod']
}

