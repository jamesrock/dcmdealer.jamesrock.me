DCM.GetUserPanelsService = ROCK.createClass(DCM.ServiceCaller, function() {

	this.setMethod("/dcmdealer_userpanels_get");
	this.setErrorMessage(DCM.Resources.getResource("ERROR37"));

});