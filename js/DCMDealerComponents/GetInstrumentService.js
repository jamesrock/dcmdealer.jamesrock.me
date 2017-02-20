DCM.GetInstrumentService = ROCK.createClass(DCM.ServiceCaller, function() {

	this.setMethod("/dcmdealer_instrument_get");
	this.setErrorMessage(DCM.Resources.getResource("ERROR02"));

});