DCM.HTMLGraphicButtonElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLGraphicButtonElement() {
	
	this.setType("HTMLGraphicButtonElement");

};
DCM.HTMLGraphicButtonElement.prototype.setSize = function(value) {
			
	this.setAttribute("data-size", value);

};
DCM.HTMLGraphicButtonElement.prototype.setLabel = function(value) {
	
	this.setText(value);
	this.setAttribute("title", value);
	
};