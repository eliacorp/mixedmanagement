angular.module('myApp')


.controller('navCtrl', ['$scope', '$location', '$rootScope', '$routeParams', function($scope, $location, $rootScope, $routeParams){

  $rootScope.isNavOpen = false;
  $rootScope.groundSoundEL=true;
  $rootScope.isGroundSound=true;


  $scope.openNav = function(){
    $rootScope.isNavOpen = !$rootScope.isNavOpen;
  }

  $scope.closeNav = function(){
    $rootScope.isNavOpen = false;
  }

  $rootScope.isLocation= (location)=>{
    if ($location.path()==location){
      return true;
    }else{return false;}
  }



  $scope.$on('$routeChangeSuccess', function(){
    if($location.path() != '/'){
      $rootScope.pageLoading = false;
    }
    setTimeout(function(){
      $rootScope.pageLoading = false;
      $rootScope.$apply();
    }, 1000);
  })


  $scope.getFirstPath=()=>{
    var first = $location.path();
    first.indexOf(1);
    first.toLowerCase();
    first = first.split("/")[1];
    return first;
  }

  $scope.getSecondPath=()=>{
    var first = $location.path();
    first.indexOf(1);
    first.toLowerCase();

    first = first.split("/")[2];
    return first;
  }

  $scope.getThirdPath=()=>{
    var first = $location.path();
    first.indexOf(1);
    first.toLowerCase();

    first = first.split("/")[3];
    return first;
  }




$rootScope.mobilePage='artist';
$scope.showSection=(page)=>{
  $rootScope.mobilePage=page;
}






}])

.directive('navMobile', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/nav-mobile.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('navDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/nav.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});
