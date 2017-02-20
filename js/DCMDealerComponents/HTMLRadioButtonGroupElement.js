DCM.HTMLRadioButtonGroupElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLRadioButtonGroupElement() {

	// look into allowing optional radio buttons - which do not lock the user into selecting
	
	var
	_this = this,
	items = [],
	suppressEvent = false,
	setItem = _this.setItem = function setItem(label, value) {
	
		var
		item = new DCM.HTMLRadioButtonGroupItemElement(),
		radioButton = new DCM.HTMLRadioButtonElement();
		
		radioButton.addEventHandler("CHANGE", function() {
			
			var loop = items.length;
			while(loop--) {
				items[loop].setChecked(false, true);
			};
			this.setChecked(true, true);
			if(this.value===_this.value) {
				return;
			};
			_this.value = this.value;
			_this.dispatchEventHandler("CHANGE");
			return false;
			
		});
		
		radioButton.label.setText(label);
		
		radioButton.setValue(value);
		
		item.append(radioButton);
		_this.append(item);
		
		items.push(radioButton);
		
		return radioButton;
		
	},
	getValue = _this.getValue = function getValue() {
		
		return _this.value;
	
	},
	setValue = _this.setValue = function setValue(value, suppressEvent) {
	
		var loop = items.length;
		while(loop--) {
			if(items[loop].value===value) {
				items[loop].check.dispatchEventListener(DCM.Event.click);
				break;
			};
		};
		
	};
	
	_this.setType("HTMLRadioButtonGroupElement");
		
});