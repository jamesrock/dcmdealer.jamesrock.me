DCM.DeleteAlertService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_alert_delete");
	this.setErrorMessage(DCM.Resources.getResource("ERROR13"));

});