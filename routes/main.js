app.get('/', function(req, res){
	res.write('<a href="/fb/home">go get my friends</a>')
	res.end();
});
app.get('/fb/home', function(req, res) {
    var uri = 'https://www.facebook.com/dialog/oauth?client_id=%s&redirect_uri=%s&scope=read_friendlists,friends_birthday,email,user_location';
    uri = util.format(uri,config.FB_APP_ID, config.orign + '/fb/auth');
    res.redirect(uri);
});
app.get('/fb/auth', function(req, res) {
  var uri = 'https://graph.facebook.com/oauth/access_token?client_id=%s&redirect_uri=%s&client_secret=%s&code=%s';
  uri = util.format(
    uri,
    config.FB_APP_ID,
    config.orign + '/fb/auth',
    config.FB_APP_SECRET,
    req.query.code
  );
  request.get({uri: uri}, function (err, response, content) {
    var access_token = content;
    console.log(access_token);
		function filter(data,condition){
			var filtered = [];
			for (var i = data.length - 1; i >= 0; i--) {
				if (condition(data[i])) filtered.push(data[i]);
			}
			return filtered;
		}

		function print(users){
			debugger;
			var keys = 
			[{gmail:'Name' 								,facebook:'name'				}
			,{gmail:'Given Name' 					,facebook:'first_name'	}
			,{gmail:'Family Name' 				,facebook:'last_name'		}
			,{gmail:'Birthday' 						,facebook:'birthday'		}
			,{gmail:'Gender' 							,facebook:'gender'			}
			,{gmail:'E-mail 1 - Type' 		,facebook:''		,grab:function(user){ return 'Facebook'}												}
			,{gmail:'E-mail 1 - Value' 		,facebook:''		,grab:function(user){ return user.username + '@facebook.com'}		}
			,{gmail:'Address 1 - Type' 		,facebook:''		,grab:function(user){ return 'Current'}													}
			,{gmail:'Address 1 - City' 		,facebook:''		,grab:function(user){ return (user.location)?user.location.name.split(',')[0]:''}	}
			,{gmail:'Address 1 - Country' ,facebook:''		,grab:function(user){ return (user.location)?user.location.name.split(',')[1]:''}	}
			]
			var str = '';
			for (var i = keys.length - 1; i >= 0; i--) {
				str+= keys[i].gmail+',';
			}
			str += '\n';
			for (i = users.length - 1; i >= 0; i--) {
				var u = users[i];
				for (var j = keys.length - 1; j >= 0; j--) {
					if (keys[j].facebook !== ''){
						str+= ((keys[j].facebook)?u[keys[j].facebook]:'')+',';
					}else{
						str+= keys[j].grab(u)+',';
					}
				}
				str+= '\n';
			}
			return str;
		}

		var users = [];
		var counter = 0;
		var url = 'https://graph.facebook.com/me/friends?'+access_token;
		request.get({uri: url},function(err, response, content){
			var data = JSON.parse(content);
			var data2 = data//filter(data.data,function(ob){ return ob.name.match('Meir'); });
			for (var i = data2.length - 1; i >= 0; i--) {
				var url = 'https://graph.facebook.com/'+data2[i].id +'?'+access_token;
				request.get({uri: url},function(err, response, content){
					var data = JSON.parse(content);
					counter++;
					users.push(data);
					if (data2.length == counter) {
						req.session.csv = print(users);
						res.redirect('/fb_export.csv');
					}
				});
			}
		});
  });
});

app.get('/fb_export.csv', function(req, res) {
	res.setHeader('Content-disposition', 'attachment; filename=fb.csv');
	res.header('Content-Type', 'text/plain');
	res.write(req.session.csv);
	res.end();
})