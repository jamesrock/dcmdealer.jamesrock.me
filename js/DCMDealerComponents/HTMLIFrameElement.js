DCM.HTMLIFrameElement = ROCK.createClass(DCM.HTMLElement, function HTMLIFrameElement() {
	
	this.displayObject = document.createElement("iframe");
	this.setType("HTMLIFrameElement");
	this.setAttribute("frameborder", "0");
	
});
DCM.HTMLIFrameElement.prototype.setSrc = function setSrc(value) {
	
	this.setAttribute("src", value);

};