DCM.HTMLHeadingElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLHeadingElement() {
	
	this.setType("HTMLHeadingElement");	

});
DCM.HTMLHeadingElement.prototype.setSize = function(value) {
	
	this.setAttribute("data-size", value);

};