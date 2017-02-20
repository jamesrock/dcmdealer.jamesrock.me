DCM.HTMLContextMenuItemElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLContextMenuItemElement() {
	
	var
	inner = this.inner = new DCM.HTMLSpanElement();
	
	this.append(inner);
	
	this.setType("HTMLContextMenuItemElement");
	
});
DCM.HTMLContextMenuItemElement.prototype.setLabel = function(value) {
			
	inner.setText(value);

};
DCM.HTMLContextMenuItemElement.prototype.setToggle = function(value) {
	
	this.setAttribute("data-contextmenu-toggle-active", value);

};