(function() {

	try {

		var AlertManager = DCM.AlertManager = ROCK.createStatic(ROCK.createClass(DCM.EventDispatcher, function() {

			this.alerts = [];

		}));
		AlertManager.prototype.createAlert = function(data) {
			
			var alert = new DCM.HTMLAlertsModuleItemElement(data);
			alerts.push(alert);
			return alert;

		};
		AlertManager.prototype.createAlertFromInstrument = function(instrument) {
			
			authorNewAlert(instrument);
		
		};
		AlertManager.prototype.authorNewAlert = function(instrument) {
				
			var 
			_dialog = new DCM.HTMLAlertsModuleItemCreateDialogElement(instrument),
			acceptHandler = function acceptHandler() {
			
				publishNewAlert(instrument, _dialog.propertySelect.getValue(), _dialog.conditionSelect.getValue(), _dialog.valueInput.getValue(), _dialog.message.getValue(), _dialog.notifyBySMSCheckbox.getChecked(), _dialog.notifyByEmailCheckbox.getChecked());
				
			};
			
			_dialog.addEventHandler("ACCEPT", acceptHandler);
			_dialog.queue();
			
		};
		AlertManager.prototype.publishNewAlert = function(instrument, property, condition, value, message, notifyBySMS, notifyByEMail) {
				
			var 
			publishNewAlertService = new DCM.CreateAlertService(),
			publishNewAlertServiceSuccessHandler = function publishNewAlertServiceSuccessHandler(data) {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("AlertCreateSuccessLabel"));
				
			},
			publishNewAlertServiceErrorHandler = function publishNewAlertServiceErrorHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("AlertCreateErrorLabel"));
				
			},
			publishNewAlertServiceExceptionHandler = function publishNewAlertServiceExceptionHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("AlertCreateErrorLabel"));
				
			};
			
			publishNewAlertService.setParam("securityID", instrument.id);
			publishNewAlertService.setParam("message", message);
			publishNewAlertService.setParam("sendSms", notifyBySMS);
			publishNewAlertService.setParam("sendEmail", notifyByEMail);
			
			if(property==="1") {
				publishNewAlertService.setParam("triggerSide", "BUY");
				publishNewAlertService.setParam("triggerPrice", value);
				if(condition==="1") {
					publishNewAlertService.setParam("isHigherPriceTheTrigger", "true");
				}
				else if(condition==="2") {
					publishNewAlertService.setParam("isHigherPriceTheTrigger", "false");
				};
			}
			else if(property==="2") {
				publishNewAlertService.setParam("triggerSide", "SELL");
				publishNewAlertService.setParam("triggerPrice", value);
				if(condition==="1") {
					publishNewAlertService.setParam("isHigherPriceTheTrigger", "true");
				}
				else if(condition==="2") {
					publishNewAlertService.setParam("isHigherPriceTheTrigger", "false");
				};
			}
			else if(property==="3") {
				publishNewAlertService.setParam("triggerSenti", value);
				if(condition==="1") {
					publishNewAlertService.setParam("isHigherSentiTheTrigger", "true");
				}
				else if(condition==="2") {
					publishNewAlertService.setParam("isHigherSentiTheTrigger", "false");
				};
			};
			
			publishNewAlertService.addEventHandler("SUCCESS", publishNewAlertServiceSuccessHandler);
			publishNewAlertService.addEventHandler("ERROR", publishNewAlertServiceErrorHandler);
			publishNewAlertService.addEventHandler("EXCEPTION", publishNewAlertServiceExceptionHandler);
			publishNewAlertService.call();
			
		};
		AlertManager.prototype.authorDeleteAlert = function(alert) {
			
			var 
			authorDeleteAlertConfirm = new DCM.HTMLConfirmationDialogElement(),
			authorDeleteAlertConfirmAcceptHandler = function authorDeleteAlertConfirmAcceptHandler() {
				publishDeleteAlert(alert);
			};
			
			authorDeleteAlertConfirm.setHeading(DCM.Resources.getResource("AlertDeleteConfirmHeading"));
			authorDeleteAlertConfirm.setMessage(DCM.Resources.getResource("AlertDeleteConfirmMessage"));
			authorDeleteAlertConfirm.addEventHandler("ACCEPT", authorDeleteAlertConfirmAcceptHandler);
			authorDeleteAlertConfirm.queue();
		
		};
		AlertManager.prototype.publishDeleteAlert = function(alert) {
				
			var 
			publishDeleteAlertService = new DCM.DeleteAlertService(),
			publishDeleteAlertServiceSuccessHandler = function publishDeleteAlertServiceSuccessHandler(data) {
				
				alert.destroy();
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("AlertDeleteSuccessLabel"));
				
			},
			publishDeleteAlertServiceErrorHandler = function publishDeleteAlertServiceErrorHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("AlertDeleteErrorLabel"));
				
			},
			publishDeleteAlertServiceExceptionHandler = function publishDeleteAlertServiceExceptionHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("AlertDeleteErrorLabel"));
				
			};
			
			publishDeleteAlertService.setParam("alertId", alert.id);
			publishDeleteAlertService.addEventHandler("SUCCESS", publishDeleteAlertServiceSuccessHandler);
			publishDeleteAlertService.addEventHandler("ERROR", publishDeleteAlertServiceErrorHandler);
			publishDeleteAlertService.addEventHandler("EXCEPTION", publishDeleteAlertServiceExceptionHandler);
			publishDeleteAlertService.call();
		
		};
		AlertManager.prototype.authorEditAlert = function(alert) {
			
			var 
			authorEditAlertDialog = new DCM.HTMLAlertsModuleItemEditDialogElement(alert),
			authorEditAlertDialogAcceptHandler = function authorEditAlertDialogAcceptHandler() {
				
				publishEditAlert(alert, authorEditAlertDialog.propertySelect.getValue(), authorEditAlertDialog.conditionSelect.getValue(), authorEditAlertDialog.valueInput.getValue(), authorEditAlertDialog.message.getValue(), authorEditAlertDialog.notifyBySMSCheckbox.getChecked(), authorEditAlertDialog.notifyByEmailCheckbox.getChecked());
				
			};
			
			authorEditAlertDialog.propertySelect.setValue(alert.property);
			authorEditAlertDialog.conditionSelect.setValue(alert.condition);
			authorEditAlertDialog.valueInput.setValue(alert.value);
			authorEditAlertDialog.message.setValue(alert.message);
			authorEditAlertDialog.notifyBySMSCheckbox.setChecked(alert.notifyBySMS);
			authorEditAlertDialog.notifyByEmailCheckbox.setChecked(alert.notifyByEmail);
			
			authorEditAlertDialog.addEventHandler("ACCEPT", authorEditAlertDialogAcceptHandler);
			authorEditAlertDialog.queue();
			
		};
		AlertManager.prototype.publishEditAlert = function(alert, property, condition, value, message, notifyBySMS, notifyByEMail) {
			
			var 
			publishEditAlertService = new DCM.EditAlertService(),
			publishEditAlertServiceSuccessHandler = function publishEditAlertServiceSuccessHandler(data) {
			
				alert.setProperty(property);
				alert.setCondition(condition);
				alert.setValue(value);
				alert.setMessage(message);
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("AlertEditSuccessLabel"));
				
			},
			publishEditAlertServiceErrorHandler = function publishEditAlertServiceErrorHandler() {
			
				DCM.ToastManager.createToast(DCM.Resources.getResource("AlertEditErrorLabel"));
				
			},
			publishEditAlertServiceExceptionHandler = function publishEditAlertServiceExceptionHandler() {
			
				DCM.ToastManager.createToast(DCM.Resources.getResource("AlertEditErrorLabel"));
				
			};
			
			publishEditAlertService.setParam("alertId", alert.id);
			publishEditAlertService.setParam("triggerSide", "");
			publishEditAlertService.setParam("isHigherPriceTheTrigger", "");
			publishEditAlertService.setParam("triggerPrice", "");
			publishEditAlertService.setParam("triggerSenti", "");
			publishEditAlertService.setParam("isHigherSentiTheTrigger", "");
			publishEditAlertService.setParam("message", message);
			publishEditAlertService.setParam("sendSms", notifyBySMS);
			publishEditAlertService.setParam("sendEmail", notifyByEMail);
			
			if(property==="1") {
				publishEditAlertService.setParam("triggerSide", "BUY");
				publishEditAlertService.setParam("triggerPrice", value);
				if(condition==="1") {
					publishEditAlertService.setParam("isHigherPriceTheTrigger", "true");
				}
				else if(condition==="2") {
					publishEditAlertService.setParam("isHigherPriceTheTrigger", "false");
				};
			}
			else if(property==="2") {
				publishEditAlertService.setParam("triggerSide", "SELL");
				publishEditAlertService.setParam("triggerPrice", value);
				if(condition==="1") {
					publishEditAlertService.setParam("isHigherPriceTheTrigger", "true");
				}
				else if(condition==="2") {
					publishEditAlertService.setParam("isHigherPriceTheTrigger", "false");
				};
			}
			else if(property==="3") {
				publishEditAlertService.setParam("triggerSenti", value);
				if(condition==="1") {
					publishEditAlertService.setParam("isHigherSentiTheTrigger", "true");
				}
				else if(condition==="2") {
					publishEditAlertService.setParam("isHigherSentiTheTrigger", "false");
				};
			};
			
			publishEditAlertService.addEventHandler("SUCCESS", publishEditAlertServiceSuccessHandler);
			publishEditAlertService.addEventHandler("ERROR", publishEditAlertServiceErrorHandler);
			publishEditAlertService.addEventHandler("EXCEPTION", publishEditAlertServiceExceptionHandler);
			publishEditAlertService.call();
			
		};
		AlertManager.prototype.getCurrentAlertIDs = function() {
			
			var loop = alerts.length,
			_return = [];
			while(loop--) {
				_return.push(alerts[loop].id);
			};
			return _return;

		};
		AlertManager.prototype.getAlertById = function(id) {
			
			var 
			loop = alerts.length,
			_return;
			while(loop--) {
				if(alerts[loop].id===id) {
					_return = alerts[loop];
					break;
				};
			};
			return _return;

		};

	}
	catch(e) {
		
		DCM.warn("AlertManager", e);
		
	};

})();