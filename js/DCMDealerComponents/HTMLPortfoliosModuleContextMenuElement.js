DCM.HTMLPortfoliosModuleContextMenuElement = ROCK.createClass(DCM.HTMLModuleContextMenuElement, function HTMLPortfoliosModuleContextMenuElement(target) {

	this.inherits(target);
	
	this.setItem(DCM.Resources.getResource("CreatePortfolioLabel"), function() {
		
		DCM.PortfolioManager.authorNewPortfolio();
		
	});
		
});