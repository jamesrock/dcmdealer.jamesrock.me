DCM.HTMLAlertsModuleItemElement = ROCK.createClass(DCM.HTMLDivElement, function(data) {

	var
	_this = this,
	STATUS_TRIGGERED = "TRIGGERED",
	STATUS_PENDING = "PENDING",
	STATUS_READ = "READ",
	createdDate = new Date(data.createdAtTimestamp),
	data = _this.data = data,
	messageHolder = new DCM.HTMLDivElement(),
	descriptionHolder = new DCM.HTMLDivElement(),
	instrumentHolder = new DCM.HTMLDivElement(),
	instrument = _this.instrument = DCM.InstrumentManager.getInstrumentById(data.securityId);

	messageHolder.setAttribute("data-alerts-item-role", "message");
	descriptionHolder.setAttribute("data-alerts-item-role", "description");
	
	instrumentHolder.setText(instrument.getDisplayTextAsHTML());
	
	this.append(messageHolder);
	this.append(descriptionHolder);
	this.append(instrumentHolder);
	this.setType("HTMLAlertsModuleItemElement");
	
	setId(data.id);
	setMessage(data.message);
	setDescription(data.alertDescription);
	setNotifyByEmail(data.sendToEmail);
	setNotifyBySMS(data.sendToSMS);
	
	if(data.triggerSide==="TRIGGER_SIDE_ASK") {
		this.setProperty("1");
	}
	else if(data.triggerSide==="TRIGGER_SIDE_BID") {
		this.setProperty("2");
	}
	else if(data.triggerSenti) {
		this.setProperty("3");
	};
	
	if(data.triggerPriceEquality===1) {
		this.setCondition("1");
	}
	else if(data.triggerPriceEquality===-1) {
		this.setCondition("2");
	}
	else if(data.triggerSentiEquality===1) {
		this.setCondition("1");
	}
	else if(data.triggerSentiEquality===-1) {
		this.setCondition("2");
	};
	
	if(_this.property==="3") {
		this.setValue(data.triggerSenti);
	}
	else {
		this.setValue(data.triggerPrice);
	};
	
	if(data.isRead) {
		this.setStatus("READ");
	}
	else if(data.triggered) {
		this.setStatus("TRIGGERED", true);
	}
	else {
		this.setStatus("PENDING");
	};
	
	_this.addEventListener(DCM.Event.contextmenu, function(e) {
		
		var _contextMenu = new DCM.HTMLAlertsModuleItemContextMenuElement(_this);
		_contextMenu.setX(e.clientX);
		_contextMenu.setY(e.clientY);
		
		return false;
	
	});
	
	_this.addEventListener(DCM.Event.doubleclick, function() {
		
		setRead();
		
		return false;
	
	});
	
});
DCM.HTMLAlertsModuleItemElement.prototype.setId = function(value) {
	
	this.id = value;

};
DCM.HTMLAlertsModuleItemElement.prototype.setMessage = function(value) {
	
	var val = this.message = value;
	messageHolder.setText(val);

};
DCM.HTMLAlertsModuleItemElement.prototype.setDescription = function(value) {
	
	var val = this.description = value;
	descriptionHolder.setText(val);

};
DCM.HTMLAlertsModuleItemElement.prototype.setStatus = function(value, suppressNotification) {
	
	var val = this.status = value;
	if(val==="TRIGGERED"&&!suppressNotification) {
		var triggeredNotification = new DCM.HTMLNotifyDialogElement();
		triggeredNotification.setHeading(DCM.Resources.getResource("AlertTriggeredLabel"));
		triggeredNotification.setMessage(_this.description);
		triggeredNotification.queue();
	};
	_this.setAttribute("data-status", val);

};
DCM.HTMLAlertsModuleItemElement.prototype.setProperty = function(value) {
	
	this.property = value;

};
DCM.HTMLAlertsModuleItemElement.prototype.setCondition = function(value) {
	
	this.condition = value;

};
DCM.HTMLAlertsModuleItemElement.prototype.setValue = function(value) {
	
	this.value = value;

};
DCM.HTMLAlertsModuleItemElement.prototype.setNotifyByEmail = function(value) {
	
	this.notifyByEmail = value;

};
DCM.HTMLAlertsModuleItemElement.prototype.setNotifyBySMS = function(value) {
	
	this.notifyBySMS = value;

};
DCM.HTMLAlertsModuleItemElement.prototype.setRead = function() {
		
	if(_this.status==="READ") {
		return;
	};
	
	var 
	setReadService = new DCM.SetAlertReadService(),
	setReadServiceSuccessHandler = function setReadServiceSuccessHandler() {
		this.setStatus("READ");
	};
	
	setReadService.setParam("alertId", _this.id);
	setReadService.addEventHandler("SUCCESS", setReadServiceSuccessHandler);
	setReadService.call();
	
};
DCM.HTMLAlertsModuleItemElement.prototype.destroy = function() {
	
	this.remove();
	DCM.AlertManager.alerts.splice(DCM.getIndexOf(DCM.AlertManager.alerts, _this), 1);
	this.dispatchEventHandler("DESTROY");

};
DCM.HTMLAlertsModuleItemElement.prototype.getCompleted = function() {
	
	return this.completed;

};	