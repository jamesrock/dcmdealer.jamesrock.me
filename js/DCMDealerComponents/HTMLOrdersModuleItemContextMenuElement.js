DCM.HTMLOrdersModuleItemContextMenuElement = ROCK.createClass(DCM.HTMLContextMenuElement, function HTMLOrdersModuleItemContextMenuElement(target) {

	var
	_this = this;
	
	this.inherits(target);
	
	this.setItem(DCM.Resources.getResource("EditOrderLabel"), function() {
	
		_this.target.editOrder();
		
	});
	
	this.setItem(DCM.Resources.getResource("addNoteLabel"), function() {
		
		DCM.NoteManager.createNoteFromInstrument(_this.target);
		
	});
	
	this.setItem(DCM.Resources.getResource("AddAlertLabel"), function() {
	
		DCM.AlertManager.createAlertFromInstrument(_this.target.instrument);
		
	});
	
	this.setItem(DCM.Resources.getResource("AddToWatchlistLabel"), function() {
	
		DCM.WatchlistManager.authorAddToWatchlist(_this.target.instrument);
		
	});
	
	this.setItem(DCM.Resources.getResource("CloseOrderLabel"), function() {
	
		
		DCM.OrderManager.publishCloseOrder(_this.target.Order);
		
	});
	
});