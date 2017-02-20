DCM.RequestPasswordService = ROCK.createClass(DCM.StandardServiceCaller, function RequestPasswordService() {
		
	this.setMethod("/dealer_platform_login_forgot");
	this.setErrorMessage(DCM.Resources.getResource("ERROR46"));

});