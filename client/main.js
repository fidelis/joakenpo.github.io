angular
  .module('joakenpo', ['angular-meteor'])
  .controller('MainCtrl', ($log, $scope, $meteor) => {
    $log.debug('main controller');
    $scope.p = {};
    $scope.message = 'Module running';
    $scope.list = $meteor.collection(List);
    $scope.add = () => {
      $scope.list.push($scope.p);
      $scope.p = {};
      $("input:text:eq(0):visible").focus();
    }
  })
  .run(($log) => $log.debug('Joakenpo Module Running'));
