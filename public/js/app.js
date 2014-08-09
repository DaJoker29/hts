var hts = angular.module('hts', ['ngRoute']);

hts.controller('MainCtrl', function($scope) {
    $scope.notes = [
        { "body": "Stuff", "date": Date.now() },
        { "title": "I need to find stuff to Do", "body": "Stuff", "date": Date.now() },
        { "title": "Is this real life?", "body": "It was the best of times and it was the worst of times and there was times where I didn't even know what time it was. At that time I realized that time was an artificial construct of the white man created to keep the Black Man enslaved", "date": Date.now() },
        { "title": "Love vs Hate", "body": "Stuff", "date": Date.now() },
        { "title": "7", "body": "Stuff", "date": Date.now() },
        { "title": "", "body": "Stuff", "date": Date.now() },
    ];
})
