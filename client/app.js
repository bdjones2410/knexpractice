angular.module('userpost',[
  'ngRoute'
])

.controller('UsersController',function(UsersService, $scope){
  $scope.user = {};
  $scope.users=[];
  $scope.blogs =[];
  UsersService.getBlogs().then(function(blogData){
    $scope.blogs = blogData.data;
  });
  UsersService.getUsers().then(function(data){
    $scope.users = data.data;
  });

  $scope.getUserBlogs = function(user){
    UsersService.getUserBlogs(user).then(function(data){
      $scope.blogs = data.data;
    });
  };

  $scope.submitBlog = function(blog){
    UsersService.createBlog(blog).then(function(data){

    });
  };


  $scope.SubmitUser = function(user){
    UsersService.createUser(user).then(function(data){

    });
  };
})

.factory('UsersService',function($http){
  var url ='/create-user';
  var getUrl = '/users';
  var blogUrl = '/create-blog';
  var getblogsUrl = '/blogs';

    function getUserBlogs(user){
      return $http.get('/user-blogs/'+user.id);
    }

    function getBlogs(){
      console.log("getting");
      return $http.get(getblogsUrl);
    }

    function createBlog(blog){
      return $http.post(blogUrl, {blog});
    }

    function createUser(user){
      return $http.post(url, {user});
    }

    function getUsers(){
      return $http.get(getUrl);
    }

  return{
    createUser:createUser,
    getUsers:getUsers,
    createBlog:createBlog,
    getBlogs:getBlogs,
    getUserBlogs:getUserBlogs
  };
});
