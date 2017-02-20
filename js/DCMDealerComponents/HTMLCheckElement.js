DCM.HTMLCheckElement = ROCK.createClass(DCM.HTMLDivElement, function() {
		
	var
	_this = this,
	label = _this.label = new DCM.HTMLNativeLabelElement(),
	check = _this.check = new DCM.HTMLNativeButtonElement(),
	guid = ("check" + DCM.getGUID());
	
	check.addEventListener(DCM.Event.click, function() {
		if(_this.enabled) {
			toggleChecked();
		};
		return false;
	});
	
	check.setAttribute("data-check-role", "check");
	check.setAttribute("id", guid);
	
	label.setAttribute("for", guid);
	
	this.setType("HTMLCheckElement");
	
	this.append(check);
	this.append(label);
	
	setChecked(false);
	
	this.addEventHandler("ENABLED_CHANGE", function() {
		
		check.setEnabled(_this.enabled);
		
	});

});
DCM.HTMLCheckElement.prototype.getChecked = function() {
	
	return _this.checked;

};
DCM.HTMLCheckElement.prototype.setChecked = function(value, suppressEvent) {
	
	var val = _this.checked = value;
	check.setAttribute("data-checked", val);
	if(!suppressEvent) {
		
		this.dispatchEventHandler("CHANGE");

	};

};
DCM.HTMLCheckElement.prototype.toggleChecked = function() {
	
	setChecked(!getChecked());

};
DCM.HTMLCheckElement.prototype.getValue = function() {
	
	return _this.value;

};
DCM.HTMLCheckElement.prototype.setValue = function(value) {
	
	this.value = value;

};
DCM.HTMLCheckElement.prototype.setLabel = function(value) {
	
	label.setText(value);

};