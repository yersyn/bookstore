angular.module(	'sApp', 
	[
		'ui.router',
		'ngAnimate',
		'ngMaterial',
		'ngMessages',					
		'ngResource',
		'sApp.user',
		'sApp.book',
		'ngFileUpload'
	]
)
.config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider) {

	//configuracion de la rutas con ui.router	 
	$stateProvider

	.state('home',{
		url:'/',
		templateUrl:'app/Commons/Views/sApp.commons.home.view.html'
		// ,
		// controller:'cHighlights'
	})

	.state('error404',{
		url:'/error404',
		templateUrl:'404.html'
	})

	$urlRouterProvider.otherwise('/');

	//Para quitar el hash de la ruta
	$locationProvider.html5Mode(true);
	
}])
.run(['$rootScope','$window','$location','fSocket', 
		function($rootScope,$window,$location,fSocket){

	if ($window.localStorage.currentUser) {
		$rootScope.estadoApp = JSON.parse($window.localStorage.currentUser);
	}else{
		$rootScope.estadoApp = {estado:true};
	}
	
	$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams, options){ 

		if (toState.name=="searchFind") {
			$rootScope.VIEW_FOOTER=false;
		}else{
			$rootScope.VIEW_FOOTER=true;
		}
	});

	// if(sAuthentication.isAuth()==true) {
 //    	// console.log($rootScope.estadoApp);
 //    	fSocket.emit('user_connect',{},function(socket){
	// 		var user={
	// 			id:$rootScope.estadoApp._id,
	// 			state:$rootScope.estadoApp.state,
	// 			socketID:socket.socketID
	// 		};						
	// 		fSocket.emit('register_user',user);			
	// 	});
    	
 //  	}else{
 //  		$rootScope.estadoApp={estado:true};
 //  		$auth.removeToken();
 //  		// $location.path("/highlights-view");		
 //  		// console.log($rootScope.estadoApp);
 //  	}

}])