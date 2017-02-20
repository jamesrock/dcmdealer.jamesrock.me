DCM.GetSessionService = ROCK.createClass(DCM.ServiceCaller, function() {

	this.setMethod("/dcmdealer_dcmlssession");
	this.setErrorMessage(DCM.Resources.getResource("ERROR35"));

});