angular.module('calendarDirective', [])
  .service('range', function () {
    return function (end) {
      return Array.apply(null, Array(end)).map(function (_, i) {
        return i;
      });
    }
  })
  .filter('formatDate', function () {
    return function (moment, format) {
      return moment.format(format);
    }
  })
  .directive('calendar', ['range', function (range) {
    return {
      restrict: 'AE',
      templateUrl: 'calendar.html',
      scope: true,
      link: function ($scope, $element, $attrs) {

        var stdMoment = moment();

        $scope.months = [];

        range(12).map(function (i) {
          $scope.months.push(stdMoment.month(i).format('MMMM'));
        });

        var startYear = 1960;
        var endYear = 2100;

        $scope.years = range((2100 - 1960)).map(function (i) {
          return (startYear - 1) + i;
        });

        var buildMonth = function (date) {
          var monthStart = date.clone().startOf('month'),
            startDay = monthStart.day(),
            monthEnd = date.clone().endOf('month'),
            endDay = monthEnd.day(),
            previousDays = 0,
            nextDays = 0;
          if (startDay !== 0) {
            previousDays = startDay;
          }
          if (endDay !== 6) {
            nextDays = 6 - endDay;
          }

          var startDate = previousDays > 0 ? monthStart.subtract(previousDays, 'days') : monthStart;
          var endDate = nextDays > 0 ? monthEnd.add(nextDays, 'days') : monthEnd;
          var currentDate = startDate;

          var calendarData = [];

          while (currentDate.isBefore(endDate)) {
            var day = {
              moment: currentDate.clone(), events: [], meta: {
                otherMonth: currentDate.month() !== date.month()
              }
            };
            calendarData.push(day);
            currentDate.add(1, 'day');
          }
          return calendarData;
        };

        var switchDate = function (month, year) {
          var date = moment({year: year, month: month});
          $scope.currentDate = date;
          $scope.days = buildMonth($scope.currentDate);
        };

        $scope.currentDate = moment();

        $scope.dateKey = {
          month: $scope.currentDate.month(),
          year: $scope.currentDate.year()
        };

        $scope.$watch('dateKey', function () {
          switchDate($scope.dateKey.month, $scope.dateKey.year);
        }, true);
      }
    };
  }]);
