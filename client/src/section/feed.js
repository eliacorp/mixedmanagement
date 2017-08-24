
angular.module('myApp')
.controller('feedCtrl', ['$rootScope', '$scope','$window', '$location','$http', ($rootScope, $scope, $window, $location, $http)=>{


    $scope.feedtLength;
    $scope.feedLoading = true;
    $rootScope.firstLoading=false;
    $rootScope.paginationInProcess=false;
    $rootScope.Feed;






    $scope.getFeedList = function(type, orderField, page){
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
            if(!$rootScope.Feed){
              $rootScope.Feed=Data;
            }else{
              $rootScope.Feed.results=$rootScope.Feed.results.concat(Data.results);
            }

            $scope.$broadcast('FeedReady');
            $rootScope.paginationInProcess=false;
            console.log(Data);

            // The documents object contains a Response object with all documents of type "product".
            $rootScope.Feed.page = Data.page; // The current page number, the first one being 1
            var results = Data.results; // An array containing the results of the current page;
            // you may need to retrieve more pages to get all results
            $rootScope.Feed.prev_page = Data.prev_page; // the URL of the previous page (may be null)
            $rootScope.Feed.next_page = Data.next_page; // the URL of the next page (may be null)
            $rootScope.Feed.results_per_page = Data.results_per_page; // max number of results per page
            $rootScope.Feed.results_size = Data.results_size; // the size of the current page
            $rootScope.Feed.total_pages = Data.total_pages; // the number of pages
            $rootScope.Feed.total_results_size = Data.total_results_size; // the total size of results across all pages
      }, function(err) {
        console.log(err);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });




    };





    if(!$rootScope.Feed){
      $scope.getFeedList('feed', 'my.feed.date', 1);
    }else{
      if($location.search()){
        $rootScope.Feed.results=[];
        $scope.getFeedList('feed', 'my.feed.date', 1);
      }
    }



      setTimeout(function(){
        angular.element($window).bind("scroll.feed", function() {
            var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            var body = document.body, html = document.documentElement;
            var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
            var windowBottom = windowHeight + window.pageYOffset;
            if ((windowBottom >= docHeight) &&($rootScope.paginationInProcess==false)) {
                // alert('bottom reached');
                if($rootScope.Feed.next_page){
                  var next = $rootScope.Feed.page +1;
                  $scope.getArtistList('feed', 'my.feed.date', next);
                }

            }
        });
      }, 1000);



}]);
