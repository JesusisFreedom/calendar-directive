describe('myApp.calendar module', function() {
  beforeEach(module('myApp.version'));

  describe('app-calendar directive', function() {
    it('should print current calendar', function() {
      module(function($provide) {
        $provide.value('version', 'TEST_VER');
      });
      inject(function($compile, $rootScope) {
        var element = $compile('<span app-calendar></span>')($rootScope);
        expect(element.text()).toEqual('TEST_VER');
      });
    });
  });
});
