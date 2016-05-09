describe('Bookable Services List Component', function() {
  var $compile,
    $rootScope,
    httpBackend;
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
  // Load the myApp module, which contains the directive
  beforeEach(module('booking'));
  beforeEach(module('templates'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_, $injector) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    httpBackend = $injector.get('$httpBackend');
  }));

  it('renders n rows if endpoint returns n services', function() {
    httpBackend
      .whenGET('https://uk.bookingbug.com/api/v1/41285/services')
      .respond(response);
    // Compile a piece of HTML containing the directive
    var element = $compile("<bookable-services-list></bookable-services-list>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    httpBackend.flush();
    // Check that the compiled element contains the templated content
    expect(element[0].querySelectorAll('.service').length).toBe(3);
  });
});
