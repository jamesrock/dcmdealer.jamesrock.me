DCM.GetPortfolioService = ROCK.createClass(DCM.ServiceCaller, function() {

	this.setMethod("/dcmdealer_portfolio_get");
	this.setErrorMessage(DCM.Resources.getResource("ERROR32"));

});