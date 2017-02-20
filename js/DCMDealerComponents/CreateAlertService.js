DCM.CreateAlertService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_alert_add");
	this.setErrorMessage(DCM.Resources.getResource("ERROR09"));
	this.setParam("securityID", "");
	this.setParam("triggerSide", "");
	this.setParam("isHigherPriceTheTrigger", "");
	this.setParam("triggerPrice", "");
	this.setParam("triggerSenti", "");
	this.setParam("isHigherSentiTheTrigger", "");
	this.setParam("message", "");
	this.setParam("sendSms", "");
	this.setParam("sendEmail", "");

});