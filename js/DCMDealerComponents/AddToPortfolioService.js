DCM.AddToPortfolioService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_portfolio_addTo");
	this.setErrorMessage(DCM.Resources.getResource("ERROR04"));

});