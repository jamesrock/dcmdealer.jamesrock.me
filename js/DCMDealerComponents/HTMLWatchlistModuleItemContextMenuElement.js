DCM.HTMLWatchlistModuleItemContextMenuElement = ROCK.createClass(DCM.HTMLContextMenuElement, function HTMLWatchlistModuleItemContextMenuElement(target) {

	var
	_this = this;
	
	this.inherits(target);
	
	this.setItem(DCM.Resources.getResource("RemoveFromWatchlistLabel"), function() {
		
		DCM.WatchlistManager.authorDeleteFromWatchlist(_this.target);
		
	});
	
	this.setItem(DCM.Resources.getResource("OpenTicketLabel"), function() {
		
		_this.target.instrument.openTicket();
		
	});
	
	this.setItem(DCM.Resources.getResource("PinTicketToDashboard"), function() {
		
		var ticket = _this.target.instrument.openTicket();
		ticket.pin();
		
	});
	
	this.setItem(DCM.Resources.getResource("OpenChartLabel"), function() {
		
		_this.target.instrument.openChart();
		
	});
	
	this.setItem(DCM.Resources.getResource("PinChartToDashboardLabel"), function() {
		
		var chart = _this.target.instrument.openChart();
		chart.pin();
		
	});
	
	this.setItem(DCM.Resources.getResource("addNoteLabel"), function() {
		
		_this.target.instrument.addNote();
		
	});
	
	this.setItem(DCM.Resources.getResource("AddAlertLabel"), function() {
		
		_this.target.instrument.addAlert();
		
	});

});