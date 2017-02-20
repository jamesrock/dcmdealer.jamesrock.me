DCM.HTMLButtonElement = ROCK.createClass(DCM.HTMLNativeButtonElement, function HTMLButtonElement() {

	this.setType("HTMLButtonElement");

});
DCM.HTMLButtonElement.prototype.suppress = function() {
	
	this.setSuppress(true);

};
DCM.HTMLButtonElement.prototype.unsuppress = function() {
	
	this.setSuppress(false);

};
DCM.HTMLButtonElement.prototype = function(value) {
	
	this.setAttribute("data-suppressed", value);

};