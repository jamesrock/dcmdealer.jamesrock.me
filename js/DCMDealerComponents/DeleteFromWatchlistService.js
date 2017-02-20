DCM.DeleteFromWatchlistService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_watchlist_removeFrom");
	this.setErrorMessage(DCM.Resources.getResource("ERROR15"));

});