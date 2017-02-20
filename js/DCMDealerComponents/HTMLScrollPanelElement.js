DCM.HTMLScrollPanelElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLScrollPanelElement() {
	
	var
	_this = this,
	handle = _this.handle = new DCM.HTMLScrollPanelHandleElement(),
	body = _this.body = new DCM.HTMLScrollPanelBodyElement(),
	topValue = _this.topValue = 0,
	getActive = _this.getActive = function getActive() {
		return _this.active;
	},
	setActive = _this.setActive = function setActive(value) {
		_this.active = value;
		_this.setAttribute("data-scroller-active", _this.active);
	},
	refresh = _this.refresh = function refresh() {
		setScrollTop(0);
	},
	setScrollTop = _this.setScrollTop = function setScrollTop(value) {
		
		if((value>=0)&&((value+handleHeight)<=_this.height)) {
		
			_this.topValue = value;
			_this.scrollTop = (_this.topValue*toThePowerOf);
			
			handle.setStyle("top", (_this.topValue + "px"));
			_this.body.setStyle("top", ("-" + _this.scrollTop + "px"));
			
		};
		
	},
	toThePowerOf,
	handleHeight,
	interactive = false,
	mouseover = false;
	
	_this.setHeight = function setHeight(value) {
		_this.height = value;
		_this.setStyle("height", (_this.height + "px"));
	};
	
	_this.setType("HTMLScrollPanelElement");
	
	handle.addEventListener(DCM.Event.mousedown, function(e) {
	
		interactive = true;
	
		var 
		top = this.getOffsetTop(),
		mouseY = (e.clientY||0),
		difference = (mouseY-top),
		mousemoveHandler = function(e) {
			setScrollTop(e.clientY-difference);
		},
		mouseupHandler = function() {
			interactive = false;
			if(!mouseover) {
				setActive(false);
			};
			this.removeEventListener(DCM.Event.mousemove, mousemoveHandler);
			this.removeEventListener(DCM.Event.mouseup, mouseupHandler);
		};
		
		DCM.document.addEventListener(DCM.Event.mousemove, mousemoveHandler);
		DCM.document.addEventListener(DCM.Event.mouseup, mouseupHandler);
		
		return false;
		
	});
	
	_this.addEventListener(DCM.Event.mousewheel, function(e) {
		
		// needs some work so that the scroll wheel steps in increments which will have it end flush with the top and bottom
		
		var direction = 0;
		
		if(e.detail) {
			if(e.detail>0) {
				direction = 10;
			}
			else if(e.detail<0) {
				direction = -10;
			};
		}
		else if(e.wheelDelta) {
			if(e.wheelDelta>0) {
				direction = -10;
			}
			else if(e.wheelDelta<0) {
				direction = 10;
			};
		};
		
		if(_this.active) {
			var valToSet = _this.topValue;
			valToSet += direction;
			setScrollTop(valToSet);
			return false;
		};
		
	});
	
	_this.addEventListener(DCM.Event.mouseenter, function() {
	
		mouseover = true;
	
		setActive(true);
		
		handleHeight = handle.getHeight();
		
		var
		heightOfScrollBody = _this.body.getHeight(),
		maxScrollTop = (heightOfScrollBody-_this.height),
		numberOfScrollNotches = (_this.height-handleHeight);
		
		toThePowerOf = (maxScrollTop/numberOfScrollNotches);
		
		if(toThePowerOf<=0) {
			setActive(false);
		};
		
	});
	
	_this.addEventListener(DCM.Event.mouseleave, function() {
	
		mouseover = false;
		
		if(!interactive) {
			setActive(false);
		};
		
	});
	
	refresh();
	
	_this.append(body);
	_this.append(handle);
	
	_this.setHeight(350);
	setActive(false);
	
});