DCM.HTMLToastElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLToastElement() {

	var
	timer,
	_this = this,
	destroy = function destroy() {
		_this.remove();
		DCM.ToastManager.toasts.splice(DCM.getIndexOf(DCM.ToastManager.toasts, _this), 1);
	};
	
	this.setLeftOffset = function setLeftOffset(value) {
		this.setStyle("marginLeft", ("-" + value + "px"));
	};
	
	this.setDuration = function setDuration(value) {
		this.duration = value;
	};
	
	this.close = function close() {
		clearTimeout(timer);
		destroy();
	};
	
	this.open = function open() {
		this.show();
		DCM.body.append(this);
		var timeoutHandler = function() {
			_this.close();
		};
		timer = setTimeout(timeoutHandler, this.duration);
		this.setLeftOffset(this.getWidth()/2);
	};
	
	this.setType("HTMLToastElement");
	
	this.setDuration(3000);

});