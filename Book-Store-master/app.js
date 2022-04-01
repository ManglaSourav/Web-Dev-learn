const bookStoreApp = angular.module("bookStore", ["ngRoute"]); //load module which are wriiten in dependency array []

// bookStoreApp.component("rootbookcomp", {
//   controller: function($scope) {
//     console.log($scope.h4tag);
//   },
//   templateUrl: "../templates/test.html"
// });
bookStoreApp.config([
  "$routeProvider",
  function($routeProvider) {
    //run before application runs
    $routeProvider
      // .when("/", { templateUrl: "landing.html", controller:"bookCtrl" })
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "homeCtrl"
      })
      .when("/about", {
        templateUrl: "views/buy.html",
        controller: "buyCtrl"
      });
    // .otherwise({ redirectTo: "/" });
  }
]);
bookStoreApp.run(function() {
  //will fire when application runs
});

bookStoreApp.controller("bookctrl", [
  "$scope",
  "$http",
  "$location",
  function($scope, $http, $location) {
    //2nd argument has an array of dependency and function
    $scope.homeUrl = $location.absUrl();
    $scope.url = window.location.href;
   

    $scope.buyBook = function(book) {
      var bookIndex = $scope.books.indexOf(book);
      $scope.books.splice(bookIndex, 1);
    };

    $http.get("data/books.json").then(function(res) {
      $scope.books = res.data;
    });

    // console.log(angular.toJson($scope.books));
  }
]);

bookStoreApp.controller("homeCtrl", [
  "$scope",
  function($scope) {
    $scope.homeMsg = "from home home";
    // $scope.url = $location.path();
  }
]);
bookStoreApp.controller("buyCtrl", [
  "$scope",
  function($scope) {
    $scope.buyMsg = "form buy page";
  }
]);
