DCM.HTMLWatchlistModuleContextMenuElement = ROCK.createClass(DCM.HTMLModuleContextMenuElement, function HTMLWatchlistModuleContextMenuElement(target) {

	var
	_this = this,
	deleteWatchlistItem;
	
	this.inherits(target);
	
	deleteWatchlistItem = this.setItem(DCM.Resources.getResource("DeleteWatchlistLabel"), function() {
	
		DCM.WatchlistManager.authorDeleteWatchlist(_this.target.activeWatchlist);
		
	});
	
	this.setItem(DCM.Resources.getResource("CreateWatchlistLabel"), function() {
		
		DCM.WatchlistManager.authorNewWatchlist(_this.target);
		
	});
	
	if(this.target.activeWatchlist.deleteable===false) {
	
		deleteWatchlistItem.disable();
	
	};
	
	/*
	_this.setItem("Rename watchlist", function() {
	
		DCM.WatchlistManager.authorWatchlistRename(_this.target.activeWatchlist);
		
	});
	*/
	
});