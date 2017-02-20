DCM.HTMLTicketModuleLeftPanelElement = ROCK.createClass(function HTMLTicketModuleLeftPanelElement() {

	try {
		
		this._super = DCM.HTMLTicketModulePanelElement;
		this._super();
		
		this.setType("HTMLTicketModuleLeftPanelElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleLeftPanelElement", e);
		
	};
	
};