'use strict';

angular.module('myApp.phonology', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/phonology', {
    templateUrl: 'views/phonology/phonology.html',
    controller: 'PhonologyCtrl'
  });
}])

.controller('PhonologyCtrl', function($scope) {

  $scope.title = "Phonology";

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

  $scope.data = [

    {
      name: "p",
      tags: [
        "+cons",
        "-son",
        "-cont",
        "-nas",
        "-strident",
        "-lat",
        "-voice",
        "-spread",
        "Labial",
      ],
    },

    {
      name: "t",
      tags: [
        "+cons",
        "-son",
        "-cont",
        "-nas",
        "-strident",
        "-lat",
        "-voice",
        "-spread",
        "Coronal",
        "+ant",
        "-distr",
      ],
    },

    {
      name: "t̪",
      tags: [
        "+cons",
        "-son",
        "-cont",
        "-nas",
        "-strident",
        "-lat",
        "-voice",
        "-spread",
        "Coronal",
        "+ant",
        "+distr",
      ],
    },

    {
      name: "pf",
      tags: [
        "+cons",
        "-son",
        "-cont",
        "-nas",
        "+strident",
        "-lat",
        "-voice",
        "-spread",
        "Labial",
      ],
    },

    {
      name: "tʃ",
      tags: [
        "+cons",
        "-son",
        "-cont",
        "-nas",
        "+strident",
        "-lat",
        "-voice",
        "-spread",
        "Coronal",
        "-ant",
        "+distr",
      ],
    },

    {
      name: "kʰ",
      tags: [
        "+cons",
        "-son",
        "-cont",
        "-nas",
        "-strident",
        "-lat",
        "-voice",
        "+spread",
        "Dorsal",
        "+high",
        "+back",
      ],
    },

    {
      name: "b",
      tags: [
        "+cons",
        "-son",
        "-cont",
        "-nas",
        "-strident",
        "-lat",
        "+voice",
        "-spread",
        "Labial",
      ],
    },

    {
      name: "f",
      tags: [
        "+cons",
        "-son",
        "+cont",
        "-nas",
        "+strident",
        "-lat",
        "-voice",
        "-spread",
        "Labial",
      ],
    },

    // {
    //   name: "",
    //   tags: [
    //     "cons",
    //     "son",
    //     "cont",
    //     "nas",
    //     "strident",
    //     "lat",
    //     "voice",
    //     "spread",
    //     "Labial",
    //     "Coronal",
    //     "ant",
    //     "distr",
    //     "Dorsal",
    //     "high",
    //     "back",
    //   ],
    // },

  ];


});