DCM.OpenAccountService = ROCK.createClass(DCM.StandardServiceCaller, function OpenAccountService() {
	
	this.setMethod("/dealer_platform_open_account_create");
	this.setErrorMessage(DCM.Resources.getResource("ERROR42"));
	this.setParam("firstname", "");
	this.setParam("lastname", "");
	this.setParam("emailAddress", "");
	this.setParam("password", "");
	
});