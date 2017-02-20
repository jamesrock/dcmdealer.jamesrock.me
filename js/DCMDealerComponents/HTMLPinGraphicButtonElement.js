DCM.HTMLPinGraphicButtonElement = ROCK.createClass(DCM.HTMLGraphicButtonToggleElement, function HTMLPinGraphicButtonElement() {

	var
	_this = this;
	
	this.setRole("pin-to-dashboard");
	this.setSize("2");
	this.setLabel(DCM.Resources.getResource("PinToDashboardLabel"));
	this.setType("HTMLPinGraphicButtonElement");
	
	this.addEventHandler("ACTIVE_CHANGE", function() {
		
		if(_this.active) {
			_this.setLabel(DCM.Resources.getResource("UnpinFromDashboardLabel"));
		}
		else {
			_this.setLabel(DCM.Resources.getResource("PinToDashboardLabel"));
		};
		
	});
	
});