DCM.HTMLGraphicButtonToggleElement = ROCK.createClass(DCM.HTMLGraphicButtonElement, function HTMLGraphicButtonToggleElement() {

	this.setType("HTMLGraphicButtonToggleElement");
	this.setActive(false);

});
DCM.HTMLGraphicButtonToggleElement.prototype.setActive = function(value) {
	
	this.active = value;
	this.setAttribute("data-active", value);
	this.dispatchEventHandler("ACTIVE_CHANGE");

};
DCM.HTMLGraphicButtonToggleElement.prototype.toggle = function() {
		
	this.setActive(!this.active);

};