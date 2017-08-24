
angular.module('myApp')
.controller('collaboratorCtrl', ['$rootScope', '$scope','$window','$location','$http', ($rootScope, $scope, $window, $location, $http)=>{

  $scope.collaboratorLength;
  $scope.collaboratorLoading = true;
  $rootScope.firstLoading=false;
  $rootScope.paginationInProcess=false;
  $rootScope.Collaborator;






  $scope.getCollaboratorList = function(type, orderField, page){
    $rootScope.paginationInProcess=true;
  var url = '/api/prismic/list?order='+orderField+'&type='+type+'&page='+page;

  if($location.search().filter){
    url = url + '&filter='+$location.search().filter
  }


  $http({
  method: 'GET',
  url: url
  }).then(function(response) {
      // this callback will be called asynchronously
      // when the response is available
          var Data = response.data;
          if(!$rootScope.Collaborator){
            $rootScope.Collaborator=Data;
          }else{
            $rootScope.Collaborator.results=$rootScope.Collaborator.results.concat(Data.results);
          }

          $scope.$broadcast('CollaboratorReady');
          $rootScope.paginationInProcess=false;
          console.log(Data);

          // The documents object contains a Response object with all documents of type "product".
          $rootScope.Collaborator.page = Data.page; // The current page number, the first one being 1
          var results = Data.results; // An array containing the results of the current page;
          // you may need to retrieve more pages to get all results
          $rootScope.Collaborator.prev_page = Data.prev_page; // the URL of the previous page (may be null)
          $rootScope.Collaborator.next_page = Data.next_page; // the URL of the next page (may be null)
          $rootScope.Collaborator.results_per_page = Data.results_per_page; // max number of results per page
          $rootScope.Collaborator.results_size = Data.results_size; // the size of the current page
          $rootScope.Collaborator.total_pages = Data.total_pages; // the number of pages
          $rootScope.Collaborator.total_results_size = Data.total_results_size; // the total size of results across all pages
    }, function(err) {
      console.log(err);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });




  };





  if(!$rootScope.Collaborator){
    $scope.getCollaboratorList('collaborator', 'my.collaborator.date', 1);
  }else{
    if($location.search()){
      $rootScope.Collaborator.results=[];
      $scope.getCollaboratorList('collaborator', 'my.collaborator.date', 1);
    }
  }


}]);
