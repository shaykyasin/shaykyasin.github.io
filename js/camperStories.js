(function() {

	var app = angular.module('camper-stories', []);

	app.controller('MainController', function($http) {
		var a = this;
		a.news = [];
		$http.get('http://www.freecodecamp.com/news/hot').then(function callbackSuccess(result){
			a.news = result.data;
		}, function callbackError(err){
			console.log("Error fetching info: " + err);
		});
	});

})();