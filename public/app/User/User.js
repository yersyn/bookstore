angular.module('sApp.user', [	
	'satellizer'
	]
)
.config(['$stateProvider','$urlRouterProvider','$authProvider',function($stateProvider,$urlRouterProvider,$authProvider) {		
		
		$authProvider.loginUrl = "http://localhost:5000/logueo";
        $authProvider.signupUrl = "";
        // $authProvider.tokenName = "token";
        // $authProvider.tokenPrefix = "sApp";
}])