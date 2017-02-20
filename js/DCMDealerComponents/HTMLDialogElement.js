DCM.HTMLDialogElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLDialogElement() {

	var
	_this = this,
	head = _this.head = new DCM.HTMLDialogHeadElement(),
	body = _this.body = new DCM.HTMLDialogBodyElement(),
	foot = _this.foot = new DCM.HTMLDialogFootElement(),
	inner = _this.inner = new DCM.HTMLDivElement(),
	modalOverlay = this.modalOverlay = new DCM.HTMLDialogOverlayElement();
	
	inner.append(head);
	inner.append(body);
	inner.append(foot);
	_this.append(inner);
	
	_this.setType("HTMLDialogElement");
	
	_this.addEventListener(DCM.Event.contextmenu, function() {
		
		return false;
	
	});
	
	setSuppressCloseOnContinue(false);

});
DCM.HTMLDialogElement.prototype.open = function() {
	
	DCM.body.append(modalOverlay);
	DCM.body.append(this);
	position();

};
DCM.HTMLDialogElement.prototype.close = function() {
	
	this.destroy();

};
DCM.HTMLDialogElement.prototype.setHeading = function(value) {
	
	this.heading = value;
	head.setText(this.heading);

};
DCM.HTMLDialogElement.prototype.destroy = function() {
	
	this.remove();
	this.modalOverlay.remove();
	DCM.DialogManager.dialogs.splice(DCM.getIndexOf(DCM.DialogManager.dialogs, this), 1);
	DCM.DialogManager.openFirstInQueue();

};
DCM.HTMLDialogElement.prototype.position = function() {
			
	var 
	_height = this.getHeight(),
	_width = this.getWidth();
	
	this.setStyle("marginTop", ("-" + (_height/2) + "px"));
	this.setStyle("marginLeft", ("-" + (_width/2) + "px"));
	
};
DCM.HTMLDialogElement.prototype.setSuppressCloseOnContinue = function(value) {
	
	this.suppressCloseOnContinue = value;

};
DCM.HTMLDialogElement.prototype.queue = function() {
			
	DCM.DialogManager.queueDialog(this);
	
};