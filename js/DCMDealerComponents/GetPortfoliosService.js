DCM.GetPortfoliosService = ROCK.createClass(DCM.ServiceCaller, function() {

	this.setMethod("/dcmdealer_portfolios_get");
	this.setErrorMessage(DCM.Resources.getResource("ERROR33"));

});