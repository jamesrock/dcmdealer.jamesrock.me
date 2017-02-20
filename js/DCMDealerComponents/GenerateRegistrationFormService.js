DCM.GenerateRegistrationFormService = ROCK.createClass(DCM.ServiceCaller, function() {

	this.setMethod("/dcmdealer_user_add");
	this.setErrorMessage(DCM.Resources.getResource("ERROR24"));

});