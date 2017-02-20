DCM.HTMLSelectMenuElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLSelectMenuElement() {

	var
	_this = this,
	trigger = new DCM.HTMLDivElement(),
	menu = new DCM.HTMLDivElement(),
	items = _this.items = [],
	open = function open() {
		
		_this.setAttribute("data-active", "true");
		_this.addEventListener(DCM.Event.mouseleave, function() {
		
			DCM.document.addEventListener(DCM.Event.click, onclickOutsideHAndler);
			
		});
		_this.addEventListener(DCM.Event.mouseenter, function() {
		
			DCM.document.removeEventListener(DCM.Event.click, onclickOutsideHAndler);
		
		});
		isOpen = true;
		
	},
	close = function close() {
		
		_this.setAttribute("data-active", "false");
		DCM.document.removeEventListener(DCM.Event.click, onclickOutsideHAndler);
		
		_this.removeEventListener(DCM.Event.mouseenter);
		_this.removeEventListener(DCM.Event.mouseleave);
		
		isOpen = false;
		
	},
	updateVisual = function updateVisual() {
		
		if(_this.previousActiveItem) {
			_this.previousActiveItem.removeEventHandler("CHANGE");
		};
		
		var 
		label = _this.activeItem.getText();
		
		if(_this.reorder) {
			menu.prepend(_this.activeItem);
		};
		
		_this.activeItem.addEventHandler("CHANGE", function() {
			trigger.setText(_this.activeItem.getText());
		});
		
		trigger.setText(label);
		
	},
	isOpen,
	inc = 0,
	reorder = _this.reorder = true,
	onclickOutsideHAndler = function onclickOutsideHAndler() {
		close();
	};
	
	_this.setWidth = function setWidth(value) {
		_this.setStyle("width", (value + "px"));
		menu.setStyle("width", (value + "px"));
	};
	
	trigger.setAttribute("data-select-role", "trigger");
	trigger.setType("HTMLSelectMenuTriggerElement");
	trigger.addEventListener(DCM.Event.click, function() {
		
		if(isOpen) {
			close();
		}
		else {
			open();
		};
		
	});
	
	menu.setAttribute("data-select-role", "menu");
	
	_this.setType("HTMLSelectMenuElement");
	_this.append(trigger);
	_this.append(menu);
	
	close();
	
});
DCM.HTMLSelectMenuElement.prototype.
DCM.HTMLSelectMenuElement.prototype.
DCM.HTMLSelectMenuElement.prototype.
DCM.HTMLSelectMenuElement.prototype.
DCM.HTMLSelectMenuElement.prototype.
DCM.HTMLSelectMenuElement.prototype.
DCM.HTMLSelectMenuElement.prototype.

setPreviousActiveItem = _this.setPreviousActiveItem = function setPreviousActiveItem(value) {
	_this.previousActiveItem = value;
},
setActiveItem = _this.setActiveItem = function setActiveItem(value) {
	setPreviousActiveItem(_this.activeItem);
	_this.activeItem = value;
},
setItem = _this.setItem = function(label, value) {
	
	var
	item = new DCM.HTMLSelectMenuItemElement(_this);
	
	item.setValue(value||inc);
	item.setLabel(label);
	
	item.addEventListener(DCM.Event.click, function() {
		
		if(this.enabled) {
			
			close();
			setActiveItem(item);
			updateVisual();
			
			if(item.value!==_this.value) {
				_this.value = item.value;
				_this.dispatchEventHandler("CHANGE");
			};
			
		};
		
		return false;
		
	});
	
	menu.append(item);
	
	items.push(item);
	
	inc ++;
	
	return item;
	
},
getValue = _this.getValue = function getValue() {
	return _this.value;
},
setValue = _this.setValue = function setValue(value) {
	
	var loop = items.length;
	
	while(loop--) {
		if(items[loop].value==value) {
			items[loop].dispatchEventListener(DCM.Event.click);
			break;
		};
	};
	
},
getItemByValue = _this.getItemByValue = function getItemByValue(value) {
	
	var 
	loop = items.length,
	_return;
	
	while(loop--) {
		if(items[loop].value==value) {
			_return = items[loop];
			break;
		};
	};
	
	return _return;

},