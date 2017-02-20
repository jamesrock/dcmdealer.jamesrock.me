DCM.ResetPasswordService = ROCK.createClass(DCM.ServiceCaller, function ResetPasswordService() {
		
	this.setMethod("/retrieve_user_details_reset");
	this.setErrorMessage(DCM.Resources.getResource("ERROR47"));

});