DCM.HTMLInputElement = ROCK.createClass(DCM.HTMLElement, function HTMLInputElement() {

	this.displayObject = document.createElement("input");

});
DCM.HTMLInputElement.prototype.getValue = function() {
	
	return this.displayObject.value;

};
DCM.HTMLInputElement.prototype.setValue = function(value) {
	
	this.displayObject.value = value;

};
DCM.HTMLInputElement.prototype.setPlaceholder = function(value) {
	
	this.setAttribute("placeholder", value);

};
DCM.HTMLInputElement.prototype.setReadOnly = function(value) {
	
	this.setAttribute("readonly", value);

};