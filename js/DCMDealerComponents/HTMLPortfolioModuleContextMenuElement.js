DCM.HTMLPortfolioModuleContextMenuElement = ROCK.createClass(DCM.HTMLModuleContextMenuElement, function HTMLPortfolioModuleContextMenuElement(target) {

	var
	_this = this;
	
	this.inherits(target);
	
	this.setItem(DCM.Resources.getResource("DeletePortfolioLabel"), function() {
		
		DCM.PortfolioManager.authorDeletePortfolio(_this.target);
		
	});
		
});