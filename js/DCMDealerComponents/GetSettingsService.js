DCM.GetSettingsService = ROCK.createClass(DCM.ServiceCaller, function() {

	this.setMethod("/dcmdealer_settings_get");
	this.setErrorMessage(DCM.Resources.getResource("ERROR36"));

});