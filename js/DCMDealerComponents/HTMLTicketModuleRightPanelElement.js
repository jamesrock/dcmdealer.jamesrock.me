DCM.HTMLTicketModuleRightPanelElement = ROCK.createClass(function HTMLTicketModuleRightPanelElement() {

	try {
		
		this._super = DCM.HTMLTicketModulePanelElement;
		this._super();
		
		this.setType("HTMLTicketModuleRightPanelElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleRightPanelElement", e);
		
	};
	
};