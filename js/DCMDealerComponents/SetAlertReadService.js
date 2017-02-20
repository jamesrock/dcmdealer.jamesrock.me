DCM.SetAlertReadService = ROCK.createClass(DCM.StandardServiceCaller, function SetAlertReadService() {
		
	this.setMethod("/dcmdealer_alert_markAsRead");
	this.setErrorMessage(DCM.Resources.getResource("ERROR48"));

});