DCM.GetEmailService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dealer_platform_open_account_userexists");
	this.setErrorMessage(DCM.Resources.getResource("ERROR28"));
	this.setParam("emailAddress", "");

});