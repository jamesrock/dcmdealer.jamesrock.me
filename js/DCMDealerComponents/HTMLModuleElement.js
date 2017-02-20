DCM.HTMLModuleElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLModuleElement() {

	var
	_this = this,
	timer,
	serviceCallUpdateHandler = function serviceCallUpdateHandler(data) {
		_this.dispatchEventHandler("UPDATE", data);
	},
	closeButton = new DCM.HTMLModuleCloseButtonElement(),
	_headingHolder = _this._headingHolder = new DCM.HTMLModuleHeadingElement(),
	panelIcon = new DCM.HTMLIconElement(),
	headLeft = _this.headLeft = new DCM.HTMLModuleHeadLeftElement(),
	headRight = _this.headRight = new DCM.HTMLModuleHeadRightElement(),
	headClear = new DCM.HTMLClearElement(),
	head = _this.head = new DCM.HTMLModuleHeadElement(),
	body = _this.body = new DCM.HTMLModuleBodyElement(),
	fader = new DCM.HTMLDialogOverlayElement(),
	pinButton = new DCM.HTMLPinGraphicButtonElement(),
	buttonWrap = _this.buttonWrap = new DCM.HTMLDivElement(),
	unpin = _this.unpin = function unpin() {
		close();
	},
	pin = _this.pin = function pin() {
		dock();
	},
	expandCollapseToggleButton = new DCM.HTMLExpandCollapseToggleGraphicButtonElement();
	
	headRight.prepend(buttonWrap);
	
	pinButton.toggle();
	
	buttonWrap.append(pinButton);
	buttonWrap.append(expandCollapseToggleButton);
	
	expandCollapseToggleButton.addEventListener(DCM.Event.click, function() {
		
		if(_this.resizeable) {
			_this.resize();
		};
		
	});
	
	buttonWrap.setAttribute("data-role", "button-wrap");
	
	panelIcon.setSize("1");
	
	pinButton.addEventListener(DCM.Event.click, function() {
	
		if(this.active) {
			unpin();
		}
		else {
			pin();
		};
		
		return false;
		
	});
	
	closeButton.addEventListener(DCM.Event.click, function() {
		
		close();
		return false;
		
	});
	
	headLeft.append(panelIcon);
	headLeft.append(_headingHolder);
	
	this.head.append(headLeft);
	this.head.append(headRight);
	this.head.append(headClear);
	
	headRight.append(closeButton);
	
	this.append(_this.head);
	this.append(_this.body);
	
	this.addEventListener(DCM.Event.contextmenu, function(e) {
		
		var _contextMenu = new _this.contextMenu(_this);
		_contextMenu.setX(e.clientX);
		_contextMenu.setY(e.clientY);
		
		return false;
		
	});
	
	this.setType("HTMLModuleElement");
	
	expand();
	setCloseable(false);
	setUnpinable(true);
	setPinable(false);
	setMoveable(true);
	setHeading(DCM.Resources.getResource("DefaultModuleHeading"));
	setIcon("default-icon");
	setResizeable(false);
	setAutoStart(false);
	setServiceCall("ServiceCaller");
	setUpdateFrequency(3000);
	//setUpdateFrequency(30000);
	
	setContextMenu("HTMLModuleContextMenuElement");
	
	// may not be best
	DCM.page.append(_this);
	
});
DCM.HTMLModuleElement.prototype.setContextMenu = function(instanceName) {
	
	this.contextMenu = DCM[instanceName];

};
DCM.HTMLModuleElement.prototype.setUpdateFrequency = function(value) {
	
	this.updateFrequency = value;

};
DCM.HTMLModuleElement.prototype.setServiceCall = function(instanceName) {
	
	this.serviceCall = new DCM[instanceName];

};
DCM.HTMLModuleElement.prototype.start = function() {
	
	DCM.log("Module[" + _this.type + "].start()");
	
	stop();
	update();
	timer = setInterval(update, this.updateFrequency);
	
};
DCM.HTMLModuleElement.prototype.stop = function() {
	
	DCM.log("Module[" + _this.type + "].stop()");
	clearInterval(timer);
	
};
DCM.HTMLModuleElement.prototype.update = function() {
	
	DCM.log("Module[" + _this.type + "].update()");
	
	this.dispatchEventHandler("BEFORE_UPDATE");
	this.serviceCall.call();

};
DCM.HTMLModuleElement.prototype.open = function() {
	
	DCM.log("Module[" + this.type + "].open()");
	
	DCM.toolbar.deactivateItem(this.type);
	setOpen(true);
	
	this.serviceCall.addEventHandler("SUCCESS", serviceCallUpdateHandler);
	
	if(this.autoStart&&this.serviceCall.method) {
		start();
	};
	
};
DCM.HTMLModuleElement.prototype.close = function() {
	
	DCM.log("Module[" + this.type + "].close()");
	
	DCM.toolbar.activateItem(this.type);
	setOpen(false);
	stop();
	
	this.serviceCall.removeEventHandler("SUCCESS", serviceCallUpdateHandler);
	
	if(_this.pinable) {
		fader.remove();
	};
	
	this.dispatchEventHandler("CLOSE");
	
};
DCM.HTMLModuleElement.prototype.destroy = function() {

	DCM.log("Module[" + _this.type + "].destroy()");

	this.remove();
	DCM.ModuleManager.modules.splice(DCM.getIndexOf(DCM.ModuleManager.modules, _this), 1);
	this.dispatchEventHandler("DESTROY");

};
DCM.HTMLModuleElement.prototype.toggle = function() {
	
	DCM.log("Module[" + this.type + "].toggle()");
	
	if(this.isOpen) {
		close();
	}
	else {
		open();
	};

};
DCM.HTMLModuleElement.prototype.resize = function() {
	
	DCM.log("Module[" + _this.type + "].resize()");
	
	setCollapsed(!this.collapsed);
	
};
DCM.HTMLModuleElement.prototype.setMoveable = function(value) {
	
	var val = this.moveable = value;
	this.setAttribute("data-moveable", val);

};
DCM.HTMLModuleElement.prototype.collapse = function() {
	
	setCollapsed(true);

};
DCM.HTMLModuleElement.prototype.expand = function() {
	
	setCollapsed(false);

};
DCM.HTMLModuleElement.prototype.getCollapsed = function() {
	
	return _this.collapsed;

};
DCM.HTMLModuleElement.prototype.setCollapsed = function(value) {
	
	this.collapsed = value;
	this.setAttribute("data-collapsed", this.collapsed);
	
	expandCollapseToggleButton.setActive(!this.collapsed);
	
};
DCM.HTMLModuleElement.prototype.setHeading = function(value) {
	
	this.heading = value;
	_headingHolder.setText(this.heading);

};
DCM.HTMLModuleElement.prototype.setCloseable = function(value) {
	
	var val = this.closeable = value;
	this.setAttribute("data-closeable", val);

};
DCM.HTMLModuleElement.prototype.setUnpinable = function(value) {
	
	var val = this.unpinable = value;
	this.setAttribute("data-unpinable", val);

};
DCM.HTMLModuleElement.prototype.setPinable = function(value) {
	
	var val = this.pinable = value;
	this.setAttribute("data-pinable", val);

};
DCM.HTMLModuleElement.prototype.setIcon = function(value) {
	
	var val = this.icon = value;
	panelIcon.setRole(val);

};
DCM.HTMLModuleElement.prototype.setOpen = function(value) {
	
	DCM.log("Module[" + _this.type + "].setOpen(" + value + ")");
	
	var val = this.isOpen = value;
	this.setAttribute("data-open", val);
	
};
DCM.HTMLModuleElement.prototype.getResizeable = function() {
	
	return this.resizeable;

};
DCM.HTMLModuleElement.prototype.setResizeable = function(value) {
	
	this.resizeable = value;
	this.setAttribute("data-resizeable", _this.resizeable);

};
DCM.HTMLModuleElement.prototype.getAutoStart = function() {
	
	return this.autoStart;

};
DCM.HTMLModuleElement.prototype.setAutoStart = function(value) {
	
	this.autoStart = value;

};
DCM.HTMLModuleElement.prototype.dock = function() {
	
	setMoveable(true);
	setCloseable(false);
	setUnpinable(true);
	setPinable(false);
	pinButton.toggle();
	DCM.page.append(_this);
	fader.remove();

};
DCM.HTMLModuleElement.prototype.undock = function() {
	
	setMoveable(false);
	setCloseable(true);
	setUnpinable(false);
	setPinable(true);
	pinButton.toggle();
	DCM.body.append(fader);
	DCM.body.append(_this);

};