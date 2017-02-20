DCM.SetSettingsService = ROCK.createClass(DCM.ServiceCaller, function SetSettingsService() {
	
	this.setMethod("/dcmdealer_setting_save");
	this.setErrorMessage(DCM.Resources.getResource("ERROR49"));	

});