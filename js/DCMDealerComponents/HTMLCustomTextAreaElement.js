DCM.HTMLCustomTextAreaElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLCustomTextAreaElement() {
	
	var
	_this = this,
	input = _this.input = new DCM.HTMLTextAreaElement();

	_this.append(input);
	
	_this.setAttribute("data-role", "text-area");
	setRows(6);
	
});
DCM.HTMLCustomTextAreaElement.prototype.setPlaceholder = function(value) {
	
	input.setPlaceholder(value);

};
DCM.HTMLCustomTextAreaElement.prototype.getValue = function() {
	
	return input.getValue();

};
DCM.HTMLCustomTextAreaElement.prototype.setValue = function(value) {
	
	input.setValue(value);

};
DCM.HTMLCustomTextAreaElement.prototype.setRows = function(value) {
	
	input.setAttribute("rows", value);

};