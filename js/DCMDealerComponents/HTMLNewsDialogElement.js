DCM.HTMLNewsDialogElement = ROCK.createClass(DCM.HTMLStaticDialogElement, function HTMLNewsDialogElement() {

	var 
	_this = this,
	scroller = new DCM.HTMLScrollPanelElement(),
	setMessage = _this.setMessage = function setMessage(value) {
		scroller.body.setText(value);
	};
	
	_this.body.append(scroller);
	
	scroller.setHeight(190);
	
	_this.setWidth(500);
	_this.continueButton.setText(DCM.Resources.getResource("CloseLabel"));
	
});