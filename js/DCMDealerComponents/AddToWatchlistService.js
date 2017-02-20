DCM.AddToWatchlistService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_watchlist_addTo");
	this.setErrorMessage(DCM.Resources.getResource("ERROR05"));

});