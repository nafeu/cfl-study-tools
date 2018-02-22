'use strict';

angular.module('myApp.dictionary', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dictionary', {
    templateUrl: 'views/dictionary/dictionary.html',
    controller: 'DictionaryCtrl'
  });
}])

.controller('DictionaryCtrl', ['$scope', '$log', '$http', function($scope, $log, $http) {

  $scope.title = "Lenape-English Dictionary";

  $scope.data = null;

  $scope.saveWord = function(name, def) {
    var validInsert = true;
    $scope.savedWords.forEach(function(item){
      if (item.name == name) {
        validInsert = false;
      }
    });
    if (validInsert) {
      $scope.savedWords.push({
        name: name,
        def: def
      });
    }
  }

  $scope.savedWords = [];

  var dataUrl = '/data/dict-export.json';
  if (window.location.hostname !== 'localhost') {
    dataUrl = '/lin-study-tools' + dataUrl;
  }
  $http.get(dataUrl)
    .success(function(data, status, headers, config) {
      $scope.data = data.content;
    })
    .error(function(data, status, headers, config) {});

}]);