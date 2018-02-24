'use strict';

angular.module('myApp.ipa-explorer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ipa-explorer', {
    templateUrl: 'views/ipa-explorer/ipa-explorer.html',
    controller: 'IPAExplorerCtrl'
  });
}])

.controller('IPAExplorerCtrl', ['$scope', '$log', '$http', function($scope, $log, $http) {

  $scope.title = "IPA Explorer";

  $scope.selectedFeatures = [];
  $scope.selectedCategories = [];

  $scope.showFeatures = true;

  $scope.log = function(message) {
    $log.debug(message);
  }

  $scope.data = null;
  $scope.meta = null;

  var dataUrl = '/data/export.json';
  if (window.location.hostname !== 'localhost') {
    dataUrl = '/lin-study-tools' + dataUrl;
  }
  $http.get(dataUrl)
    .success(function(data, status, headers, config) {
      $scope.data = data.phonemes;
      $scope.meta = data.meta;
    })
    .error(function(data, status, headers, config) {});

  $scope.featureFilter = function(collection) {
    if ($scope.selectedFeatures) {
      return $scope.selectedFeatures.every(function(featureFilter) {
        return collection.features.some(function(objfeatureFilter){
          return objfeatureFilter === featureFilter;
        });
      });
    }
    else {
      return true;
    }
  };

  $scope.categoryFilter = function(collection) {
    if ($scope.selectedCategories) {
      return $scope.selectedCategories.every(function(categoryFilter) {
        return collection.categories.some(function(objcategoryFilter){
          return objcategoryFilter === categoryFilter;
        });
      });
    }
    else {
      return true;
    }
  };

  $scope.featureOptions = [
    {name: "Consonantal", shorthand: "cons"},
    {name: "Sonorant", shorthand: "son"},
    {name: "Continuant", shorthand: "cont"},
    {name: "Nasal", shorthand: "nas"},
    {name: "Strident", shorthand: "strident"},
    {name: "Lateral", shorthand: "lat"},
    {name: "Voice", shorthand: "voice"},
    {name: "Anterior", shorthand: "ant"},
    {name: "Distributed", shorthand: "distr"},
    {name: "Approximant", shorthand: "approx"},
    {name: "High", shorthand: "high"},
    {name: "Back", shorthand: "back"},
    {name: "Low", shorthand: "low"},
    {name: "Round", shorthand: "round"},
    {name: "Tense", shorthand: "tense"},
  ]

  $scope.categoryOptions = [
    "voiced",
    "labial",
    "consonant",
    "vowel"
  ]

  $scope.toggleFeature = function(option) {
    var plus_index = $scope.selectedFeatures.indexOf("+" + option);
    var minus_index = $scope.selectedFeatures.indexOf("-" + option);
    if (plus_index !== -1 && minus_index === -1) {
      $scope.selectedFeatures.splice(plus_index, 1, "-" + option);
    } else if (plus_index === -1 && minus_index !== -1) {
      $scope.selectedFeatures.splice(minus_index, 1);
    } else {
      $scope.selectedFeatures.push("+" + option);
    }
  }

  $scope.toggleCategory = function(option) {
    var index = $scope.selectedCategories.indexOf(option);
    if (index !== -1) {
      $scope.selectedCategories.splice(index, 1);
    } else {
      $scope.selectedCategories.push(option);
    }
  }

}]);