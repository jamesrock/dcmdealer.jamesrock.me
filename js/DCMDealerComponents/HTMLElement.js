DCM.HTMLElement = ROCK.createClass(DCM.EventDispatcher, function HTMLElement() {
	
	this.events = new function Events() {};
	this.enabled = true;
	
});
DCM.HTMLElement.prototype.addEventListener = function(event, handler, preventBubble) {
		
	if(!event) {
		throw("addEventListener - NO EVENT NAME");
	};
	
	var 
	eventName = event.name,
	proxyHandler = function proxyHandler(_event) {
		return event.condition(_event)&&despatch({}, _event);
	},
	despatch = function despatch(data, _event) {
		_event = (_event||dummyEventObject);
		if(handler.call(_this, _event, data)===false) {
			if(_event.preventDefault) {
				_event.preventDefault();
			};
			if(_event.stopPropagation) {
				_event.stopPropagation();
			};
			return false;
		};
	},
	eventObject = _this.events[eventName] = (_this.events[eventName]||[]),
	dummyEventObject = {
		preventDefault: function preventDefault() {},
		stopPropagation: function stopPropagation() {}
	};
	
	eventObject.push({
		nativeHandler: handler,
		proxyHandler: proxyHandler,
		remove: function remove() {
			_this.displayObject[DCM.Event.remover](eventName, proxyHandler, preventBubble);
			eventObject.splice(DCM.getIndexOf(eventObject, this), 1);
			if(eventObject.length===0) {
				delete _this.events[eventName];
			};
		},
		despatch: despatch
	});
	
	_this.displayObject[DCM.Event.adder](eventName, proxyHandler, preventBubble);
	
};
DCM.HTMLElement.prototype.removeEventListener = function(event, handler) {
		
	var 
	eventName = event.name,
	targetEvent = _this.events[eventName],
	targetEventLength = targetEvent&&targetEvent.length;
	
	if(targetEvent&&handler) {
		while(targetEventLength--) {
			if(targetEvent[targetEventLength].nativeHandler===handler) {
				targetEvent[targetEventLength].remove();
				break;
			};
		};
	}
	else if(targetEvent) {
		while(targetEvent[0]) {
			targetEvent[0].remove();
		};
	};
	
};
DCM.HTMLElement.prototype.dispatchEventListener = function(event, data, handler) {
		
	var
	eventName = event.name,		
	targetEvent = _this.events[eventName];
	
	if(targetEvent&&handler) {
		for(var prop in targetEvent) {
			if(targetEvent[prop].nativeHandler===handler) {
				targetEvent[prop].despatch(data);
				break;
			};
		};
	}
	else if(targetEvent) {
		for(var prop in targetEvent) {
			targetEvent[prop].despatch(data);
		};
	};
	
};
DCM.HTMLElement.prototype.show = function() {
			
	this.setStyle("display", "block");
	
};
DCM.HTMLElement.prototype.hide = function() {
		
	this.setStyle("display", "none");

};
DCM.HTMLElement.prototype.setWidth = function(value) {
		
	this.setStyle("width", value);

};
DCM.HTMLElement.prototype.setHeight = function(value) {
			
	this.setStyle("height", value);

};
DCM.HTMLElement.prototype.setStyle = function(property, value) {
		
	this.displayObject.style[property] = value;
	
};
DCM.HTMLElement.prototype.setText = function(value) {
		
	this.displayObject.innerHTML = value;

};
DCM.HTMLElement.prototype.getHeight = function() {
			
	return this.displayObject.offsetHeight;
	
};
DCM.HTMLElement.prototype.getWidth = function() {
			
	return this.displayObject.offsetWidth;
	
};
DCM.HTMLElement.prototype.setRole = function(value) {
	
	this.setAttribute("data-role", value);

};
DCM.HTMLElement.prototype.setAttribute = function(key, value, addTo) {
		
	if(addTo) {
		var 
		newValue = [],
		currentValue = this.getAttribute(key);
		if(currentValue) {
			newValue.push(currentValue);
		};
		newValue.push(value);
		value = newValue.join(" ");
	};
	
	this.displayObject.setAttribute(key, value);
	
};
DCM.HTMLElement.prototype.getAttribute = function(key) {
		
	return this.displayObject.getAttribute(key);
	
};
DCM.HTMLElement.prototype.focus = function() {
		
	this.displayObject.focus();
	
};
DCM.HTMLElement.prototype.setType = function(value) {
			
	this.type = value;
	this.setAttribute("data-type", value, true);
	
};
DCM.HTMLElement.prototype.getText = function() {
		
	return _this.displayObject.innerHTML;
	
};
DCM.HTMLElement.prototype.removeAttribute = function(key) {
		
	_this.displayObject.removeAttribute(key);

};
DCM.HTMLElement.prototype.append = function(toAppend) {
		
	_this.displayObject.appendChild(toAppend.displayObject);
	toAppend.parent = _this;

};
DCM.HTMLElement.prototype.prepend = function(toPrepend) {
		
	_this.displayObject.insertBefore(toPrepend.displayObject, _this.displayObject.firstElementChild);
	toPrepend.parent = _this;

};
DCM.HTMLElement.prototype.remove = function() {
		
	_this.displayObject.parentNode.removeChild(_this.displayObject);

};
DCM.HTMLElement.prototype.getOffsetTop = function() {
			
	return _this.displayObject.offsetTop;
	
};
DCM.HTMLElement.prototype.getOffsetLeft = function() {
			
	return _this.displayObject.offsetLeft;
	
};
DCM.HTMLElement.prototype.enable = function() {
			
	this.setEnabled(true);

};
DCM.HTMLElement.prototype.disable = function() {
		
	this.setEnabled(false);

};
DCM.HTMLElement.prototype.setEnabled = function(value) {
			
	this.enabled = value;
	
	if(value===true) {
		this.removeAttribute("disabled");
	}
	else if(value===false) {
		this.setAttribute("disabled", "disabled");
	};
	
	this.dispatchEventHandler("ENABLED_CHANGE");
	
};
DCM.HTMLElement.prototype.toggleEnabled = function() {
			
	this.setEnabled(!this.enabled);
	
};
DCM.HTMLElement.prototype.empty = function() {
		
	while(this.displayObject.hasChildNodes()) {
		this.displayObject.removeChild(this.displayObject.lastChild);
	};
	
};
DCM.HTMLElement.prototype.setVisible = function(value) {
			
	this.setAttribute("data-visible", value);
	
};