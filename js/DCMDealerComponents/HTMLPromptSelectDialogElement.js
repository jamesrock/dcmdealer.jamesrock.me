DCM.HTMLPromptSelectDialogElement = ROCK.createClass(DCM.HTMLPromptDialogElement, function HTMLPromptSelectDialogElement() {

	this.setInput(new DCM.HTMLDynamicSelectMenuElement());
	
	this.input.setWidth(410);
	
	this.setHeading("Default select-prompt heading");
	
	this.setType("HTMLPromptSelectDialogElement");
		
});
DCM.HTMLPromptSelectDialogElement.prototype.setItem = function setItem(label, value) {
	
	this.input.setItem(label, value);

};