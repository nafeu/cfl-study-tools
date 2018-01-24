'use strict';

angular.module('myApp.phonology', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/phonology', {
    templateUrl: 'views/phonology/phonology.html',
    controller: 'PhonologyCtrl'
  });
}])

.controller('PhonologyCtrl', ['$scope', '$log', '$http', function($scope, $log, $http) {

  $scope.title = "Phonology";

  $scope.log = function(message) {
    $log.debug(message);
  }

  $scope.data = null;
  $http.get('/data/export.json')
    .success(function(data, status, headers, config) {
      $scope.data = data.content;
    })
    .error(function(data, status, headers, config) {});

  $scope.tag = function(message) {
    if ($scope.tags) {
      return $scope.tags.replace(/\s*,\s*/g, ',').split(',').every(function(tag) {
        return message.tags.some(function(objTag){
          return objTag.indexOf(tag) !== -1;
        });
      });
    }
    else {
      return true;
    }
  };

}]);