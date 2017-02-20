DCM.HTMLDynamicDialogElement = ROCK.createClass(DCM.HTMLDialogElement, function HTMLDynamicDialogElement() {

	var
	_this = this,
	cancelButton = _this.cancelButton = new DCM.HTMLDialogRightButtonElement(),
	continueButton = _this.continueButton = new DCM.HTMLDialogLeftButtonElement(),
	continueHandler = function continueHandler() {
		if(!_this.suppressCloseOnContinue) {
			_this.close();
		};
		_this.dispatchEventHandler("ACCEPT");
		return false;
	},
	cancelHandler = function cancelHandler() {
		_this.close();
		_this.dispatchEventHandler("DECLINE");
		return false;
	};
	
	continueButton.setText("Continue");
	continueButton.addEventListener(DCM.Event.click, continueHandler);
	
	cancelButton.setText("Cancel");
	cancelButton.addEventListener(DCM.Event.click, cancelHandler);
	
	_this.foot.append(continueButton);
	_this.foot.append(cancelButton);
	
	_this.setType("HTMLDynamicDialogElement");
	
	continueButton.focus();
	
});