DCM.HTMLTooltipElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLTooltipElement() {

	var
	_this = this,
	timer,
	open = _this.open = function open() {
		timer = setTimeout(function() {
			_this.show();
		}, _this.delay);
		DCM.body.append(_this);
	},
	close = _this.close = function close() {
		clearTimeout(timer);
		destroy();
	},
	destroy = _this.destroy = function destroy() {
		_this.remove();
	},
	setX = _this.setX = function(value) {
		var val = _this.x = value;
		_this.setStyle("left", ((val + _this.xOffset) + "px"));
	},
	setY = _this.setY = function(value) {
		var val = _this.y = value;
		_this.setStyle("top", ((val + _this.yOffset) + "px"));
	},
	setXOffset = _this.setXOffset = function setXOffset(value) {
		_this.xOffset = value;
	},
	setYOffset = _this.setYOffset = function setYOffset(value) {
		_this.yOffset = value;
	},
	setDelay = _this.setDelay = function setDelay(value) {
		_this.delay = value;
	};
	
	_this.setType("HTMLTooltipElement");
	
	_this.setStyle("position", "fixed");
	
	setXOffset(20);
	setYOffset(5);
	setDelay(700);
	_this.setWidth("220px");
	_this.hide();
	open();

});