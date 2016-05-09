var app = angular.module("booking");

app.component("bookableServicesList", {
      templateUrl: "templates/bookableServicesList.html",
      controller: 'bookableController'
});

app.controller('bookableController',[
  "$scope",
  "bookableService",
  function($scope,bookableService) {
    $scope.bookingState = {
      services: []
    };
    var COMPANY_ID = 41285;
    bookableService.getServices(COMPANY_ID).then(function(services) {
      $scope.bookingState.services = services;
    })
  }
]);
