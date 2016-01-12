(function() {

	var app = angular.module('twitch-status', []);

	app.controller('TabController', function($http) {
		var tc = this;
		tc.userList = ["freecodecamp", "insomniacgamers12345", "medrybw", "monstercat", "streamerhouse","storbeck"];
		tc.currentList = tc.userList;
		tc.tabList = ['All', 'Online', 'Offline'];
		tc.mode = tc.tabList[0];
		tc.streamInfo = [];
		tc.userInfo = [];
		tc.userList.forEach(function(user){
			$http.get('https://api.twitch.tv/kraken/streams/' + user + '?callback=').then(function(result){
				tc.streamInfo[user] = result;
			});
			$http.get('https://api.twitch.tv/kraken/users/' + user + '?callback=').then(function(result){
				tc.userInfo[user] = result;
			});
		});
		tc.setMode = function(mode) {
			tc.mode = mode;
			if(tc.mode === "Online") {
				tc.currentList = tc.userList.filter(function(user){
					return tc.streamInfo[user].data.stream;
				});
			}
			else if(mode === "Offline") {
				tc.currentList = tc.userList.filter(function(user){
					return !tc.streamInfo[user].data.stream;
				});
			}
			else tc.currentList = tc.userList;
		};
		tc.isMode = function(mode){
			return tc.mode === mode;
		};
	});

})();