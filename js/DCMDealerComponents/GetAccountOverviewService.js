DCM.GetAccountOverviewService = ROCK.createClass(DCM.ServiceCaller, function() {

	this.setMethod("/dcmdealer_accountoverview_get");
	this.setErrorMessage(DCM.Resources.getResource("ERROR25"));
	this.setNotifyUserOnError(false);

});