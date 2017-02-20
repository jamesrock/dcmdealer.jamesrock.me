DCM.LoginService = ROCK.createClass(DCM.StandardServiceCaller, function LoginService() {
	
	this.setMethod("/dealer_platform_login_login");
	this.setErrorMessage(DCM.Resources.getResource("ERROR41"));
	this.setParam("username", "");
	this.setParam("password", "");
	this.setParam("locale", "engb");

});