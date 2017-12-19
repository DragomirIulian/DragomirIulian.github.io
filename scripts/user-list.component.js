angular.
  module('GitHubApiApp').
  component('userList', {
    template:
'<div>'+
 ' <form name="numberInput" style="display: inline-block; padding-bottom: 20px;">'+
   'List users starting from id:'+
   ' <input type="number"  name="input"  min="0" required ng-model="$ctrl.id">'+
   ' </input>'+
   '<div role="alert">'+
   '<span class="error" ng-show="numberInput.input.$error.required">'+
   '  Required!</span>'+
   ' <span class="error" ng-show="numberInput.input.$error.number">'+
   '  Not valid number!</span>'+
   ' </div>'+
 ' </form>'+
 ' <button style="position: absolute; margin-left:10px; margin-top: -3px;" type="button" ng-click="$ctrl.GetUsersAfterId()" class="btn btn-default">List</button>'+
 ' <table ng-table="$ctrl.tableParams" id="table" class="table table-bordered table-hover">'+
   '   <tr ng-repeat="user in $ctrl.users" ng-click="$ctrl.GetUserById($event, user)">'+
   '     <td data-title="\'Id\'" sortable="\'id\'">{{user.id}}</td>'+
    '    <td data-title="\'UserName\'" sortable="\'login\'">{{user.login}}</td>'+
    '    <td data-title="\'Avatar\'"><img src="{{user.avatar_url}}" width ="40" height ="40"></td>'+
    '   <td data-title="\'Admin\'" sortable="\'site_admin\'">{{user.site_admin ? "Yes" : "No"}}</td>'+
   '  </tr>'+
 ' </table>'+
  '<div class="modal fade" id="userModal" role="dialog">'+
   ' <div class="modal-dialog">'+
    '  <div class="modal-content">'+
    '    <div class="modal-header">'+
    '      <button type="button" class="close" data-dismiss="modal">&times;</button>'+
     '     <h4 class="modal-title">User details</h4>'+
    '    </div>'+
    '    <div class="modal-body">'+
    '      <div class="box-body box-profile">'+
             ' <img class="profile-user-img img-responsive img-circle" src="{{$ctrl.user.avatar_url}}" alt="User profile picture">'+
             ' <h3 class="profile-username text-center">{{$ctrl.user.login}}</h3>'+
             ' <ul class="list-group list-group-unbordered">'+
              '  <li class="list-group-item">'+
              '    <b>Email</b> <a class="pull-right">{{$ctrl.user.email ? $ctrl.user.email : "-"}}</a>'+
              '  </li>'+
              '  <li class="list-group-item">'+
              '   <b>Repos</b> <a class="pull-right">{{$ctrl.user.public_repos}}</a>'+
              '  </li>'+
              '  <li class="list-group-item">'+
               '   <b>Followers</b> <a class="pull-right">{{$ctrl.user.followers}}</a>'+
              '  </li>'+
              '  <li class="list-group-item">'+
              '    <b>Following</b> <a class="pull-right">{{$ctrl.user.following}}</a>'+
              '  </li>'+
              '  <li class="list-group-item">'+
              '    <b>Admin</b> <a class="pull-right">{{$ctrl.user.site_admin ? "Yes" : "No"}}</a>'+
              '  </li>'+
             ' </ul>'+
            '</div>'+
    '    </div>'+
    '    <div class="modal-footer">'+
    '      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
    '    </div>'+
   '   </div> '+
  '  </div>'+
  '</div>'+
'</div>',

    controller: function UserListController($scope, $http, NgTableParams,$filter) {
      scope = $scope;
      this.user = [];
      this.users = [
      ];
      this.tableParams = new NgTableParams(
        {  
         sorting: {
                    id: 'asc'
                  }
        },
        { 
          getData: function(params) {
         $scope.$ctrl.users = $filter('orderBy')( $scope.$ctrl.users, params.orderBy());
        //$defer.resolve(this.users);
    }
       
       
       });
      this.id = 1;
      this.GetUsersAfterId = function(){
         $http({
        method: 'GET',
        url: 'http://api.github.com/users?since='+(this.id - 1) +'&per_page=25'
      }).then(function successCallback(response) {
              if(response != null)
                $scope.$ctrl.users = response.data; 
              
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

      };
      this.GetUsersByName = function(name){
        
        $http({
         method: 'GET',
         url: 'https://api.github.com/search/users?q='+name+'&per_page=25'
        }).then(function successCallback(response) {
                if(response)
                {
                  $scope.$ctrl.users = response.data.items; 
                }


          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      };
      this.GetUserById = function(e, user){
        if(user.login != null)
        {
         $http({
         method: 'GET',
         url: 'http://api.github.com/users/'+user.login
        }).then(function successCallback(response) {
                $scope.$ctrl.user = response.data; 
                $('#userModal').modal('show') 

          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
          
        }
      };
      

      this.GetUsersAfterId();


      
    }
  });