DCM.DeleteFromPortfolioService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_portfolio_removeFrom");
	this.setErrorMessage(DCM.Resources.getResource("ERROR14"));

});