DCM.HTMLTicketModuleContextMenuElement = ROCK.createClass(function HTMLTicketModuleContextMenuElement(target) {

	try {
		
		var
		_this = this;
		
		this._super = DCM.HTMLModuleContextMenuElement;
		this._super(target);
		
		if(!this.target.docked) {
			this.setItem(DCM.Resources.getResource("DockTicketLabel"), function() {
				_this.target.dock();
			});
		};
		
		this.setItem(DCM.Resources.getResource("addNoteLabel"), function() {
			
			// change so that alert can be added to position or instrument
			DCM.NoteManager.createNoteFromInstrument(_this.target.MarketPosition.instrument);
			
		});
		
		this.setItem(DCM.Resources.getResource("AddAlertLabel"), function() {
			
			// change so that alert can be added to position or instrument
			DCM.AlertManager.createAlertFromInstrument(_this.target.MarketPosition.instrument);
			
		});
		
		this.setItem(DCM.Resources.getResource("AddToWatchlistLabel"), function() {
		
			DCM.WatchlistManager.authorAddToWatchlist(_this.target.MarketPosition.instrument);
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleContextMenuElement", e);
		
	};
	
};