DCM.HTMLPanelElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLPanelElement() {
	
	this.setType("HTMLPanelElement");
		
});
DCM.HTMLPanelElement.prototype.setPanelType = function setPanelType(value) {
	
	this.setAttribute("data-panel-type", value);

};