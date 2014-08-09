var hts = angular.module('hts', ['ngRoute']);

hts.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.notes = null;
    $scope.error = null;
    $scope.cleared = null;
    $scope.clicked = false;
    $scope.Note = {};

    $scope.toggleClick = function() {
        $scope.clicked = !$scope.clicked;
    }

    $scope.submitNew = function() {
        $scope.toggleClick();
        $scope.create($scope.Note);
        $scope.Note = {};
    }

    $scope.populate = function() {
        var response = $http.get('notes');

        response.success(function(data,status,headers,config) {
            $scope.notes = data
        });
        response.error(function(data,status,headers,config) {
            $scope.error = data
        })
    };
    
    $scope.clear = function() {
        $http.delete('notes')
            .success(function(data,status,headers,config) {
                $scope.cleared = true;
                $scope.populate();
            })
            .error(function(data,status,headers,config) {
                $scope.error = data;
            })
    }

    $scope.del = function(id) {
        var path = 'note/' + id;
        $http.delete(path)
            .success(function(data,status,headers,config) {
                $scope.populate();
            })
            .error(function(data,status,headers,config) {
                $scope.error = data;
            })
    }

    $scope.create = function(obj) {
        $http.post('note', obj)
            .success(function(data,status,headers,config) {
                $scope.populate();
            })
            .error(function(data,status,headers,config) {
                $scope.error = data;
            })
    }

    $scope.update = function(obj) {
        var path = 'note/' + obj.id;
        $http.put(path, obj)
            .success(function(data,status,headers,config) {
                $scope.populate();
            })
            .error(function(data,status,headers,config) {
                $scope.error = data;
            })
    }
    

    // Get notes on start up
    $scope.populate();
}]);
