DCM.HTMLTicketModuleErrorNotificationElement = ROCK.createClass(function HTMLTicketModuleErrorNotificationElement() {

	try {
		
		var
		_this = this,
		errorHolder = new DCM.HTMLTicketModuleErrorNotificationMessageElement(),
		setMessage = _this.setMessage = function setMessage(value) {
			errorHolder.setText(value);
		};
		
		this._super = DCM.HTMLTicketModuleInteractiveNotificationElement;
		this._super();
		
		_this.setType("HTMLTicketModuleErrorNotificationElement");
		
		_this.head.setText("Transaction Rejected");
		_this.body.append(errorHolder);
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleErrorNotificationElement", e);
		
	};
	
};