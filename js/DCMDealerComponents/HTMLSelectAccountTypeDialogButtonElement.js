DCM.HTMLSelectAccountTypeDialogButtonElement = ROCK.createClass(DCM.HTMLInlineButtonElement, function HTMLSelectAccountTypeDialogButtonElement() {
	
	var 
	_this = this,
	nameHolder = new DCM.HTMLDivElement(),
	descriptionHolder = new DCM.HTMLDivElement(),
	applyOnlineButton = this.applyOnlineButton = new DCM.HTMLSelectAccountTypeDialogApplyButtonElement();
	
	_this.setType("HTMLSelectAccountTypeDialogButtonElement");
	
	_this.append(nameHolder);
	_this.append(descriptionHolder);
	_this.append(applyOnlineButton);
	
	nameHolder.setAttribute("data-role", "name");
	descriptionHolder.setAttribute("data-role", "desc");

});
DCM.HTMLSelectAccountTypeDialogButtonElement.prototype.setDescription = function setDescription(value) {
	descriptionHolder.setText(value);
};
DCM.HTMLSelectAccountTypeDialogButtonElement.prototype.setName = function setName(value) {
	nameHolder.setText(value);
};