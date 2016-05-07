var app = angular.module("booking");

app.directive("bookableServicesList", function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: "templates/bookableServicesList.html",
      controller: 'bookableController'
    };
});

app.controller('bookableController',[
  "$scope",
  "bookableService",
  function($scope,bookableService) {
    $scope.bookingState = bookableService.state;
    var COMPANY_ID = 41285;
    bookableService.getServices(COMPANY_ID);
  }
]);
