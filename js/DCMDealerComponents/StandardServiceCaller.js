DCM.StandardServiceCaller = ROCK.createClass(DCM.ServiceCaller, function StandardServiceCaller() {
	
	this.setNotifyUserOnError(false);
	
});
DCM.StandardServiceCaller.prototype.processResult = function processResult(data) {
	
	if(data.status===true) {
		this.dispatchEventHandler("SUCCESS", data);
	}
	else if(data.status===false) {
		this.dispatchEventHandler("EXCEPTION", data.error);
	};
	
};