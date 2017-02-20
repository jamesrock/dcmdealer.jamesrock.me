DCM.HTMLContextMenuElement = ROCK.createClass(DCM.HTMLDivElement, function(target) {

	var
	_this = this,
	target = _this.target = target,
	offsetX = 3,
	offsetY = 3,
	documentMouseUpHandler = _this.documentMouseUpHandler = function documentMouseUpHandler() {
		
		close();

	};
	
	_this.setAttribute("data-role", "contextmenu");
	_this.setType("HTMLContextMenuElement");
	_this.setStyle("position", "absolute");
		
	if(_this.target&&DCM.Environment.getEnvironment()==="DEV") {
		
		_this.setItem("LOG THIS (DEV)", function() {
			
			DCM.log(_this.target);

		});
		
	};
	
	_this.setStyle("position", "fixed");
	
	_this.setX(0);
	_this.setY(0);
	
	open();

});
DCM.HTMLContextMenuElement.prototype.setGroup = function() {
	// not sure if this is best approach
	var group = new DCM.HTMLContextMenuGroupElement();
	_this.append(group);
	return group;
};
DCM.HTMLContextMenuElement.prototype.setItem = function(label, callback) {
	
	var
	item = new DCM.HTMLContextMenuItemElement(),
	itemMouseUpHandler = function itemMouseUpHandler() {
		
		if(this.enabled) {
			callback();
			close();
		};
		
		return false;
		
	};
	
	item.setLabel(label);
	
	item.addEventListener(DCM.Event.mouseup, itemMouseUpHandler);
	
	_this.append(item);
	
	return item;
	
};
DCM.HTMLContextMenuElement.prototype.open = function() {
	
	DCM.body.append(_this);
	DCM.document.addEventListener(DCM.Event.mouseup, documentMouseUpHandler);

};
DCM.HTMLContextMenuElement.prototype.close = function() {
	
	this.remove();
	DCM.document.removeEventListener(DCM.Event.mouseup, documentMouseUpHandler);

};
DCM.HTMLContextMenuElement.prototype.getValue = function() {
	
	return _this.value;

};
DCM.HTMLContextMenuElement.prototype.setX = function(value) {
	
	var val = this.x = value;
	this.setStyle("left", ((val + offsetX) + "px"));

};
DCM.HTMLContextMenuElement.prototype.setY = function(value) {
	
	var val = this.y = value;
	this.setStyle("top", ((val + offsetY) + "px"));

};