DCM.GetWatchlistService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_watchlist_get");
	this.setErrorMessage(DCM.Resources.getResource("ERROR39"));

});