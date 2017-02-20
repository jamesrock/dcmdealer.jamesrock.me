DCM.CreatePortfolioService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_portfolio_create");
	this.setErrorMessage(DCM.Resources.getResource("ERROR11"));

});