DCM.HTMLAlertsModuleItemCreateDialogElement = ROCK.createClass(DCM.HTMLAlertsModuleItemDialogElement, function(instrument) {

	this.instrument = instrument;
	this.setHeading(DCM.Resources.getResource("AddAlertLabel"));
	this.instrumentHolder.setText(instrument.getDisplayTextAsHTML());
	this.setType("HTMLAlertsModuleItemCreateDialogElement");

});