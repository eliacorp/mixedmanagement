angular.module('myApp')
.controller('homeCtrl',['$rootScope', '$scope','anchorSmoothScroll', ($rootScope,$scope, anchorSmoothScroll)=>{

  $rootScope.anchorScroll=(id)=>{
    anchorSmoothScroll.scrollTo(id);
  }

  // setTimeout(function(){
  //   $( ".synopsis-float" ).draggable({ containment: "window" });
  // },900);

    if($rootScope.isMobile){

    }else{
      setTimeout(function(){
        // Setter
        $( ".synopsis-text-p" ).draggable({
          containment: "document"
        });
      },600);
    }




  $rootScope.backgroundN=1;

  $rootScope.changeBackgrounds=()=>{
    if($rootScope.backgroundN<10){
      $rootScope.backgroundN++
    }else{
      $rootScope.backgroundN=1;
    }
  }




}])

.directive('artistDirective', ['$rootScope', '$location', '$window', '$timeout', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/section/artist.html',
    replace: true
  };
}])

.directive('socialDirective', ['$rootScope', '$location', '$window', '$timeout', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/section/social.html',
    replace: true
  };
}])

.directive('collaboratorDirective', ['$rootScope', '$location', '$window', '$timeout', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/section/collaborator.html',
    replace: true
  };
}])

.directive('feedDirective', ['$rootScope', '$location', '$window', '$timeout', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/section/feed.html',
    replace: true
  };
}])

.directive('statusDirective', ['$rootScope', '$location', '$window', '$timeout', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/section/status.html',
    replace: true
  };
}])

.directive('logoDirective', ['$rootScope', '$location', '$window', '$timeout', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/section/logo.html',
    replace: true
  };
}]);
