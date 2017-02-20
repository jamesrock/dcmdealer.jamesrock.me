DCM.AddInstrumentToAPIUserService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_user_add_instrument");
	this.setErrorMessage(DCM.Resources.getResource("ERROR45"));

});