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

  describe('when instatiated', function() {
    var bookableService;

    beforeEach(inject(function(_bookableService_) {
      bookableService = _bookableService_;
    }));

    it('services should be empty', function() {
      expect(bookableService.state.services.length).toBe(0);
    })
  });

  describe('when requesting list of services', function() {
    var bookableService, httpBackend, authRequestHandler;

    beforeEach(inject(function(_bookableService_, $injector) {
      bookableService = _bookableService_;
      httpBackend = $injector.get('$httpBackend');
    }));

    it('should format the recieved data', function() {
      httpBackend
        .expectGET('https://uk.bookingbug.com/api/v1/4/services')
        .respond(response);
      bookableService.getServices(4);
      httpBackend.flush();
      expect(bookableService.state.services).toEqual([{
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
    });
  });

});
