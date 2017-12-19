angular.
  module('GitHubApiApp').
  component('reposList', {
    template:
'<div>'+
 ' <table ng-table="$ctrl.tableParams" id="table" class="table table-bordered table-hover">'+
   '   <tr ng-repeat="repo in $ctrl.repos">'+
   '     <td data-title="\'Id\'" sortable="\'id\'">{{repo.id}}</td>'+
    '    <td data-title="\'Name\'" sortable="\'full_name\'">{{repo.full_name}}</td>'+
     '    <td data-title="\'Owner Name\'" sortable="\'owner.login\'">{{repo.owner.login}}</td>'+
    '    <td data-title="\'User Avatar\'" sortable="\'owner.avatar_url\'"><img src="{{repo.owner.avatar_url}}" width ="40" height ="40"></td>'+
    '   <td data-title="\'Forks\'" sortable="\'forks\'">{{repo.forks}}</td>'+
    '   <td data-title="\'Watchers\'" sortable="\'watchers\'">{{repo.watchers}}</td>'+
   '  </tr>'+
 ' </table>'+
'</div>',
    controller: function ReposListController($scope, $http, NgTableParams,$filter) {
      scope2 = $scope;
      this.id = 1;
      this.repos = [
      ];
      this.tableParams = new NgTableParams(
        {  
         sorting: {
                    id: 'asc'
                  }
        },
        { 
          getData: function(params) {
         $scope.$ctrl.repos = $filter('orderBy')( $scope.$ctrl.repos, params.orderBy());
        //$defer.resolve(this.users);
        }
       });
      this.GetReposByName = function(name){
         $http({
        method: 'GET',
        url: 'https://api.github.com/search/repositories?q=' + name
      }).then(function successCallback(response) {
              $scope.$ctrl.repos = response.data.items; 
              
        }, function errorCallback(response) {

        });

      };


    }
  });