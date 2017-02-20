DCM.HTMLTicketModulePendingNotificationElement = ROCK.createClass(function HTMLTicketModulePendingNotificationElement() {

	try {
		
		this._super = DCM.HTMLTicketModuleNotificationElement;
		this._super();
		
		this.setType("HTMLTicketModulePendingNotificationElement");
		this.head.setText("Processing Transation");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModulePendingNotificationElement", e);
		
	};
	
};