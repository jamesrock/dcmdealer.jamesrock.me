DCM.HTMLCustomInputElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLCustomInputElement() {

	var
	_this = this,
	input = _this.input = new DCM.HTMLInputElement();
	
	_this.setType("HTMLCustomInputElement");
	
	_this.append(input);
	
	_this.addEventHandler("ENABLED_CHANGE", function() {
		
		input.setEnabled(_this.enabled);
		
	});
	
});
DCM.HTMLCustomInputElement.prototype.setPlaceholder = function(value) {
	
	input.setPlaceholder(value);

};
DCM.HTMLCustomInputElement.prototype.getValue = function() {
	
	return input.getValue();

};
DCM.HTMLCustomInputElement.prototype.setValue = function(value) {
	
	_this.value = value;
	if(DCM.isNull(value)) {
		value = "";
	};
	input.setValue(value);

};
DCM.HTMLCustomInputElement.prototype.setRestricted = function(value) {
	
	_this.restricted = value;
	input.addEventListener(DCM.Event.keydown, function(e) {
		if(!e.ctrlKey&&DCM.Key.getCharFromEvent(e).match(_this.restricted)) {
			return false;
		};
	});

};
DCM.HTMLCustomInputElement.prototype.setInputType = function(type) {
	
	input.setAttribute("type", type);

};
DCM.HTMLCustomInputElement.prototype.setMaxLength = function(value) {
	
	input.setAttribute("maxlength", value);

};
DCM.HTMLCustomInputElement.prototype.setReadOnly = function(value) {
	
	input.setReadOnly(value);

};