DCM.HTMLUpgradeDialogElement = ROCK.createClass(DCM.HTMLDialogElement, function HTMLUpgradeDialogElement() {
	
	var
	_this = this,
	backButton = _this.backButton = new DCM.HTMLDialogLeftButtonElement(),
	forwardButton = _this.forwardButton = new DCM.HTMLDialogRightButtonElement(),
	forwardHandler = function forwardHandler() {
	
		_this.dispatchEventHandler("NEXT");
		
		return false;
	
	},
	backHandler = function backHandler() {
		
		_this.dispatchEventHandler("PREVIOUS");
		
		return false;
		
	},
	closeButton = new DCM.HTMLDivElement(),
	closeHandler = function closeHandler() {
		
		_this.close();
	
	};
	
	closeButton.setText(DCM.Resources.getResource("CloseLabel"));
	closeButton.setAttribute("data-dialog-role", "close");
	
	forwardButton.setText(DCM.Resources.getResource("NextLabel"));
	forwardButton.addEventListener(DCM.Event.click, forwardHandler);
	
	backButton.setText(DCM.Resources.getResource("PreviousLabel"));
	backButton.addEventListener(DCM.Event.click, backHandler);
	
	_this.body.append(closeButton);
	_this.foot.append(backButton);
	_this.foot.append(forwardButton);
	
	_this.setType("HTMLUpgradeDialogElement");
	
	forwardButton.focus();
	
	closeButton.addEventListener(DCM.Event.click, closeHandler);

});