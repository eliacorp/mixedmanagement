
angular.module('myApp')
.controller('statusCtrl', ['$rootScope', '$scope','$window','$timeout','$interval', ($rootScope, $scope, $window, $timeout, $interval)=>{

  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth()+1; //January is 0!
  var yyyy = date.getFullYear();



  if(dd<10) {
      dd = '0'+dd
  }

  if(mm<10) {
      mm = '0'+mm
  }

  $scope.today = mm + '/' + dd + '/' + yyyy;

$scope.clock = Date.now();

var tick = function() {
  $scope.clock = Date.now();
  console.log($scope.clock);
}
tick();
$interval(tick, 1000);

  // $scope.time= Math.round(t / years);


}]);
