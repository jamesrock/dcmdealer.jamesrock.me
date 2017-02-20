DCM.HTMLPromptDialogElement = ROCK.createClass(DCM.HTMLDynamicMessageDialogElement, function HTMLPromptDialogElement() {

	this.setHeading("Default prompt heading");
	this.setType("HTMLPromptDialogElement");
	
});
DCM.HTMLPromptDialogElement.prototype.getValue = function() {
	
	return this.input.getValue();

};
DCM.HTMLPromptDialogElement.prototype.setValue = function(value) {
	
	this.input.setValue(value);

};
DCM.HTMLPromptDialogElement.prototype.setInput = function(obj) {
	
	this.input = obj;
	this.body.append(obj);

};