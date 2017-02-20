DCM.RenameWatchlistService = ROCK.createClass(DCM.StandardServiceCaller, function RenameWatchlistService() {

	this.setMethod("/dcmdealer_watchlist_rename");
	this.setErrorMessage(DCM.Resources.getResource("ERROR45"));	

});