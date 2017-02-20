DCM.CreateWatchlistService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_watchlist_create");
	this.setErrorMessage(DCM.Resources.getResource("ERROR12"));

});