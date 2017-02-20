DCM.HTMLModuleMenuItemElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLModuleMenuItemElement() {

	var
	_this = this,
	icon = _this.icon = new DCM.HTMLIconElement(),
	button = _this.button = new DCM.HTMLGraphicButtonElement(),	
	isFirstTime = true;
	
	icon.setSize("1");
	
	button.append(icon);
	_this.append(button);
	
	_this.setType("HTMLModuleMenuItemElement");
	
	_this.addEventListener(DCM.Event.click, function() {
		
		DCM.ModuleManager.toggleModule(_this.moduleName);
		
		return false;
		
	});
	
	_this.addEventHandler("ACTIVE_CHANGE", function() {
		
		if(_this.active===true) {
			setLabel(_this.activeLabel);
		}
		else if(_this.active===false) {
			setLabel(_this.inactiveLabel);
		};
		
	});
	
});
DCM.HTMLModuleMenuItemElement.prototype.setActive = function(value) {
	
	DCM.log("HTMLModuleMenuItemElement.setActive(" + _this.moduleName + ")");
	_this.active = value;
	button.setAttribute("data-module-menu-active", _this.active);
	_this.dispatchEventHandler("ACTIVE_CHANGE");
	
	if(!isFirstTime) {
	
		DCM.ToastManager.createToast(_this.moduleDisplayName + " " + (_this.active?"unpinned":"pinned") + " " + (_this.active?"from":"to") + " dashboard");
	
	};
	
	isFirstTime = false;
	
};
DCM.HTMLModuleMenuItemElement.prototype.activate = function() {
	
	this.setActive(true);

};
DCM.HTMLModuleMenuItemElement.prototype.toggleActive = function() {
	
	this.setActive(!this.active);

};
DCM.HTMLModuleMenuItemElement.prototype.deactivate = function() {
	
	this.setActive(false);

};
DCM.HTMLModuleMenuItemElement.prototype.setLabel = function(value) {
	
	this.icon.setText(value);
	this.button.setAttribute("title", value);

};
DCM.HTMLModuleMenuItemElement.prototype.setInactiveLabel = function(value) {
	
	this.inactiveLabel = value;

};
DCM.HTMLModuleMenuItemElement.prototype.setActiveLabel = function(value) {
	
	this.activeLabel = value;

};