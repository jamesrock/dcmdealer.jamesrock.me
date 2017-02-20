DCM.HTMLTicketModuleHeadElement = ROCK.createClass(function HTMLTicketModuleHeadElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleHeadElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleHeadElement", e);
		
	};
	
};