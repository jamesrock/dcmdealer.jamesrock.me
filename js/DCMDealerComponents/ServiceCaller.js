DCM.ServiceCaller = ROCK.createClass(DCM.EventDispatcher, function ServiceCaller() {
	
	// investigate why exceptions cause error to trigger.
	
	var
	_this = this,
	Params = function Params() {},		
	params = new Params(),
	length = 0,
	calls = [],
	buildURL = function buildURL() {
		if(length>0) {
			return (_this.method + "?" + DCM.serialise(params));
		};
		return _this.method;
	},
	errorHandler = function errorHandler() {
		if(_this.notifyUserOnError) {
			var _notify = new DCM.HTMLNotifyDialogElement();
			_notify.setHeading("Sorry");
			_notify.setMessage(_this.errorMessage);
			_notify.queue();
		};
	};
	
	this.getParam = function getParam(name) {
		return params[name];
	};
	
	this.setParam = function setParam(name, value) {
		params[name] = encodeURIComponent(value);
		length ++;
	};
	
	this.setMethod = function setMethod(URL) {
		_this.method = URL;
	};
	
	this.setType = function setType(type) {
		_this.type = type;
	};
	
	this.setAcync = function setAcync(value) {
		this.async = value;
	};
	
	this.setErrorMessage = function setErrorMessage(value) {
		this.errorMessage = value;
	};
	
	this.setNotifyUserOnError = function setNotifyUserOnError(value) {
		this.notifyUserOnError = value;
	};
	
	this.setTimeoutValue = function setTimeoutValue(value) {
		_this.timeout = value;
	};
	
	this.clearParams = function clearParams() {
		params = new Params();
		length = 0;
	};
	
	this.removeParam = function removeParam(name) {
		delete params[name];
		length --;
	};
	
	this.processResult = function processResult(data) {
		_this.dispatchEventHandler("SUCCESS", data);
	};
	
	this.cancelPrevious = function cancelPrevious() {
		if(calls.length>1) {
			calls[1].abort();
			calls.splice(1, 1);
		};
	};
	
	this.call = function call() {
	
		if(!_this.method) {
			DCM.log("ServiceCaller - no method");
			return;
		};
		
		this.cancelPrevious();
		
		var 
		caller = new XMLHttpRequest(),
		guid = DCM.getGUID(),
		JSONName = ("JSON" + guid),
		scriptElement = new DCM.HTMLScriptElement(),
		successHandler = function successHandler(JSON) {
			_this.processResult(DCM[JSON]);
			resultHandler();
		},
		errorHandler = function errorHandler() {
			_this.dispatchEventHandler("ERROR");
			resultHandler();
		},
		resultHandler = function resultHandler() {
			delete DCM[JSONName];
		},
		onreadystatechangeHandler = function onreadystatechangeHandler() {
		
			if(caller.readyState===4&&caller.status===200&&caller.responseText) {
				try {
					eval("DCM." + JSONName + " = " + caller.responseText);
					successHandler(JSONName);
				}
				catch(e) {
					errorHandler();
				};
			}
			else if(caller.readyState===4) {
				errorHandler();
			};
			
		};
		
		calls.unshift(caller);
		
		_this.dispatchEventHandler("BEFORE_SEND");
		
		if(_this.type==="GET") {
			caller.open(_this.type, buildURL(), _this.async);
			caller.send();
		}
		else if(_this.type==="POST") {
			caller.open(_this.type, _this.method, _this.async);
			caller.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			caller.send(DCM.serialise(params));
		};
		
		caller.onreadystatechange = onreadystatechangeHandler;
		
	};
	
	this.addEventHandler("ERROR", errorHandler);
	
	this.setAcync(true);
	this.setType("POST");
	this.setMethod(window.location.href);
	this.setErrorMessage(DCM.Resources.getResource("ERROR03"));
	this.setNotifyUserOnError(true);
	
});