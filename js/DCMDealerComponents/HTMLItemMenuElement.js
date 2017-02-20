DCM.HTMLItemMenuElement = ROCK.createClass(DCM.HTMLULElement, function HTMLItemMenuElement() {

	var
	_this = this,
	closeHandler = function closeHandler() {
		
		_this.close();

	};
	
	this.setAttribute("data-role", "contextmenu");
	this.setStyle("position", "absolute");
	this.setType("HTMLItemMenuElement");
	
});
DCM.HTMLItemMenuElement.prototype.setItem = function(label, callback) {
	
	var
	item = new DCM.HTMLContextMenuItemElement();
	
	item.setLabel(label);
	
	item.button.addEventListener(DCM.Event.click, function() {
		
		callback();
		return false;
		
	});
	
	_this.append(item);
	
};
DCM.HTMLItemMenuElement.prototype.setInactiveItem = function(label) {

	var
	item = new DCM.HTMLContextMenuItemElement();
	
	item.setLabel(label);
	item.setActive("false");
	
	item.button.addEventListener(DCM.Event.click, function() {
		return false;
	});
	
	_this.append(item);
	
};
DCM.HTMLItemMenuElement.prototype.setToggleActiveItem = function(label, callback) {

	var
	item = new DCM.HTMLContextMenuItemElement();
	
	item.setLabel(label);
	item.setToggle(true);
	
	item.button.addEventListener(DCM.Event.click, function() {
	
		callback();
		return false;
	
	});
	
	_this.append(item);
	
};
DCM.HTMLItemMenuElement.prototype.open = function() {
	
	DCM.body.append(_this);
	DCM.document.addEventListener(DCM.Event.mouseup, closeHandler);

};
DCM.HTMLItemMenuElement.prototype.close = function() {
	
	_this.remove();
	DCM.document.removeEventListener(DCM.Event.mouseup, closeHandler);

};
DCM.HTMLItemMenuElement.prototype.getValue = function() {
	
	return _this.value;

};