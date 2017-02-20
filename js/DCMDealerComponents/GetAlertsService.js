DCM.GetAlertsService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_alert_getAll");
	this.setErrorMessage(DCM.Resources.getResource("ERROR26"));

});