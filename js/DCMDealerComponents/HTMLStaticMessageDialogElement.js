DCM.HTMLStaticMessageDialogElement = ROCK.createClass(function HTMLStaticMessageDialogElement() {

	try {
		
		var
		message = this.message = new DCM.HTMLDialogMessageElement();
		
		this._super = DCM.HTMLStaticDialogElement;
		this._super();
		
		this.body.append(message);
		
		this.setType("HTMLStaticMessageDialogElement");
		
		this.setMessage = function setMessage(value) {
			this.messageText = value;
			message.setText(this.messageText);
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLStaticMessageDialogElement", e);
		
	};
	
};