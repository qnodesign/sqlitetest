var db = null;
 
var example = angular.module('starter', ['ionic', 'ngCordova'])
    .run(function($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
            db = $cordovaSQLite.openDB("my.db");
            console.log(db);
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
        });
    });


example.controller("ExampleController", function($scope, $cordovaSQLite) {
 
    $scope.insert = function(firstname, lastname) {
      $scope.console = "insert clicked";
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $scope.console = firstname+" "+lastname;
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            $scope.console = "INSERT ID -> " + res.insertId;
        }, function (err) {
            $scope.console = err;
        });
    }
 
    $scope.select = function(lastname) {
        $scope.console = "select clicked";
        var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
        $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
            if(res.rows.length > 0) {
                $scope.console = "SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname;
            } else {
                $scope.console = "No results found";
            }
        }, function (err) {
            $scope.console = err;
        });
    }
 
});