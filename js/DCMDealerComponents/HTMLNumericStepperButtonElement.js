DCM.HTMLNumericStepperButtonElement = ROCK.createClass(DCM.HTMLGraphicButtonElement, function HTMLNumericStepperButtonElement() {
	
	var
	_this = this,
	timer,
	speed = 100,
	timeout,
	mousedownHandler = function mousedownHandler() {
	
		this.removeEventListener(DCM.Event.mousedown, mousedownHandler);
		
		timeout = setTimeout(function() {
			startAutomaticFire();
		}, speed);
		
		DCM.document.addEventListener(DCM.Event.mouseup, documentMouseupHandler);
		
		return false;
	
	},
	documentMouseupHandler = function documentMouseupHandler() {
		
		stopAutomaticFire();
		
		this.removeEventListener(DCM.Event.mouseup, documentMouseupHandler);
		
		_this.addEventListener(DCM.Event.mousedown, mousedownHandler);
		
		return false;
		
	},
	startAutomaticFire = function startAutomaticFire() {
		
		timer = setInterval(function() {
			_this.dispatchEventHandler("AUTO_FIRE");
		}, speed);
	
	},
	stopAutomaticFire = function stopAutomaticFire() {
	
		clearTimeout(timeout);
		clearInterval(timer);
	
	},
	mouseenterHandler = function mouseenterHandler() {
	
		this.removeEventListener(DCM.Event.mouseenter, mouseenterHandler);
		this.addEventListener(DCM.Event.mouseleave, mouseleaveHandler);
		
		this.addEventListener(DCM.Event.mousedown, mousedownHandler);
		
		return false;
		
	},
	mouseleaveHandler = function mouseleaveHandler() {
	
		this.removeEventListener(DCM.Event.mouseleave, mouseleaveHandler);
		this.addEventListener(DCM.Event.mouseenter, mouseenterHandler);
		
		this.removeEventListener(DCM.Event.mousedown, mousedownHandler);
		
		return false;
		
	};

	_this.setType("HTMLNumericStepperButtonElement");
	
	_this.addEventListener(DCM.Event.mouseenter, mouseenterHandler);
	
});