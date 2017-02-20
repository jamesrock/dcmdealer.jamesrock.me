DCM.HTMLAnchorElement = ROCK.createClass(DCM.HTMLElement, function() {

	this.displayObject = document.createElement("a");
	this.setType("HTMLAnchorElement");
	this.setHref("#");

});
DCM.HTMLAnchorElement.prototype.setHref = function(value) {
	
	this.setAttribute("href", value);

};