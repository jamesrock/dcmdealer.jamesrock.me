DCM.HTMLTicketModulePanelElement = ROCK.createClass(function HTMLTicketModulePanelElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModulePanelElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModulePanelElement", e);
		
	};
	
};