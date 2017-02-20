DCM.HTMLTicketModuleBuyButtonElement = ROCK.createClass(function HTMLTicketModuleBuyButtonElement() {

	try {
		
		this._super = DCM.HTMLTicketModuleButtonElement;
		this._super();
		
		this.label.setText(DCM.Resources.getResource("BuyLabel"));
		this.setType("HTMLTicketModuleBuyButtonElement");
		this.icon.setText("UP");
		this.icon.setRole("deal-ticket-up-arrow");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleBuyButtonElement", e);
		
	};
	
};