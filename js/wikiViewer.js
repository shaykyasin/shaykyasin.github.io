(function() {

	var app = angular.module('wiki-viewer', []);

	app.controller('MainController', function($http) {
		var a = this;
    a.pages = [];
    a.datalist = [];
    
    var api = '';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';
    a.showAC = false;

    a.search = function(title, api){
      if (!title)
        return;
      a.pages = [];
      $http.jsonp(api + title + cb).success(function(data) {
        if(data.hasOwnProperty('query')) {
          angular.forEach(data.query.pages, function(item)  {
            a.pages.push({title: item.title, extract: item.extract, page: page + item.pageid});
          });
        }
        a.showAC = false;
      });   
    };
    
    a.changed = function(input) {
      if (input.length > 2) {
        a.datalist = [];
        api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&list=prefixsearch&pslimit=10&pssearch=';
        $http.jsonp(api + input + cb).success(function(data) {
          if(data.hasOwnProperty('query')) {
            angular.forEach(data.query.prefixsearch, function(item)  {
              a.datalist.push(item.title);
            });
          }
        });
        a.showAC = true;
      }
    }

    a.searchTitle = function(title) {
      api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=pageimages|extracts&exintro&explaintext&exsentences=1&titles=';
      a.search(title, api);
    };

    a.searchAll = function(title) {
      api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=pageimages|extracts&gsrlimit=10&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
      a.search(title, api);
    };

  });

})();