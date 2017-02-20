DCM.HTMLAlertsModuleElement = function HTMLAlertsModuleElement() {
	
	try {
	
		var
		_this = this,
		addAlert = _this.addAlert = function addAlert(data) {
			var alert = DCM.AlertManager.createAlert(data);	
			_this.scroller.body.prepend(alert);
			noAlertsNotification.hide();
			
			alert.addEventHandler("DESTROY", alertDeleteHandler);
			
			return alert;
		},
		moduleUpdateHandler = function moduleUpdateHandler(data) {
		
			var 
			added = data.added,
			modified = data.modified;
			
			for(var addedItem in added) {
			
				addAlert(added[addedItem]);
				
			};
			
			for(var modifiedItem in modified) {
				
				var
				_data = modified[modifiedItem],
				toEdit = DCM.AlertManager.getAlertById(_data.id);
				
				toEdit.setDescription(_data.alertDescription);
				
				if(_data.read) {
					toEdit.setStatus("READ");
				}
				else if(_data.triggered) {
					toEdit.setStatus("TRIGGERED");
				}
				else {
					toEdit.setStatus("PENDING");
				};
				
			};
			
		},
		beforeUpdateHandler = function beforeUpdateHandler() {
		
			var 
			params = [],
			target = DCM.AlertManager.alerts,
			loop = target.length;
			
			while(loop--) {
				
				params.push(target[loop].id + "_" + target[loop].status);
				
			};
			
			_this.serviceCall.setParam("prevAlertStates", params.join(","));
			
		},
		noAlertsNotification = new DCM.HTMLNoItemsNotificationElement(),
		alertDeleteHandler = function alertDeleteHandler() {
			
			if(DCM.AlertManager.alerts.length===0) {
				noAlertsNotification.show();
			};
			
		};
		
		this._super = DCM.HTMLScrollableModuleElement;
		this._super();
		
		_this.setIcon("alerts");
		_this.setContextMenu("HTMLAlertsModuleContextMenuElement");
		_this.setHeading(DCM.Resources.getResource("AlertsPanelHeading"));
		_this.setType("HTMLAlertsModuleElement");
		_this.setServiceCall("GetAlertsService");
		_this.setAutoStart(true);
		_this.addEventHandler("BEFORE_UPDATE", beforeUpdateHandler);
		_this.addEventHandler("UPDATE", moduleUpdateHandler);
		
		// temp fix to stop preview accounts from continuously polling
		if(DCM.AccountManager.isPreviewAccount()) {
			
			_this.setUpdateFrequency(10000);
			
		};
		
		noAlertsNotification.setText(DCM.Resources.getResource("NoAlertsLabel"));
		_this.scroller.body.append(noAlertsNotification);
		
	}
	catch(e) {
	
		DCM.log("HTMLAlertsModuleElement", e);
	
	};
	
};