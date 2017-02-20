(function(window, document, undefined) {
	
	var
	DCM = window.DCM = {},
	browser = DCM.browser = new function Browser() {
		
		var 
		_this = this,
		userAgent = window.navigator.userAgent,
		userAgent = userAgent.toUpperCase(),
		IE6 = _this.IE6 = /MSIE 6.0/.test(userAgent),
		IE7 = _this.IE7 = /MSIE 7.0/.test(userAgent),
		IE8 = _this.IE8 = /MSIE 8.0/.test(userAgent),
		IE9 = _this.IE9 = /MSIE 9.0/.test(userAgent),
		IE = _this.IE = (IE9||IE8||IE7||IE6),
		chrome = _this.chrome = /CHROME/.test(userAgent),
		safari = _this.safari = !chrome&&/SAFARI/.test(userAgent),
		opera = _this.opera = /OPERA/.test(userAgent),
		firefox = _this.firefox = /FIREFOX/.test(userAgent),
		nested = _this.nested = window.location!==window.parent.location;
		
	},
	isUndefined = DCM.isUndefined = function isUndefined(value) {
		return value===undefined;
	},
	isNull = DCM.isNull = function isNull(value) {
		return value===null;
	},
	isUndefinedOrNull = DCM.isUndefinedOrNull = function isUndefinedOrNull(value) {
		return (isUndefined(value)||isNull(value));
	},
	getIndexOf = DCM.getIndexOf = function getIndexOf(array, object) {
		var 
		loop = array.length,
		_return = -1;
		while(loop--) {
			if(array[loop]===object) {
				_return = loop;
				break;
			};
		};
		return _return;
	},
	getChangeDirectionName = DCM.getChangeDirectionName = function getChangeDirectionName(oldValue, newValue) {
		
		var 
		_return = "NO_DIRECTION";
		
		if(oldValue>newValue) {
			_return = "UP";
		}
		else if(oldValue<newValue) {
			_return = "DOWN";
		};
		
		return _return;
		
	},
	getRandomNumber = DCM.getRandomNumber = function getRandomNumber(min, max) {
		min = (min||0);
		max = (max||100);
		return Math.floor((Math.random()*((max-min)+1))+min);
	},
	getGUID = DCM.getGUID = function getGUID() {
		return (new Date().getTime() * getRandomNumber(0, 10000));
	},
	getPercent = DCM.getPercent = function getPercent(value, of) {
		var 
		shift = (value/100),
		percent = (shift*of),
		_return = Math.floor(percent);
		return _return;
	},
	log = DCM.log = function log() {
		if(_log&&_log.apply) {
			_log.apply(console, arguments);
		}
		else if(_log) {
			console.dir(arguments);
		};
	},
	warn = DCM.warn = function warn() {
		_warn&&_warn.apply&&_warn.apply(console, arguments);
	},
	error = DCM.error = function error() {
		_error&&_error.apply&&_error.apply(console, arguments);
	},
	_console = window.console,
	_log = _console&&_console.log,
	_warn = _console&&_console.warn,
	_error = _console&&_console.error,
	serialise = DCM.serialise = function(object) {
		var _return = [];
		for(var prop in object) {
			_return.push(prop + "=" + object[prop]);
		};
		return _return.join("&");
	};
	
	log("DCM.js", DCM);
	
})(window, document);