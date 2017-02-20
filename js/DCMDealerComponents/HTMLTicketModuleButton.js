DCM.HTMLTicketModuleButton = ROCK.createClass(function HTMLTicketModuleButton() {

	try {
		
		this._super = DCM.HTMLButtonElement;
		this._super();
		
		this.setType("HTMLTicketModuleButton");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleButton", e);
		
	};
	
};