angular.module(	'sApp')

.value('urlInicial',{url:"http://localhost:5000"})

.factory('sUrlConfig', ['urlInicial', function(urlInicial){
	return  {getConfig: function(){ return  urlInicial.url;}}; 
}])
.factory('fSocket', ['$rootScope','sUrlConfig',function($rootScope,sUrlConfig) {
		var socket = io.connect(sUrlConfig.getConfig(),{ 'forceNew': true });
		return {
			on: function (eventName, callback) {
	      socket.on(eventName, function () {  
	        var args = arguments;
	        $rootScope.$apply(function () {
	          callback.apply(socket, args);
	        });
	      });
	    },
	    emit: function (eventName, data, callback) {
	      socket.emit(eventName, data, function () {
	        var args = arguments;
	        $rootScope.$apply(function () {
	          if (callback) {
	            callback.apply(socket, args);
	          }
	        });
	      })
	    }
		};
	}])