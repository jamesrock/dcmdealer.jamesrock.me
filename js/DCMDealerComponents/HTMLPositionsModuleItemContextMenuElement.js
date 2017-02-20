DCM.HTMLPositionsModuleItemContextMenuElement = ROCK.createClass(DCM.HTMLContextMenuElement, function HTMLPositionsModuleItemContextMenuElement(target) {

	var
	_this = this,
	addToPortfolioItem;
	
	this.inherits(target);
	
	this.setItem(DCM.Resources.getResource("EditPositionLabel"), function() {
	
		_this.target.editPosition();
		
	});
	
	this.setItem(DCM.Resources.getResource("addNoteLabel"), function() {
		
		DCM.NoteManager.createNoteFromPosition(_this.target.Position);
		
	});
	
	this.setItem(DCM.Resources.getResource("AddAlertLabel"), function() {
	
		DCM.AlertManager.createAlertFromInstrument(_this.target.Position.instrument);
		
	});
	
	this.setItem(DCM.Resources.getResource("AddToWatchlistLabel"), function() {
	
		DCM.WatchlistManager.authorAddToWatchlist(_this.target.Position.instrument);
		
	});
	
	addToPortfolioItem = this.setItem(DCM.Resources.getResource("AddToPortfolioLabel"), function() {
		
		DCM.PortfolioManager.authorAddToPortfolio(_this.target.Position);
		
	});
	
	if(DCM.PortfolioManager.portfolios.length===0) {
		addToPortfolioItem.disable();
	};
	
	this.setItem(DCM.Resources.getResource("OpenChartLabel"), function() {
		
		_this.target.Position.instrument.openChart();
		
	});
	
	this.setItem(DCM.Resources.getResource("PinChartToDashboardLabel"), function() {
		
		var chart = _this.target.Position.instrument.openChart();
		chart.pin();
		
	});
	
	this.setItem(DCM.Resources.getResource("ClosePositionLabel"), function() {
	
		DCM.PositionManager.publishClosePosition(_this.target.Position);
		
	});

});