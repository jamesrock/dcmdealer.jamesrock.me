DCM.HTMLPortfolioModuleItemContextMenuElement = ROCK.createClass(DCM.HTMLContextMenuElement, function HTMLPortfolioModuleItemContextMenuElement(target) {	
	var
	_this = this;
	
	this.inherits(target);
	
	this.setItem(DCM.Resources.getResource("RemoveFromPortfolioLabel"), function() {
	
		DCM.PortfolioManager.authorDeleteFromPortfolio(_this.target);
		
	});
	
	this.setItem(DCM.Resources.getResource("addNoteLabel"), function() {
		
		// perhaps could be changed to match the manager methods
		_this.target.position.instrument.addNote();
		
	});
	
	this.setItem(DCM.Resources.getResource("AddAlertLabel"), function() {
		
		// perhaps could be changed to match the manager methods
		_this.target.position.instrument.createAlert();
		
	});
	
	this.setItem(DCM.Resources.getResource("EditPositionLabel"), function() {
	
		_this.target.editPosition();
		
	});
	
	this.setItem(DCM.Resources.getResource("ClosePositionLabel"), function() {
	
		DCM.PositionManager.publishClosePosition(_this.target.position);
		
	});

});