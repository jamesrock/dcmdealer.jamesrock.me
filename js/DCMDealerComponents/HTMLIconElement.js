DCM.HTMLIconElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLIconElement() {

	this.setType("HTMLIconElement");
	
};
DCM.HTMLIconElement.prototype.setSize = function setSize(value) {
	
	this.setAttribute("data-size", value);

};