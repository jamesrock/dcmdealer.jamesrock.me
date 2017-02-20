DCM.DeletePortfolioService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_portfolio_delete");
	this.setErrorMessage(DCM.Resources.getResource("ERROR18"));

});