DCM.EditAlertService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_alert_modify");
	this.setErrorMessage(DCM.Resources.getResource("ERROR20"));

});