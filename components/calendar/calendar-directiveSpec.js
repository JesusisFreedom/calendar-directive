describe('calendarDirective module', function() {
  beforeEach(module('calendarDirective'));

  describe('Range service', function() {
    it('should apply an array of integers', function() {
      var end = 10;
      inject(function(range){
        var results = range(10);

        expect(results instanceof Array).toBeTruthy();
        expect(results.length).toBe(10);

      });
    });
  });

  describe('calendar directive', function() {

    beforeEach(module('components/calendar/calendar.html'));

    beforeEach(inject(function($compile, $rootScope, $document) {
      scope = $rootScope.$new();
      element = $compile('<calendar></calendar>')(scope);
      scope.$digest();
      directiveScope = element.children().scope();
      $document[0].body.appendChild(element[0]);
    }));

    it('Should Initialize with the current month and year', function() {

      expect(directiveScope.dateKey).toBeDefined();

      expect(directiveScope.dateKey.month).toEqual(moment().month());

      expect(directiveScope.dateKey.year).toEqual(moment().year());

      expect(element.find('h1').text()).toContain(moment().format('MMMM'));

      expect(element.find('h1').text()).toContain(moment().format('YYYY'));

    });

    it('Should display a calendar', function() {
      inject(function($document) {
        expect($document[0].querySelectorAll('div.day').length).toBeGreaterThan(moment().daysInMonth()-1);
      });
    });

    it('Should Change Month and Year', function(){
      directiveScope.dateKey.month = 0;
      directiveScope.dateKey.year = 2012;
      directiveScope.$digest();
      expect(element.find('h1').text()).toContain('January');
      expect(element.find('h1').text()).toContain('2012');
    });
  });
});
