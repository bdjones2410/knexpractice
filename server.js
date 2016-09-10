/*
 *       Node module requirements
 */
  var express = require("express");
  var path = require("path");
  var port = process.env.NODE_ENV||3001;
  var http = require('http');
  var env = process.env.NODE_ENV || 'development';
  var config = require('./knexfile');
  var knex = require('knex')(config[env]);
  var bodyParser = require('body-parser');
/*
 * express requirements
 */
  var app = express();
  app.use(express.static(path.join(__dirname, '/client')));
  app.use(bodyParser.json());

/*
 * Routes
 */

  app.post('/create-blog', function(req,res){
    var blog = req.body.blog;
    console.log(req.body);
    knex('posts').insert({title:blog.title, body:blog.body, user_id:blog.user_id},"*").then(function(data){
      console.log(data);
    });
  });

  app.get('/blogs', function(req,res){
    knex('posts').select('*')
      .then(function(posts){
        res.json(posts);
      });
  });

  app.get('/user-blogs/:id',function(req,res){
    var userId = req.params.id;
    knex('posts').select('*')
        .where('user_id', userId)
        .then(function(data){
          res.json(data);
        });
  });

  app.get('/',function(req, res){
    res.send();
  });

  app.post('/create-user',function(req,res){
    var user = req.body.user;
    knex('users').insert({username:user.username, email:user.email})
    .then(function(data){

      res.json(data);
    });
  });

  app.get('/users',function(req,res){
    knex('users').select('*')
                 .then(function(data){
                   console.log('Getting Users', data);
                   res.json(data);
                 });
  });



  app.listen(3000,function(){
    console.log("we are on port:", port);
  });
