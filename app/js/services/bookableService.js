var app = angular.module("booking");

app.constant('apiUrl', "https://uk.bookingbug.com/api/v1/");
app.factory('apiHeader', function() {
  return {
    'App-Id': "5a3d8b8d",
    'App-Key': "738e9aca62e7465446b7be8fe4219ffa"
  };
});
app.factory("bookableService", [
  "$http",
  "apiUrl",
  "apiHeader",
  function($http, apiUrl, apiHeader) {
    var bookableService = {
      state: {
        services: []
      },

      getServices: function getServices(id) {
        var req = {
          method: 'GET',
          url: apiUrl + id + '/services',
          headers: apiHeader
        };

        return $http(req)
          .success(function(data) {
            var services = [];
            if (data && data._embedded && data._embedded.services) {
              services = data._embedded.services.map(function(service) {
                return {
                  name: service.name,
                  price: service.prices[0],
                  description: service.description
                };
              });
            }
            bookableService.state.services = services;
          })
          .error(function() {
            //handle error case
          });
      }
    };
    return bookableService;
  }
]);
