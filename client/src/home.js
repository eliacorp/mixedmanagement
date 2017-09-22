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

.directive('artistDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/section/artist.html',
    replace: true
  };
})

.directive('socialDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/section/social.html',
    replace: true
  };
})

.directive('detailDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/section/detail.html',
    replace: true
  };
})

.directive('feedDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/section/feed.html',
    replace: true
  };
})

.directive('statusDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/section/status.html',
    replace: true
  };
})

.directive('logoDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/section/logo.html',
    replace: true
  };
});
