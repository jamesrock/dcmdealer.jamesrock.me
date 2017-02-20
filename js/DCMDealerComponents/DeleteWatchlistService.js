DCM.DeleteWatchlistService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_watchlist_delete");
	this.setErrorMessage(DCM.Resources.getResource("ERROR19"));

});