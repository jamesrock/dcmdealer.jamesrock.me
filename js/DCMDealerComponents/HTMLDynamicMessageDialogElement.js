DCM.HTMLDynamicMessageDialogElement = ROCK.createClass(DCM.HTMLDynamicDialogElement, function HTMLDynamicMessageDialogElement() {

	var
	message = this.message = new DCM.HTMLDialogMessageElement();
	
	this.body.append(message);
	
	this.setType("HTMLDynamicMessageDialogElement");
	
});
DCM.HTMLDynamicMessageDialogElement.prototype.setMessage = function(value) {
		
	this.messageText = value;
	this.message.setText(this.messageText);

};