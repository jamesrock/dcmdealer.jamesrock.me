DCM.HTMLTicketModuleInteractiveNotificationElement = ROCK.createClass(function HTMLTicketModuleInteractiveNotificationElement() {

	try {
		
		var
		_this = this,
		continueButton = new DCM.HTMLButtonElement();
		
		this._super = DCM.HTMLTicketModuleNotificationElement;
		this._super();
		
		_this.setType("HTMLTicketModuleInteractiveNotificationElement");
		
		_this.foot.append(continueButton);
		continueButton.setText("Continue");
		
		continueButton.addEventListener(DCM.Event.click, function() {
			
			_this.close();
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleInteractiveNotificationElement", e);
		
	};
	
};