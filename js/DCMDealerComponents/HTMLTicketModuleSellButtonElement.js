DCM.HTMLTicketModuleSellButtonElement = ROCK.createClass(function HTMLTicketModuleSellButtonElement() {

	try {
		
		this._super = DCM.HTMLTicketModuleButtonElement;
		this._super();
		
		this.label.setText(DCM.Resources.getResource("SellLabel"));
		this.setType("HTMLTicketModuleSellButtonElement");
		this.icon.setText("DOWN");
		this.icon.setRole("deal-ticket-down-arrow");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleSellButtonElement", e);
		
	};
	
};