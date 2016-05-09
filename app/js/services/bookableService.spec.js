describe('bookableService : ', function() {
  beforeEach(module('booking'));
  var response = {
    _embedded: {
      services: [{
        name: 'Service 1',
        description: 'service 1 description',
        prices: [
          '9000'
        ],
        something: 'else'
      }, {
        name: 'Service 2',
        description: 'service 2 description',
        prices: [
          '1000'
        ],
        something: 'else'
      }, {
        name: 'Service 3',
        description: 'service 3 description',
        prices: [
          '100000'
        ],
        something: 'else'
      }]
    }
  };

  describe('when requesting list of services', function() {
    var bookableService, httpBackend, authRequestHandler;

    beforeEach(inject(function(_bookableService_, $injector) {
      bookableService = _bookableService_;
      httpBackend = $injector.get('$httpBackend');
    }));

    it('should format the recieved data', function(done) {
      httpBackend
        .expectGET('https://uk.bookingbug.com/api/v1/4/services')
        .respond(response);
      bookableService.getServices(4).then(function(services) {
        expect(services).toEqual([{
          name: 'Service 1',
          description: 'service 1 description',
          price: '9000'
        }, {
          name: 'Service 2',
          description: 'service 2 description',
          price: '1000'
        }, {
          name: 'Service 3',
          description: 'service 3 description',
          price: '100000'
        }]);
        done();
      });
      httpBackend.flush();
    });
  });

});
