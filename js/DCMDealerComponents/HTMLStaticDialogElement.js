DCM.HTMLStaticDialogElement = ROCK.createClass(function HTMLStaticDialogElement() {

	try {
		
		var
		_this = this,
		continueButton = _this.continueButton = new DCM.HTMLButtonElement(),
		continueHandler = function continueHandler() {
			if(!_this.suppressCloseOnContinue) {
				_this.close();
			};
			_this.dispatchEventHandler("ACCEPT");
			return false;
		};
		
		this._super = DCM.HTMLDialogElement;
		this._super();
		
		continueButton.setText(DCM.Resources.getResource("ContinueLabel"));
		continueButton.addEventListener(DCM.Event.click, continueHandler);
		
		_this.foot.append(continueButton);
		
		_this.setType("HTMLStaticDialogElement");
		
		continueButton.focus();
		
	}
	catch(e) {
		
		DCM.warn("HTMLStaticDialogElement", e);
		
	};
	
};