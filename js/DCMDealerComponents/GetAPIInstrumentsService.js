DCM.GetAPIInstrumentsService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_instruments_get");
	this.setErrorMessage(DCM.Resources.getResource("ERROR45"));

});