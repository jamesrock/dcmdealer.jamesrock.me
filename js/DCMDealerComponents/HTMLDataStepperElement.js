DCM.HTMLDataStepperElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLDataStepperElement() {

	var
	_this = this,
	incrementButton = new DCM.HTMLNumericStepperIncrementElement(),
	decrementButton = new DCM.HTMLNumericStepperDecrementElement(),
	stepperInput = new DCM.HTMLCustomNumericInputElement(),
	buttonWrap = new DCM.HTMLNumericStepperButtonGroupElement(),
	currentIndex = 0,
	incrementButtonClickHandler = function incrementButtonClickHandler() {
	
		if(_this.enabled===false) {
			return;
		};
		
		if(currentIndex===(_this.data.length-1)) {
			currentIndex = 0;
		}
		else {
			currentIndex ++;
		};
		
		setValue(currentIndex);
		
		return false;
	
	},
	decrementButtonClickHandler = function decrementButtonClickHandler() {
	
		if(_this.enabled===false) {
			return;
		};
		
		if(currentIndex===0) {
			currentIndex = (_this.data.length-1);
		}
		else {
			currentIndex --;
		};
		
		setValue(currentIndex);
		
		return false;
	
	},
	setValid = _this.setValid = function setValid(value) {
		_this.valid = value;
		_this.setAttribute("data-valid", value);
	};

	setValid(true);
	
	incrementButton.addEventListener(DCM.Event.click, incrementButtonClickHandler);
	incrementButton.addEventHandler("AUTO_FIRE", incrementButtonClickHandler);
	decrementButton.addEventListener(DCM.Event.click, decrementButtonClickHandler);
	decrementButton.addEventHandler("AUTO_FIRE", decrementButtonClickHandler);
	
	_this.setType("HTMLDataStepperElement");
	_this.append(stepperInput);
	_this.append(buttonWrap);
	
	buttonWrap.append(decrementButton);
	buttonWrap.append(incrementButton);
	
	_this.addEventHandler("ENABLED_CHANGE", function() {
		
		stepperInput.setEnabled(_this.enabled);
		
	});
	
	stepperInput.setReadOnly(true);

});
DCM.HTMLDataStepperElement.prototype.setData = function(data) {
	
	_this.data = data;
	setValue(0);

};
DCM.HTMLDataStepperElement.prototype.getValue = function() {
	
	var _return = _this.value;
	return _return;

};
DCM.HTMLDataStepperElement.prototype.setValue = function(value) {
	
	_this.value = value;
	setLabel(_this.data[value]);
	currentIndex = value;
	if(_this.enabled) {
		_this.dispatchEventHandler("CHANGE");
	};

};
DCM.HTMLDataStepperElement.prototype.getLabel = function() {
	
	var _return = _this.label;
	return _return;

};
DCM.HTMLDataStepperElement.prototype.setLabel = function(value) {
	
	_this.label = value;
	stepperInput.setValue(value);

};