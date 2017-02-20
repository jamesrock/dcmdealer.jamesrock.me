DCM.GetUserService = ROCK.createClass(DCM.ServiceCaller, function() {

	this.setMethod("/dcmdealer_accountoverview_getuserdetails");
	this.setErrorMessage(DCM.Resources.getResource("ERROR38"));

});