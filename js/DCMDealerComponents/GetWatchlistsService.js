DCM.GetWatchlistsService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_watchlists_get");
	this.setErrorMessage(DCM.Resources.getResource("ERROR40"));

});