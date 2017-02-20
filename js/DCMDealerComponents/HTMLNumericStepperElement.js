DCM.HTMLNumericStepperElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLNumericStepperElement() {

	var
	_this = this,
	incrementButton = new DCM.HTMLNumericStepperIncrementElement(),
	decrementButton = new DCM.HTMLNumericStepperDecrementElement(),
	stepperInput = new DCM.HTMLCustomNumericInputElement(),
	buttonWrap = new DCM.HTMLNumericStepperButtonGroupElement(),
	currentValue,
	incrementButtonClickHandler = function incrementButtonClickHandler() {
	
		if(_this.enabled===false) {
			return;
		};
		
		currentValue = getInputValue();
		
		if(currentValue==="") {
			currentValue = (getDefaultIncrement(true)||getMin(true));
		}
		else if(currentValue<_this.max) {
			currentValue = (currentValue += getStep(true));
			if(currentValue>_this.max) {
				return;
			};
		};
		
		setValue(currentValue.toFixed(_this.fixed));
		//setValue(currentValue);
		
		return false;
	
	},
	decrementButtonClickHandler = function decrementButtonClickHandler() {
	
		if(_this.enabled===false) {
			return;
		};
	
		currentValue = getInputValue();
		
		if(currentValue==="") {
			currentValue = (getDefaultDecrement(true)||getMin(true));
		}
		else if(currentValue>_this.min) {
			currentValue = (currentValue -= getStep(true));
			if(currentValue<_this.min) {
				return;
			};
		};
		
		setValue(currentValue.toFixed(_this.fixed));
		//setValue(currentValue);
		
		return false;
	
	},
	toStep = function toStep(value) {
	
		var
		minIncrement = _this.step,
		_return = (Math.ceil(value/minIncrement)*minIncrement);
		return _return;
	
	};
	
	setFixed(0);
	setValid(true);
	
	stepperInput.input.addEventListener(DCM.Event.change, function() {
	
		currentValue = getInputValue();
		
		var
		min = getMin(true),
		max = getMax(true);
		
		if(!currentValue) {
			setValue(currentValue);
		}
		else if(currentValue<min) {
			setValue(min.toFixed(_this.fixed));
		}
		else if(currentValue>max) {
			setValue(max.toFixed(_this.fixed));
		}
		else {
			setValue(toStep(currentValue).toFixed(_this.fixed));
		};
		
		return false;
		
	});
	
	stepperInput.input.addEventListener(DCM.Event.keypress, function(e) {
		
		var key = DCM.Key.getCharFromEvent(e);
		
		if(key==="UP") {
			incrementButtonClickHandler();
		}
		else if(key==="DOWN") {
			decrementButtonClickHandler();
		};
		
	});
	
	stepperInput.input.addEventListener(DCM.Event.keyup, function(e) {
		
		_this.dispatchEventHandler("CHANGE");
		
	});
	
	incrementButton.addEventListener(DCM.Event.click, incrementButtonClickHandler);
	incrementButton.addEventHandler("AUTO_FIRE", incrementButtonClickHandler);
	decrementButton.addEventListener(DCM.Event.click, decrementButtonClickHandler);
	decrementButton.addEventHandler("AUTO_FIRE", decrementButtonClickHandler);
	
	_this.setType("HTMLNumericStepperElement");
	_this.append(stepperInput);
	_this.append(buttonWrap);
	
	buttonWrap.append(decrementButton);
	buttonWrap.append(incrementButton);
	
	setMin(0);
	setMax(999999999);
	setStep(1);
	clear();
	
	_this.addEventHandler("ENABLED_CHANGE", function() {
		
		stepperInput.setEnabled(_this.enabled);
		
	});

});
DCM.HTMLNumericStepperElement.prototype.setFixed = function(value) {
	
	_this.fixed = value;

};
DCM.HTMLNumericStepperElement.prototype.getValue = function() {
	
	return stepperInput.getValue();
	//return _this.value;

};
DCM.HTMLNumericStepperElement.prototype.setValue = function(value) {
	
	var val = _this.value = value;
	stepperInput.setValue(val);
	if(_this.enabled) {
		_this.dispatchEventHandler("CHANGE");
	};

};
DCM.HTMLNumericStepperElement.prototype.getMin = function(asNumber) {
	
	var _return = _this.min;
	if(asNumber) {
		_return = Number(_return);
	};
	return _return;

};
DCM.HTMLNumericStepperElement.prototype.setMin = function(value) {
	
	_this.min = value;
	if(_this.value&&_this.value<getMin(true)) {
		setValue(value);
	};

};
DCM.HTMLNumericStepperElement.prototype.getMax = function(asNumber) {
	
	var _return = _this.max;
	if(asNumber) {
		_return = Number(_return);
	};
	return _return;

};
DCM.HTMLNumericStepperElement.prototype.setMax = function(value) {
	
	_this.max = value;

};
DCM.HTMLNumericStepperElement.prototype.getStep = function(asNumber) {
	
	var _return = _this.step;
	if(asNumber) {
		_return = Number(_return);
	};
	return _return;

};
DCM.HTMLNumericStepperElement.prototype.setStep = function(value) {
	
	_this.step = value;

};
DCM.HTMLNumericStepperElement.prototype.setDefaultIncrement = function(value) {
	
	_this.defaultIncrement = value;

};
DCM.HTMLNumericStepperElement.prototype.setValid = function(value) {
	
	_this.valid = value;
	_this.setAttribute("data-valid", value);

};
DCM.HTMLNumericStepperElement.prototype.clear = function() {
	
	//setValue("");
	setValue(null);

};
DCM.HTMLNumericStepperElement.prototype.getDefaultDecrement = function(asNumber) {
	
	var _return = _this.defaultDecrement;
	if(asNumber) {
		_return = Number(_return);
	};
	return _return;

};
DCM.HTMLNumericStepperElement.prototype.setDefaultDecrement = function(value) {
	
	_this.defaultDecrement = value;

};
DCM.HTMLNumericStepperElement.prototype.getDefaultIncrement = function(asNumber) {
	
	var _return = _this.defaultIncrement;
	if(asNumber) {
		_return = Number(_return);
	};
	return _return;

};
DCM.HTMLNumericStepperElement.prototype.getInputValue = function() {
	
	var 
	val = stepperInput.getValue(),
	_return = "";
	if(val) {
		_return = Number(val);
	};
	return _return;

};