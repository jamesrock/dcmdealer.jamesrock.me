DCM.HTMLAlertsModuleItemEditDialogElement = ROCK.createClass(DCM.HTMLAlertsModuleItemDialogElement, function(alert) {

	var 
	alert = this.alert = alert,
	instrument = this.instrument = alert.instrument;
	
	this.setHeading(DCM.Resources.getResource("EditAlertLabel"));
	this.instrumentHolder.setText(instrument.getDisplayTextAsHTML());
	this.setType("HTMLAlertsModuleItemEditDialogElement");

});