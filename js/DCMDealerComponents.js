DCM.AccountManager = function AccountManager() {

	try {
	
		var
		_this = this,
		_super = _this._super = DCM.EventDispatcher,
		isPreviewAccount = _this.isPreviewAccount = function isPreviewAccount() {
			var _return = (getID()==="DCM_PREVIEW");
			return _return;
		},
		PREVIEW_STRING = "PREVIEW",
		getType = _this.getType = function getType() {
			return _this.type;
		},
		setType = _this.setType = function setType(value) {
			if(value===_this.type) {
				return;
			};
			_this.type = value;
			_this.dispatchEventHandler("TYPE_CHANGE");
		},
		getMargin = _this.getMargin = function getMargin() {
			if(isPreviewAccount()) {
				return PREVIEW_STRING;
			};
			return (_this.margin + " " + _this.currency);
		},
		setMargin = _this.setMargin = function setMargin(value) {
			_this.margin = value;
			_this.dispatchEventHandler("MARGIN_CHANGE");
		},
		getFunds = _this.getFunds = function getFunds() {
			if(isPreviewAccount()) {
				return PREVIEW_STRING;
			};
			return (_this.funds + " " + _this.currency);
		},
		setFunds = _this.setFunds = function setFunds(value) {
			_this.funds = value;
			_this.dispatchEventHandler("FUNDS_CHANGE");
		},
		getEquity = _this.getEquity = function getEquity() {
			if(isPreviewAccount()) {
				return PREVIEW_STRING;
			};
			return (_this.equity + " " + _this.currency);
		},
		setEquity = _this.setEquity = function setEquity(value) {
			_this.equity = value;
			_this.dispatchEventHandler("EQUITY_CHANGE");
		},
		getProfitLoss = _this.getProfitLoss = function getProfitLoss() {
			if(isPreviewAccount()) {
				return PREVIEW_STRING;
			};
			return (_this.profitLoss + " " + _this.currency);
		},
		setProfitLoss = _this.setProfitLoss = function setProfitLoss(value) {
			_this.profitLoss = value;
			_this.dispatchEventHandler("PROFITLOSS_CHANGE");
		},
		setCurrency = _this.setCurrency = function setCurrency(value) {
			_this.currency = value;
			_this.dispatchEventHandler("");
		},
		setSentimentEnabled = _this.setSentimentEnabled = function setSentimentEnabled(value) {
			_this.sentimentEnabled = value;
		},
		switchAccount = _this.switchAccount = function switchAccount() {
			
			if(isPreviewAccount()) {
				
				openSelectAccountTypeDialog();
				return;
				
			};
			
			var 
			service = new DCM.SwitchAccountService(),
			switchBackService = new DCM.SwitchAccountService(),
			targetAccountName = DCM.Resources.getResource(_this.type==="CFD"?"SwitchAccountSpreadBettingLabel":"SwitchAccountCFDTradingLabel"),
			switchAccountServiceSuccessHandler = function switchAccountServiceSuccessHandler(data) {
			
				var 
				switchAccountConfirm = new DCM.HTMLConfirmationDialogElement(),
				switchAccountConfirmAcceptHandler = function switchAccountConfirmAcceptHandler() {
					
					DCM.refresh();
					
				},
				switchAccountConfirmDeclineHandler = function switchAccountConfirmDeclineHandler() {
					
					switchBackService.call();
					
				};
				
				switchAccountConfirm.setHeading(DCM.Resources.getResource("SwitchAccountConfirmHeading"));
				switchAccountConfirm.setMessage(DCM.Resources.getResource("SwitchAccountConfirmMessage", [
					{
						placeholder: "ACCOUNT_NAME",
						label: targetAccountName
					}
				]));
				switchAccountConfirm.addEventHandler("ACCEPT", switchAccountConfirmAcceptHandler);
				switchAccountConfirm.addEventHandler("DECLINE", switchAccountConfirmDeclineHandler);
				switchAccountConfirm.queue();
				
			},
			switchAccountServiceExceptionHandler = function switchAccountServiceExceptionHandler(data) {
			
				var 
				registerNewAccountConfirm = new DCM.HTMLConfirmationDialogElement(),
				registerNewAccountConfirmAcceptHandler = function registerNewAccountConfirmAcceptHandler() {
					
					openUpgradeAccountDialog();
					
				};
				
				registerNewAccountConfirm.setHeading(DCM.Resources.getResource("SwitchAccountRejectNotifyHeading"));
				registerNewAccountConfirm.setMessage(DCM.Resources.getResource("SwitchAccountRejectNotifyMessage", [
					{
						placeholder: "ACCOUNT_NAME",
						label: targetAccountName
					}
				]));
				registerNewAccountConfirm.addEventHandler("ACCEPT", registerNewAccountConfirmAcceptHandler);
				registerNewAccountConfirm.queue();
				_this.dispatchEventHandler("SWITCH_REJECT");
				
			};
			service.setParam("useCfdAccount", _this.type!=="CFD");
			switchBackService.setParam("useCfdAccount", _this.type==="CFD");
			service.addEventHandler("SUCCESS", switchAccountServiceSuccessHandler);
			service.addEventHandler("EXCEPTION", switchAccountServiceExceptionHandler);
			service.call();
		
		},
		setName = _this.setName = function setName(value) {
			_this.name = value;
			_this.dispatchEventHandler("NAME_CHANGE");
		},
		getID = _this.getID = function getID() {
			
			var _return = _this.id;
			
			return _return;
			
		},
		setId = _this.setId = function setId(value) {
			_this.id = value;
			_this.dispatchEventHandler("ID_CHANGE");
		},
		timer,
		accountDetailsService = new DCM.GetAccountOverviewService(),
		userDetailsService = _this.userDetailsService = new DCM.GetUserService(),
		update = _this.update = function update() {
		
			accountDetailsService.call();
		
		},
		start = _this.start = function start() {
			
			stop();
			update();
			timer = setInterval(update, 500);
			
		},
		stop = _this.stop = function stop() {
			clearInterval(timer);
		},
		openUpgradeAccountDialog = _this.openUpgradeAccountDialog = function openUpgradeAccountDialog() {
			var upgradeAccountDialog = new DCM.HTMLUpgradeAccountDialogElement();
			upgradeAccountDialog.queue();
		},
		openSelectAccountTypeDialog = _this.openSelectAccountTypeDialog = function openSelectAccountTypeDialog() {
			var selectAccountTypeDialog = new DCM.HTMLSelectAccountTypeDialogElement();
			selectAccountTypeDialog.queue();
		},
		openAccountProcessPendingDialog = _this.openAccountProcessPendingDialog = function openAccountProcessPendingDialog() {
		
			var processingAccountDialog = new DCM.HTMLStaticMessageDialogElement();
			processingAccountDialog.setHeading(DCM.Resources.getResource("U0002Heading"));
			processingAccountDialog.setMessage(DCM.Resources.getResource("U0002"));
			processingAccountDialog.queue();
			
		},
		setStopsAndLimitsType = _this.setStopsAndLimitsType = function setStopsAndLimitsType(value) {
			_this.stopsAndLimitsType = value;
			_this.dispatchEventHandler("STOPSANDLIMITSTYPE_CHANGE");
		},
		setCulture = _this.setCulture = function setCulture(value) {
			_this.culture = value;
		},
		setFirstName = function setFirstName(value) {
			_this.firstName = value;
		},
		setLastName = function setLastName(value) {
			_this.lastName = value;
		},
		setTitle = function setTitle(value) {
			_this.title = value;
		},
		setEmailAddress = function setEmailAddress(value) {
			_this.emailAddress = value;
			_this.dispatchEventHandler("EMAIL_CHANGE");
		},
		footerAppended = false;
		
		_this._super();
		
		accountDetailsService.addEventHandler("SUCCESS", function(data) {
			
			setProfitLoss(data.mappedAccount.profitAndLoss);
			setEquity(data.mappedAccount.equity);
			setFunds(data.mappedAccount.collateral);
			setMargin(data.mappedAccount.margin);
			setType(data.mappedAccount.accountType);
			setName(data.clientName);
			setId(data.mappedAccount.id);
			setSentimentEnabled(data.sentimentEnabled);
			
			// horrible place to have this - give more consideration to it at a later date
			if(DCM.AccountManager.isPreviewAccount()&&!footerAppended) {
				
				var previewFooter = new DCM.HTMLStaticFootElement();
				DCM.body.append(previewFooter);
				footerAppended = true;
				
			};
			
			// temp fix to stop preview accounts from continuously polling
			if(DCM.AccountManager.isPreviewAccount()) {
				
				_this.stop();
				
			};
			
		});
		
		userDetailsService.addEventHandler("SUCCESS", function(data) {
			
			setFirstName(data.firstname);
			setLastName(data.lastname);
			setEmailAddress(data.email);
			
		});
		
		setCurrency("GBP");
		setProfitLoss(0);
		setStopsAndLimitsType("POINTS");
		setCulture("en-GB");
		
		// temp fix so to allow for 'stop' of account details polling
		DCM.ModuleManager.modules.push(_this);
		
	}
	catch(e) {
		
		DCM.warn("AccountManager", e);
		
	};
	
};DCM.AddInstrumentToAPIUserService = function AddInstrumentToAPIUserService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_user_add_instrument");
		this.setErrorMessage(DCM.Resources.getResource("ERROR45"));
		
	}
	catch(e) {
		
		DCM.warn("AddInstrumentToAPIUserService", e);
		
	};
	
};DCM.AddToPortfolioService = function AddToPortfolioService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_portfolio_addTo");
		this.setErrorMessage(DCM.Resources.getResource("ERROR04"));
	
	}
	catch(e) {
		
		DCM.warn("AddToPortfolioService", e);
		
	};
	
};DCM.AddToWatchlistService = function AddToWatchlistService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_watchlist_addTo");
		this.setErrorMessage(DCM.Resources.getResource("ERROR05"));
		
	}
	catch(e) {
		
		DCM.warn("AddToWatchlistService", e);
		
	};
	
};DCM.AlertManager = new function AlertManager() {

	try {
		
		var
		_this = this,
		_super = _this._super = DCM.EventDispatcher,
		alerts = _this.alerts = [],
		createAlert = _this.createAlert = function createAlert(data) {
			var alert = new DCM.HTMLAlertsModuleItemElement(data);
			alerts.push(alert);
			return alert;
		},
		createAlertFromInstrument = _this.createAlertFromInstrument = function createAlertFromInstrument(instrument) {
		
			authorNewAlert(instrument);
		
		},
		authorNewAlert = _this.authorNewAlert = function authorNewAlert(instrument) {
			
			var 
			_dialog = new DCM.HTMLAlertsModuleItemCreateDialogElement(instrument),
			acceptHandler = function acceptHandler() {
			
				publishNewAlert(instrument, _dialog.propertySelect.getValue(), _dialog.conditionSelect.getValue(), _dialog.valueInput.getValue(), _dialog.message.getValue(), _dialog.notifyBySMSCheckbox.getChecked(), _dialog.notifyByEmailCheckbox.getChecked());
				
			};
			
			_dialog.addEventHandler("ACCEPT", acceptHandler);
			_dialog.queue();
			
		},
		publishNewAlert = _this.publishNewAlert = function publishNewAlert(instrument, property, condition, value, message, notifyBySMS, notifyByEMail) {
			
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
			
		},
		authorDeleteAlert = _this.authorDeleteAlert = function authorDeleteAlert(alert) {
		
			var 
			authorDeleteAlertConfirm = new DCM.HTMLConfirmationDialogElement(),
			authorDeleteAlertConfirmAcceptHandler = function authorDeleteAlertConfirmAcceptHandler() {
				publishDeleteAlert(alert);
			};
			
			authorDeleteAlertConfirm.setHeading(DCM.Resources.getResource("AlertDeleteConfirmHeading"));
			authorDeleteAlertConfirm.setMessage(DCM.Resources.getResource("AlertDeleteConfirmMessage"));
			authorDeleteAlertConfirm.addEventHandler("ACCEPT", authorDeleteAlertConfirmAcceptHandler);
			authorDeleteAlertConfirm.queue();
		
		},
		publishDeleteAlert = _this.publishDeleteAlert = function publishDeleteAlert(alert) {
			
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
		
		},
		authorEditAlert = _this.authorEditAlert = function authorEditAlert(alert) {
		
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
			
		},
		publishEditAlert = _this.publishEditAlert = function publishEditAlert(alert, property, condition, value, message, notifyBySMS, notifyByEMail) {
		
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
			
		},
		getCurrentAlertIDs = _this.getCurrentAlertIDs = function getCurrentAlertIDs() {
			var loop = alerts.length,
			_return = [];
			while(loop--) {
				_return.push(alerts[loop].id);
			};
			return _return;
		},
		getAlertById = _this.getAlertById = function getAlertById(id) {
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
		
		_this._super();
		
	}
	catch(e) {
		
		DCM.warn("AlertManager", e);
		
	};
	
};DCM.CloseChartService = function CloseChartService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_charting_close");
		this.setErrorMessage(DCM.Resources.getResource("ERROR06"));
	
	}
	catch(e) {
		
		DCM.warn("CloseChartService", e);
		
	};
	
};DCM.CloseOrderService = function CloseOrderService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_order_cancel");
		this.setErrorMessage(DCM.Resources.getResource("ERROR07"));
		
	}
	catch(e) {
		
		DCM.warn("CloseOrderService", e);
		
	};
	
};DCM.ClosePositionService = function ClosePositionService() {

	try {
	
		this._super = DCM.EditPositionService;
		this._super();
		
		this.setErrorMessage(DCM.Resources.getResource("ERROR08"));
		this.setParam("size", "0");
		
	}
	catch(e) {
		
		DCM.warn("ClosePositionService", e);
	
	};
	
};DCM.CreateAlertService = function CreateAlertService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_alert_add");
		this.setErrorMessage(DCM.Resources.getResource("ERROR09"));
		this.setParam("securityID", "");
		this.setParam("triggerSide", "");
		this.setParam("isHigherPriceTheTrigger", "");
		this.setParam("triggerPrice", "");
		this.setParam("triggerSenti", "");
		this.setParam("isHigherSentiTheTrigger", "");
		this.setParam("message", "");
		this.setParam("sendSms", "");
		this.setParam("sendEmail", "");
		
	}
	catch(e) {
		
		DCM.warn("CreateAlertService", e);
		
	};
	
};DCM.CreateNoteService = function CreateNoteService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_note_add");
		this.setErrorMessage(DCM.Resources.getResource("ERROR10"));
		this.setParam("title", "x");
	
	}
	catch(e) {
		
		DCM.warn("CreateNoteService", e);
		
	};
	
};DCM.CreatePortfolioService = function CreatePortfolioService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_portfolio_create");
		this.setErrorMessage(DCM.Resources.getResource("ERROR11"));
		
	}
	catch(e) {
		
		DCM.warn("CreatePortfolioService", e);
		
	};
	
};DCM.CreateWatchlistService = function CreateWatchlistService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_watchlist_create");
		this.setErrorMessage(DCM.Resources.getResource("ERROR12"));
		
	}
	catch(e) {
		
		DCM.warn("CreateWatchlistService", e);
		
	};
	
};DCM.DeleteAlertService = function DeleteAlertService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_alert_delete");
		this.setErrorMessage(DCM.Resources.getResource("ERROR13"));
		
	}
	catch(e) {
		
		DCM.warn("DeleteAlertService", e);
		
	};
	
};DCM.DeleteFromPortfolioService = function DeleteFromPortfolioService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_portfolio_removeFrom");
		this.setErrorMessage(DCM.Resources.getResource("ERROR14"));
		
	}
	catch(e) {
		
		DCM.warn("DeleteFromPortfolioService", e);
		
	};
	
};DCM.DeleteFromWatchlistService = function DeleteFromWatchlistService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_watchlist_removeFrom");
		this.setErrorMessage(DCM.Resources.getResource("ERROR15"));
		
	}
	catch(e) {
		
		DCM.warn("DeleteFromWatchlistService", e);
		
	};
	
};DCM.DeleteNoteService = function DeleteNoteService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_note_delete");
		this.setErrorMessage(DCM.Resources.getResource("ERROR16"));
		
	}
	catch(e) {
		
		DCM.warn("DeleteNoteService", e);
		
	};
	
};DCM.DeleteOrderService = function DeleteOrderService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_order_remove_working");
		this.setErrorMessage(DCM.Resources.getResource("ERROR17"));

	}
	catch(e) {
		
		DCM.warn("DeleteOrderService", e);
		
	};
	
};DCM.DeletePortfolioService = function DeletePortfolioService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_portfolio_delete");
		this.setErrorMessage(DCM.Resources.getResource("ERROR18"));
		
	}
	catch(e) {
		
		DCM.warn("DeletePortfolioService", e);
		
	};
	
};DCM.DeleteWatchlistService = function DeleteWatchlistService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_watchlist_delete");
		this.setErrorMessage(DCM.Resources.getResource("ERROR19"));
		
	}
	catch(e) {
		
		DCM.warn("DeleteWatchlistService", e);
		
	};
	
};DCM.DocumentElement = function DocumentElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.documentElement;
		
	}
	catch(e) {
		
		DCM.warn("DocumentElement", e);
		
	};
	
};DCM.EditAlertService = function EditAlertService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_alert_modify");
		this.setErrorMessage(DCM.Resources.getResource("ERROR20"));
		
	}
	catch(e) {
		
		DCM.warn("EditAlertService", e);
		
	};
	
};DCM.EditNoteService = function EditNoteService() {
	
	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_note_modify");
		this.setErrorMessage(DCM.Resources.getResource("ERROR21"));
		this.setParam("title", "");
		
	}
	catch(e) {
		
		DCM.warn("EditNoteService", e);
		
	};
	
};DCM.EditOrderService = function EditOrderService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_order_modify");
		this.setParam("stopPrice", "");
		this.setParam("limitPrice", "");
		this.setParam("tstop", "");
		this.setParam("price", "");
		this.setParam("isOrderType", "");
		this.setParam("securityId", "");
		this.setParam("positionId", "");
		this.setParam("gtd", "");
		this.setErrorMessage(DCM.Resources.getResource("ERROR22"));
		
	}
	catch(e) {
		
		DCM.warn("EditOrderService", e);
		
	};
	
};DCM.EditPositionService = function EditPositionService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_position_modify");
		this.setParam("stopPrice", "");
		this.setParam("limitPrice", "");
		this.setParam("tstop", "");
		this.setParam("price", "");
		this.setParam("isOrderType", "");
		this.setParam("securityId", "");
		this.setParam("positionId", "");
		this.setErrorMessage(DCM.Resources.getResource("ERROR23"));
		
	}
	catch(e) {
		
		DCM.warn("EditPositionService", e);
		
	};
	
};DCM.GenerateRegistrationFormService = function GenerateRegistrationFormService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_user_add");
		this.setErrorMessage(DCM.Resources.getResource("ERROR24"));
		
	}
	catch(e) {
		
		DCM.warn("GenerateRegistrationFormService", e);
		
	};
	
};DCM.GetAccountOverviewService = function GetAccountOverviewService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_accountoverview_get");
		this.setErrorMessage(DCM.Resources.getResource("ERROR25"));
		this.setNotifyUserOnError(false);
		
	}
	catch(e) {
		
		DCM.warn("GetAccountOverviewService", e);
		
	};
	
};DCM.GetAlertsService = function GetAlertsService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_alert_getAll");
		this.setErrorMessage(DCM.Resources.getResource("ERROR26"));
		
	}
	catch(e) {
		
		DCM.warn("GetAlertsService", e);
		
	};
	
};DCM.GetAPIInstrumentsService = function GetAPIInstrumentsService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_instruments_get");
		this.setErrorMessage(DCM.Resources.getResource("ERROR45"));
		
	}
	catch(e) {
		
		DCM.warn("GetAPIInstrumentsService", e);
		
	};
	
};DCM.GetAPIUsersService = function GetAPIUsersService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_user_getAll");
		this.setErrorMessage(DCM.Resources.getResource("ERROR45"));
		
	}
	catch(e) {
		
		DCM.warn("GetAPIUsersService", e);
		
	};
	
};DCM.GetChartService = function GetChartService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_charting_getlink");
		this.setErrorMessage(DCM.Resources.getResource("ERROR27"));
		
	}
	catch(e) {
		
		DCM.warn("GetChartService", e);
		
	};
	
};DCM.GetEmailService = function GetEmailService() {
	
	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dealer_platform_open_account_userexists");
		this.setErrorMessage(DCM.Resources.getResource("ERROR28"));
		
		this.setParam("emailAddress", "");
		
	}
	catch(e) {
	
		DCM.warn("GetEmailService", e);
	
	};
	
};DCM.GetInstrumentService = function GetInstrumentService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_instrument_get");
		this.setErrorMessage(DCM.Resources.getResource("ERROR02"));
		
	}
	catch(e) {
		
		DCM.warn("GetInstrumentService", e);
		
	};
	
};DCM.GetInstrumentsService = function GetInstrumentsService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_instruments_get");
		this.setErrorMessage(DCM.Resources.getResource("ERROR01"));
		
	}
	catch(e) {
		
		DCM.warn("GetInstrumentsService", e);
		
	};
	
};DCM.GetNewsArticleService = function GetNewsArticleService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_news_get");
		this.setErrorMessage(DCM.Resources.getResource("ERROR29"));
		
	}
	catch(e) {
		
		DCM.warn("GetNewsArticleService", e);
		
	};
	
};DCM.GetNotesService = function GetNotesService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_note_getAll");
		this.setErrorMessage(DCM.Resources.getResource("ERROR30"));
		
	}
	catch(e) {
		
		DCM.warn("GetNotesService", e);
		
	};
	
};DCM.GetOrdersService = function GetOrdersService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_order_get_working");
		this.setErrorMessage(DCM.Resources.getResource("ERROR31"));
		this.setParam("prevOrderIds", "");
		
	}
	catch(e) {
		
		DCM.warn("GetOrdersService", e);
		
	};
	
};DCM.GetPortfolioService = function GetPortfolioService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_portfolio_get");
		this.setErrorMessage(DCM.Resources.getResource("ERROR32"));
		
	}
	catch(e) {
		
		DCM.warn("GetPortfolioService", e);
		
	};
	
};DCM.GetPortfoliosService = function GetPortfoliosService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_portfolios_get");
		this.setErrorMessage(DCM.Resources.getResource("ERROR33"));
		
	}
	catch(e) {
		
		DCM.warn("GetPortfoliosService", e);
		
	};
	
};DCM.GetPositionsService = function GetPositionsService() {
	
	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_positions_getAllOpen");
		this.setErrorMessage(DCM.Resources.getResource("ERROR34"));
		this.setParam("isAggregate", "");
		this.setParam("prevPositionsIds", "");
		
	}
	catch(e) {
		
		DCM.warn("GetPositionsService", e);
		
	};
	
};DCM.GetSessionService = function GetSessionService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_dcmlssession");
		this.setErrorMessage(DCM.Resources.getResource("ERROR35"));
		
	}
	catch(e) {
		
		DCM.warn("GetSessionService", e);
		
	};
	
};DCM.GetSettingsService = function GetSettingsService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_settings_get");
		this.setErrorMessage(DCM.Resources.getResource("ERROR36"));
		
	}
	catch(e) {
		
		DCM.warn("GetSettingsService", e);
		
	};
	
};DCM.GetUserPanelsService = function GetUserPanelsService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_userpanels_get");
		this.setErrorMessage(DCM.Resources.getResource("ERROR37"));
		
	}
	catch(e) {
		
		DCM.warn("GetUserPanelsService", e);
		
	};
	
};DCM.GetUserService = function GetUserService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_accountoverview_getuserdetails");
		this.setErrorMessage(DCM.Resources.getResource("ERROR38"));
		
	}
	catch(e) {
	
		DCM.warn("GetUserService", e);
		
	};
	
};DCM.GetWatchlistService = function GetWatchlistService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_watchlist_get");
		this.setErrorMessage(DCM.Resources.getResource("ERROR39"));
		
	}
	catch(e) {
		
		DCM.warn("GetWatchlistService", e);
		
	};
	
};DCM.GetWatchlistsService = function GetWatchlistsService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_watchlists_get");
		this.setErrorMessage(DCM.Resources.getResource("ERROR40"));
		
	}
	catch(e) {
		
		DCM.warn("GetWatchlistsService", e);
		
	};
	
};DCM.HTMLAccountDetailsPanelElement = function HTMLAccountDetailsPanelElement() {

	try {

		var 
		_this = this,
		detailsRow = new DCM.HTMLRowElement(),
		fundsRow = detailsRow.addColumn(),
		fundsRowHeading = new DCM.HTMLHeadingElement(),
		fundsRowValue = new DCM.HTMLDivElement(),
		equityRow = detailsRow.addColumn(),
		equityRowHeading = new DCM.HTMLHeadingElement(),
		equityRowValue = new DCM.HTMLDivElement(),
		marginRow = detailsRow.addColumn(),
		marginRowHeading = new DCM.HTMLHeadingElement(),
		marginRowValue = new DCM.HTMLDivElement(),
		profitLossRow = detailsRow.addColumn(),
		profitLossRowHeading = new DCM.HTMLHeadingElement(),
		profitLossRowValue = new DCM.HTMLDivElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		_this.setType("HTMLAccountDetailsPanelElement");
		
		fundsRowHeading.setText(DCM.Resources.getResource("FundsLabel"));
		fundsRow.append(fundsRowValue);
		fundsRow.append(fundsRowHeading);
		fundsRowHeading.setSize("extra-small");
		fundsRowHeading.setRole("orange-uppercase");
		
		equityRowHeading.setText(DCM.Resources.getResource("EquityLabel"));
		equityRow.append(equityRowValue);
		equityRow.append(equityRowHeading);
		equityRowHeading.setSize("extra-small");
		equityRowHeading.setRole("orange-uppercase");
		
		marginRowHeading.setText(DCM.Resources.getResource("MarginLabel"));
		marginRow.append(marginRowValue);
		marginRow.append(marginRowHeading);
		marginRowHeading.setSize("extra-small");
		marginRowHeading.setRole("orange-uppercase");
		
		profitLossRowHeading.setText(DCM.Resources.getResource("ProfitLossLabel"));
		profitLossRow.append(profitLossRowValue);
		profitLossRow.append(profitLossRowHeading);
		profitLossRowHeading.setSize("extra-small");
		profitLossRowHeading.setRole("orange-uppercase");
		
		_this.append(detailsRow);
		
		DCM.AccountManager.addEventHandler("MARGIN_CHANGE", function() {
		
			marginRowValue.setText(DCM.AccountManager.getMargin());
			
		});

		DCM.AccountManager.addEventHandler("FUNDS_CHANGE", function() {
			
			fundsRowValue.setText(DCM.AccountManager.getFunds());
			
		});
		
		DCM.AccountManager.addEventHandler("PROFITLOSS_CHANGE", function() {
			
			profitLossRowValue.setText(DCM.AccountManager.getProfitLoss());
			
		});
		
		DCM.AccountManager.addEventHandler("EQUITY_CHANGE", function() {
			
			equityRowValue.setText(DCM.AccountManager.getEquity());
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLAccountDetailsPanelElement", e);
		
	};
	
};DCM.HTMLAccountTypeToggleElement = function HTMLAccountTypeToggleElement() {

	try {
		
		var
		_this = this,
		CFDItem,
		spreadItem,
		suppressChangeEvent = true;
		
		this._super = DCM.HTMLRadioButtonGroupElement;
		this._super();
		
		CFDItem = _this.setItem(DCM.Resources.getResource("SwitchAccountCFDTradingLabel"), "CFD");
		spreadItem = _this.setItem(DCM.Resources.getResource("SwitchAccountSpreadBettingLabel"), "SPREAD");
		
		_this.setType("HTMLAccountTypeToggleElement");
		
		_this.addEventHandler("CHANGE", function() {
			
			if(!suppressChangeEvent&&DCM.AccountManager.getType()!==this.getValue()) {
				DCM.AccountManager.switchAccount();
			};
			
			suppressChangeEvent = false;
			
		});
		
		DCM.AccountManager.addEventHandler("TYPE_CHANGE", function() {
			
			_this.setValue(DCM.AccountManager.type);
			
		});
		
		DCM.AccountManager.addEventHandler("SWITCH_REJECT", function() {
			
			_this.setValue(DCM.AccountManager.type);
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLAccountTypeToggleElement", e);
		
	};
	
};DCM.HTMLAddToWatchlistGraphicButtonElement = function HTMLAddToWatchlistGraphicButtonElement() {

	try {
		
		this._super = DCM.HTMLGraphicButtonElement;
		this._super();
		
		this.setRole("add-to-watchlist");
		this.setSize("2");
		this.setLabel(DCM.Resources.getResource("AddToWatchlistLabel"));
	
	}
	catch(e) {
	
		DCM.warn("HTMLAddToWatchlistGraphicButtonElement", e);
		
	};
	
};DCM.HTMLAdvancedPasswordStrengthElement = function HTMLAdvancedPasswordStrengthElement() {

	try {
		
		var
		_this = this,
		passwordOneStrength,
		passwordTwoStrength,
		passwordThreeStrength,
		passwordFourStrength,
		passwordFiveStrength,
		setLength = _this.setLength = function setLength(value) {
			_this.setAttribute("data-length", value);
		},
		setLowercase = _this.setLowercase = function setLowercase(value) {
			_this.setAttribute("data-lowercase", value);
		},
		setUppercase = _this.setUppercase = function setUppercase(value) {
			_this.setAttribute("data-uppercase", value);
		},
		setNumber = _this.setNumber = function setNumber(value) {
			_this.setAttribute("data-number", value);
		},
		setSpecial = _this.setSpecial = function setSpecial(value) {
			_this.setAttribute("data-special", value);
		},
		apply = _this.apply = function apply(strengthObj) {
			
			setLength(strengthObj.length);
			setLowercase(strengthObj.lowercase);
			setUppercase(strengthObj.uppercase);
			setNumber(strengthObj.number);
			setSpecial(strengthObj.special);
			
		},
		test = _this.test = function test(password) {
			
			var 
			strength = 0,
			lowercase = false,
			uppercase = false,
			number = false,
			special = false,
			length = false;
			
			if(!password) {
				return {
					strength: -1,
					lowercase: lowercase,
					uppercase: uppercase,
					number: number,
					special: special,
					length: length
				};
			}
			else if(password.length>_this.minLength) {
				length = true;
			};
			
			if(password.match(/([a-z])/g)) {
				lowercase = true;
				strength += 1;
			};
			
			if(password.match(/([A-Z])/g)) {
				uppercase = true;
				strength += 1;
			};
			
			if(password.match(/([0-9])/g)) {
				number = true;
				strength += 1;
			};
			
			if(password.match(/([£,\.,!,%,&,@,#,$,^,*,?,_,~,\+,\=,\),\(,\-,\],\[,:,\',\/,\\,<,>])/g)) {
				special = true;
				strength += 1;
			};
			
			return {
				strength: strength,
				lowercase: lowercase,
				uppercase: uppercase,
				number: number,
				special: special,
				length: length
			};
			
		},
		setMinLength = _this.setMinLength = function setMinLength(value) {
			_this.minLength = value;
			passwordOneStrength.setAttribute("title", "Minimum-length " + value);
			passwordOneStrength.setText(">" + value);
		};
		
		this._super = DCM.HTMLRowElement;
		this._super();
		
		passwordOneStrength = _this.addColumn();
		passwordTwoStrength = _this.addColumn();
		passwordThreeStrength = _this.addColumn();
		passwordFourStrength = _this.addColumn();
		passwordFiveStrength = _this.addColumn();
		
		passwordTwoStrength.setAttribute("title", "At least 1 lowercase character required");
		passwordThreeStrength.setAttribute("title", "At least 1 uppercase character required");
		passwordFourStrength.setAttribute("title", "At least 1 numeric character required");
		passwordFiveStrength.setAttribute("title", "At least 1 special character required");
		
		passwordTwoStrength.setText("abc");
		passwordThreeStrength.setText("ABC");
		passwordFourStrength.setText("123");
		passwordFiveStrength.setText("!&$");
		
		setMinLength(4);
		
		_this.setType("HTMLAdvancedPasswordStrengthElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLAdvancedPasswordStrengthElement", e);
		
	};
	
};DCM.HTMLAlertDialogElement = function HTMLAlertDialogElement() {

	try {
		
		this._super = DCM.HTMLStaticMessageDialogElement;
		this._super();
		
		this.setHeading("Default alert heading");
		this.setType("HTMLAlertDialogElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLAlertDialogElement", e);
		
	};
	
};DCM.HTMLAlertsModuleContextMenuElement = function HTMLAlertsModuleContextMenuElement(target) {

	try {
		
		this._super = DCM.HTMLModuleContextMenuElement;
		this._super(target);
		
		this.setType("HTMLAlertsModuleContextMenuElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLAlertsModuleContextMenuElement", e);
		
	};
	
};DCM.HTMLAlertsModuleElement = function HTMLAlertsModuleElement() {
	
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
	
};DCM.HTMLAlertsModuleItemContextMenuElement = function HTMLAlertsModuleItemContextMenuElement(target) {

	try {
		
		var
		_this = this,
		setAsReadItem;
		
		this._super = DCM.HTMLContextMenuElement;
		this._super(target);
		
		this.setItem(DCM.Resources.getResource("DeleteAlertLabel"), function() {
		
			DCM.AlertManager.authorDeleteAlert(_this.target);
			
		});
		
		this.setItem(DCM.Resources.getResource("EditAlertLabel"), function() {
		
			DCM.AlertManager.authorEditAlert(_this.target);
			
		});
		
		setAsReadItem = this.setItem(DCM.Resources.getResource("AlertMarkAsRead"), function() {
		
			_this.target.setRead();
		
		});
		
		if(this.target.status==="READ") {
			
			setAsReadItem.disable();
			
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLAlertsModuleItemContextMenuElement", e);
		
	};
	
};DCM.HTMLAlertsModuleItemCreateDialogElement = function HTMLAlertsModuleItemCreateDialogElement(instrument) {

	try {
		
		var 
		instrument = this.instrument = instrument;
		
		this._super = DCM.HTMLAlertsModuleItemDialogElement;
		this._super();
		
		this.setHeading(DCM.Resources.getResource("AddAlertLabel"));
		this.instrumentHolder.setText(instrument.getDisplayTextAsHTML());
		this.setType("HTMLAlertsModuleItemCreateDialogElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLAlertsModuleItemCreateDialogElement", e);
		
	};
	
};DCM.HTMLAlertsModuleItemDialogElement = function HTMLAlertsModuleItemDialogElement() {

	try {
	
		this._super = DCM.HTMLDynamicDialogElement;
		this._super();
	
		var 
		_this = this,
		alertMeWhenLabel = _this.alertMeWhenLabel = new DCM.HTMLDivElement(),
		propertySelect = _this.propertySelect = new DCM.HTMLSelectMenuElement(),
		isLabel = new DCM.HTMLDivElement(),
		conditionSelect = _this.conditionSelect = new DCM.HTMLSelectMenuElement(),
		valueInput = _this.valueInput = new DCM.HTMLNumericStepperElement(),
		row = new DCM.HTMLRowElement(),
		col1 = row.addColumn(),
		col2 = row.addColumn(),
		col3 = row.addColumn(),
		col4 = row.addColumn(),
		message = _this.message = new DCM.HTMLCustomTextAreaElement(),
		instrumentHolder = _this.instrumentHolder = new DCM.HTMLDivElement(),
		buyPriceItem = propertySelect.setItem(DCM.Resources.getResource("BuyPriceLabel"), "1"),
		sellPriceItem = propertySelect.setItem(DCM.Resources.getResource("SellPriceLabel"), "2"),
		sentimentItem = propertySelect.setItem(DCM.Resources.getResource("SentimentLabel"), "3"),
		priceChangeHandler = function priceChangeHandler() {
		
			buyPriceItem.setLabel(DCM.Resources.getResource("BuyPriceLabel") + " [" + _this.instrument.buyPrice + "]");
			sellPriceItem.setLabel(DCM.Resources.getResource("SellPriceLabel") + " [" + _this.instrument.sellPrice + "]");
			sentimentItem.setLabel(DCM.Resources.getResource("SentimentLabel") + " [" + _this.instrument.sentiment + "]");
			
		},
		notifyByEmailCheckbox = _this.notifyByEmailCheckbox = new DCM.HTMLCheckboxElement(),
		notifyBySMSCheckbox = _this.notifyBySMSCheckbox = new DCM.HTMLCheckboxElement();
		
		_this.setAttribute("data-dialog-role", "alert");
		
		_this.instrument.subscribe();
		_this.instrument.addEventHandler("PRICE_CHANGE", priceChangeHandler);
		priceChangeHandler();
		
		_this.setType("HTMLAlertsModuleItemDialogElement");
		
		col1.append(propertySelect);
		col2.append(isLabel);
		col3.append(conditionSelect);
		col4.append(valueInput);
		
		_this.body.append(instrumentHolder);
		_this.body.append(alertMeWhenLabel);
		_this.body.append(row);
		_this.body.append(message);
		_this.body.append(notifyByEmailCheckbox);
		_this.body.append(notifyBySMSCheckbox);
		
		notifyByEmailCheckbox.setLabel(DCM.Resources.getResource("AlertNotifyEmailLabel"));
		notifyBySMSCheckbox.setLabel(DCM.Resources.getResource("AlertNotifySMSLabel"));
		
		message.setAttribute("data-alert-role", "message");
		message.setPlaceholder(DCM.Resources.getResource("AlertMessagePlaceholderLabel"));
		
		instrumentHolder.setAttribute("data-alert-role", "instrument");
		row.setAttribute("data-alert-role", "conditions");
		
		alertMeWhenLabel.setAttribute("data-alert-role", "alert-me-when");
		alertMeWhenLabel.setText(DCM.Resources.getResource("AlertMeWhenLabel"));
		isLabel.setText(DCM.Resources.getResource("AlertIsLabel"));
		
		propertySelect.setValue("1");
		propertySelect.setWidth(135);
		propertySelect.addEventHandler("CHANGE", function() {
			
			var selected = propertySelect.getValue();
			
			if(selected==="1") {
				
			}
			else if(selected==="2") {
				
			}
			else if(selected==="3") {
				valueInput.setMin(0);
				valueInput.setMax(100);
			};
			
		});
		
		conditionSelect.setItem(DCM.Resources.getResource("AlertHigherThanLabel"), "1");
		conditionSelect.setItem(DCM.Resources.getResource("AlertLowerThanLabel"), "2");
		conditionSelect.setValue("1");
		conditionSelect.setWidth(112);
		
	}
	catch(e) {
		
		DCM.warn("HTMLAlertsModuleItemDialogElement", e);
		
	};
	
};DCM.HTMLAlertsModuleItemEditDialogElement = function HTMLAlertsModuleItemEditDialogElement(alert) {

	try {
		
		var 
		alert = this.alert = alert,
		instrument = this.instrument = alert.instrument;
		
		this._super = DCM.HTMLAlertsModuleItemDialogElement;
		this._super();
		
		this.setHeading(DCM.Resources.getResource("EditAlertLabel"));
		this.instrumentHolder.setText(instrument.getDisplayTextAsHTML());
		this.setType("HTMLAlertsModuleItemEditDialogElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLAlertsModuleItemEditDialogElement", e);
		
	};
	
};DCM.HTMLAlertsModuleItemElement = function HTMLAlertsModuleItemElement(data) {

	try {
	
		var
		_this = this,
		STATUS_TRIGGERED = "TRIGGERED",
		STATUS_PENDING = "PENDING",
		STATUS_READ = "READ",
		getCompleted = _this.getCompleted = function getCompleted() {
			return _this.completed;
		},
		setId = _this.setId = function setId(value) {
			_this.id = value;
		},
		setMessage = _this.setMessage = function setMessage(value) {
			var val = _this.message = value;
			messageHolder.setText(val);
		},
		setDescription = _this.setDescription = function setDescription(value) {
			var val = _this.description = value;
			descriptionHolder.setText(val);
		},
		setStatus = _this.setStatus = function setStatus(value, suppressNotification) {
			var val = _this.status = value;
			if(val==="TRIGGERED"&&!suppressNotification) {
				var triggeredNotification = new DCM.HTMLNotifyDialogElement();
				triggeredNotification.setHeading(DCM.Resources.getResource("AlertTriggeredLabel"));
				triggeredNotification.setMessage(_this.description);
				triggeredNotification.queue();
			};
			_this.setAttribute("data-status", val);
		},
		setProperty = _this.setProperty = function setProperty(value) {
			_this.property = value;
		},
		setCondition = _this.setCondition = function setCondition(value) {
			_this.condition = value;
		},
		setValue = _this.setValue = function setValue(value) {
			_this.value = value;
		},
		setNotifyByEmail = _this.setNotifyByEmail = function setNotifyByEmail(value) {
			_this.notifyByEmail = value;
		},
		setNotifyBySMS = _this.setNotifyBySMS = function setNotifyBySMS(value) {
			_this.notifyBySMS = value;
		},
		setRead = _this.setRead = function setRead() {
			
			if(_this.status==="READ") {
				return;
			};
			
			var 
			setReadService = new DCM.SetAlertReadService(),
			setReadServiceSuccessHandler = function setReadServiceSuccessHandler() {
				setStatus("READ");
			};
			
			setReadService.setParam("alertId", _this.id);
			setReadService.addEventHandler("SUCCESS", setReadServiceSuccessHandler);
			setReadService.call();
			
		},
		destroy = _this.destroy = function destroy() {
			_this.remove();
			DCM.AlertManager.alerts.splice(DCM.getIndexOf(DCM.AlertManager.alerts, _this), 1);
			_this.dispatchEventHandler("DESTROY");
		},
		createdDate = new Date(data.createdAtTimestamp),
		data = _this.data = data,
		messageHolder = new DCM.HTMLDivElement(),
		descriptionHolder = new DCM.HTMLDivElement(),
		instrumentHolder = new DCM.HTMLDivElement(),
		instrument = _this.instrument = DCM.InstrumentManager.getInstrumentById(data.securityId);
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		messageHolder.setAttribute("data-alerts-item-role", "message");
		descriptionHolder.setAttribute("data-alerts-item-role", "description");
		
		instrumentHolder.setText(instrument.getDisplayTextAsHTML());
		
		_this.append(messageHolder);
		_this.append(descriptionHolder);
		_this.append(instrumentHolder);
		
		_this.setType("HTMLAlertsModuleItemElement");
		
		setId(data.id);
		setMessage(data.message);
		setDescription(data.alertDescription);
		setNotifyByEmail(data.sendToEmail);
		setNotifyBySMS(data.sendToSMS);
		
		if(data.triggerSide==="TRIGGER_SIDE_ASK") {
			setProperty("1");
		}
		else if(data.triggerSide==="TRIGGER_SIDE_BID") {
			setProperty("2");
		}
		else if(data.triggerSenti) {
			setProperty("3");
		};
		
		if(data.triggerPriceEquality===1) {
			setCondition("1");
		}
		else if(data.triggerPriceEquality===-1) {
			setCondition("2");
		}
		else if(data.triggerSentiEquality===1) {
			setCondition("1");
		}
		else if(data.triggerSentiEquality===-1) {
			setCondition("2");
		};
		
		if(_this.property==="3") {
			setValue(data.triggerSenti);
		}
		else {
			setValue(data.triggerPrice);
		};
		
		if(data.isRead) {
			setStatus("READ");
		}
		else if(data.triggered) {
			setStatus("TRIGGERED", true);
		}
		else {
			setStatus("PENDING");
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
		
	}
	catch(e) {
		
		DCM.warn("HTMLAlertsModuleItemElement", e);
		
	};
	
};DCM.HTMLAnchorElement = function HTMLAnchorElement() {
	
	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.setHref = function setHref(value) {
			this.setAttribute("href", value);
		};
		
		this.displayObject = document.createElement("a");
		this.setType("HTMLAnchorElement");
		this.setHref("#");
		
	}
	catch(e) {
		
		DCM.warn("HTMLAnchorElement", e);
		
	};
	
};DCM.HTMLBodyElement = function HTMLBodyElement(document) {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.body;
		
	}
	catch(e) {
		
		DCM.warn("HTMLBodyElement", e);
		
	};
	
};DCM.HTMLBrandIconElement = function HTMLBrandIconElement() {

	try {

		this._super = DCM.HTMLIconElement;
		this._super();
		
		this.setType("HTMLBrandIconElement");
		this.setText("DCM Dealer - online trading platform");
		
	}
	catch(e) {
		
		DCM.warn("HTMLBrandIconElement", e);
		
	};

};DCM.HTMLButtonElement = function HTMLButtonElement() {

	try {
		
		var
		_this = this,
		suppress = _this.suppress = function suppress() {
			setSuppress(true);
		},
		unsuppress = _this.unsuppress = function unsuppress() {
			setSuppress(false);
		},
		setSuppress = function setSuppress(value) {
			_this.setAttribute("data-suppressed", value);
		};
		
		this._super = DCM.HTMLNativeButtonElement;
		this._super();
		
		_this.setType("HTMLButtonElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLButtonElement", e);
		
	};
	
};DCM.HTMLChartModuleElement = function HTMLChartModuleElement(secutiryId) {

	try {
		
		var
		_this = this,
		getChartService = new DCM.GetChartService(),
		iframe = new DCM.HTMLIFrameElement(),
		closeChartService = new DCM.CloseChartService(),
		chartURL,
		openInNewWindowButton = new DCM.HTMLOpenInNewWindowGraphicButtonElement(),
		openInNewWindow = function openInNewWindow() {
			
			var newWindow = window.open(chartURL, "", "width=610,height=350");
			newWindow.onbeforeunload = function() {
				
				closeChartService.call();
				
			};
			suprressCloseCall = true;
			_this.close();
			
		},
		suprressCloseCall = false;
		
		this._super = DCM.HTMLModuleElement;
		this._super();
		
		_this.buttonWrap.append(openInNewWindowButton);
		
		DCM.log("new HTMLChartModuleElement()", _this);
		
		getChartService.setParam("securityId", secutiryId);
		getChartService.call();
		
		getChartService.addEventHandler("SUCCESS", function(data) {
		
			chartURL = data.link;
			
			iframe.setSrc(chartURL);
			
			_this.body.append(iframe);
			
		});
		
		getChartService.addEventHandler("EXCEPTION", function(data) {
		
			_this.body.setText(DCM.Resources.getResource(data));
			
		});
		
		getChartService.addEventHandler("ERROR", function() {
		
			DCM.log("getChartService.ERROR");
			
		});
		
		_this.setIcon("chart-module");
		_this.setHeading(DCM.Resources.getResource("ChartModuleHeading"));
		_this.setType("HTMLChartModuleElement");
		
		_this.addEventHandler("CLOSE", function() {
			
			if(!suprressCloseCall) {
				closeChartService.call();
			};
			
		});
		
		iframe.setWidth("596px");
		iframe.setHeight("350px");
		
		openInNewWindowButton.addEventListener(DCM.Event.click, function() {
			
			openInNewWindow();
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLChartModuleElement", e);
		
	};
	
};DCM.HTMLCheckboxElement = function HTMLCheckboxElement() {

	try {
		
		this._super = DCM.HTMLCheckElement;
		this._super();
		
		this.setType("HTMLCheckboxElement");
	
	}
	catch(e) {
	
		DCM.warn("HTMLCheckboxElement", e);
	
	};

};DCM.HTMLCheckboxLabelElement = function HTMLCheckboxLabelElement() {

	try {
		
		this._super = DCM.HTMLLabelElement;
		this._super();
		
		this.setType("HTMLCheckboxLabelElement");
		this.setAttribute("data-checkbox-role", "label");
	
	}
	catch(e) {
	
		DCM.warn("HTMLCheckboxLabelElement", e);
	
	};
	
};DCM.HTMLCheckElement = function HTMLCheckElement() {

	try {
		
		var
		_this = this,
		label = _this.label = new DCM.HTMLNativeLabelElement(),
		check = _this.check = new DCM.HTMLNativeButtonElement(),
		getChecked = _this.getChecked = function getChecked() {
			return _this.checked;
		},
		setChecked = _this.setChecked = function setChecked(value, suppressEvent) {
			var val = _this.checked = value;
			check.setAttribute("data-checked", val);
			if(!suppressEvent) {
				_this.dispatchEventHandler("CHANGE");
			};
		},
		toggleChecked = _this.toggleChecked = function toggleChecked() {
			setChecked(!getChecked());
		},
		getValue = _this.getValue = function getValue() {
			return _this.value;
		},
		setValue = _this.setValue = function setValue(value) {
			_this.value = value;
		},
		setLabel = _this.setLabel = function setLabel(value) {
			label.setText(value);
		},
		guid = ("check" + DCM.getGUID());
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		check.addEventListener(DCM.Event.click, function() {
			if(_this.enabled) {
				toggleChecked();
			};
			return false;
		});
		
		check.setAttribute("data-check-role", "check");
		check.setAttribute("id", guid);
		
		label.setAttribute("for", guid);
		
		_this.setType("HTMLCheckElement");
		
		_this.append(check);
		_this.append(label);
		
		setChecked(false);
		
		_this.addEventHandler("ENABLED_CHANGE", function() {
			
			check.setEnabled(_this.enabled);
			
		});
	
	}
	catch(e) {
	
		DCM.warn("HTMLCheckElement", e);
	
	};
	
};DCM.HTMLClearElement = function HTMLClearElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLClearElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLClearElement", e);
		
	};
	
};DCM.HTMLColumnBodyElement = function HTMLColumnBodyElement() {
	
	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLColumnBodyElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLColumnBodyElement", e);
		
	};
	
};DCM.HTMLColumnElement = function HTMLColumnElement() {

	try {
		
		this._super = DCM.HTMLDivElement; 
		this._super();
		
		this.setId = function setId(value) {
			this.setAttribute("data-column-id", value);
		};
		
		this.setType("HTMLColumnElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLColumnElement", e);
		
	};
	
};DCM.HTMLColumnHeadElement = function HTMLColumnHeadElement() {
	
	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLColumnHeadElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLColumnHeadElement", e);
		
	};
	
};DCM.HTMLConfirmationDialogElement = function HTMLConfirmationDialogElement() {

	try {
		
		this._super = DCM.HTMLDynamicMessageDialogElement;
		this._super();
		
		this.setHeading("Default confirmation heading");
		this.setAttribute("data-dialog-type", "HTMLConfirmationDialogElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLConfirmationDialogElement", e);
		
	};
	
};DCM.HTMLContextMenuElement = function HTMLContextMenuElement(target) {

	try {

		var
		_this = this,
		setGroup = _this.setGroup = function setGroup() {
			// not sure if this is best approach
			var group = new DCM.HTMLContextMenuGroupElement();
			_this.append(group);
			return group;
		},
		setItem = _this.setItem = function setItem(label, callback) {
			
			var
			item = new DCM.HTMLContextMenuItemElement(),
			itemMouseUpHandler = function itemMouseUpHandler() {
				
				if(this.enabled) {
					callback();
					close();
				};
				
				return false;
				
			};
			
			item.setLabel(label);
			
			item.addEventListener(DCM.Event.mouseup, itemMouseUpHandler);
			
			_this.append(item);
			
			return item;
			
		},
		open = _this.open = function open() {
			DCM.body.append(_this);
			DCM.document.addEventListener(DCM.Event.mouseup, documentMouseUpHandler);
		},
		close = _this.close = function close() {
			_this.remove();
			DCM.document.removeEventListener(DCM.Event.mouseup, documentMouseUpHandler);
		},
		getValue = _this.getValue = function getValue() {
			return _this.value;
		},
		target = _this.target = target,
		setX = _this.setX = function(value) {
			var val = _this.x = value;
			_this.setStyle("left", ((val + offsetX) + "px"));
		},
		setY = _this.setY = function(value) {
			var val = _this.y = value;
			_this.setStyle("top", ((val + offsetY) + "px"));
		},
		offsetX = 3,
		offsetY = 3,
		documentMouseUpHandler = _this.documentMouseUpHandler = function documentMouseUpHandler() {
			close();
		};
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		_this.setAttribute("data-role", "contextmenu");
		_this.setType("HTMLContextMenuElement");
		_this.setStyle("position", "absolute");
			
		if(_this.target&&DCM.Environment.getEnvironment()==="DEV") {
			
			_this.setItem("LOG THIS (DEV)", function() {
				DCM.log(_this.target);
			});
			
		};
		
		_this.setStyle("position", "fixed");
		
		_this.setX(0);
		_this.setY(0);
		
		open();
		
	}
	catch(e) {
		
		DCM.warn("HTMLContextMenuElement", e);
		
	};
	
};DCM.HTMLContextMenuGroupElement = function HTMLContextMenuGroupElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setAttribute("data-contextmenu-role", "group");
		
	}
	catch(e) {
		
		DCM.warn("HTMLContextMenuGroupElement", e);
		
	};
	
};DCM.HTMLContextMenuItemElement = function HTMLContextMenuItemElement() {

	try {
		
		var
		inner = this.inner = new DCM.HTMLSpanElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.append(inner);
		
		this.setType("HTMLContextMenuItemElement");
		
		this.setLabel = function(value) {
			
			inner.setText(value);
		
		};
		
		this.setToggle = function(value) {
			
			this.setAttribute("data-contextmenu-toggle-active", value);
		
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLContextMenuItemElement", e);
		
	};
	
};DCM.HTMLCustomInlineNumericInputElement = function HTMLCustomInlineNumericInputElement() {

	try {
		
		this._super = DCM.HTMLCustomNumericInputElement;
		this._super();
		
		this.setType("HTMLCustomInlineNumericInputElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLCustomInlineNumericInputElement", e);
	
	};
	
};DCM.HTMLCustomInlineTextInputElement = function HTMLCustomInlineTextInputElement() {

	try {

		this._super = DCM.HTMLCustomTextInputElement;
		this._super();
		
		this.setType("HTMLCustomInlineTextInputElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLCustomInlineTextInputElement", e);
		
	};
	
};DCM.HTMLCustomInputElement = function HTMLCustomInputElement() {

	try {
		
		var
		_this = this,
		input = _this.input = new DCM.HTMLInputElement(),
		setPlaceholder = _this.setPlaceholder = function setPlaceholder(value) {
			input.setPlaceholder(value);
		},
		getValue = _this.getValue = function getValue() {
			return input.getValue();
		},
		setValue = _this.setValue = function setValue(value) {
			_this.value = value;
			if(DCM.isNull(value)) {
				value = "";
			};
			input.setValue(value);
		},
		setRestricted = _this.setRestricted = function setRestricted(value) {
			_this.restricted = value;
			input.addEventListener(DCM.Event.keydown, function(e) {
				if(!e.ctrlKey&&DCM.Key.getCharFromEvent(e).match(_this.restricted)) {
					return false;
				};
			});
		},
		setInputType = _this.setInputType = function setInputType(type) {
			input.setAttribute("type", type);
		},
		setMaxLength = _this.setMaxLength = function setMaxLength(value) {
			input.setAttribute("maxlength", value);
		},
		setReadOnly = _this.setReadOnly = function setReadOnly(value) {
			input.setReadOnly(value);
		};
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		_this.setType("HTMLCustomInputElement");
		
		_this.append(input);
		
		_this.addEventHandler("ENABLED_CHANGE", function() {
			
			input.setEnabled(_this.enabled);
			
		});
		
	}
	catch(e) {
	
		DCM.warn("HTMLCustomInputElement", e);
	
	};
	
};DCM.HTMLCustomNumericInputElement = function HTMLCustomNumericInputElement() {

	try {
		
		this._super = DCM.HTMLCustomInputElement;
		this._super();
		
		this.setType("HTMLCustomNumericInputElement");
		this.setInputType("text");
		this.setRestricted(/([\[A-z\],\u0020,\u007B,\u007D,\u00A3,\u0022,\u007C,\u0021,\u0025,\u0026,\u0040,\u0023,\u0024,\u005E,\u002A,\u003F,\u005F,\u007E,\u002B,\u003D,\u0029,\u0028,\u002D,\u005D,\u003B,\u005B,\u003A,\u0027,\u002F,\u005C,\u003C,\u003E])/g);
		
	}
	catch(e) {
	
		DCM.warn("HTMLCustomNumericInputElement", e);
	
	};
	
};DCM.HTMLCustomPasswordInputElement = function HTMLCustomPasswordInputElement() {

	try {
		
		this._super = DCM.HTMLCustomInputElement;
		this._super();
		
		this.setType("HTMLCustomPasswordInputElement");
		this.setInputType("password");
		
	}
	catch(e) {
	
		DCM.warn("HTMLCustomPasswordInputElement", e);
	
	};
	
};DCM.HTMLCustomTextAreaElement = function HTMLCustomTextAreaElement() {

	try {
		
		var
		_this = this,
		input = _this.input = new DCM.HTMLTextAreaElement(),
		setPlaceholder = _this.setPlaceholder = function(value) {
			input.setPlaceholder(value);
		},
		getValue = _this.getValue = function getValue() {
			return input.getValue();
		},
		setValue = _this.setValue = function setValue(value) {
			input.setValue(value);
		},
		setRows = _this.setRows = function setRows(value) {
			input.setAttribute("rows", value);
		};
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		_this.append(input);
		
		_this.setAttribute("data-role", "text-area");
		setRows(6);
		
	}
	catch(e) {
		
		DCM.warn("HTMLCustomTextAreaElement", e);
		
	};
	
};DCM.HTMLCustomTextInputElement = function HTMLCustomTextInputElement() {

	try {
		
		this._super = DCM.HTMLCustomInputElement;
		this._super();
		
		this.setType("HTMLCustomTextInputElement");
		this.setInputType("text");
		
	}
	catch(e) {
	
		DCM.warn("HTMLCustomTextInputElement", e);
	
	};
	
};DCM.HTMLDataStepperElement = function HTMLDataStepperElement() {

	try {
	
		var
		_this = this,
		incrementButton = new DCM.HTMLNumericStepperIncrementElement(),
		decrementButton = new DCM.HTMLNumericStepperDecrementElement(),
		stepperInput = new DCM.HTMLCustomNumericInputElement(),
		buttonWrap = new DCM.HTMLNumericStepperButtonGroupElement(),
		setData = _this.setData = function setData(data) {
			_this.data = data;
			setValue(0);
		},
		getValue = _this.getValue = function getValue() {
			var _return = _this.value;
			return _return;
		},
		setValue = _this.setValue = function setValue(value) {
			_this.value = value;
			setLabel(_this.data[value]);
			currentIndex = value;
			if(_this.enabled) {
				_this.dispatchEventHandler("CHANGE");
			};
		},
		getLabel = _this.getLabel = function getLabel() {
			var _return = _this.label;
			return _return;
		},
		setLabel = function setLabel(value) {
			_this.label = value;
			stepperInput.setValue(value);
		},
		currentIndex = 0,
		incrementButtonClickHandler = function incrementButtonClickHandler() {
		
			if(_this.enabled===false) {
				return;
			};
			
			if(currentIndex===(_this.data.length-1)) {
				currentIndex = 0;
			}
			else {
				currentIndex ++;
			};
			
			setValue(currentIndex);
			
			return false;
		
		},
		decrementButtonClickHandler = function decrementButtonClickHandler() {
		
			if(_this.enabled===false) {
				return;
			};
			
			if(currentIndex===0) {
				currentIndex = (_this.data.length-1);
			}
			else {
				currentIndex --;
			};
			
			setValue(currentIndex);
			
			return false;
		
		},
		setValid = _this.setValid = function setValid(value) {
			_this.valid = value;
			_this.setAttribute("data-valid", value);
		};
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		setValid(true);
		
		incrementButton.addEventListener(DCM.Event.click, incrementButtonClickHandler);
		incrementButton.addEventHandler("AUTO_FIRE", incrementButtonClickHandler);
		decrementButton.addEventListener(DCM.Event.click, decrementButtonClickHandler);
		decrementButton.addEventHandler("AUTO_FIRE", decrementButtonClickHandler);
		
		_this.setType("HTMLDataStepperElement");
		_this.append(stepperInput);
		_this.append(buttonWrap);
		
		buttonWrap.append(decrementButton);
		buttonWrap.append(incrementButton);
		
		_this.addEventHandler("ENABLED_CHANGE", function() {
			
			stepperInput.setEnabled(_this.enabled);
			
		});
		
		stepperInput.setReadOnly(true);
	
	}
	catch(e) {
		
		DCM.warn("HTMLDataStepperElement", e);
		
	};
};DCM.HTMLDialogBodyElement = function HTMLDialogBodyElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLDialogBodyElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLDialogBodyElement", e);
	
	};
	
};DCM.HTMLDialogButtonElement = function HTMLDialogButtonElement() {

	try {
	
		this._super = DCM.HTMLButtonElement;
		this._super();
		
		this.setAttribute("data-dialog-role", "button");
		this.setType("HTMLDialogButtonElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLDialogButtonElement", e);
		
	};
	
};DCM.HTMLDialogElement = function HTMLDialogElement() {

	try {

		var
		_this = this,
		head = _this.head = new DCM.HTMLDialogHeadElement(),
		body = _this.body = new DCM.HTMLDialogBodyElement(),
		foot = _this.foot = new DCM.HTMLDialogFootElement(),
		inner = _this.inner = new DCM.HTMLDivElement(),
		modalOverlay = new DCM.HTMLDialogOverlayElement(),
		open = _this.open = function open() {
			DCM.body.append(modalOverlay);
			DCM.body.append(_this);
			position();
		},
		close = _this.close = function close() {
			destroy();
		},
		setHeading = _this.setHeading = function setHeading(value) {
			_this.heading = value;
			head.setText(_this.heading);
		},
		destroy = _this.destroy = function destroy() {
			_this.remove();
			modalOverlay.remove();
			DCM.DialogManager.dialogs.splice(DCM.getIndexOf(DCM.DialogManager.dialogs, _this), 1);
			DCM.DialogManager.openFirstInQueue();
		},
		position = _this.position = function position() {
			
			var 
			_height = _this.getHeight(),
			_width = _this.getWidth();
			
			_this.setStyle("marginTop", ("-" + (_height/2) + "px"));
			_this.setStyle("marginLeft", ("-" + (_width/2) + "px"));
			
		},
		setSuppressCloseOnContinue = _this.setSuppressCloseOnContinue = function setSuppressCloseOnContinue(value) {
			_this.suppressCloseOnContinue = value;
		},
		queue = _this.queue = function queue() {
			
			DCM.DialogManager.queueDialog(_this);
			
		};
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		inner.append(head);
		inner.append(body);
		inner.append(foot);
		_this.append(inner);
		
		_this.setType("HTMLDialogElement");
		
		_this.addEventListener(DCM.Event.contextmenu, function() {
			
			return false;
		
		});
		
		setSuppressCloseOnContinue(false);
		
	}
	catch(e) {
		
		DCM.warn("HTMLDialogElement", e);
		
	};
	
};DCM.HTMLDialogFootElement = function HTMLDialogFootElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLDialogFootElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLDialogFootElement", e);
		
	};
	
};DCM.HTMLDialogHeadElement = function HTMLDialogHeadElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLDialogHeadElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLDialogHeadElement", e);
		
	};
	
};DCM.HTMLDialogLeftButtonElement = function HTMLDialogLeftButtonElement() {

	try {
	
		this._super = DCM.HTMLInlineButtonElement;
		this._super();
		
		this.setType("HTMLDialogLeftButtonElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLDialogLeftButtonElement", e);
		
	};
	
};DCM.HTMLDialogMessageElement = function HTMLDialogMessageElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLDialogMessageElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLDialogMessageElement", e);
	
	};
	
};DCM.HTMLDialogOverlayElement = function HTMLDialogOverlayElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setStyle("backgroundColor", "rgba(0,0,0,0.2)");
		this.setStyle("position", "fixed");
		this.setStyle("top", "0");
		this.setStyle("right", "0");
		this.setStyle("bottom", "0");
		this.setStyle("left", "0");
		
		this.setType("HTMLDialogOverlayElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLDialogOverlayElement", e);
		
	};

};DCM.HTMLDialogRightButtonElement = function HTMLDialogRightButtonElement() {

	try {
	
		this._super = DCM.HTMLInlineButtonElement;
		this._super();
		
		this.setType("HTMLDialogRightButtonElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLDialogRightButtonElement", e);
		
	};
	
};DCM.HTMLDisclaimerElement = function HTMLDisclaimerElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLDisclaimerElement");
		this.setText(DCM.Resources.getResource("DisclaimerLabel"));
		
	}
	catch(e) {
	
		DCM.warn("HTMLDisclaimerElement", e);
	
	};
	
};DCM.HTMLDivElement = function HTMLDivElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("div");
		
	}
	catch(e) {
		
		DCM.warn("HTMLDivElement", e);
		
	};
	
};DCM.HTMLDocumentContextMenuElement = function HTMLDocumentContextMenuElement() {

	try {
		
		var
		_this = this,
		watchlistToggleItem,
		notesToggleItem,
		alertsToggleItem,
		ordersToggleItem,
		newsToggleItem,
		portfoliosToggleItem,
		watchlistModule = DCM.ModuleManager.getModuleByType("HTMLWatchlistModuleElement"),
		notesModule = DCM.ModuleManager.getModuleByType("HTMLNotesModuleElement"),
		alertsModule = DCM.ModuleManager.getModuleByType("HTMLAlertsModuleElement"),
		orderModule = DCM.ModuleManager.getModuleByType("HTMLOrdersModuleElement"),
		newsModule = DCM.ModuleManager.getModuleByType("HTMLNewsModuleElement"),
		portfolioModule = DCM.ModuleManager.getModuleByType("HTMLPortfoliosModuleElement");
		
		this._super = DCM.HTMLContextMenuElement;
		this._super();
		
		if(DCM.Environment.getEnvironment()==="DEV") {
		
			_this.setItem("STOP ALL MODULES (DEV)", function() {
				DCM.ModuleManager.stopAll();
			});
			
			_this.setItem("OPEN UPGRADE ACCOUNT (DEV)", function() {
				DCM.AccountManager.openSelectAccountTypeDialog();
			});
			
			_this.setItem("CLEAR CONSOLE (DEV)", function() {
				console.clear();
			});
		
		};
		
		watchlistToggleItem = _this.setItem(DCM.Resources.getResource("WatchlistsModulePin"), function() {
			watchlistModule.toggle();
		});
		
		if(watchlistModule.isOpen) {
			watchlistToggleItem.setLabel(DCM.Resources.getResource("WatchlistsModuleUnpin"));
		};
		
		notesToggleItem = _this.setItem(DCM.Resources.getResource("NotesModulePin"), function() {
			notesModule.toggle();
		});
		
		if(notesModule.isOpen) {
			notesToggleItem.setLabel(DCM.Resources.getResource("NotesModuleUnpin"));
		};
		
		alertsToggleItem = _this.setItem(DCM.Resources.getResource("AlertsModulePin"), function() {
			alertsModule.toggle();
		});
		
		if(alertsModule.isOpen) {
			alertsToggleItem.setLabel(DCM.Resources.getResource("AlertsModuleUnpin"));
		};
		
		ordersToggleItem = _this.setItem(DCM.Resources.getResource("OrdersModulePin"), function() {
			orderModule.toggle();
		});
		
		if(orderModule.isOpen) {
			ordersToggleItem.setLabel(DCM.Resources.getResource("OrdersModuleUnpin"));
		};
		
		newsToggleItem = _this.setItem(DCM.Resources.getResource("NewsModulePin"), function() {
			newsModule.toggle();
		});
		
		if(newsModule.isOpen) {
			newsToggleItem.setLabel(DCM.Resources.getResource("NewsModuleUnpin"));
		};
		
		portfoliosToggleItem = _this.setItem(DCM.Resources.getResource("PortfoliosModulePin"), function() {
			portfolioModule.toggle();
		});
		
		if(portfolioModule.isOpen) {
			portfoliosToggleItem.setLabel(DCM.Resources.getResource("PortfoliosModuleUnpin"));
		};
		
	}
	catch(e) {
	
		DCM.warn("HTMLDocumentContextMenuElement", e);
	
	};
	
};DCM.HTMLDynamicDialogElement = function HTMLDynamicDialogElement() {

	try {
		
		var
		_this = this,
		cancelButton = _this.cancelButton = new DCM.HTMLDialogRightButtonElement(),
		continueButton = _this.continueButton = new DCM.HTMLDialogLeftButtonElement(),
		continueHandler = function continueHandler() {
			if(!_this.suppressCloseOnContinue) {
				_this.close();
			};
			_this.dispatchEventHandler("ACCEPT");
			return false;
		},
		cancelHandler = function cancelHandler() {
			_this.close();
			_this.dispatchEventHandler("DECLINE");
			return false;
		};
		
		this._super = DCM.HTMLDialogElement;
		this._super();
		
		continueButton.setText("Continue");
		continueButton.addEventListener(DCM.Event.click, continueHandler);
		
		cancelButton.setText("Cancel");
		cancelButton.addEventListener(DCM.Event.click, cancelHandler);
		
		_this.foot.append(continueButton);
		_this.foot.append(cancelButton);
		
		_this.setType("HTMLDynamicDialogElement");
		
		continueButton.focus();
		
	}
	catch(e) {
		
		DCM.warn("HTMLDynamicDialogElement", e);
		
	};
	
};DCM.HTMLDynamicMessageDialogElement = function HTMLDynamicMessageDialogElement() {

	try {
		
		var
		message = this.message = new DCM.HTMLDialogMessageElement();
		
		this._super = DCM.HTMLDynamicDialogElement;
		this._super();
		
		this.body.append(message);
		
		this.setType("HTMLDynamicMessageDialogElement");
		
		this.setMessage = function(value) {
			this.messageText = value;
			message.setText(this.messageText);
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLDynamicMessageDialogElement", e);
		
	};
	
};DCM.HTMLDynamicSelectMenuElement = function HTMLDynamicSelectMenuElement() {

	try {
	
		this._super = DCM.HTMLSelectMenuElement;
		this._super();
		
		this.setType("HTMLDynamicSelectMenuElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLDynamicSelectMenuElement", e);
		
	};

};DCM.HTMLElement = function HTMLElement() {

	try {
	
		this._super = DCM.EventDispatcher;
		this._super();
		
		var
		_this = this;
		
		this.events = new function Events() {};
		
		this.enabled = true;
		
		this.addEventListener = function addEventListener(event, handler, preventBubble) {
		
			if(!event) {
				throw("addEventListener - NO EVENT NAME");
			};
			
			var 
			eventName = event.name,
			proxyHandler = function proxyHandler(_event) {
				return event.condition(_event)&&despatch({}, _event);
			},
			despatch = function despatch(data, _event) {
				_event = (_event||dummyEventObject);
				if(handler.call(_this, _event, data)===false) {
					if(_event.preventDefault) {
						_event.preventDefault();
					};
					if(_event.stopPropagation) {
						_event.stopPropagation();
					};
					return false;
				};
			},
			eventObject = _this.events[eventName] = (_this.events[eventName]||[]),
			dummyEventObject = {
				preventDefault: function preventDefault() {},
				stopPropagation: function stopPropagation() {}
			};
			
			eventObject.push({
				nativeHandler: handler,
				proxyHandler: proxyHandler,
				remove: function remove() {
					_this.displayObject[DCM.Event.remover](eventName, proxyHandler, preventBubble);
					eventObject.splice(DCM.getIndexOf(eventObject, this), 1);
					if(eventObject.length===0) {
						delete _this.events[eventName];
					};
				},
				despatch: despatch
			});
			
			_this.displayObject[DCM.Event.adder](eventName, proxyHandler, preventBubble);
			
		};
		
		this.removeEventListener = function removeEventListener(event, handler) {
		
			var 
			eventName = event.name,
			targetEvent = _this.events[eventName],
			targetEventLength = targetEvent&&targetEvent.length;
			
			if(targetEvent&&handler) {
				while(targetEventLength--) {
					if(targetEvent[targetEventLength].nativeHandler===handler) {
						targetEvent[targetEventLength].remove();
						break;
					};
				};
			}
			else if(targetEvent) {
				while(targetEvent[0]) {
					targetEvent[0].remove();
				};
			};
			
		};
		
		this.dispatchEventListener = function dispatchEventListener(event, data, handler) {
		
			var
			eventName = event.name,		
			targetEvent = _this.events[eventName];
			
			if(targetEvent&&handler) {
				for(var prop in targetEvent) {
					if(targetEvent[prop].nativeHandler===handler) {
						targetEvent[prop].despatch(data);
						break;
					};
				};
			}
			else if(targetEvent) {
				for(var prop in targetEvent) {
					targetEvent[prop].despatch(data);
				};
			};
			
		};
		
		this.show = function show() {
			
			this.setStyle("display", "block");
			
		};
		
		this.hide = function hide() {
		
			this.setStyle("display", "none");
		
		};
		
		this.setWidth = function setWidth(value) {
		
			this.setStyle("width", value);
		
		};
		
		this.setHeight = function setHeight(value) {
			
			this.setStyle("height", value);

		};
		
		this.setStyle = function setStyle(property, value) {
		
			this.displayObject.style[property] = value;
			
		};
		
		this.setText = function setText(value) {
		
			this.displayObject.innerHTML = value;
		
		};
		
		this.getHeight = function getHeight() {
			
			return this.displayObject.offsetHeight;
			
		};
		
		this.getWidth = function getWidth() {
			
			return this.displayObject.offsetWidth;
			
		};
		
		this.setRole = function setRole(value) {
			
			this.setAttribute("data-role", value);
		
		};
		
		this.setAttribute = function setAttribute(key, value, addTo) {
		
			if(addTo) {
				var 
				newValue = [],
				currentValue = this.getAttribute(key);
				if(currentValue) {
					newValue.push(currentValue);
				};
				newValue.push(value);
				value = newValue.join(" ");
			};
			
			this.displayObject.setAttribute(key, value);
			
		};
		
		this.getAttribute = function getAttribute(key) {
		
			return this.displayObject.getAttribute(key);
			
		};
		
		this.focus = function focus() {
		
			this.displayObject.focus();
			
		};
		
		this.setType = function setType(value) {
			
			this.type = value;
			this.setAttribute("data-type", value, true);
			
		};
		
		this.getText = function getText() {
		
			return _this.displayObject.innerHTML;
			
		};
		
		this.removeAttribute = function removeAttribute(key) {
		
			_this.displayObject.removeAttribute(key);
		
		};
		
		this.append = function append(toAppend) {
		
			_this.displayObject.appendChild(toAppend.displayObject);
			toAppend.parent = _this;
		
		};
		
		this.prepend = function prepend(toPrepend) {
		
			_this.displayObject.insertBefore(toPrepend.displayObject, _this.displayObject.firstElementChild);
			toPrepend.parent = _this;
		
		};
		
		this.remove = function remove() {
		
			_this.displayObject.parentNode.removeChild(_this.displayObject);
		
		};
		
		this.getOffsetTop = function getOffsetTop() {
			
			return _this.displayObject.offsetTop;
			
		};
		
		this.getOffsetLeft = function getOffsetLeft() {
			
			return _this.displayObject.offsetLeft;
			
		};
		
		this.enable = function enable() {
			
			this.setEnabled(true);
		
		};
		
		this.disable = function disable() {
		
			this.setEnabled(false);
		
		};
		
		this.setEnabled = function setEnabled(value) {
			
			this.enabled = value;
			
			if(value===true) {
				this.removeAttribute("disabled");
			}
			else if(value===false) {
				this.setAttribute("disabled", "disabled");
			};
			
			this.dispatchEventHandler("ENABLED_CHANGE");
			
		};
		
		this.toggleEnabled = function toggleEnabled() {
			
			this.setEnabled(!this.enabled);
			
		};
		
		this.empty = function empty() {
		
			while(this.displayObject.hasChildNodes()) {
				this.displayObject.removeChild(this.displayObject.lastChild);
			};
			
		};
		
		this.setVisible = function setVisible(value) {
			
			this.setAttribute("data-visible", value);
			
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLElement", e);
		
	};
	
};
DCM.HTMLExpandCollapseToggleGraphicButtonElement = function HTMLExpandCollapseToggleGraphicButtonElement() {


	try {
		
		var
		_this = this;
		
		this._super = DCM.HTMLGraphicButtonToggleElement;
		this._super();
		
		_this.setRole("expand-collapse-toggle");
		_this.setSize("2");
		_this.setLabel(DCM.Resources.getResource("ExpandModuleLabel"));
		_this.setType("HTMLExpandCollapseToggleGraphicButtonElement");
		
		_this.addEventHandler("ACTIVE_CHANGE", function() {
			
			if(_this.active) {
				_this.setLabel(DCM.Resources.getResource("CollapseModuleLabel"));
			}
			else {
				_this.setLabel(DCM.Resources.getResource("ExpandModuleLabel"));
			};
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLExpandCollapseToggleGraphicButtonElement", e);
		
	};
	
};




DCM.HTMLFinderModuleBodyElement = function HTMLFinderModuleBodyElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLFinderModuleBodyElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLFinderModuleBodyElement", e);
		
	};
	
};DCM.HTMLFinderModuleElement = function HTMLFinderModuleElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		var
		_this = this,
		seachInput = new DCM.HTMLCustomTextInputElement(),
		seachOutput = new DCM.HTMLScrollPanelElement(),
		head = new DCM.HTMLFinderModuleHeadElement(),
		body = new DCM.HTMLFinderModuleBodyElement(),
		dataGetter = new DCM.GetInstrumentsService(),
		renderItemsFromData = function renderItemsFromData() {
		
			for(var prop in filteredData) {
			
				var 
				_prop = filteredData[prop],
				item = new DCM.HTMLFinderModuleItemElement(_prop);
				
				seachOutput.body.append(item);
				seachOutput.refresh();
				
			};
			
		},
		filteredData,
		dataManager = new DCM.DataManager(),
		categorySelect = new DCM.HTMLDynamicSelectMenuElement(),
		categoryToFilter = "all",
		find = function find() {
		
			seachOutput.body.empty();
			
			seachOutput.setScrollTop(0);
			
			var value = seachInput.getValue().toLowerCase();
			
			if(!value&&categoryToFilter==="all") {
			
				filteredData = dataManager.getDataByFilter();
				
			}
			else {
			
				var 
				nameRegex = new RegExp("^" + value),
				categoryRegex = new RegExp("^" + categoryToFilter + "$");
				
				filteredData = dataManager.getDataByFilter(function() {
					
					return this.name&&this.category&&nameRegex.test(this.name.toLowerCase())&&(categoryToFilter==="all"?true:categoryRegex.test(this.category.toLowerCase()));
					
				}, (value + "[" + categoryToFilter + "]"));
				
			};
		
			renderItemsFromData();
			
		},
		instrumentsGetterSuccessHandler = function instrumentsGetterSuccessHandler(data) {
			
			var instruments = data.insts;
			
			for(var prop in instruments) {
				var instrument = DCM.InstrumentManager.createInstrument(instruments[prop]);
				if(!categorySelect.getItemByValue(instrument.category.toLowerCase())) {
					categorySelect.setItem(instrument.category, instrument.category.toLowerCase());
				};
			};
			
			DCM.getUserPanels.call();
			
			dataManager.setData(DCM.InstrumentManager.instruments);
			
			filteredData = dataManager.getDataByFilter();
			
			renderItemsFromData();
			
		},
		categorySelectChangeHandler = function categorySelectChangeHandler() {
			
			categoryToFilter = categorySelect.getValue();		
			find();
			
		},
		searchKeyUpHandler = function searchKeyUpHandler() {
			
			find();
			
		};
		
		head.left.append(seachInput);

		seachInput.setAttribute("data-finder-role", "search-input");
		
		seachInput.addEventListener(DCM.Event.keyup, searchKeyUpHandler);
		
		head.right.append(categorySelect);
		
		categorySelect.setItem(DCM.Resources.getResource("FinderShowAllLabel"), "all");
		categorySelect.setValue("all");
		categorySelect.setWidth(200);
		categorySelect.addEventHandler("CHANGE", categorySelectChangeHandler);
		
		dataGetter.addEventHandler("SUCCESS", instrumentsGetterSuccessHandler);
		dataGetter.call();
		
		seachInput.setPlaceholder(DCM.Resources.getResource("FinderSearchPlaceholderLabel"));
		
		this.setType("HTMLFinderModuleElement");
		
		body.append(seachOutput);
		
		this.append(head);
		this.append(body);
		
	}
	catch(e) {
	
		DCM.warn("HTMLFinderModuleElement", e);
		
	};
	
};DCM.HTMLFinderModuleHeadElement = function HTMLFinderModuleHeadElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		var
		headLeft = this.left = new DCM.HTMLFinderModuleHeadLeftElement(),
		headRight = this.right = new DCM.HTMLFinderModuleHeadRightElement(),
		headClear = new DCM.HTMLClearElement();
		
		this.setType("HTMLFinderModuleHeadElement");
		
		this.append(headLeft);
		this.append(headRight);
		this.append(headClear);
		
	}
	catch(e) {
	
		DCM.warn("HTMLFinderModuleHeadElement", e);
		
	};
	
};DCM.HTMLFinderModuleHeadLeftElement = function HTMLFinderModuleHeadLeftElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLFinderModuleHeadLeftElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLFinderModuleHeadLeftElement", e);
		
	};
	
};DCM.HTMLFinderModuleHeadRightElement = function HTMLFinderModuleHeadRightElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLFinderModuleHeadRightElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLFinderModuleHeadElement", e);
		
	};
	
};DCM.HTMLFinderModuleItemElement = function HTMLFinderModuleItemElement(Instrument) {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		var
		_this = this,
		Instrument = _this.Instrument = Instrument,
		itemCategoryElement = new DCM.HTMLDivElement(),
		pinToDashboardButton = new DCM.HTMLPinGraphicButtonElement(),
		addToWatchlistButton = new DCM.HTMLAddToWatchlistGraphicButtonElement(),
		itemLeft = new DCM.HTMLDivElement(),
		itemRight = new DCM.HTMLDivElement(),
		itemClearer = new DCM.HTMLClearElement(),
		setCategory = function setCategory(value) {
			itemCategoryElement.setText(value);
		};
		
		addToWatchlistButton.addEventListener(DCM.Event.click, function(e) {
			
			DCM.WatchlistManager.authorAddToWatchlist(Instrument);
			
		});
		
		itemLeft.setAttribute("data-finder-item-role", "left");
		itemRight.setAttribute("data-finder-item-role", "right");
		
		itemLeft.setText(Instrument.getDisplayTextAsHTML());
		
		pinToDashboardButton.addEventListener(DCM.Event.click, function(e) {
			
			var ticket = Instrument.openTicket();
			ticket.dock();
			
			DCM.ToastManager.createToast(DCM.Resources.getResource("PinnedItemSuccessLabel"));
			
		});
		
		this.setAttribute("data-finder-role", "item");
		
		itemCategoryElement.setAttribute("data-finder-item-role", "itemCategory");
		
		itemRight.append(itemCategoryElement);
		itemRight.append(addToWatchlistButton);
		itemRight.append(pinToDashboardButton);
		
		this.append(itemLeft);
		this.append(itemRight);
		this.append(itemClearer);
		
		setCategory(Instrument.category);
		
		this.addEventListener(DCM.Event.contextmenu, function() {
			
			return false;
			
		});
		
		this.addEventListener(DCM.Event.doubleclick, function() {
		
			var ticket = Instrument.openTicket();
			
			return false;
			
		});
		
		this.setAttribute("title", DCM.Resources.getResource("FinderItemTooltipLabel"));
		
	}
	catch(e) {
		
		DCM.warn("HTMLFinderModuleItemElement", e);
		
	};
	
};DCM.HTMLFlagIconElement = function HTMLFlagIconElement() {

	try {
		
		this._super = DCM.HTMLIconElement;
		this._super();
		
		this.setType("HTMLFlagIconElement");
		
	}
	catch(e) {
		
		DCM.log("HTMLFlagIconElement", e);
		
	};
	
};DCM.HTMLFormElement = function HTMLFormElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLFormElement");
		
		this.addField = function addField() {
			var field = new DCM.HTMLFormFieldElement();
			this.append(field);
			return field;
		};
		
		this.addGroup = function addGroup() {
			var group = new DCM.HTMLFormFieldGroupElement();
			this.append(group);
			return group;
		};
		
	}
	catch(e) {
	
		DCM.warn("HTMLFormElement", e);
	
	};
	
};DCM.HTMLFormFieldElement = function HTMLFormFieldElement() {

	try {
		
		var
		label = this.label = new DCM.HTMLFormLabelElement(),
		input = this.input = new DCM.HTMLFormInputElement(),
		clear = new DCM.HTMLClearElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLFormFieldElement");
		this.append(label);
		this.append(input);
		this.append(clear);
	
	}
	catch(e) {
		
		DCM.warn("HTMLFormFieldElement", e);
		
	};
	
};DCM.HTMLFormFieldGroupElement = function HTMLFormFieldGroupElement() {

	try {
		
		var
		clear = new DCM.HTMLClearElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.addField = function addField() {
			
			var field = new DCM.HTMLFormFieldElement();
			this.append(field);
			this.append(clear);
			return field;
			
		};
		
		this.setType("HTMLFormFieldGroupElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLFormFieldGroupElement", e);
	
	};
	
};DCM.HTMLFormInputElement = function HTMLFormInputElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLFormInputElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLFormInputElement", e);
		
	};
	
};DCM.HTMLFormLabelElement = function HTMLFormLabelElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLFormLabelElement");
		
		this.setLabel = function setLabel(value) {
			this.setText(value);
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLFormLabelElement", e);
		
	};
	
};DCM.HTMLFundingDialogElement = function HTMLFundingDialogElement() {

	try {
	
		var 
		_this = this,
		head = new DCM.HTMLDivElement(),
		body = new DCM.HTMLDivElement(),
		foot = new DCM.HTMLDivElement(),
		table = new DCM.HTMLTableElement(),
		
		heading1 = table.addColumnHeading("&nbsp"),
		heading2 = table.addColumnHeading("Spread Betting"),
		heading3 = table.addColumnHeading("CFD Trading"),
		
		row1 = table.addRow(),
		row1Col1 = row1.addColumn("Address"),
		row1Col2 = row1.addColumn("Lloyds TSB 39<br />Threadneedle Street<br />London<br />EC2R 8AU"),
		row1Col3 = row1.addColumn("Lloyds TSB 39<br />Threadneedle Street<br />London<br />EC2R 8AU"),
		row2 = table.addRow(),
		row2Col1 = row2.addColumn("Account name"),
		row2Col2 = row2.addColumn("IG Index Ltd Client Account"),
		row2Col3 = row2.addColumn("IG Markets Ltd Client Account"),
		row3 = table.addRow(),
		row3Col1 = row3.addColumn("Account number"),
		row3Col2 = row3.addColumn("01870836"),
		row3Col3 = row3.addColumn("02360254"),
		row4 = table.addRow(),
		row4Col1 = row4.addColumn("Sort Code"),
		row4Col2 = row4.addColumn("30-00-09"),
		row4Col3 = row4.addColumn("30-00-09"),
		row5 = table.addRow(),
		row5Col1 = row5.addColumn("IBAN"),
		row5Col2 = row5.addColumn("GB74LOYD30000901870836"),
		row5Col3 = row5.addColumn("GB98LOYD30000902360254"),
		row6 = table.addRow(),
		row6Col1 = row6.addColumn("BIC"),
		row6Col2 = row6.addColumn("LOYDGB21013"),
		row6Col3 = row6.addColumn("LOYDGB21013");
		
		this._super = DCM.HTMLStaticMessageDialogElement;
		this._super();
		
		table.setAttribute("data-role", "funding-account-details");
		
		_this.continueButton.setText(DCM.Resources.getResource("CloseLabel"));
		_this.setHeading(DCM.Resources.getResource("FundingDialogHeading"));
		
		head.setText(DCM.Resources.getResource("FundingDialogHead", [{
			placeholder: "ACCOUNT_NUMBER",
			label: DCM.AccountManager.getID()
		}]));
		head.setAttribute("data-role", "funding-head");
		body.setText(DCM.Resources.getResource("FundingDialogBody"));
		body.setAttribute("data-role", "funding-body");
		foot.setText(DCM.Resources.getResource("FundingDialogFoot"));
		foot.setAttribute("data-role", "funding-foot");
		
		_this.setType("HTMLFundingDialogElement");
		
		_this.setWidth(750);
		
		_this.position();
		_this.body.append(head);
		_this.body.append(body);
		_this.body.append(table);
		_this.body.append(foot);
		
	}
	catch(e) {
		
		DCM.warn("HTMLFundingDialogElement", e);
		
	};
	
};DCM.HTMLGraphGraphicButtonElement = function HTMLGraphGraphicButtonElement() {

	try {
		
		this._super = DCM.HTMLGraphicButtonElement;
		this._super();
		
		this.setRole("graph");
		this.setSize("2");
		this.setLabel(DCM.Resources.getResource("ShowGraph"));
		this.setType("HTMLGraphGraphicButtonElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLGraphGraphicButtonElement", e);
		
	};
	
};DCM.HTMLGraphicButtonElement = function HTMLGraphicButtonElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLGraphicButtonElement");
		
		this.setSize = function setSize(value) {
			
			this.setAttribute("data-size", value);
		
		};
		
		this.setLabel = function setLabel(value) {
			
			this.setText(value);
			this.setAttribute("title", value);
			
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLGraphicButtonElement", e);
		
	};

};DCM.HTMLGraphicButtonToggleElement = function HTMLGraphicButtonToggleElement() {

	try {
	
		this._super = DCM.HTMLGraphicButtonElement;
		this._super();
		
		this.setType("HTMLGraphicButtonToggleElement");
		
		this.setActive = function setActive(value) {
		
			this.active = value;
			this.setAttribute("data-active", value);
			this.dispatchEventHandler("ACTIVE_CHANGE");
		
		};
		
		this.toggle = function toggle() {
			
			this.setActive(!this.active);
			
		};
		
		this.setActive(false);
		
	}
	catch(e) {
	
		DCM.warn("HTMLGraphicButtonToggleElement", e);
	
	};
	
};DCM.HTMLHeadElement = function HTMLHeadElement(document) {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.head;
		
	}
	catch(e) {
		
		DCM.warn("HTMLHeadElement", e);
		
	};
	
};DCM.HTMLHeadingElement = function HTMLHeadingElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLHeadingElement");
		
		this.setSize = function setSize(value) {
			this.setAttribute("data-size", value);
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLHeadingElement", e);
		
	};
	
};DCM.HTMLHeadNavigationElement = function HTMLHeadNavigationElement() {

	try {

		var
		_this = this,
		linkItemOne,
		linkItemTwo,
		linkItemThree,
		linkOne = new DCM.HTMLAnchorElement(),
		linkTwo = new DCM.HTMLAnchorElement(),
		linkThree = new DCM.HTMLAnchorElement(),
		linkOneIcon = new DCM.HTMLIconElement(),
		linkTwoIcon = new DCM.HTMLIconElement(),
		linkThreeIcon = new DCM.HTMLIconElement(),
		linkOneLabel = new DCM.HTMLDivElement(),
		linkTwoLabel = new DCM.HTMLDivElement(),
		linkThreeLabel = new DCM.HTMLDivElement();
		
		this._super = DCM.HTMLRowElement;
		this._super();
		
		linkItemOne = _this.addColumn();
		linkItemTwo = _this.addColumn();
		linkItemThree = _this.addColumn();
		
		linkOne.setHref("http://www.dcmcap.com/education/tutorial");
		linkOne.setAttribute("target", "_blank");
		linkOne.append(linkOneIcon);
		linkOne.append(linkOneLabel);
		linkOneLabel.setText(DCM.Resources.getResource("TutorialLabel"));
		linkOneIcon.setRole("navigation-tutorial");
		linkOneIcon.setSize("1");
		
		linkTwo.setHref("http://www.dcmcap.com/education");
		linkTwo.setAttribute("target", "_blank");
		linkTwo.append(linkTwoIcon);
		linkTwo.append(linkTwoLabel);
		linkTwoLabel.setText(DCM.Resources.getResource("EducationLabel"));
		linkTwoIcon.setRole("navigation-education");
		linkTwoIcon.setSize("1");
		
		linkThree.append(linkThreeIcon);
		linkThree.append(linkThreeLabel);
		linkThreeLabel.setText(DCM.Resources.getResource("FundingLabel"));
		linkThreeIcon.setRole("navigation-funds");
		linkThreeIcon.setSize("1");
		
		linkThree.addEventListener(DCM.Event.click, function() {
			
			if(DCM.AccountManager.isPreviewAccount()) {
				
				DCM.AccountManager.openSelectAccountTypeDialog();
			}
			else {
				
				var fundingDialog = new DCM.HTMLFundingDialogElement();
				fundingDialog.queue();
			
			};
			
			return false;
			
		});
		
		linkItemOne.append(linkOne);
		linkItemTwo.append(linkTwo);
		linkItemThree.append(linkThree);
		
		_this.setType("HTMLHeadNavigationElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLHeadNavigationElement", e);
		
	};

};DCM.HTMLIconElement = function HTMLIconElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLIconElement");
		
		this.setSize = function setSize(value) {
			this.setAttribute("data-size", value);
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLIconElement", e);
		
	};
	
};DCM.HTMLIFrameElement = function HTMLIFrameElement() {
	
	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("iframe");
		this.setType("HTMLIFrameElement");
		this.setAttribute("frameborder", "0");
		
		this.setSrc = function setSrc(value) {
			this.setAttribute("src", value);
		};
	
	}
	catch(e) {
		
		DCM.warn("HTMLIFrameElement", e);
		
	};
	
};DCM.HTMLImageElement = function HTMLImageElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("img");
		
	}
	catch(e) {
		
		DCM.warn("HTMLImageElement", e);
		
	};
	
};DCM.HTMLInlineButtonElement = function HTMLInlineButtonElement() {

	try {
		
		this._super = DCM.HTMLButtonElement;
		this._super();
		
		this.setType("HTMLInlineButtonElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLInlineButtonElement", e);
		
	};
	
};DCM.HTMLInlineRadioButtonGroupElement = function HTMLInlineRadioButtonGroupElement() {

	try {
		
		this._super = DCM.HTMLRadioButtonGroupElement;
		this._super();
		
		this.setType("HTMLInlineRadioButtonGroupElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLInlineRadioButtonGroupElement", e);
		
	};
	
};DCM.HTMLInlineULElement = function HTMLInlineULElement() {

	try {
		
		this._super = DCM.HTMLULElement;
		this._super();
		
		this.setType("HTMLInlineULElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLInlineULElement", e);
	
	};
	
};DCM.HTMLInputElement = function HTMLInputElement() {

	try {
		
		var
		_this = this,
		getValue = _this.getValue = function getValue() {
			return _this.displayObject.value;
		},
		setValue = _this.setValue = function setValue(value) {
			_this.displayObject.value = value;
		},
		setPlaceholder = _this.setPlaceholder = function(value) {
			_this.setAttribute("placeholder", value);
		},
		setReadOnly = _this.setReadOnly = function setReadOnly(value) {
			_this.setAttribute("readonly", value);
		};
		
		this._super = DCM.HTMLElement;
		this._super();
		
		_this.displayObject = document.createElement("input");
		
	}
	catch(e) {
		
		DCM.warn("HTMLInputElement", e);
		
	};
	
};DCM.HTMLInstrumentsModuleElement = function HTMLInstrumentsModuleElement() {
	
	try {
	
		this._super = DCM.HTMLScrollableModuleElement;
		this._super();
		
		// name
		// isin - one
		// epic - multi
		// tags
		// users 
		// filters
		
		// sentiment
		// change
		// high
		// low
	
		var 
		_this = this,
		_table = new DCM.HTMLTableElement(),
		nameFilter = new DCM.HTMLCustomTextInputElement(),
		nameCol = _table.addColumnHeading(),
		idCol = _table.addColumnHeading("ID"),
		isinCol = _table.addColumnHeading("isin"),
		epicsCol = _table.addColumnHeading("Epics"),
		filtersCol = _table.addColumnHeading("Filters"),
		tagsCol = _table.addColumnHeading("Tags"),
		usersCol = _table.addColumnHeading("Users"),
		
		sentimentCol = _table.addColumnHeading("Sentiment"),
		changeCol = _table.addColumnHeading("Change"),
		highCol = _table.addColumnHeading("High"),
		lowCol = _table.addColumnHeading("Low"),
		
		addInstrument = function addInstrument(name, ID, isin, tags, epics, filters) {
			
			var 
			_item = new DCM.HTMLInstrumentsModuleItemElement();
			
			_item.setName(name);
			_item.setID(ID);
			_item.setIsin(isin);
			
			// handle tagging
			
			_table.body.prepend(_item);
			
			DCM.APIInstrumentManager.add(_item);
			dataManager.setItem(_item);
			
		},
		dataManager = new DCM.DataManager();
		
		_this.setUnpinable(false);
		_this.setAutoStart(false);
		_this.setHeading("Instruments");
		_this.setType("HTMLInstrumentsModuleElement");
		_this.setMoveable(false);
		
		nameFilter.setPlaceholder("Name");
		nameFilter.addEventListener(DCM.Event.keyup, function() {
			
			var 
			value = this.getValue().toLowerCase(),
			nameRegex = new RegExp("^" + value),
			filteredData,
			toHide = dataManager.data.length,
			toShow;
			
			while(toHide--) {
				
				dataManager.data[toHide].setVisible(false);
				
			};
			
			filteredData = dataManager.getDataByFilter(function() {
				
				return this.name&&nameRegex.test(this.name.toLowerCase());
				
			}, value);
			
			toShow = filteredData.length;
			
			while(toShow--) {
				
				filteredData[toShow].setVisible(true);
				
			};
			
		}),
		service = new DCM.GetAPIInstrumentsService();
		
		nameCol.append(nameFilter);
		
		_this.scroller.body.append(_table);
		_this.scroller.setHeight(350);
		
		service.call();
		service.addEventHandler("SUCCESS", function(e) {
			
			var 
			instruments = e.insts,
			numberOfInstruments = instruments.length;
			
			while(numberOfInstruments--) {
				
				var intrument = instruments[numberOfInstruments];
				addInstrument(intrument.name, intrument.id, intrument.isin, intrument.myTags, intrument.epics, intrument.myFilters);
				
			};
			
			DCM.APIInstrumentManager.dispatchEventHandler("LOAD_COMPLETE");
		
		});
		
		
	}
	catch(e) {
	
		DCM.warn("HTMLInstrumentsModuleElement", e);
	
	};
};DCM.HTMLInstrumentsModuleItemElement = function HTMLInstrumentsModuleItemElement() {
	
	try {
	
		this._super = DCM.HTMLTRElement;
		this._super();
		
		var 
		_this = this,
		nameCol = this.addColumn(),
		idCol = this.addColumn(),
		isinCol = this.addColumn(),
		expicsCol = this.addColumn(),
		filtersCol = this.addColumn(),
		tagsCol = this.addColumn(),
		usersCol = this.addColumn(),
		
		sentimentCol = this.addColumn(),
		changeCol = this.addColumn(),
		highCol = this.addColumn(),
		lowCol = this.addColumn(),
		
		instrumentAddHandler = function instrumentAddHandler() {
			
			_this.setUser(this);
			
		},
		renderUserTags = function renderUserTags() {
			
			usersCol.empty();
			
			var 
			target = _this.users,
			numberOfUsers = target.length;
			
			while(numberOfUsers--) {
				
				var 
				tag = new DCM.HTMLTagElement(),
				user = target[numberOfUsers];
				
				tag.id = user.id;
				tag.setText(user.name);
				
				usersCol.prepend(tag);
				
				tag.addEventListener(DCM.Event.dragstart, function(e) {
			
					console.log("tag.dragstart");
					
					e.stopPropagation();
					
					e.dataTransfer.setData("method", "MOVE_INSTRUMENT_USER_TAG");
					e.dataTransfer.setData("UserId", this.id);
					e.dataTransfer.setData("InstrumentId", _this.id);
					
				});
				
				tag.addEventListener(DCM.Event.dragend, function(e) {
					
					console.log("tag.dragend");
					
					e.stopPropagation();
					
				});
				
			};
			
		},
		renderTagTags = function renderTagTags() {
			
			console.log("renderTagTags", renderTagTags, _this.tags);
			
			tagsCol.empty();
			
			var 
			target = _this.tags,
			numberOfTags = target.length;
			
			while(numberOfTags--) {
				
				var 
				tagNode = new DCM.HTMLTagElement(),
				tag = target[numberOfTags];
				
				tagNode.id = tag.id;
				tagNode.setText(tag.name);
				
				tagsCol.prepend(tagNode);
				
				tagNode.addEventListener(DCM.Event.dragstart, function(e) {
			
					console.log("tag.dragstart");
					
					e.stopPropagation();
					
					e.dataTransfer.setData("method", "MOVE_INSTRUMENT_TAG");
					e.dataTransfer.setData("tagId", this.id);
					e.dataTransfer.setData("InstrumentId", _this.id);
					
				});
				
				tagNode.addEventListener(DCM.Event.dragend, function(e) {
					
					console.log("tag.dragend");
					
					e.stopPropagation();
					
				});
				
			};
			
		};
		
		this.tags = [];
		this.users = [];
		this.filters = [];
		this.epics = [];
		
		this.setEpic = function setEpic() {
			
			
			
		};
		
		this.setFilter = function setFilter() {
			
			
			
		};
		
		this.setIsin = function setIsin(value) {
			this.isin = value;
			isinCol.setText(value);
		};
		
		this.destroy = function destroy() {
			
			console.log("HTMLInstrumentsModuleItemElement.destroy()");
			
			this.remove();
			
			this.dispatchEventHandler("DESTROY");
			
			DCM.APIInstrumentManager.instruments.splice(DCM.getIndexOf(DCM.APIInstrumentManager.instruments, this), 1);
			
		};
	
		this.setName = function setName(value) {
			this.name = value;
			nameCol.setText(value);
		};
		
		this.setID = function setID(value) {
			this.id = value;
			idCol.setText(value);
		};
		
		this.setTag = function setTag(tag) {
		
			if(DCM.getIndexOf(this.tags, tag)>-1) {
			
				DCM.ToastManager.createToast(tag.name + " is already a tag of " + this.name);
				
				return;
				
			};
			
			this.tags.push(tag);
			tag.setInstrument(this);
			
			tag.addEventHandler("DESTROY", function() {
			
				_this.removeTag(tag);
				
			});
			
			renderTagTags();
		
		};
		
		this.removeTag = function removeTag(tag) {
			
			var toRemove = DCM.getIndexOf(this.tags, tag);
			
			this.tags.splice(toRemove, 1);
			tag.removeInstrument(this);
			
			renderTagTags();
			
		};
		
		this.setUser = function setUser(user) {
			
			if(DCM.getIndexOf(this.users, user)>-1) {
			
				DCM.ToastManager.createToast("<strong>" + user.name + "</strong> is already a user of <strong>" + this.name + "</strong>");
				
				return;
				
			};
			
			this.users.push(user);
			user.setInstrument(this);
			
			user.addEventHandler("DESTROY", function() {
			
				_this.removeUser(user);
				
			});
			
			renderUserTags();
			
		};
		
		this.attachUser = function attachUser(user) {
			
			if(DCM.getIndexOf(this.users, user)>-1) {
			
				DCM.ToastManager.createToast("<strong>" + user.name + "</strong> is already a user of <strong>" + this.name + "</strong>");
				
				return;
				
			};
			
			this.users.push(user);
			
			user.addEventHandler("DESTROY", function() {
			
				_this.removeUser(user);
				
			});
			
			renderUserTags();
			
		};
		
		this.removeUser = function removeUser(user) {
			
			DCM.log("removeUser()");
			
			var toRemove = DCM.getIndexOf(this.users, user);
			
			this.users.splice(toRemove, 1);
			user.removeInstrument(this);
			
			renderUserTags();
			
		};
		
		// DRAG AND DROP
		this.addEventListener(DCM.Event.dragstart, function(e) {
			
			console.log("instrument.dragstart");
			
			e.dataTransfer.setData("method", "MOVE_INSTRUMENT");
			e.dataTransfer.setData("InstrumentId", this.id);
			
		});
		
		this.addEventListener(DCM.Event.dragend, function(e) {
			
			console.log("instrument.dragend");
			
		});
		
		this.addEventListener(DCM.Event.dragover, function(e) {
			
			return false;
			
		});
		
		this.addEventListener(DCM.Event.drop, function(e) {
		
			e.preventDefault();
			
			var 
			userID = e.dataTransfer.getData("UserId"),
			tagID = e.dataTransfer.getData("tagId"),
			method = e.dataTransfer.getData("method"),
			tag = DCM.APITagManager.getTagById(tagID),
			user = DCM.APIUserManager.getUserById(userID);
			
			console.log("instrument.drop", method);
			
			if(method==="MOVE_USER"||method==="MOVE_INSTRUMENT_USER_TAG") {
				
				this.setUser(user);
				
			}
			else if(method==="MOVE_TAG"||method==="MOVE_INSTRUMENT_TAG") {
			
				this.setTag(tag);
				
			};
			
			this.setAttribute("data-drag-hover", "false");
			
		});
		
		this.addEventListener(DCM.Event.dragenter, function(e) {
			
			e.preventDefault();
			
			var 
			method = e.dataTransfer.getData("method");
			
			if(method==="MOVE_USER"||method==="MOVE_INSTRUMENT_USER_TAG"||method==="MOVE_TAG"||method==="MOVE_INSTRUMENT_TAG") {
				
				this.setAttribute("data-drag-hover", "true");
				
			};
			
		});
		
		this.addEventListener(DCM.Event.dragleave, function(e) {
			
			e.preventDefault();
			
			this.setAttribute("data-drag-hover", "false");
			
		});
		
		this.setAttribute("draggable", "true");
		
	}
	catch(e) {
	
		DCM.warn("HTMLInstrumentsModuleItemElement", e);	
	
	};
};DCM.HTMLItemMenuElement = function HTMLItemMenuElement() {

	try {
		
		var
		_this = this,
		closeHandler = function closeHandler() {
			_this.close();
		},
		setItem = _this.setItem = function(label, callback) {
			
			var
			item = new DCM.HTMLContextMenuItemElement();
			
			item.setLabel(label);
			
			item.button.addEventListener(DCM.Event.click, function() {
				
				callback();
				return false;
				
			});
			
			_this.append(item);
			
		},
		setInactiveItem = _this.setInactiveItem = function setInactiveItem(label) {

			var
			item = new DCM.HTMLContextMenuItemElement();
			
			item.setLabel(label);
			item.setActive("false");
			
			item.button.addEventListener(DCM.Event.click, function() {
				return false;
			});
			
			_this.append(item);
			
		},
		setToggleActiveItem = _this.setToggleActiveItem = function setToggleActiveItem(label, callback) {
		
			var
			item = new DCM.HTMLContextMenuItemElement();
			
			item.setLabel(label);
			item.setToggle(true);
			
			item.button.addEventListener(DCM.Event.click, function() {
			
				callback();
				return false;
			
			});
			
			_this.append(item);
			
		},
		open = _this.open = function open() {
			DCM.body.append(_this);
			DCM.document.addEventListener(DCM.Event.mouseup, closeHandler);
		},
		close = _this.close = function close() {
			_this.remove();
			DCM.document.removeEventListener(DCM.Event.mouseup, closeHandler);
		},
		getValue = _this.getValue = function getValue() {
			return _this.value;
		};
		
		this._super = DCM.HTMLULElement;
		this._super();
		
		_this.setAttribute("data-role", "contextmenu");
		_this.setStyle("position", "absolute");
		_this.setType("HTMLItemMenuElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLItemMenuElement", e);
		
	};
	
};DCM.HTMLLabelElement = function HTMLLabelElement() {

	try {
		
		this._super = DCM.HTMLSpanElement;
		this._super();
		
		this.setType("HTMLLabelElement");
		
		this.setLabel = function setLabel(value) {
			this.setText(value);
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLLabelElement", e);
		
	};
	
};DCM.HTMLLanguageSelectMenuElement = function HTMLLanguageSelectMenuElement() {

	try {

		var
		_this = this,
		itemOne,
		itemTwo,
		itemThree,
		itemFour,
		itemFive,
		flagOne = new DCM.HTMLFlagIconElement(),
		flagTwo = new DCM.HTMLFlagIconElement(),
		flagThree = new DCM.HTMLFlagIconElement(),
		flagFour = new DCM.HTMLFlagIconElement(),
		flagFive = new DCM.HTMLFlagIconElement();
		
		this._super = DCM.HTMLSelectMenuElement;
		this._super();
		
		itemOne = _this.itemOne = _this.setItem("Eng", "ENG");
		itemTwo = _this.itemOne = _this.setItem("Ger", "GER");
		itemThree = _this.itemOne = _this.setItem("Fra", "FRA");
		itemFour = _this.itemOne = _this.setItem("Nor", "NOR");
		itemFive = _this.itemOne = _this.setItem("Swe", "SWE");
		
		flagOne.setAttribute("data-culture", "ENG");
		flagTwo.setAttribute("data-culture", "GER");
		flagThree.setAttribute("data-culture", "FRA");
		flagFour.setAttribute("data-culture", "NOR");
		flagFive.setAttribute("data-culture", "SWE");
		
		itemTwo.disable();
		itemThree.disable();
		itemFour.disable();
		itemFive.disable();
		
		itemOne.prepend(flagOne);
		itemTwo.prepend(flagTwo);
		itemThree.prepend(flagThree);
		itemFour.prepend(flagFour);
		itemFive.prepend(flagFive);
		
		_this.setValue("ENG");
		_this.setType("HTMLLanguageSelectMenuElement");
		_this.setWidth(80);
		
	}
	catch(e) {
		
		DCM.warn("HTMLLanguageSelectMenuElement", e);
		
	};
	
};DCM.HTMLLIElement = function HTMLLIElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("li");
		
		this.setType("HTMLLIElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLLIElement", e);
		
	};
	
};DCM.HTMLLinearFormElement = function HTMLLinearFormElement() {

	try {
		
		this._super = DCM.HTMLFormElement;
		this._super();
		
		this.setType("HTMLLinearFormElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLLinearFormElement", e);
	
	};
	
};DCM.HTMLLinkElement = function HTMLLinkElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("link");
		
		this.setType("HTMLLinkElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLLinkElement", e);
		
	};
	
};DCM.HTMLLoadingAnimationElement = function HTMLLoadingAnimationElement(data) {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		var
		_this = this,
		animation = new DCM.HTMLDivElement(),
		fader = new DCM.HTMLDivElement(),
		textWrap = new DCM.HTMLDivElement(),
		textHead = new DCM.HTMLDivElement(),
		brandIcon = new DCM.HTMLBrandIconElement();
		
		this.destroy = function destroy() {
			this.remove();
		};
		
		this.setHeading = function setHeading(value) {
			textHead.setText(value);
		};
		
		this.setType("HTMLLoadingAnimationElement");
		
		textWrap.append(brandIcon);
		textWrap.append(textHead);
		
		this.append(animation);
		animation.append(fader);
		this.append(textWrap);
		
		fader.setType("HTMLLoadingAnimationAnimationFaderElement");
		
		animation.setType("HTMLLoadingAnimationAnimationElement");
		
		textWrap.setType("HTMLLoadingAnimationTextElement");
		
		textHead.setType("HTMLLoadingAnimationTextHeadElement");
		
		this.setHeading("Processing");
		
		DCM.body.append(this);
		
	}
	catch(e) {
		
		DCM.warn("HTMLLoadingAnimationElement" + e);
		
	};
	
};DCM.HTMLModuleBodyElement = function HTMLModuleBodyElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLModuleBodyElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLModuleBodyElement", e);
		
	};
	
};DCM.HTMLModuleCloseButtonElement = function HTMLModuleCloseButtonElement() {

	try {
		
		this._super = DCM.HTMLGraphicButtonElement;
		this._super();
		
		this.setText(DCM.Resources.getResource("CloseModule")); 
		this.setAttribute("title", DCM.Resources.getResource("CloseModule"));
		this.setRole("close");
		this.setSize("1");
		
	}
	catch(e) {
		
		DCM.warn("HTMLModuleCloseButtonElement", e);
		
	};
	
};DCM.HTMLModuleContextMenuElement = function HTMLModuleContextMenuElement(target) {

	try {
		
		var
		_this = this;
		
		this._super = DCM.HTMLContextMenuElement;
		this._super(target);
		
		if(_this.target.closeable) {
			_this.setItem(DCM.Resources.getResource("CloseModule"), function() {
				_this.target.close();
			});
		};
		
		if(_this.target.unpinable) {
			_this.setItem(DCM.Resources.getResource("UnpinFromDashboardLabel"), function() {
				_this.target.unpin();
			});
		};
		
		if(_this.target.pinable) {
			_this.setItem(DCM.Resources.getResource("PinToDashboardLabel"), function() {
				_this.target.pin();
			});
		};
		
		if(_this.target.resizeable&&_this.target.getCollapsed()) {
			_this.setItem(DCM.Resources.getResource("ExpandModuleLabel"), function() {
				_this.target.resize();
			});
		}
		else if(_this.target.resizeable) {
			_this.setItem(DCM.Resources.getResource("CollapseModuleLabel"), function() {
				_this.target.resize();
			});
		};
		
		if(DCM.Environment.getEnvironment()==="DEV") {
			
			_this.setItem("START MODULE (DEV)", function() {
				_this.target.start();
			});
			
			_this.setItem("STOP MODULE (DEV)", function() {
				_this.target.stop();
			});
			
			_this.setItem("UPDATE MODULE (DEV)", function() {
				_this.target.update();
			});
			
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLModuleContextMenuElement", e);
		
	};
	
};DCM.HTMLModuleElement = function HTMLModuleElement() {

	try {
		
		var
		_this = this,
		timer,
		setContextMenu = _this.setContextMenu = function setContextMenu(instanceName) {
			_this.contextMenu = DCM[instanceName];
		},
		setUpdateFrequency = _this.setUpdateFrequency = function setUpdateFrequency(value) {
			_this.updateFrequency = value;
		},
		setServiceCall = _this.setServiceCall = function setServiceCall(instanceName) {
			_this.serviceCall = new DCM[instanceName];
		},
		serviceCallUpdateHandler = function serviceCallUpdateHandler(data) {
			_this.dispatchEventHandler("UPDATE", data);
		},
		start = _this.start = function start() {
			
			DCM.log("Module[" + _this.type + "].start()");
			
			stop();
			update();
			timer = setInterval(update, _this.updateFrequency);
			
		},
		stop = _this.stop = function stop() {
			
			DCM.log("Module[" + _this.type + "].stop()");
			clearInterval(timer);
			
		},
		update = _this.update = function update() {
			
			DCM.log("Module[" + _this.type + "].update()");
			
			_this.dispatchEventHandler("BEFORE_UPDATE");
			_this.serviceCall.call();
		
		},
		open = _this.open = function open() {
			
			DCM.log("Module[" + _this.type + "].open()");
			
			DCM.toolbar.deactivateItem(_this.type);
			setOpen(true);
			
			_this.serviceCall.addEventHandler("SUCCESS", serviceCallUpdateHandler);
			
			if(_this.autoStart&&_this.serviceCall.method) {
				start();
			};
			
		},
		close = _this.close = function close() {
			
			DCM.log("Module[" + _this.type + "].close()");
			
			DCM.toolbar.activateItem(_this.type);
			setOpen(false);
			stop();
			
			_this.serviceCall.removeEventHandler("SUCCESS", serviceCallUpdateHandler);
			
			if(_this.pinable) {
				fader.remove();
			};
			
			_this.dispatchEventHandler("CLOSE");
			
		},
		destroy = _this.destroy = function destroy() {
		
			DCM.log("Module[" + _this.type + "].destroy()");
		
			_this.remove();
			DCM.ModuleManager.modules.splice(DCM.getIndexOf(DCM.ModuleManager.modules, _this), 1);
			_this.dispatchEventHandler("DESTROY");
		
		},
		toggle = _this.toggle = function toggle() {
			
			DCM.log("Module[" + _this.type + "].toggle()");
			
			if(_this.isOpen) {
				close();
			}
			else {
				open();
			};
		
		},
		resize = _this.resize = function resize() {
			
			DCM.log("Module[" + _this.type + "].resize()");
			
			setCollapsed(!_this.collapsed);
			
		},
		setMoveable = _this.setMoveable = function setMoveable(value) {
			var val = _this.moveable = value;
			_this.setAttribute("data-moveable", val);
		},
		collapse = _this.collapse = function collapse() {
			setCollapsed(true);
		},
		expand = _this.expand = function expand() {
			setCollapsed(false);
		},
		getCollapsed = _this.getCollapsed = function getCollapsed() {
			return _this.collapsed;
		},
		setCollapsed = _this.setCollapsed = function setCollapsed(value) {
			
			_this.collapsed = value;
			_this.setAttribute("data-collapsed", _this.collapsed);
			
			expandCollapseToggleButton.setActive(!_this.collapsed);
			
		},
		setHeading = _this.setHeading = function setHeading(value) {
			_this.heading = value;
			_headingHolder.setText(_this.heading);
		},
		setCloseable = _this.setCloseable = function setCloseable(value) {
			var val = _this.closeable = value;
			_this.setAttribute("data-closeable", val);
		},
		setUnpinable = _this.setUnpinable = function setUnpinable(value) {
			var val = _this.unpinable = value;
			_this.setAttribute("data-unpinable", val);
		},
		setPinable = _this.setPinable = function setPinable(value) {
			var val = _this.pinable = value;
			_this.setAttribute("data-pinable", val);
		},
		setIcon = _this.setIcon = function setIcon(value) {
			var val = _this.icon = value;
			panelIcon.setRole(val);
		},
		setOpen = function setOpen(value) {
			
			DCM.log("Module[" + _this.type + "].setOpen(" + value + ")");
			
			var val = _this.isOpen = value;
			_this.setAttribute("data-open", val);
			
		},
		getResizeable = _this.getResizeable = function getResizeable() {
			return _this.resizeable;
		},
		setResizeable = _this.setResizeable = function setResizeable(value) {
			_this.resizeable = value;
			_this.setAttribute("data-resizeable", _this.resizeable);
		},
		getAutoStart = _this.getAutoStart = function getAutoStart() {
			return _this.autoStart;
		},
		setAutoStart = _this.setAutoStart = function setAutoStart(value) {
			_this.autoStart = value;
		},
		closeButton = new DCM.HTMLModuleCloseButtonElement(),
		_headingHolder = _this._headingHolder = new DCM.HTMLModuleHeadingElement(),
		panelIcon = new DCM.HTMLIconElement(),
		headLeft = _this.headLeft = new DCM.HTMLModuleHeadLeftElement(),
		headRight = _this.headRight = new DCM.HTMLModuleHeadRightElement(),
		headClear = new DCM.HTMLClearElement(),
		head = _this.head = new DCM.HTMLModuleHeadElement(),
		body = _this.body = new DCM.HTMLModuleBodyElement(),
		fader = new DCM.HTMLDialogOverlayElement(),
		dock = _this.dock = function dock() {
			setMoveable(true);
			setCloseable(false);
			setUnpinable(true);
			setPinable(false);
			pinButton.toggle();
			DCM.page.append(_this);
			fader.remove();
		},
		undock = _this.undock = function undock() {
			setMoveable(false);
			setCloseable(true);
			setUnpinable(false);
			setPinable(true);
			pinButton.toggle();
			DCM.body.append(fader);
			DCM.body.append(_this);
		},
		pinButton = new DCM.HTMLPinGraphicButtonElement(),
		buttonWrap = _this.buttonWrap = new DCM.HTMLDivElement(),
		unpin = _this.unpin = function unpin() {
			close();
		},
		pin = _this.pin = function pin() {
			dock();
		},
		expandCollapseToggleButton = new DCM.HTMLExpandCollapseToggleGraphicButtonElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		headRight.prepend(buttonWrap);
		
		pinButton.toggle();
		
		buttonWrap.append(pinButton);
		buttonWrap.append(expandCollapseToggleButton);
		
		expandCollapseToggleButton.addEventListener(DCM.Event.click, function() {
			
			if(_this.resizeable) {
				_this.resize();
			};
			
		});
		
		buttonWrap.setAttribute("data-role", "button-wrap");
		
		panelIcon.setSize("1");
		
		pinButton.addEventListener(DCM.Event.click, function() {
		
			if(this.active) {
				unpin();
			}
			else {
				pin();
			};
			
			return false;
			
		});
		
		closeButton.addEventListener(DCM.Event.click, function() {
			
			close();
			return false;
			
		});
		
		headLeft.append(panelIcon);
		headLeft.append(_headingHolder);
		
		_this.head.append(headLeft);
		_this.head.append(headRight);
		_this.head.append(headClear);
		
		headRight.append(closeButton);
		
		_this.append(_this.head);
		_this.append(_this.body);
		
		_this.addEventListener(DCM.Event.contextmenu, function(e) {
			
			var _contextMenu = new _this.contextMenu(_this);
			_contextMenu.setX(e.clientX);
			_contextMenu.setY(e.clientY);
			
			return false;
			
		});
		
		_this.setType("HTMLModuleElement");
		
		expand();
		setCloseable(false);
		setUnpinable(true);
		setPinable(false);
		setMoveable(true);
		setHeading(DCM.Resources.getResource("DefaultModuleHeading"));
		setIcon("default-icon");
		setResizeable(false);
		setAutoStart(false);
		setServiceCall("ServiceCaller");
		setUpdateFrequency(3000);
		//setUpdateFrequency(30000);
		
		setContextMenu("HTMLModuleContextMenuElement");
		
		// may not be best
		DCM.page.append(_this);
		
	}
	catch(e) {
		
		DCM.warn("HTMLModuleElement", e);
		
	};
	
};DCM.HTMLModuleFootElement = function HTMLModuleFootElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLModuleFootElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLModuleFootElement", e);
		
	};
	
};DCM.HTMLModuleHeadElement = function HTMLModuleHeadElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLModuleHeadElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLModuleHeadElement", e);
		
	};
	
};DCM.HTMLModuleHeadingElement = function HTMLModuleHeadingElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLModuleHeadingElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLModuleHeadingElement", e);
		
	};
	
};DCM.HTMLModuleHeadLeftElement = function HTMLModuleHeadLeftElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLModuleHeadLeftElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLModuleHeadLeftElement", e);
		
	};
	
};DCM.HTMLModuleHeadRightElement = function HTMLModuleHeadRightElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLModuleHeadRightElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLModuleHeadRightElement", e);
		
	};
	
};DCM.HTMLModuleMenuElement = function HTMLModuleMenuElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		var
		watchlistsModuleItem = this.HTMLWatchlistModuleElement = new DCM.HTMLModuleMenuItemElement(),
		portfolioModuleItem = this.HTMLPortfoliosModuleElement = new DCM.HTMLModuleMenuItemElement(),
		newsModuleItem = this.HTMLNewsModuleElement = new DCM.HTMLModuleMenuItemElement(),
		notesModuleItem = this.HTMLNotesModuleElement = new DCM.HTMLModuleMenuItemElement(),
		alertsModuleItem = this.HTMLAlertsModuleElement = new DCM.HTMLModuleMenuItemElement(),
		ordersModuleItem = this.HTMLOrdersModuleElement = new DCM.HTMLModuleMenuItemElement();
		
		watchlistsModuleItem.setActiveLabel(DCM.Resources.getResource("WatchlistsModulePin"));
		watchlistsModuleItem.setInactiveLabel(DCM.Resources.getResource("WatchlistsModuleUnpin"));
		watchlistsModuleItem.icon.setRole("module-menu-watchlists");
		watchlistsModuleItem.moduleName = "HTMLWatchlistModuleElement";
		watchlistsModuleItem.moduleDisplayName = "Watchlists";
		
		portfolioModuleItem.setActiveLabel(DCM.Resources.getResource("PortfoliosModulePin"));
		portfolioModuleItem.setInactiveLabel(DCM.Resources.getResource("PortfoliosModuleUnpin"));
		portfolioModuleItem.icon.setRole("module-menu-portfolio");
		portfolioModuleItem.moduleName = "HTMLPortfoliosModuleElement";
		portfolioModuleItem.moduleDisplayName = "Portfolio";
		
		newsModuleItem.setActiveLabel(DCM.Resources.getResource("NewsModulePin"));
		newsModuleItem.setInactiveLabel(DCM.Resources.getResource("NewsModuleUnpin"));
		newsModuleItem.icon.setRole("module-menu-news");
		newsModuleItem.moduleName = "HTMLNewsModuleElement";
		newsModuleItem.moduleDisplayName = "News";
		
		notesModuleItem.setActiveLabel(DCM.Resources.getResource("NotesModulePin"));
		notesModuleItem.setInactiveLabel(DCM.Resources.getResource("NotesModuleUnpin"));
		notesModuleItem.icon.setRole("module-menu-notes");
		notesModuleItem.moduleName = "HTMLNotesModuleElement";
		notesModuleItem.moduleDisplayName = "Notes";
		
		alertsModuleItem.setActiveLabel(DCM.Resources.getResource("AlertsModulePin"));
		alertsModuleItem.setInactiveLabel(DCM.Resources.getResource("AlertsModuleUnpin"));
		alertsModuleItem.icon.setRole("module-menu-alerts");
		alertsModuleItem.moduleName = "HTMLAlertsModuleElement";
		alertsModuleItem.moduleDisplayName = "Alerts";
		
		ordersModuleItem.setActiveLabel(DCM.Resources.getResource("OrdersModulePin"));
		ordersModuleItem.setInactiveLabel(DCM.Resources.getResource("OrdersModuleUnpin"));
		ordersModuleItem.icon.setRole("module-menu-orders");
		ordersModuleItem.moduleName = "HTMLOrdersModuleElement";
		ordersModuleItem.moduleDisplayName = "Orders";
		
		this.append(watchlistsModuleItem);
		this.append(portfolioModuleItem);
		this.append(newsModuleItem);
		this.append(notesModuleItem);
		this.append(alertsModuleItem);
		this.append(ordersModuleItem);
		
		this.setType("HTMLModuleMenuElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLModuleMenuElement", e);
		
	};
	
};DCM.HTMLModuleMenuItemElement = function HTMLModuleMenuItemElement() {

	try {
		
		var
		_this = this,
		icon = _this.icon = new DCM.HTMLIconElement(),
		button = _this.button = new DCM.HTMLGraphicButtonElement(),
		setActive = _this.setActive = function setActive(value) {
		
			DCM.log("HTMLModuleMenuItemElement.setActive(" + _this.moduleName + ")");
			_this.active = value;
			button.setAttribute("data-module-menu-active", _this.active);
			_this.dispatchEventHandler("ACTIVE_CHANGE");
			
			if(!isFirstTime) {
			
				DCM.ToastManager.createToast(_this.moduleDisplayName + " " + (_this.active?"unpinned":"pinned") + " " + (_this.active?"from":"to") + " dashboard");
			
			};
			
			isFirstTime = false;
			
		},
		activate = _this.activate = function activate() {
			_this.setActive(true);
		},
		toggleActive = _this.toggleActive = function toggleActive() {
			setActive(!_this.active);
		},
		deactivate = _this.deactivate = function deactivate() {
			_this.setActive(false);
		},
		setLabel = _this.setLabel = function setLabel(value) {
			icon.setText(value);
			button.setAttribute("title", value);
		},
		setInactiveLabel = _this.setInactiveLabel = function setInactiveLabel(value) {
			_this.inactiveLabel = value;
		},
		setActiveLabel = _this.setActiveLabel = function setActiveLabel(value) {
			_this.activeLabel = value;
		},
		isFirstTime = true;
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		icon.setSize("1");
		
		button.append(icon);
		_this.append(button);
		
		_this.setType("HTMLModuleMenuItemElement");
		
		_this.addEventListener(DCM.Event.click, function() {
			
			DCM.ModuleManager.toggleModule(_this.moduleName);
			
			return false;
			
		});
		
		_this.addEventHandler("ACTIVE_CHANGE", function() {
			
			if(_this.active===true) {
				setLabel(_this.activeLabel);
			}
			else if(_this.active===false) {
				setLabel(_this.inactiveLabel);
			};
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLModuleMenuItemElement", e);
		
	};
	
};DCM.HTMLNativeButtonElement = function HTMLNativeButtonElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("button");
		
	}
	catch(e) {
		
		DCM.warn("HTMLNativeButtonElement", e);
		
	};
	
};DCM.HTMLNativeFormElement = function HTMLNativeFormElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("form");
		
	}
	catch(e) {
		
		DCM.warn("HTMLNativeFormElement", e);
		
	};
	
};DCM.HTMLNativeLabelElement = function HTMLNativeLabelElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("label");
		
	}
	catch(e) {
		
		DCM.warn("HTMLNativeLabelElement", e);
		
	};
	
};DCM.HTMLNewsDialogElement = function HTMLNewsDialogElement() {

	try {
		
		var 
		_this = this,
		scroller = new DCM.HTMLScrollPanelElement(),
		setMessage = _this.setMessage = function setMessage(value) {
			scroller.body.setText(value);
		};
		
		this._super = DCM.HTMLStaticDialogElement;
		this._super();
		
		_this.body.append(scroller);
		
		scroller.setHeight(190);
		
		_this.setWidth(500);
		_this.continueButton.setText(DCM.Resources.getResource("CloseLabel"));
		
	}
	catch(e) {
	
		DCM.warn("HTMLNewsDialogElement", e);
		
	};
	
};DCM.HTMLNewsGraphicButtonElement = function HTMLNewsGraphicButtonElement() {

	try {
		
		this._super = DCM.HTMLGraphicButtonElement;
		this._super();
		
		this.setRole("news");
		this.setSize("2");
		this.setLabel(DCM.Resources.getResource("ShowNews"));
		
	}
	catch(e) {
		
		DCM.warn("HTMLNewsGraphicButtonElement", e);
		
	};
	
};DCM.HTMLNewsModuleElement = function HTMLNewsModuleElement() {
	
	try {

		var
		_this = this,
		lightstreamerHandler = function lightstreamerHandler() {
			this.onItemUpdate = function(data) {
				_this.addItem(data.getValue("newsId"), data.getValue("news_title"));
			};
		};
		
		this._super = DCM.HTMLScrollableModuleElement;
		this._super();
		
		this.setIcon("news");
		this.setHeading(DCM.Resources.getResource("NewsPanelHeading"));
		this.setType("HTMLNewsModuleElement");
		
		this.subscribe = function subscribe() {
		
			var newsSubscription = new Lightstreamer.Subscription("DISTINCT", "dcmnews_bussines", ["newsId", "news_title"]);
			newsSubscription.addListener(new lightstreamerHandler());
			newsSubscription.setDataAdapter("dcm_news");
			newsSubscription.setRequestedSnapshot("yes");
			DCM.sharingClient.subscribe(newsSubscription);
			
		};
		
		this.addItem = function addItem(id, title) {
		
			var item = new DCM.HTMLNewsModuleItemElement(id, title);
			
			this.scroller.body.prepend(item);
			
		};
		
		this.subscribe();
	
	}
	catch(e) {
	
		DCM.warn("HTMLNewsModuleElement", e);
	
	};
	
};DCM.HTMLNewsModuleItemContextMenuElement = function HTMLNewsModuleItemContextMenuElement(target) {

	try {
		
		var
		_this = this;
		
		this._super = DCM.HTMLContextMenuElement;
		this._super(target);
		
		this.setItem(DCM.Resources.getResource("OpenNewsArticle"), function() {
			
			_this.target.openArticle();
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLNewsModuleItemContextMenuElement", e);
		
	};
	
};DCM.HTMLNewsModuleItemElement = function HTMLNewsModuleItemElement(id, title) {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
	
		var
		_this = this,
		id = _this.id = id,
		title = _this.title = title,
		openArticle = _this.openArticle = function openArticle() {
		
			DCM.log("HTMLNewsModuleItemElement[" + _this.id + "].openArticle()");
			
			if(!got) {
				service.call();
			}
			else {
				open();
			};
			
		},
		got = false,
		service = new DCM.GetNewsArticleService(),
		serviceSuccessHandler = function serviceSuccessHandler(data) {
		
			got = true;
		
			var data = _this.data = data.news;
			
			setBody(data.description);
			setPublishedDate(data.published_at);
			setCategory(data.category);
			setCreatedDate(data.created_at);
			
			open();
			
		},
		serviceErrorHandler = function serviceErrorHandler() {
			
			DCM.ToastManager.createToast(DCM.Resources.getResource("NewsOpenError"));
			
		},
		serviceExceptionHandler = function serviceExceptionHandler() {
			
			DCM.ToastManager.createToast(DCM.Resources.getResource("NewsOpenError"));
			
		},
		setBody = _this.setBody = function setBody(value) {
			_this.body = value;
		},
		getPublishedDate = _this.getPublishedDate = function getPublishedDate() {
			return _this.publishedDate.toDateString();
		},
		setPublishedDate = _this.setPublishedDate = function setPublishedDate(value) {
			_this.publishedDate = new Date(value);
		},
		getCreatedDate = _this.getCreatedDate = function getCreatedDate() {
			return _this.createdDate.toDateString();
		},
		setCreatedDate = _this.setCreatedDate = function setCreatedDate(value) {
			_this.createdDate = new Date(value);
		},
		setCategory = _this.setCategory = function setCategory(value) {
			_this.category = value;
		},
		open = _this.open = function open() {
			
			var dialog = new DCM.HTMLNewsDialogElement();
			dialog.setHeading(_this.title);
			dialog.setMessage(_this.body);
			dialog.queue();
			
		};
		
		service.setParam("id", _this.id);
		service.addEventHandler("SUCCESS", serviceSuccessHandler);
		service.addEventHandler("ERROR", serviceErrorHandler);
		service.addEventHandler("EXCEPTION", serviceExceptionHandler);
		
		_this.setText(title);
		_this.setType("HTMLNewsModuleItemElement");
		
		_this.addEventListener(DCM.Event.contextmenu, function(e) {
			
			var _contextMenu = new DCM.HTMLNewsModuleItemContextMenuElement(_this);
			_contextMenu.setX(e.clientX);
			_contextMenu.setY(e.clientY);
			
			return false;
		
		});
		
		_this.addEventListener(DCM.Event.click, function() {
			
			openArticle();
			return false;
			
		});
	
	}
	catch(e) {
		
		DCM.warn("HTMLNewsModuleItemElement", e);
		
	};
	
};DCM.HTMLNoItemsNotificationElement = function HTMLNoItemsNotificationElement() {
	
	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLNoItemsNotificationElement");
	
	}
	catch(e) {
	
		DCM.log("HTMLNoItemsNotificationElement", e);
	
	};
	
};DCM.HTMLNotesGraphicButtonElement = function HTMLNotesGraphicButtonElement() {

	try {
		
		this._super = DCM.HTMLGraphicButtonElement;
		this._super();
		
		this.setRole("notes");
		this.setSize("2");
		this.setLabel(DCM.Resources.getResource("addNoteLabel"));
		this.setType("HTMLNotesGraphicButtonElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLNotesGraphicButtonElement", e);
		
	};
	
};DCM.HTMLNotesModuleContextMenuElement = function HTMLNotesModuleContextMenuElement(target) {

	try {
		
		this._super = DCM.HTMLModuleContextMenuElement;
		this._super(target);
		
		this.setItem(DCM.Resources.getResource("CreateNoteLabel"), function() {
			
			DCM.NoteManager.authorNewNote();
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLNotesModuleContextMenuElement", e);
		
	};
	
};DCM.HTMLNotesModuleElement = function HTMLNotesModuleElement() {
	
	try {
	
		var
		_this = this,
		addNote = _this.addNote = function addNote(data) {
			var note = DCM.NoteManager.createNote(data);	
			_this.scroller.body.prepend(note);
			noNotesNotification.hide();
			
			note.addEventHandler("DESTROY", noteDeleteHandler);
			
			return note;
		},
		noNotesNotification = new DCM.HTMLNoItemsNotificationElement(),
		noteDeleteHandler = function noteDeleteHandler() {
		
			if(DCM.NoteManager.notes.length===0) {
				noNotesNotification.show();
			};
			
		};
		
		this._super = DCM.HTMLScrollableModuleElement;
		this._super();
		
		_this.setIcon("notes");
		_this.setHeading(DCM.Resources.getResource("NotesPanelHeading"));
		_this.setContextMenu("HTMLNotesModuleContextMenuElement");
		_this.setType("HTMLNotesModuleElement");
		_this.setServiceCall("GetNotesService");
		_this.addEventHandler("UPDATE", function(data) {
			
			for(var prop in data) {
				addNote(data[prop]);
			};
			
		});
		
		noNotesNotification.setText(DCM.Resources.getResource("NoNotesLabel"));
		_this.scroller.body.prepend(noNotesNotification);
		
		_this.update();
		
	}
	catch(e) {
	
		DCM.log("HTMLNotesModuleElement", e);
	
	};
	
};DCM.HTMLNotesModuleItemContextMenuElement = function HTMLNotesModuleItemContextMenuElement(target) {

	try {
		
		var
		_this = this;
		
		this._super = DCM.HTMLContextMenuElement;
		this._super(target);
		
		this.setItem(DCM.Resources.getResource("DeleteNoteLabel"), function() {
		
			DCM.NoteManager.authorDeleteNote(_this.target);
			
		});
		
		this.setItem(DCM.Resources.getResource("EditNoteLabel"), function() {
		
			DCM.NoteManager.authorEditNote(_this.target);
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLNotesModuleItemContextMenuElement", e);
		
	};
	
};DCM.HTMLNotesModuleItemCreateDialogElement = function HTMLNotesModuleItemCreateDialogElement() {

	try {

		this._super = DCM.HTMLPromptTextAreaDialogElement;
		this._super();
		
		this.setHeading(DCM.Resources.getResource("CreateNoteLabel"));
		this.setType("HTMLNotesModuleItemCreateDialogElement");
		
		this.position();
		
	}
	catch(e) {
		
		DCM.warn("HTMLNotesModuleItemCreateDialogElement", e);
		
	};
	
};DCM.HTMLNotesModuleItemEditDialogElement = function HTMLNotesModuleItemEditDialogElement() {

	try {
		
		this._super = DCM.HTMLPromptTextAreaDialogElement;
		this._super();
		
		this.setHeading(DCM.Resources.getResource("EditNoteLabel"));
		this.setType("HTMLNotesModuleItemEditDialogElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLNotesModuleItemEditDialogElement", e);
	
	};
	
};DCM.HTMLNotesModuleItemElement = function HTMLNotesModuleItemElement(data) {

	try {
		
		var
		_this = this,
		setId = _this.setId = function setId(value) {
			_this.id = value;
		},
		setNoteBody = _this.setNoteBody = function setNoteBody(value) {
			_this.noteBody = value;
			bodyHolder.setText(value);
		},
		destroy = _this.destroy = function destroy() {
			_this.remove();
			DCM.NoteManager.notes.splice(DCM.getIndexOf(DCM.NoteManager.notes, _this), 1);
			_this.dispatchEventHandler("DESTROY");
		},
		bodyHolder = new DCM.HTMLDivElement(),
		dateHolder = new DCM.HTMLDivElement(),
		instrumentHolder = new DCM.HTMLDivElement(),
		createdDate = new Date(data.createdAtTimestamp),
		left = new DCM.HTMLDivElement(),
		clear = new DCM.HTMLClearElement(),
		data = _this.data = data,
		instrument;
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		_this.setType("HTMLNotesModuleItemElement");
		
		left.setAttribute("data-notes-item-role", "left");
		
		_this.append(left);
		_this.append(clear);
		
		left.append(bodyHolder);
		left.append(dateHolder);
		left.append(instrumentHolder);
		
		setNoteBody(data.content);
		dateHolder.setText(createdDate.toDateString());
		
		if(data.metaTitle) {
			instrument = _this.instrument = DCM.InstrumentManager.getInstrumentById(data.metaTitle);
			instrumentHolder.setText(instrument.getDisplayTextAsHTML());
		};
		
		setId(data.id);
		
		_this.addEventListener(DCM.Event.contextmenu, function(e) {
			
			var _contextMenu = new DCM.HTMLNotesModuleItemContextMenuElement(_this);
			_contextMenu.setX(e.clientX);
			_contextMenu.setY(e.clientY);
			
			return false;
		
		});
		
		_this.addEventListener(DCM.Event.doubleclick, function() {
			
			DCM.NoteManager.authorEditNote(_this);
			
			return false;
		
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLNotesModuleItemElement", e);
		
	};
	
};DCM.HTMLNotifyDialogElement = function HTMLNotifyDialogElement() {

	try {
		
		this._super = DCM.HTMLStaticMessageDialogElement;
		this._super();
		
		this.setHeading("Default notify heading");
		this.setAttribute("data-dialog-type", "HTMLNotifyDialogElement");
		this.setType("HTMLNotifyDialogElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLNotifyDialogElement", e);
		
	};

};DCM.HTMLNumericStepperButtonElement = function HTMLNumericStepperButtonElement() {
	
	try {
		
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
		
		this._super = DCM.HTMLGraphicButtonElement;
		this._super();
		
		_this.setType("HTMLNumericStepperButtonElement");
		
		_this.addEventListener(DCM.Event.mouseenter, mouseenterHandler);
		
	}
	catch(e) {
		
		DCM.warn("HTMLNumericStepperButtonElement", e);
		
	};
	
};DCM.HTMLNumericStepperButtonGroupElement = function HTMLNumericStepperButtonGroupElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLNumericStepperButtonGroupElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLNumericStepperButtonGroupElement", e);
		
	};
	
};DCM.HTMLNumericStepperDecrementElement = function HTMLNumericStepperDecrementElement() {

	try {
		
		this._super = DCM.HTMLNumericStepperButtonElement;
		this._super();
		
		this.setText(DCM.Resources.getResource("DecrementLabel"));
		this.setAttribute("title", DCM.Resources.getResource("DecrementLabel"));
		this.setType("HTMLNumericStepperDecrementElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLNumericStepperDecrementElement", e);
		
	};
	
};DCM.HTMLNumericStepperElement = function HTMLNumericStepperElement() {

	try {
	
		var
		_this = this,
		incrementButton = new DCM.HTMLNumericStepperIncrementElement(),
		decrementButton = new DCM.HTMLNumericStepperDecrementElement(),
		stepperInput = new DCM.HTMLCustomNumericInputElement(),
		buttonWrap = new DCM.HTMLNumericStepperButtonGroupElement(),
		setFixed = _this.setFixed = function setFixed(value) {
			_this.fixed = value;
		},
		getValue = _this.getValue = function getValue() {
			return stepperInput.getValue();
			//return _this.value;
		},
		setValue = _this.setValue = function setValue(value) {
			var val = _this.value = value;
			stepperInput.setValue(val);
			if(_this.enabled) {
				_this.dispatchEventHandler("CHANGE");
			};
		},
		getMin = _this.getMin = function getMin(asNumber) {
			var _return = _this.min;
			if(asNumber) {
				_return = Number(_return);
			};
			return _return;
		},
		setMin = _this.setMin = function setMin(value) {
			_this.min = value;
			if(_this.value&&_this.value<getMin(true)) {
				setValue(value);
			};
		},
		getMax = _this.getMax = function getMax(asNumber) {
			var _return = _this.max;
			if(asNumber) {
				_return = Number(_return);
			};
			return _return;
		},
		setMax = _this.setMax = function setMax(value) {
			_this.max = value;
		},
		getStep = _this.getStep = function getStep(asNumber) {
			var _return = _this.step;
			if(asNumber) {
				_return = Number(_return);
			};
			return _return;
		},
		setStep = _this.setStep = function setStep(value) {
			_this.step = value;
		},
		getInputValue = function getInputValue() {
			var 
			val = stepperInput.getValue(),
			_return = "";
			if(val) {
				_return = Number(val);
			};
			return _return;
		},
		currentValue,
		incrementButtonClickHandler = function incrementButtonClickHandler() {
		
			if(_this.enabled===false) {
				return;
			};
			
			currentValue = getInputValue();
			
			if(currentValue==="") {
				currentValue = (getDefaultIncrement(true)||getMin(true));
			}
			else if(currentValue<_this.max) {
				currentValue = (currentValue += getStep(true));
				if(currentValue>_this.max) {
					return;
				};
			};
			
			setValue(currentValue.toFixed(_this.fixed));
			//setValue(currentValue);
			
			return false;
		
		},
		decrementButtonClickHandler = function decrementButtonClickHandler() {
		
			if(_this.enabled===false) {
				return;
			};
		
			currentValue = getInputValue();
			
			if(currentValue==="") {
				currentValue = (getDefaultDecrement(true)||getMin(true));
			}
			else if(currentValue>_this.min) {
				currentValue = (currentValue -= getStep(true));
				if(currentValue<_this.min) {
					return;
				};
			};
			
			setValue(currentValue.toFixed(_this.fixed));
			//setValue(currentValue);
			
			return false;
		
		},
		toStep = function toStep(value) {
		
			var
			minIncrement = _this.step,
			_return = (Math.ceil(value/minIncrement)*minIncrement);
			return _return;
		
		},
		clear = _this.clear = function clear() {
			//setValue("");
			setValue(null);
		},
		getDefaultDecrement = function getDefaultDecrement(asNumber) {
			var _return = _this.defaultDecrement;
			if(asNumber) {
				_return = Number(_return);
			};
			return _return;
		},
		setDefaultDecrement = _this.setDefaultDecrement = function setDefaultDecrement(value) {
			_this.defaultDecrement = value;
		},
		getDefaultIncrement = function getDefaultIncrement(asNumber) {
			var _return = _this.defaultIncrement;
			if(asNumber) {
				_return = Number(_return);
			};
			return _return;
		},
		setDefaultIncrement = _this.setDefaultIncrement = function setDefaultIncrement(value) {
			_this.defaultIncrement = value;
		},
		setValid = _this.setValid = function setValid(value) {
			_this.valid = value;
			_this.setAttribute("data-valid", value);
		};
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		setFixed(0);
		setValid(true);
		
		stepperInput.input.addEventListener(DCM.Event.change, function() {
		
			currentValue = getInputValue();
			
			var
			min = getMin(true),
			max = getMax(true);
			
			if(!currentValue) {
				setValue(currentValue);
			}
			else if(currentValue<min) {
				setValue(min.toFixed(_this.fixed));
			}
			else if(currentValue>max) {
				setValue(max.toFixed(_this.fixed));
			}
			else {
				setValue(toStep(currentValue).toFixed(_this.fixed));
			};
			
			return false;
			
		});
		
		stepperInput.input.addEventListener(DCM.Event.keypress, function(e) {
			
			var key = DCM.Key.getCharFromEvent(e);
			
			if(key==="UP") {
				incrementButtonClickHandler();
			}
			else if(key==="DOWN") {
				decrementButtonClickHandler();
			};
			
		});
		
		stepperInput.input.addEventListener(DCM.Event.keyup, function(e) {
			
			_this.dispatchEventHandler("CHANGE");
			
		});
		
		incrementButton.addEventListener(DCM.Event.click, incrementButtonClickHandler);
		incrementButton.addEventHandler("AUTO_FIRE", incrementButtonClickHandler);
		decrementButton.addEventListener(DCM.Event.click, decrementButtonClickHandler);
		decrementButton.addEventHandler("AUTO_FIRE", decrementButtonClickHandler);
		
		_this.setType("HTMLNumericStepperElement");
		_this.append(stepperInput);
		_this.append(buttonWrap);
		
		buttonWrap.append(decrementButton);
		buttonWrap.append(incrementButton);
		
		setMin(0);
		setMax(999999999);
		setStep(1);
		clear();
		
		_this.addEventHandler("ENABLED_CHANGE", function() {
			
			stepperInput.setEnabled(_this.enabled);
			
		});
	
	}
	catch(e) {
		
		DCM.warn("HTMLNumericStepperElement", e);
		
	};
};DCM.HTMLNumericStepperIncrementElement = function HTMLNumericStepperIncrementElement() {

	try {
		
		this._super = DCM.HTMLNumericStepperButtonElement;
		this._super();
		
		this.setText(DCM.Resources.getResource("IncrementLabel"));
		this.setAttribute("title", DCM.Resources.getResource("IncrementLabel"));
		this.setType("HTMLNumericStepperIncrementElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLNumericStepperIncrementElement", e);
		
	};
	
};DCM.HTMLOpenInNewWindowGraphicButtonElement = function HTMLOpenInNewWindowGraphicButtonElement() {

	try {
		
		this._super = DCM.HTMLGraphicButtonElement;
		this._super();
		
		this.setRole("open-in-new-window");
		this.setSize("2");
		this.setLabel(DCM.Resources.getResource("OpenInNewWindowLabel"));
	
	}
	catch(e) {
	
		DCM.warn("HTMLOpenInNewWindowGraphicButtonElement", e);
		
	};
	
};DCM.HTMLOrdersModuleContextMenuElement = function HTMLOrdersModuleContextMenuElement(target) {

	try {
		
		this._super = DCM.HTMLModuleContextMenuElement;
		this._super(target);
		
		this.setType("HTMLOrdersModuleContextMenuElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLOrdersModuleContextMenuElement", e);
		
	};
	
};DCM.HTMLOrdersModuleElement = function HTMLOrdersModuleElement() {
	
	try {
	
		var 
		_this = this,
		_table = new DCM.HTMLTableElement(),
		col1 = _table.addColumnHeading(DCM.Resources.getResource("MarketLabel")),
		col2 = _table.addColumnHeading(DCM.Resources.getResource("SizeLabel")),
		col3 = _table.addColumnHeading(DCM.Resources.getResource("LevelLabel")),
		col4 = _table.addColumnHeading(DCM.Resources.getResource("MarketPriceLabel")),
		col5 = _table.addColumnHeading(DCM.Resources.getResource("TypeLabel")),
		col6 = _table.addColumnHeading(DCM.Resources.getResource("StopLabel")),
		col8 = _table.addColumnHeading(DCM.Resources.getResource("LimitLabel")),
		col9 = _table.addColumnHeading(DCM.Resources.getResource("GoodTillLabel")),
		addOrder = _this.addOrder = function addOrder(data) {
		
			var item = DCM.OrderManager.createOrder(data);
			_table.body.append(item);
			hideNoOrdersNotification();
			
			item.addEventHandler("DESTROY", function() {
				if(DCM.OrderManager.orders.length===0) {
					showNoOrdersNotification();
				};
			});
			
			return item;
		
		},
		noOrdersNotification = _this.noOrdersNotification = new DCM.HTMLNoItemsNotificationElement(),
		showNoOrdersNotification = _this.showNoOrdersNotification = function showNoOrdersNotification() {
			
			noOrdersNotification.show();
			tableWrap.hide();
			
		},
		hideNoOrdersNotification = _this.hideNoOrdersNotification = function hideNoOrdersNotification() {
			
			noOrdersNotification.hide();
			tableWrap.show();
			
		},
		updateHandler = function updateHandler(data) {
		
			var 
			added = data.added,
			deleted = data.removed,
			modified = data.modified;
			
			for(var addedProp in added) {
			
				addOrder(added[addedProp]);
				
			};
			
			for(var deletedItem in deleted) {
				
				DCM.OrderManager.getOrderById(deleted[deletedItem]).close();
				
			};
			
			for(var modifiedItem in modified) {
				
				var pos = DCM.OrderManager.getOrderById(modified[modifiedItem].id);
				pos.modify(modified[modifiedItem]);
				
			};
			
			_this.serviceCall.setParam("prevOrderIds", DCM.OrderManager.getCurrentOrderIDs().join(","));
			
			// temp fix to stop preview accounts from continuously polling
			if(DCM.AccountManager.isPreviewAccount()) {
				
				_this.stop();
				
			};
			
		},
		tableWrap = new DCM.HTMLDivElement();
		
		this._super = DCM.HTMLScrollableModuleElement;
		this._super();
		
		noOrdersNotification.setText(DCM.Resources.getResource("NoOrdersLabel"));
		
		_this.setAutoStart(true);
		_this.setIcon("orders");
		_this.setHeading(DCM.Resources.getResource("OrdersPanelHeading"));
		_this.setType("HTMLOrdersModuleElement");
		_this.setUpdateFrequency(1000);
		_this.setContextMenu("HTMLOrdersModuleContextMenuElement");
		_this.setServiceCall("GetOrdersService");
		_this.setResizeable(true);
		
		tableWrap.append(_table);
		
		_this.scroller.body.append(tableWrap);
		_this.scroller.body.append(noOrdersNotification);
		_this.scroller.setHeight(315);
		_this.refresh();
		
		_this.addEventHandler("UPDATE", updateHandler);
		
		showNoOrdersNotification();
		
	}
	catch(e) {
	
		DCM.warn("HTMLOrdersModuleElement", e);
	
	};
};DCM.HTMLOrdersModuleItemContextMenuElement = function HTMLOrdersModuleItemContextMenuElement(target) {

	try {
		
		var
		_this = this;
		
		this._super = DCM.HTMLContextMenuElement;
		this._super(target);
		
		this.setItem(DCM.Resources.getResource("EditOrderLabel"), function() {
		
			_this.target.editOrder();
			
		});
		
		this.setItem(DCM.Resources.getResource("addNoteLabel"), function() {
			
			DCM.NoteManager.createNoteFromInstrument(_this.target);
			
		});
		
		this.setItem(DCM.Resources.getResource("AddAlertLabel"), function() {
		
			DCM.AlertManager.createAlertFromInstrument(_this.target.instrument);
			
		});
		
		this.setItem(DCM.Resources.getResource("AddToWatchlistLabel"), function() {
		
			DCM.WatchlistManager.authorAddToWatchlist(_this.target.instrument);
			
		});
		
		this.setItem(DCM.Resources.getResource("CloseOrderLabel"), function() {
		
			
			DCM.OrderManager.publishCloseOrder(_this.target.Order);
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLOrdersModuleItemContextMenuElement", e);
		
	};
	
};DCM.HTMLOrdersModuleItemElement = function HTMLOrdersModuleItemElement(Order) {

	try {
		
		var 
		_this = this,
		Order = _this.Order = Order,
		marketColumn,
		sizeColumn,
		priceColumn,
		marketPriceColumn,
		typeColumn,
		stopColumn,
		limitColumn,
		expireColumn,
		sizeValue = new DCM.HTMLSpanElement(),
		setOrderType = function setOrderType(value) {
			if(!value) {
				return;
			};
			typeColumn.setText(value);
		},
		setGoodTill = function setGoodTill(value) {
			if(!value) {
				return;
			};
			expireColumn.setText(value);
		},
		setInstrumentName = _this.setInstrumentName = function setInstrumentName(value, title) {
			marketColumn.setText(value);
			_this.setAttribute("title", title);
		},
		setSize = _this.setSize = function setSize(value) {
			sizeValue.setText(value);
			sizeValue.setAttribute("data-direction", Order.direction);
		},
		setStop = _this.setStop = function setStop(value) {
			if(!value) {
				return;
			};
			stopColumn.setText(value);
		},
		setLimit = _this.setLimit = function setLimit(value) {
			if(!value) {
				return;
			};
			limitColumn.setText(value);
		},
		setEntryPrice = _this.setEntryPrice = function setEntryPrice(value) {
			if(!value) {
				return;
			};
			priceColumn.setText(value);
		},
		setMarketPrice = _this.setMarketPrice = function setMarketPrice(value, direction) {
			marketPriceColumn.setAttribute("data-value-direction", "NONE");
			marketPriceColumn.setAttribute("data-value-direction", direction);
			marketPriceColumn.setText(value);
		},
		destroy = _this.destroy = function destroy() {
			
			_this.remove();
			_this.dispatchEventHandler("DESTROY");
			
			Order.removeEventHandler("MARKET_PRICE_UP", marketPriceUpHandler);
			Order.removeEventHandler("MARKET_PRICE_DOWN", marketPriceDownHandler);
			Order.removeEventHandler("MARKET_PRICE_NO_DIRECTION", marketPriceNoDirectionHandler);
			Order.removeEventHandler("EXPIRE_CHANGE", expireChangeHandler);
			Order.removeEventHandler("SIZE_CHANGE", sizeChangeHandler);
			Order.removeEventHandler("STOP_CHANGE", stopChangeHandler);
			//Order.removeEventHandler("TRAILINGSTOP_CHANGE", trailingStopChangeHandler);
			Order.removeEventHandler("LIMIT_CHANGE", limitChangeHandler);
			Order.removeEventHandler("ENTRY_PRICE_CHANGE", priceChangeHandler);
			Order.removeEventHandler("TYPE_CHANGE", typeChangeHandler);
			Order.removeEventHandler("CLOSE", closeHandler);
			
		},
		editOrder = _this.editOrder = function editOrder() {
			DCM.OrderManager.authorEditOrder(Order);
		},
		marketPriceUpHandler = function marketPriceUpHandler() {
			setMarketPrice(Order.getMarketPrice(), "UP");
		},
		marketPriceDownHandler = function marketPriceDownHandler() {
			setMarketPrice(Order.getMarketPrice(), "DOWN");
		},
		marketPriceNoDirectionHandler = function marketPriceNoDirectionHandler() {
			setMarketPrice(Order.getMarketPrice(), "NONE");
		},
		closeHandler = function closeHandler() {
			destroy();
		},
		expireChangeHandler = function expireChangeHandler() {
			setGoodTill(Order.getExpireTime());
		},
		sizeChangeHandler = function sizeChangeHandler() {
			setSize(Order.getSize());
		},
		stopChangeHandler = function stopChangeHandler() {
			setStop(Order.getStop());
		},
		trailingStopChangeHandler = function trailingStopChangeHandler() {
			// YET TO BE IMPLEMENTED
		},
		limitChangeHandler = function limitChangeHandler() {
			setLimit(Order.getLimit());
		},
		priceChangeHandler = function priceChangeHandler() {
			setEntryPrice(Order.getEntryPrice());
		},
		typeChangeHandler = function typeChangeHandler() {
			setOrderType(Order.getType());
		};
		
		this._super = DCM.HTMLTRElement;
		this._super();
		
		_this.setType("HTMLOrdersModuleItemElement");
		
		if(!Order.instrument) {
			
			throw("INSTRUMENT CANNOT BE FOUND");
			
		};
		
		marketColumn = _this.addColumn("-");
		sizeColumn = _this.addColumn();
		priceColumn = _this.addColumn("-");
		marketPriceColumn = _this.addColumn("-");
		typeColumn = _this.addColumn("-");
		stopColumn = _this.addColumn("-");
		limitColumn = _this.addColumn("-");
		expireColumn = _this.addColumn("-");
		
		sizeColumn.append(sizeValue);
		sizeValue.setText("-");
		
		setInstrumentName(Order.instrument.getDisplayTextAsHTML(), Order.instrument.getDisplayText());
		
		Order.addEventHandler("MARKET_PRICE_UP", marketPriceUpHandler);
		Order.addEventHandler("MARKET_PRICE_DOWN", marketPriceDownHandler);
		Order.addEventHandler("MARKET_PRICE_NO_DIRECTION", marketPriceNoDirectionHandler).dispatch();
		Order.addEventHandler("EXPIRE_CHANGE", expireChangeHandler).dispatch();
		Order.addEventHandler("SIZE_CHANGE", sizeChangeHandler).dispatch();
		Order.addEventHandler("STOP_CHANGE", stopChangeHandler).dispatch();
		//Order.addEventHandler("TRAILINGSTOP_CHANGE", trailingStopChangeHandler);
		Order.addEventHandler("LIMIT_CHANGE", limitChangeHandler).dispatch();
		Order.addEventHandler("ENTRY_PRICE_CHANGE", priceChangeHandler).dispatch();
		Order.addEventHandler("TYPE_CHANGE", typeChangeHandler).dispatch();
		Order.addEventHandler("CLOSE", closeHandler);
		
		_this.addEventListener(DCM.Event.contextmenu, function(e) {
			
			var _contextMenu = new DCM.HTMLOrdersModuleItemContextMenuElement(_this);
			_contextMenu.setX(e.clientX);
			_contextMenu.setY(e.clientY);
			
			return false;
		
		});
		
		_this.addEventListener(DCM.Event.doubleclick, function() {
		
			editOrder();
			
			return false;
		
		});
		
		/*
		
		instrument.addEventHandler("INTERACT_START", function() {
			
			_this.setAttribute("data-interactive", true);
			
		});
		
		instrument.addEventHandler("INTERACT_END", function() {
		
			_this.setAttribute("data-interactive", false);
			
		});
		*/
		
		/*
		_this.addEventListener(DCM.Event.mouseenter, function() {
			
			instrument&&instrument.dispatchEventHandler("INTERACT_START");
			
		});
		
		_this.addEventListener(DCM.Event.mouseleave, function() {
			
			instrument&&instrument.dispatchEventHandler("INTERACT_END");
			
		});
		*/
		
	}
	catch(e) {
	
		DCM.warn("HTMLOrdersModuleItemElement" + e);
	
	};
	
};DCM.HTMLPageElement = function HTMLPageElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLPageElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLPageElement", e);
		
	};
	
};DCM.HTMLPageFootElement = function HTMLPageFootElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		var
		disclaimer = new DCM.HTMLDisclaimerElement(),
		listOfLinks = new DCM.HTMLInlineULElement(),
		linkItemOne = listOfLinks.addItem(),
		linkItemTwo = listOfLinks.addItem(),
		linkItemThree = listOfLinks.addItem(),
		linkOne = new DCM.HTMLAnchorElement(),
		linkTwo = new DCM.HTMLAnchorElement(),
		linkThree = new DCM.HTMLAnchorElement();
		
		linkOne.setText(DCM.Resources.getResource("TermsAndConditionsLabel"));
		linkOne.setHref("http://www.derwentcapitalmarkets.com/terms/");
		linkOne.setAttribute("target", "_blank");
		
		linkTwo.setText(DCM.Resources.getResource("PrivacyPolicyLabel"));
		linkTwo.setHref("http://www.derwentcapitalmarkets.com/privacy/");
		linkTwo.setAttribute("target", "_blank");
		
		linkThree.setText(DCM.Resources.getResource("ContactLabel"));
		linkThree.setHref("http://www.derwentcapitalmarkets.com/contact_us/");
		linkThree.setAttribute("target", "_blank");
		
		linkItemOne.append(linkOne);
		linkItemTwo.append(linkTwo);
		linkItemThree.append(linkThree);
		
		this.setType("HTMLPageFootElement");
		
		this.append(listOfLinks);
		this.append(disclaimer);
		
	}
	catch(e) {
	
		DCM.warn("HTMLPageFootElement", e);
	
	};
	
};DCM.HTMLPaneBodyElement = function HTMLPaneBodyElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLPaneBodyElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLPaneBodyElement", e);
	
	};
	
};DCM.HTMLPaneElement = function HTMLPaneElement() {

	try {
		
		var	
		head = this.head = new DCM.HTMLPaneHeadElement(),
		body = this.body = new DCM.HTMLPaneBodyElement(),
		foot = this.foot = new DCM.HTMLPaneFootElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLPaneElement");
		
		this.append(head);
		this.append(body);
		this.append(foot);
		
	}
	catch(e) {
	
		DCM.warn("HTMLPaneElement", e);
	
	};
	
};DCM.HTMLPaneFootElement = function HTMLPaneFootElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLPaneFootElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLPaneFootElement", e);
	
	};
	
};DCM.HTMLPaneHeadElement = function HTMLPaneHeadElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLPaneHeadElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLPaneHeadElement", e);
	
	};
	
};DCM.HTMLPanelElement = function HTMLPanelElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLPanelElement");
		
		this.setPanelType = function setPanelType(value) {
			this.setAttribute("data-panel-type", value);
		};
		
	}
	catch(e) {
	
		DCM.warn("HTMLPanelElement", e);
	
	};
	
};DCM.HTMLPasswordInputElement = function HTMLPasswordInputElement() {

	try {
		
		this._super = DCM.HTMLInputElement;
		this._super();
		
		this.setAttribute("type", "password");
		
	}
	catch(e) {
		
		DCM.warn("HTMLPasswordInputElement", e);
		
	};
	
};DCM.HTMLPasswordStrengthElement = function HTMLPasswordStrengthElement() {

	try {
		
		var
		passwordOneStrength,
		passwordTwoStrength,
		passwordThreeStrength;
		
		this._super = DCM.HTMLRowElement;
		this._super();
		
		this.setStrength(-1);
		
		passwordOneStrength = this.addColumn(),
		passwordTwoStrength = this.addColumn(),
		passwordThreeStrength = this.addColumn();
		
		this.setStrength = function setStrength(value) {
			this.setAttribute("data-strength", value);
		};
		
		this.setType("HTMLPasswordStrengthElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLPasswordStrengthElement", e);
		
	};
	
};DCM.HTMLPinGraphicButtonElement = function HTMLPinGraphicButtonElement() {


	try {
		
		var
		_this = this;
		
		this._super = DCM.HTMLGraphicButtonToggleElement;
		this._super();
		
		this.setRole("pin-to-dashboard");
		this.setSize("2");
		this.setLabel(DCM.Resources.getResource("PinToDashboardLabel"));
		this.setType("HTMLPinGraphicButtonElement");
		
		this.addEventHandler("ACTIVE_CHANGE", function() {
			
			if(_this.active) {
				_this.setLabel(DCM.Resources.getResource("UnpinFromDashboardLabel"));
			}
			else {
				_this.setLabel(DCM.Resources.getResource("PinToDashboardLabel"));
			};
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLPinGraphicButtonElement", e);
		
	};
	
};DCM.HTMLPortfolioAddElement = function HTMLPortfolioAddElement() {

	try {
	
		var
		_this = this,
		addPortfolioButtonInner = new DCM.HTMLDivElement(),
		addPortfolioButtonHeading = new DCM.HTMLDivElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLPortfolioAddElement");
		
		addPortfolioButtonInner.setAttribute("data-add-portfolio-role", "icon");
		addPortfolioButtonHeading.setAttribute("data-add-portfolio-role", "heading");
		
		addPortfolioButtonHeading.setText(DCM.Resources.getResource("CreatePortfolioLabel"));
		
		this.append(addPortfolioButtonInner);
		this.append(addPortfolioButtonHeading);
		
	}
	catch(e) {
	
		DCM.warn("HTMLPortfolioAddElement", e);
	
	};
	
};DCM.HTMLPortfolioModuleContextMenuElement = function HTMLPortfolioModuleContextMenuElement(target) {
	
	try {
	
		var
		_this = this;
		
		this._super = DCM.HTMLModuleContextMenuElement;
		this._super(target);
		
		this.setItem(DCM.Resources.getResource("DeletePortfolioLabel"), function() {
			
			DCM.PortfolioManager.authorDeletePortfolio(_this.target);
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLPortfolioModuleContextMenuElement", e);
		
	};
	
};DCM.HTMLPortfolioModuleElement = function HTMLPortfolioModuleElement(data) {

	// consider re-working the porfolio getters/setters logic
	
	try {
		
		var
		_this = this,
		setName = _this.setName = function setName(value) {
			var val = _this.name = value;
			_this.setHeading(val);
		},
		items = _this.items = [],
		table = new DCM.HTMLTableElement(),
		foot = new DCM.HTMLModuleFootElement(),
		marketHeading = table.addColumnHeading(DCM.Resources.getResource("MarketLabel")),
		profitAndLossHeading = table.addColumnHeading(DCM.Resources.getResource("ProfitLossLabel")),
		data = _this.data = data,
		getProfitAndLoss = _this.getProfitAndLoss = function getProfitAndLoss(asNumber) {
			
			var _return = _this.profitAndLoss;
			
			if(asNumber) {
				_return = Number(_return);
			}
			else {
				_return = Number(_return).toFixed(2);
			};
			
			return _return;
			
		},
		getProfitAndLossAsHTML = _this.getProfitAndLossAsHTML = function getProfitAndLossAsHTML() {
			
			var 
			directionName,
			numericValue = getProfitAndLoss(true),
			displayValue = getProfitAndLoss(),
			_return;
			
			if(numericValue>0) {
				directionName = "POSITIVE";
				_return = ("<span data-value-direction-name=\"" + directionName + "\">+" + displayValue + "</span>");
			}
			else if(numericValue<0) {
				directionName = "NEGATIVE";
				_return = ("<span data-value-direction-name=\"" + directionName + "\">" + displayValue + "</span>");
			}
			else {
				directionName = "NONE";
				_return = ("<span data-value-direction-name=\"" + directionName + "\">" + displayValue + "</span>");
			};
			
			return _return;
			
		},
		setProfitAndLoss = function setProfitAndLoss(value) {
			
			//DCM.log("HTMLPortfolioModuleElement.setProfitAndLoss(" + value + ")");
			
			if(DCM.isNull(value)) {
				return;
			};
			
			_this.profitAndLoss = value;
			
			foot.setText(DCM.Resources.getResource("ProfitLossLabel") + ": " + getProfitAndLossAsHTML());
			_this.dispatchEventHandler("PROFITLOSS_CHANGE");
			
		},
		setConsideration = function setConsideration(value) {
			//DCM.log("HTMLPortfolioModuleElement.setConsideration(" + value + ")");
			_this.consideration = value;
			_this.dispatchEventHandler("CONSIDERATION_CHANGE");
		},
		profitAndLossToSet,
		considerationToSet,
		addPosition = _this.addPosition = function addPosition(data) {
			
			var 
			item = new DCM.HTMLPortfolioModuleItemElement(data, _this),
			profitlossChangeHandler = function profitlossChangeHandler() {
			
				profitAndLossToSet = 0;
				
				for(var _item in items) {
					profitAndLossToSet += items[_item].position.getProfitAndLoss(true);
				};
				
				setProfitAndLoss(profitAndLossToSet);
				
			},
			sizeChangeHandler = function sizeChangeHandler() {
			
				considerationToSet = 0;
				
				for(var _item in items) {
					considerationToSet += items[_item].position.consideration;
				};
				
				setConsideration(considerationToSet);
				
			},
			destroyHandler = function destroyHandler() {
			
				items.splice(DCM.getIndexOf(items, item), 1);
				
				profitlossChangeHandler();
				sizeChangeHandler();
				
				item.removeEventHandler("PROFITLOSS_CHANGE", profitlossChangeHandler);
				item.removeEventHandler("SIZE_CHANGE", sizeChangeHandler);
				item.removeEventHandler("DESTROY", destroyHandler);
				
			};
			
			table.body.prepend(item);
			items.push(item);
			
			item.addEventHandler("PROFITLOSS_CHANGE", profitlossChangeHandler).dispatch();
			item.addEventHandler("SIZE_CHANGE", sizeChangeHandler).dispatch();
			item.addEventHandler("DESTROY", destroyHandler);
			
			return item;
		
		};
		
		this._super = DCM.HTMLScrollableModuleElement;
		this._super();
		
		_this.body.append(foot);
		
		foot.setText(DCM.Resources.getResource("ProfitLossLabel") + ":");
		
		_this.setMoveable(false);
		_this.setUnpinable(false);
		_this.setType("HTMLPortfolioModuleElement");
		_this.setServiceCall("GetPortfolioService");
		_this.serviceCall.setParam("portfolioName", data.title);
		_this.setContextMenu("HTMLPortfolioModuleContextMenuElement");
		
		_this.addEventHandler("UPDATE", function(data) {
		
			table.body.empty();
			
			var positions = data.positions;
			
			for(var position in positions) {
				addPosition(positions[position]);
			};
			
		});
		
		_this.addEventHandler("DESTROY", function() {
		
			DCM.PortfolioManager.portfolios.splice(DCM.getIndexOf(DCM.PortfolioManager.portfolios, _this), 1);
			
		});
		
		_this.update();
		
		_this.scroller.body.append(table);
		_this.scroller.setHeight(120);
		
		table.setAttribute("data-portfolio-role", "table");
		
		setName(data.title);
		setProfitAndLoss(0);
		setConsideration(0);
		
	}
	catch(e) {
		
		DCM.warn("HTMLPortfolioModuleElement", e);
		
	};
	
};DCM.HTMLPortfolioModuleItemContextMenuElement = function HTMLPortfolioModuleItemContextMenuElement(target) {

	try {
		
		var
		_this = this;
		
		this._super = DCM.HTMLContextMenuElement;
		this._super(target);
		
		this.setItem(DCM.Resources.getResource("RemoveFromPortfolioLabel"), function() {
		
			DCM.PortfolioManager.authorDeleteFromPortfolio(_this.target);
			
		});
		
		this.setItem(DCM.Resources.getResource("addNoteLabel"), function() {
			
			// perhaps could be changed to match the manager methods
			_this.target.position.instrument.addNote();
			
		});
		
		this.setItem(DCM.Resources.getResource("AddAlertLabel"), function() {
			
			// perhaps could be changed to match the manager methods
			_this.target.position.instrument.createAlert();
			
		});
		
		this.setItem(DCM.Resources.getResource("EditPositionLabel"), function() {
		
			_this.target.editPosition();
			
		});
		
		this.setItem(DCM.Resources.getResource("ClosePositionLabel"), function() {
		
			DCM.PositionManager.publishClosePosition(_this.target.position);
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLPortfolioModuleItemContextMenuElement", e);
		
	};
	
};DCM.HTMLPortfolioModuleItemElement = function HTMLPortfolioModuleItemElement(data, portfolio) {

	try {
		
		var
		_this = this,
		data = _this.data = data,
		prop1,
		prop2,
		portfolio = _this.portfolio = portfolio,
		position = _this.position = DCM.PositionManager.getPositionById(data.id),
		itemHead = new DCM.HTMLDivElement(),
		itemFoot = new DCM.HTMLDivElement(),
		destroy = _this.destroy = function destroy() {
			
			_this.remove();
			
			position.removeEventHandler("CLOSE", positionCloseHandler);
			position.removeEventHandler("SIZE_CHANGE", sizeChangeHandler);
			position.removeEventHandler("PROFITLOSS_CHANGE", profitLossChangeHandler);
			
			_this.dispatchEventHandler("DESTROY");
			
		},
		sizeChangeHandler = function sizeChangeHandler() {
			itemFoot.setText(position.getSizeAsHTML() + " @ " + position.entryPrice);
			_this.dispatchEventHandler("SIZE_CHANGE");
		},
		profitLossChangeHandler = function profitLossChangeHandler() {
			setProfitAndLoss(position.getProfitAndLossAsHTML());
		},
		setProfitAndLoss = _this.setProfitAndLoss = function setProfitAndLoss(value) {
			//DCM.log("HTMLPortfolioModuleItemElement.setProfitAndLoss(" + value + ")");
			if(!value) {
				return;
			};
			prop2.setText(value);
			_this.dispatchEventHandler("PROFITLOSS_CHANGE");
		},
		positionCloseHandler = function positionCloseHandler() {
			destroy();
		},
		positionCreateHandler = function positionCreateHandler(_data) {
		
			// check it's the correct ID
			if(data.id===_data) {
			
				position = _this.position = DCM.PositionManager.getPositionById(_data);
				
				_this.setAttribute("title", position.instrument.getDisplayText());
				
				position.addEventHandler("CLOSE", positionCloseHandler);
				position.addEventHandler("SIZE_CHANGE", sizeChangeHandler).dispatch();
				position.addEventHandler("PROFITLOSS_CHANGE", profitLossChangeHandler).dispatch();
				
				itemHead.setText(position.instrument.getDisplayTextAsHTML());
				
				DCM.PositionManager.removeEventHandler("CREATE", positionCreateHandler);
			
			};
			
		},
		editPosition = _this.editPosition = function editPosition() {
			
			DCM.PositionManager.authorEditPosition(position);
		
		};
		
		this._super = DCM.HTMLTRElement;
		this._super();
		
		DCM.log("new HTMLPortfolioModuleItemElement()", _this);
		
		prop1 = _this.addColumn();
		prop2 = _this.addColumn("-");
		
		if(position) {
			
			positionCreateHandler(data.id);
		
		}
		else {
			
			DCM.PositionManager.addEventHandler("CREATE", positionCreateHandler);
			
		};
		
		itemHead.setAttribute("data-portfolio-item-role", "head");
		itemFoot.setAttribute("data-portfolio-item-role", "foot");
		
		prop1.append(itemHead);
		prop1.append(itemFoot);
		
		_this.addEventListener(DCM.Event.contextmenu, function(e) {
			
			var _contextMenu = new DCM.HTMLPortfolioModuleItemContextMenuElement(_this);
			_contextMenu.setX(e.clientX);
			_contextMenu.setY(e.clientY);
			
			return false;
		
		});
		
		_this.addEventListener(DCM.Event.doubleclick, function() {
			
			editPosition();
			
			return false;
			
		});
		
		/*
		_this.addEventListener(DCM.Event.mouseenter, function() {
		
			position.instrument.dispatchEventHandler("INTERACT_START");
			
			return false;
			
		});
		
		_this.addEventListener(DCM.Event.mouseleave, function() {
		
			position.instrument.dispatchEventHandler("INTERACT_END");
			
			return false;
			
		});
		*/
		/*
		
		position.instrument.addEventHandler("INTERACT_START", function() {
		
			_this.setAttribute("data-interactive", "true");
			
			return false;
			
		});
		
		position.instrument.addEventHandler("INTERACT_END", function() {
		
			_this.setAttribute("data-interactive", "false");
			
			return false;
			
		});
		*/
	
	}
	catch(e) {
	
		DCM.warn("HTMLPortfolioModuleItemElement", e);
	
	};
	
};DCM.HTMLPortfoliosModuleContextMenuElement = function HTMLPortfoliosModuleContextMenuElement(target) {

	try {
		
		this._super = DCM.HTMLModuleContextMenuElement;
		this._super(target);
		
		this.setItem(DCM.Resources.getResource("CreatePortfolioLabel"), function() {
			
			DCM.PortfolioManager.authorNewPortfolio();
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLPortfoliosModuleContextMenuElement", e);
		
	};
	
};DCM.HTMLPortfoliosModuleElement = function HTMLPortfoliosModuleElement() {

	try {
	
		var
		_this = this,
		clearDiv = new DCM.HTMLClearElement(),
		addPortfolioButton = new DCM.HTMLPortfolioAddElement(),
		barChartOptions = {
			width: 150,
			height: 90,
			backgroundColor: "transparent",
			vAxis: {
				gridlines: {
					count: 0
				},
				textPosition: "none",
				baselineColor: "#CCCCCC",
				viewWindow: {
					max: 100
				}
			},
			hAxis: {
				gridlines: {
					count: 0
				},
				textPosition: "none",
				baselineColor: "#CCCCCC"
			},
			chartArea: {
				height: 70
			},
			legend: {
				position: "none"
			},
			tooltip: {
				textStyle: {
					color: "#555555",
					fontSize: 11
				}
			}
		},
		chartOptions = {
			width: 400,
			height: 100,
			backgroundColor: "transparent",
			pieSliceText: "none",
			pieHole: 0.80,
			fontName: "OpenSansRegular,Arial,Helvetica,sans-serif",
			tooltip: {
				textStyle: {
					color: "#555555",
					fontSize: 11
				},
				text: "both"
			},
			chartArea: {
				height: 80,
				left: 0
			},
			legend: {
				left: 0
			}
		},
		addPortfolio = _this.addPortfolio = function addPortfolio(data) {
			
			var 
			portfolio = DCM.PortfolioManager.createPortfolio(data),
			profitLossChangeHandler = function profitLossChangeHandler() {
				updateBarChart();
			},
			considerationChangeHandler = function considerationChangeHandler() {
				updateChart();
			},
			portfolioDestoryHandler = function portfolioDestoryHandler() {
				
				portfolio.removeEventHandler("PROFITLOSS_CHANGE", profitLossChangeHandler);
				portfolio.removeEventHandler("CONSIDERATION_CHANGE", considerationChangeHandler);
				portfolio.removeEventHandler("DESTROY", portfolioDestoryHandler);
			
			};
			
			_this.scroller.body.prepend(portfolio);
			
			portfolio.addEventHandler("PROFITLOSS_CHANGE", profitLossChangeHandler);
			portfolio.addEventHandler("CONSIDERATION_CHANGE", considerationChangeHandler);
			portfolio.addEventHandler("DESTROY", portfolioDestoryHandler);
			
			updateChart();
			updateBarChart();
			return portfolio;
		
		},
		foot = _this.foot = new DCM.HTMLModuleFootElement(),
		considerationChartHolder = new DCM.HTMLDivElement(),
		profitAndLossChartHolder = new DCM.HTMLDivElement(),
		considerationChartWrap = new DCM.HTMLDivElement(),
		profitAndLossChartWrap = new DCM.HTMLDivElement(),
		considerationHeading = new DCM.HTMLDivElement(),
		profitAndLossHeading = new DCM.HTMLDivElement(),
		considerationChart = new google.visualization.PieChart(considerationChartHolder.displayObject),
		profitAndLossChart = new google.visualization.ColumnChart(profitAndLossChartHolder.displayObject),
		updateChart = _this.updateChart = function updateChart() {
			
			var data = new google.visualization.arrayToDataTable(DCM.PortfolioManager.getConsiderationData());
			considerationChart.draw(data, chartOptions);
			
		},
		updateBarChart = _this.updateBarChart = function updateBarChart() {
			
			var data = google.visualization.arrayToDataTable(DCM.PortfolioManager.getProfitAndLossData());
			profitAndLossChart.draw(data, barChartOptions);
			
		};
		
		this._super = DCM.HTMLScrollableModuleElement;
		this._super();
		
		_this.scroller.setHeight(215);
		
		_this.body.append(foot);
		
		considerationChartWrap.append(considerationHeading);
		//profitAndLossChartWrap.append(profitAndLossHeading);
		considerationChartWrap.append(considerationChartHolder);
		//profitAndLossChartWrap.append(profitAndLossChartHolder);
		
		foot.append(considerationChartWrap);
		foot.append(profitAndLossChartWrap);
		
		considerationHeading.setText(DCM.Resources.getResource("ConsiderationGraphHeadingLabel"));
		considerationHeading.setAttribute("title", DCM.Resources.getResource("ConsiderationTooltipLabel"));
		profitAndLossHeading.setText("Profit/Loss");
		
		considerationChartWrap.setAttribute("data-portfolio-role", "pie-chart");
		profitAndLossChartWrap.setAttribute("data-portfolio-role", "bar-chart");
		
		considerationHeading.setAttribute("data-portfolio-chart-role", "chart-heading");
		profitAndLossHeading.setAttribute("data-portfolio-chart-role", "chart-heading");
		
		_this.setIcon("my-portfolio");
		_this.setHeading(DCM.Resources.getResource("PortfoliosPanelHeading"));
		_this.setServiceCall("GetPortfoliosService");
		_this.setType("HTMLPortfoliosModuleElement");
		_this.setContextMenu("HTMLPortfoliosModuleContextMenuElement");
		_this.addEventHandler("UPDATE", function(data) {
		
			_this.refresh();
			
			var target = data.portfolios;
		
			for(var prop in target) {
			
				addPortfolio(target[prop]);
				
			};
			
			_this.scroller.body.append(clearDiv);
			
		});
		
		_this.update();
		
		_this.scroller.body.prepend(addPortfolioButton);
		addPortfolioButton.addEventListener(DCM.Event.click, function() {
			
			DCM.PortfolioManager.authorNewPortfolio();
			
		});
		
	}
	catch(e) {
	
		DCM.warn("HTMLPortfoliosModuleElement", e);
	
	};
	
};DCM.HTMLPositionsModuleContextMenuElement = function HTMLPositionsModuleContextMenuElement(target) {

	try {
		
		var
		_this = this,
		aggrigateViewItem;
		
		this._super = DCM.HTMLModuleContextMenuElement;
		this._super(target);
		
		/*
		 
		// to be implemented post-launch
		 
		aggrigateViewItem = _this.setItem("Aggregate view", function() {
			
			_this.target.aggregateView = !_this.target.aggregateView;
			_this.target.serviceCall.setParam("isAggregate", _this.target.aggregateView);
			_this.target.update();
			
		});
		
		if(_this.target.serviceCall.getParam("isAggregate")==="true") {
		
			aggrigateViewItem.setToggle(true);
		
		};
		
		*/
		
	}
	catch(e) {
		
		DCM.warn("HTMLPositionsModuleContextMenuElement", e);
		
	};
	
};DCM.HTMLPositionsModuleElement = function HTMLPositionsModuleElement() {
	
	try {
	
		this._super = DCM.HTMLScrollableModuleElement;
		this._super();
	
		var 
		_this = this,
		_table = new DCM.HTMLTableElement(),
		marketCol = _table.addColumnHeading(DCM.Resources.getResource("MarketLabel")),
		sizeCol = _table.addColumnHeading(DCM.Resources.getResource("SizeLabel")),
		stopCol = _table.addColumnHeading(DCM.Resources.getResource("StopLabel")),
		limitCol = _table.addColumnHeading(DCM.Resources.getResource("LimitLabel")),
		entryPriceCol = _table.addColumnHeading(DCM.Resources.getResource("EntryPriceLabel")),
		marketPriceCol = _table.addColumnHeading(DCM.Resources.getResource("MarketPriceLabel")),
		profitLossCol = _table.addColumnHeading(DCM.Resources.getResource("ProfitLossLabel")),
		aggregateView = _this.aggregateView = false,
		addPosition = _this.addPosition = function addPosition(data) {
		
			var item = DCM.PositionManager.createOpenPosition(data);
			_table.body.prepend(item);
			hideNoItemsNotification();
			
			item.addEventHandler("DESTROY", positionDestroyHandler);
			
			return item;
		
		},
		updateHandler = function updateHandler(data, panel) {
			
			var 
			added = data.added,
			closed = data.removed,
			modified = data.modified;
			
			for(var addedItem in added) {
			
				addPosition(added[addedItem]);
				
			};
			
			for(var closedItem in closed) {
			
				DCM.PositionManager.getPositionById(closed[closedItem]).close();
				
			};
			
			for(var modifiedItem in modified) {
			
				var pos = DCM.PositionManager.getPositionById(modified[modifiedItem].id);
				pos.modify(modified[modifiedItem]);
				
			};
			
			_this.serviceCall.setParam("prevPositionsIds", DCM.PositionManager.getCurrentPositionIDs().join(","));
			
			// temp fix to stop preview accounts from continuously polling
			if(DCM.AccountManager.isPreviewAccount()) {
				
				_this.stop();
				
			};
			
		},
		noItemsNotification = new DCM.HTMLNoItemsNotificationElement(),
		showNoItemsNotification = function showNoItemsNotification() {
			
			noItemsNotification.show();
			tableWrap.hide();
			
		},
		hideNoItemsNotification = function hideNoItemsNotification() {
			
			noItemsNotification.hide();
			tableWrap.show();
			
		},
		positionDestroyHandler = function positionDestroyHandler() {
			
			if(DCM.PositionManager.positions.length===0) {
				showNoItemsNotification();
			};
			
		},
		tableWrap = new DCM.HTMLDivElement();
		
		_this.setUnpinable(false);
		_this.setAutoStart(true);
		_this.setIcon("open-positions");
		_this.setHeading(DCM.Resources.getResource("OpenPositionsPanelHeading"));
		_this.setType("HTMLPositionsModuleElement");
		_this.setUpdateFrequency(1000);
		_this.setContextMenu("HTMLPositionsModuleContextMenuElement");
		_this.setServiceCall("GetPositionsService");
		_this.serviceCall.setParam("isAggregate", _this.aggregateView);
		_this.setResizeable(true);
		
		tableWrap.append(_table);
		
		_this.scroller.body.append(tableWrap);
		_this.scroller.setHeight(350);
		_this.refresh();
		
		_this.scroller.body.append(noItemsNotification);
		noItemsNotification.setText(DCM.Resources.getResource("NoPositionsLabel"));
		
		_this.addEventHandler("UPDATE", updateHandler);
		
		showNoItemsNotification();
		
		marketCol.setAttribute("title", DCM.Resources.getResource("MarketTooltipLabel"));
		sizeCol.setAttribute("title", DCM.Resources.getResource("SizeTooltipLabel"));
		stopCol.setAttribute("title", DCM.Resources.getResource("StopTooltipLabel"));
		limitCol.setAttribute("title", DCM.Resources.getResource("LimitTooltipLabel"));
		entryPriceCol.setAttribute("title", DCM.Resources.getResource("EntryPriceTooltipLabel"));
		marketPriceCol.setAttribute("title", DCM.Resources.getResource("MarketPriceTooltipLabel"));
		profitLossCol.setAttribute("title", DCM.Resources.getResource("ProfitLossTooltipLabel"));
		
	}
	catch(e) {
	
		DCM.warn("HTMLPositionsModuleElement", e);	
	
	};
};DCM.HTMLPositionsModuleItemContextMenuElement = function HTMLPositionsModuleItemContextMenuElement(target) {

	try {
		
		var
		_this = this,
		addToPortfolioItem;
		
		this._super = DCM.HTMLContextMenuElement;
		this._super(target);
		
		this.setItem(DCM.Resources.getResource("EditPositionLabel"), function() {
		
			_this.target.editPosition();
			
		});
		
		this.setItem(DCM.Resources.getResource("addNoteLabel"), function() {
			
			DCM.NoteManager.createNoteFromPosition(_this.target.Position);
			
		});
		
		this.setItem(DCM.Resources.getResource("AddAlertLabel"), function() {
		
			DCM.AlertManager.createAlertFromInstrument(_this.target.Position.instrument);
			
		});
		
		this.setItem(DCM.Resources.getResource("AddToWatchlistLabel"), function() {
		
			DCM.WatchlistManager.authorAddToWatchlist(_this.target.Position.instrument);
			
		});
		
		addToPortfolioItem = this.setItem(DCM.Resources.getResource("AddToPortfolioLabel"), function() {
			
			DCM.PortfolioManager.authorAddToPortfolio(_this.target.Position);
			
		});
		
		if(DCM.PortfolioManager.portfolios.length===0) {
			addToPortfolioItem.disable();
		};
		
		this.setItem(DCM.Resources.getResource("OpenChartLabel"), function() {
			
			_this.target.Position.instrument.openChart();
			
		});
		
		this.setItem(DCM.Resources.getResource("PinChartToDashboardLabel"), function() {
			
			var chart = _this.target.Position.instrument.openChart();
			chart.pin();
			
		});
		
		this.setItem(DCM.Resources.getResource("ClosePositionLabel"), function() {
		
			DCM.PositionManager.publishClosePosition(_this.target.Position);
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLPositionsModuleItemContextMenuElement", e);
		
	};
	
};DCM.HTMLPositionsModuleItemElement = function HTMLPositionsModuleItemElement(Position) {

	try {
	
		this._super = DCM.HTMLTRElement;
		this._super();
	
		var 
		_this = this,
		Position = _this.Position = Position,
		marketColumn,
		sizeColumn,
		stopColumn,
		limitColumn,
		entryPriceColumn,
		marketPriceColumn,
		profitAndLossColumn,
		setName = function setName(value, title) {
			marketColumn.setText(value);
			_this.setAttribute("title", title);
		},
		setSize = function setSize(value) {
			sizeColumn.setText(value);
		},
		setStop = function setStop(value) {
			if(DCM.isNull(value)) {
				value = "-";
			};
			stopColumn.setText(value);
		},
		setLimit = function setLimit(value) {
			if(DCM.isNull(value)) {
				value = "-";
			};
			limitColumn.setText(value);
		},
		setEntryPrice = function setEntryPrice(value) {
			entryPriceColumn.setText(value);
		},
		setMarketPrice = function setMarketPrice(value, direction) {
			if(!value) {
				return;
			};
			marketPriceColumn.setText(value);
			marketPriceColumn.setAttribute("data-value-direction", "NONE");
			marketPriceColumn.setAttribute("data-value-direction", direction);
		},
		setProfitAndLoss = function setProfitAndLoss(value) {
			//DCM.log("setProfitAndLoss(" + displayValue + ")");
			if(!value) {
				return;
			};
			profitAndLossColumn.setText(value);
		},		
		destroy = function destroy() {
		
			_this.remove();
			_this.dispatchEventHandler("DESTROY");
			
			Position.removeEventHandler("MARKET_PRICE_CHANGE", marketPriceChangeHandler);
			Position.removeEventHandler("PROFITLOSS_CHANGE", profitLossChangeHandler);
			Position.removeEventHandler("STOP_CHANGE", stopChangeHandler);
			Position.removeEventHandler("LIMIT_CHANGE", limitChangeHandler);
			Position.removeEventHandler("SIZE_CHANGE", sizeChangeHandler);
			Position.removeEventHandler("CLOSE", closeHandler);
			
		},
		editPosition = _this.editPosition = function editPosition() {
			DCM.PositionManager.authorEditPosition(Position);
		},
		marketPriceChangeHandler = function marketPriceChangeHandler(e) {
			setMarketPrice(Position.marketPrice, e.direction);
		},
		profitLossChangeHandler = function profitLossChangeHandler() {
			setProfitAndLoss(Position.getProfitAndLossAsHTML());
		},
		closeHandler = function closeHandler() {
			destroy();
		},
		stopChangeHandler = function stopChangeHandler() {
			setStop(Position.getStopPrice());
		},
		limitChangeHandler = function limitChangeHandler() {
			setLimit(Position.getLimitPrice());
		},
		sizeChangeHandler = function sizeChangeHandler() {
			setSize(Position.getSizeAsHTML());
		};
		
		marketColumn = _this.addColumn("-");
		sizeColumn = _this.addColumn("-");
		stopColumn = _this.addColumn("-");
		limitColumn = _this.addColumn("-");
		entryPriceColumn = _this.addColumn("-");
		marketPriceColumn = _this.addColumn("-");
		profitAndLossColumn = _this.addColumn("-");
		
		if(!Position.instrument) {
			setName("DELETE");
			return;
		};
		
		setName(Position.instrument.getDisplayTextAsHTML(), Position.instrument.getDisplayText());
		setEntryPrice(Position.entryPrice);
		
		Position.addEventHandler("MARKET_PRICE_CHANGE", marketPriceChangeHandler).dispatch({
			direction: "NO_DIRECTION"
		});
		Position.addEventHandler("PROFITLOSS_CHANGE", profitLossChangeHandler).dispatch();
		Position.addEventHandler("STOP_CHANGE", stopChangeHandler).dispatch();
		Position.addEventHandler("LIMIT_CHANGE", limitChangeHandler).dispatch();
		Position.addEventHandler("SIZE_CHANGE", sizeChangeHandler).dispatch();
		Position.addEventHandler("CLOSE", closeHandler);
		
		_this.addEventListener(DCM.Event.contextmenu, function(e) {
			
			var _contextMenu = new DCM.HTMLPositionsModuleItemContextMenuElement(_this);
			_contextMenu.setX(e.clientX);
			_contextMenu.setY(e.clientY);
			
			return false;
		
		});
		
		_this.addEventListener(DCM.Event.doubleclick, function() {
			
			editPosition();
			
			return false;
		
		});
		
		/*
		instrument&&instrument.addEventHandler("INTERACT_START", function() {
			
			_this.setAttribute("data-interactive", true);
			
		});
		
		instrument&&instrument.addEventHandler("INTERACT_END", function() {
		
			_this.setAttribute("data-interactive", false);
			
		});
		
		_this.addEventListener(DCM.Event.mouseenter, function() {
			
			instrument&&instrument.dispatchEventHandler("INTERACT_START");
			
		});
		
		_this.addEventListener(DCM.Event.mouseleave, function() {
			
			instrument&&instrument.dispatchEventHandler("INTERACT_END");
			
		});
		*/
		
	}
	catch(e) {
	
		DCM.warn("HTMLPositionsModuleItemElement", e);
	
	};
};DCM.HTMLPromptDialogElement = function HTMLPromptDialogElement() {

	try {
		
		this._super = DCM.HTMLDynamicMessageDialogElement;
		this._super();
		
		this.getValue = function getValue() {
			return this.input.getValue();
		};
		
		this.setValue = function setValue(value) {
			this.input.setValue(value);
		};
		
		this.setInput = function setInput(obj) {
			this.input = obj;
			this.body.append(obj);
		};
		
		this.setHeading("Default prompt heading");
		this.setType("HTMLPromptDialogElement");
	
	}
	catch(e) {
	
		DCM.warn("HTMLPromptDialogElement", e);
	
	};
	
};DCM.HTMLPromptSelectDialogElement = function HTMLPromptSelectDialogElement() {

	try {
	
		this._super = DCM.HTMLPromptDialogElement;
		this._super();
		
		this.setInput(new DCM.HTMLDynamicSelectMenuElement());
		
		this.input.setWidth(410);
		
		this.setHeading("Default select-prompt heading");
		
		this.setType("HTMLPromptSelectDialogElement");
		
		this.setItem = function setItem(label, value) {
			this.input.setItem(label, value);
		};
		
	}
	catch(e) {
	
		DCM.warn("HTMLPromptSelectDialogElement", e);
	
	};
	
};DCM.HTMLPromptTextAreaDialogElement = function HTMLPromptTextAreaDialogElement() {

	try {
		
		this._super = DCM.HTMLPromptDialogElement;
		this._super();
		
		this.setInput(new DCM.HTMLCustomTextAreaElement());
		
		this.setHeading("Default prompt heading");
		
		this.setType("HTMLPromptTextAreaDialogElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLPromptTextAreaDialogElement", e);
		
	};
	
};DCM.HTMLPromptTextFieldDialogElement = function HTMLPromptTextFieldDialogElement() {

	try {
		
		this._super = DCM.HTMLPromptDialogElement;
		this._super();
		
		this.setInput(new DCM.HTMLCustomTextInputElement());
		this.setHeading("Default prompt heading");
		this.setType("HTMLPromptTextFieldDialogElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLPromptTextFieldDialogElement", e);
		
	};
	
};DCM.HTMLRadioButtonElement = function HTMLRadioButtonElement() {

	try {
		
		this._super = DCM.HTMLCheckElement;
		this._super();
		
		this.setType("HTMLRadioButtonElement");
		
	}
	catch(e) {
	
		DCM.warn("HTMLRadioButtonElement", e);
	
	};
	
};DCM.HTMLRadioButtonGroupElement = function HTMLRadioButtonGroupElement() {

	try {

		// look into allowing optional radio buttons - which do not lock the user into selecting
		
		var
		_this = this,
		items = [],
		suppressEvent = false,
		setItem = _this.setItem = function setItem(label, value) {
		
			var
			item = new DCM.HTMLRadioButtonGroupItemElement(),
			radioButton = new DCM.HTMLRadioButtonElement();
			
			radioButton.addEventHandler("CHANGE", function() {
				
				var loop = items.length;
				while(loop--) {
					items[loop].setChecked(false, true);
				};
				this.setChecked(true, true);
				if(this.value===_this.value) {
					return;
				};
				_this.value = this.value;
				_this.dispatchEventHandler("CHANGE");
				return false;
				
			});
			
			radioButton.label.setText(label);
			
			radioButton.setValue(value);
			
			item.append(radioButton);
			_this.append(item);
			
			items.push(radioButton);
			
			return radioButton;
			
		},
		getValue = _this.getValue = function getValue() {
			
			return _this.value;
		
		},
		setValue = _this.setValue = function setValue(value, suppressEvent) {
		
			var loop = items.length;
			while(loop--) {
				if(items[loop].value===value) {
					items[loop].check.dispatchEventListener(DCM.Event.click);
					break;
				};
			};
			
		};
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		_this.setType("HTMLRadioButtonGroupElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLRadioButtonGroupElement", e);
		
	};
	
};DCM.HTMLRadioButtonGroupItemElement = function HTMLRadioButtonGroupItemElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLRadioButtonGroupItemElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLRadioButtonGroupItemElement", e);
	
	};
	
};DCM.HTMLRowElement = function HTMLRowElement() {

	try {
		
		var
		inc = 0,
		clear = new DCM.HTMLClearElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLRowElement");
		
		this.addColumn = function addColumn() {
			var column = new DCM.HTMLColumnElement();
			column.setId(inc);
			inc ++;
			this.append(column);
			this.append(clear);
			return column;
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLRowElement", e);
		
	};
	
};DCM.HTMLScriptElement = function HTMLScriptElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("script");
		
	}
	catch(e) {
		
		DCM.warn("HTMLScriptElement", e);
		
	};
	
};DCM.HTMLScrollableModuleElement = function HTMLScrollableModuleElement() {

	try {
	
		var
		_this = this,
		scroller = _this.scroller = new DCM.HTMLScrollPanelElement(),
		refresh = _this.refresh = function() {
			scroller.refresh();
		};
		
		this._super = DCM.HTMLModuleElement;
		this._super();
		
		_this.body.append(scroller);
		_this.setType("HTMLScrollableModuleElement");
		
		// set module body to HTMLScrollPanelElement.body - may not be best approach but works well for now
		//_this.body = scroller.body;
	
	}
	catch(e) {
	
		DCM.warn("HTMLScrollableModuleElement", e);
	
	};
	
};DCM.HTMLScrollPanelBodyElement = function HTMLScrollPanelBodyElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLScrollPanelBodyElement");
		this.setStyle("position", "relative");
		
	}
	catch(e) {
		
		DCM.warn("HTMLScrollPanelBodyElement", e);
		
	};
	
};DCM.HTMLScrollPanelElement = function HTMLScrollPanelElement() {
	
	try {
		
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
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
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
		
	}
	catch(e) {
		
		DCM.warn("HTMLScrollPanelElement", e);
		
	};
	
};DCM.HTMLScrollPanelHandleElement = function HTMLScrollPanelHandleElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLScrollPanelHandleElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLScrollPanelHandleElement", e);
		
	};
	
};DCM.HTMLSelectAccountTypeCFDDialogButtonElement = function HTMLSelectAccountTypeCFDDialogButtonElement() {

	try {
		
		this._super = DCM.HTMLSelectAccountTypeDialogButtonElement;
		this._super();
		
		this.setName(DCM.Resources.getResource("UpgradeAccountCFDTradingNameLabel"));
		this.setDescription(DCM.Resources.getResource("UpgradeAccountCFDTradingLabel"));
		this.setType("HTMLSelectAccountTypeCFDDialogButtonElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLSelectAccountTypeCFDDialogButtonElement", e);
		
	};
	
};DCM.HTMLSelectAccountTypeDialogApplyButtonElement = function HTMLSelectAccountTypeDialogApplyButtonElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLSelectAccountTypeDialogApplyButtonElement");
		this.setText(DCM.Resources.getResource("ApplyOnlineLabel"));
	
	}
	catch(e) {
		
		DCM.warn("HTMLSelectAccountTypeDialogApplyButtonElement", e);
		
	};
	
};DCM.HTMLSelectAccountTypeDialogApplyCFDButtonElement = function HTMLSelectAccountTypeDialogApplyCFDButtonElement() {

	try {
		
		this._super = DCM.HTMLSelectAccountTypeDialogApplyButtonElement;
		this._super();
		this._super = null;
		
		this.right.setText("Apply online");
		this.left.setText("IG Markets");
		this.setType("HTMLSelectAccountTypeDialogApplyCFDButtonElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLSelectAccountTypeDialogApplyCFDButtonElement", e);
		
	};
	
};DCM.HTMLSelectAccountTypeDialogApplySBButtonElement = function HTMLSelectAccountTypeDialogApplySBButtonElement() {

	try {
		
		this._super = DCM.HTMLSelectAccountTypeDialogApplyButtonElement;
		this._super();
		this._super = null;
		
		this.left.setText("Apply online");
		this.right.setText("IG Index");
		this.setType("HTMLSelectAccountTypeDialogApplySBButtonElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLSelectAccountTypeDialogApplySBButtonElement", e);
		
	};
	
};DCM.HTMLSelectAccountTypeDialogButtonElement = function HTMLSelectAccountTypeDialogButtonElement() {

	try {
		
		var 
		_this = this,
		nameHolder = new DCM.HTMLDivElement(),
		descriptionHolder = new DCM.HTMLDivElement(),
		setDescription = _this.setDescription = function setDescription(value) {
			descriptionHolder.setText(value);
		},
		setName = _this.setName = function setName(value) {
			nameHolder.setText(value);
		},
		applyOnlineButton = this.applyOnlineButton = new DCM.HTMLSelectAccountTypeDialogApplyButtonElement();
		
		this._super = DCM.HTMLInlineButtonElement;
		this._super();
		
		_this.setType("HTMLSelectAccountTypeDialogButtonElement");
		
		_this.append(nameHolder);
		_this.append(descriptionHolder);
		_this.append(applyOnlineButton);
		
		nameHolder.setAttribute("data-role", "name");
		descriptionHolder.setAttribute("data-role", "desc");
	
	}
	catch(e) {
		
		DCM.warn("HTMLSelectAccountTypeDialogButtonElement", e);
		
	};
	
};DCM.HTMLSelectAccountTypeDialogElement = function HTMLSelectAccountTypeDialogElement() {

	try {
	
		var 
		_this = this,
		spreadBettingButton = new DCM.HTMLSelectAccountTypeSpreadDialogButtonElement(),
		CFDButton = new DCM.HTMLSelectAccountTypeCFDDialogButtonElement(),
		openAccountUpgradeDialog = function openAccountUpgradeDialog() {
			DCM.AccountManager.openUpgradeAccountDialog();
			_this.close();
		},
		spreadBettingButtonClickHandler = function spreadBettingButtonClickHandler() {
			DCM.accountType = "SB";
			openAccountUpgradeDialog();
		},
		CFDButtonClickHandler = function CFDButtonClickHandler() {
			DCM.accountType = "CFD";
			openAccountUpgradeDialog();
		},
		riskWarning = new DCM.HTMLDisclaimerElement(),
		importantLinks = new DCM.HTMLDivElement();
		
		this._super = DCM.HTMLStaticMessageDialogElement;
		this._super();
		
		importantLinks.setText(DCM.Resources.getResource("UpgradeAccountDisclaimerLinksLabel"));
		
		importantLinks.setType("HTMLLegalDocumentsElement");
		
		_this.continueButton.setText("Cancel");
		_this.setMessage(DCM.Resources.getResource("UpgradeAccountMessageLabel"));
		_this.setHeading(DCM.Resources.getResource("UpgradeAccountHeadingLabel"));
		_this.setType("HTMLSelectAccountTypeDialogElement");
		
		_this.body.append(spreadBettingButton);
		_this.body.append(CFDButton);
		_this.body.append(importantLinks);
		_this.body.append(riskWarning);
		
		spreadBettingButton.addEventListener(DCM.Event.click, spreadBettingButtonClickHandler);
		CFDButton.addEventListener(DCM.Event.click, CFDButtonClickHandler);
		
	}
	catch(e) {
		
		DCM.warn("HTMLSelectAccountTypeDialogElement", e);
		
	};
	
};DCM.HTMLSelectAccountTypeSpreadDialogButtonElement = function HTMLSelectAccountTypeSpreadDialogButtonElement() {

	try {
		
		this._super = DCM.HTMLSelectAccountTypeDialogButtonElement;
		this._super();
		
		this.setName(DCM.Resources.getResource("UpgradeAccountSpreadBettingNameLabel"));
		this.setDescription(DCM.Resources.getResource("UpgradeAccountSpreadBettingLabel"));
		this.setType("HTMLSelectAccountTypeSpreadDialogButtonElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLSelectAccountTypeSpreadDialogButtonElement", e);
		
	};
	
};DCM.HTMLSelectDateDialogElement = function HTMLSelectDateDialogElement() {

	// date handling could be improved
	
	try {
	
		var 
		_this = this,
		month = new DCM.HTMLDataStepperElement(),
		date = new DCM.HTMLDataStepperElement(),
		year = new DCM.HTMLDataStepperElement(),
		hours = new DCM.HTMLDataStepperElement(),
		minutes = new DCM.HTMLDataStepperElement(),
		seconds = new DCM.HTMLDataStepperElement(),
		actualDate = new Date(),
		currentMonth = actualDate.getMonth(),
		currentYear = actualDate.getFullYear(),
		currentDate = actualDate.getDate(),
		currentHours = actualDate.getHours(),
		currentMinutes = actualDate.getMinutes(),
		getMonthValue = function getMonthValue(month) {
			
			var 
			values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
			_return = values[month];
			
			return _return;
			
		},
		getMonthsAsData = function getMonthsAsData() {
		
			return ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		
		},
		getDateValue = function getDateValue(date) {
			
			var 
			values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
			_return = values[date];
			
			return _return;
			
		},
		getDaysOfMonthAsData = function getDaysOfMonthAsData(monthValue, yearValue) {
			
			var 
			tempDate = new Date(),
			inc = 1,
			_return = [],
			numberOfDaysInMonth;
			
			tempDate.setMonth(monthValue+1);
			tempDate.setYear(yearValue);
			tempDate.setDate(0);
			
			numberOfDaysInMonth = tempDate.getDate();
			
			while(numberOfDaysInMonth--) {
				_return.unshift(numberOfDaysInMonth+1);
			};
			
			return _return;
			
		},
		getYearsAsData = function getYearsAsData() {
			
			var 
			maxYear = (currentYear + 10),
			incYear = currentYear,
			_return = [];
			
			while(incYear<maxYear) {
				_return.push(incYear);
				incYear ++;
			};
			
			return _return;
			
		},
		getHoursAsData = function getHoursAsData() {
			
			return ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "23"];
			
		},
		getMinutesAsData = function getMinutesAsData() {
			
			return ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
			
		},
		getSecondsAsData = function getSecondsAsData() {
			
			return ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
			
		},
		dateGroup = new DCM.HTMLDivElement(),
		timeGroup = new DCM.HTMLDivElement(),
		getDate = _this.getDate = function getDate() {
			
			//YYYYMMDD-HH:MM:SS
			
			var
			yearValue = year.getLabel(),
			monthValue = getMonthValue(month.getValue()),
			dateValue = getDateValue(date.getValue()),
			hoursValue = hours.getLabel(),
			minutesValue = minutes.getLabel(),
			secondsValue = seconds.getLabel(),
			_return = (yearValue + "" + monthValue + "" + dateValue + "-" + hoursValue + "" + minutesValue + "" + secondsValue);
			
			return _return;
			
		},
		getDisplayDate = _this.getDisplayDate = function getDisplayDate() {
			
			var
			yearValue = year.getLabel(),
			monthValue = getMonthValue(month.getValue()),
			dateValue = getDateValue(date.getValue()),
			hoursValue = hours.getLabel(),
			minutesValue = minutes.getLabel(),
			secondsValue = seconds.getLabel(),
			_return = (dateValue + " " + monthValue + " " + yearValue + " @ " + hoursValue + ":" + minutesValue + ":" + secondsValue);
			
			return _return;
			
		},
		dateHeading = new DCM.HTMLHeadingElement(),
		timeHeading = new DCM.HTMLHeadingElement();
		
		this._super = DCM.HTMLDynamicMessageDialogElement;
		this._super();
		
		//DCM.log("currentMonth", currentMonth);
		//DCM.log("currentYear", currentYear);
		//DCM.log("currentDate", currentDate);
		
		dateHeading.setText(DCM.Resources.getResource("DateLabel"));
		timeHeading.setText(DCM.Resources.getResource("TimeLabel"));
		
		month.setData(getMonthsAsData());
		month.setValue(currentMonth);
		month.addEventHandler("CHANGE", function() {
			
			date.setData(getDaysOfMonthAsData(month.value, year.value));
			date.setValue(currentDate-1);
			
		});
		
		date.setData(getDaysOfMonthAsData(currentMonth, currentYear));
		date.setValue(currentDate-1);
		
		year.setData(getYearsAsData());
		year.addEventHandler("CHANGE", function() {
			
			date.setData(getDaysOfMonthAsData(month.value, year.value));
			//date.setValue(date.value);
			
		});
		
		hours.setData(getHoursAsData());
		hours.setValue(12);
		
		minutes.setData(getMinutesAsData());
		minutes.setValue(6);
		
		seconds.setData(getSecondsAsData());
		
		_this.setHeading(DCM.Resources.getResource("DateSelectHeading"));
		//_this.setMessage();
		
		_this.setType("HTMLSelectDateDialogElement");
		
		dateGroup.append(month);
		dateGroup.append(date);
		dateGroup.append(year);
		
		timeGroup.append(hours);
		timeGroup.append(minutes);
		timeGroup.append(seconds);
		
		_this.body.append(dateHeading);
		_this.body.append(dateGroup);
		_this.body.append(timeHeading);
		_this.body.append(timeGroup);
		
	}
	catch(e) {
		
		DCM.warn("HTMLSelectDateDialogElement", e);
		
	};
	
};DCM.HTMLSelectMenuElement = function HTMLSelectMenuElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();

		var
		_this = this,
		trigger = new DCM.HTMLDivElement(),
		menu = new DCM.HTMLDivElement(),
		items = _this.items = [],
		setPreviousActiveItem = _this.setPreviousActiveItem = function setPreviousActiveItem(value) {
			_this.previousActiveItem = value;
		},
		setActiveItem = _this.setActiveItem = function setActiveItem(value) {
			setPreviousActiveItem(_this.activeItem);
			_this.activeItem = value;
		},
		setItem = _this.setItem = function(label, value) {
			
			var
			item = new DCM.HTMLSelectMenuItemElement(_this);
			
			item.setValue(value||inc);
			item.setLabel(label);
			
			item.addEventListener(DCM.Event.click, function() {
				
				if(this.enabled) {
					
					close();
					setActiveItem(item);
					updateVisual();
					
					if(item.value!==_this.value) {
						_this.value = item.value;
						_this.dispatchEventHandler("CHANGE");
					};
					
				};
				
				return false;
				
			});
			
			menu.append(item);
			
			items.push(item);
			
			inc ++;
			
			return item;
			
		},
		getValue = _this.getValue = function getValue() {
			return _this.value;
		},
		setValue = _this.setValue = function setValue(value) {
			
			var loop = items.length;
			
			while(loop--) {
				if(items[loop].value==value) {
					items[loop].dispatchEventListener(DCM.Event.click);
					break;
				};
			};
			
		},
		getItemByValue = _this.getItemByValue = function getItemByValue(value) {
			
			var 
			loop = items.length,
			_return;
			
			while(loop--) {
				if(items[loop].value==value) {
					_return = items[loop];
					break;
				};
			};
			
			return _return;
		
		},
		open = function open() {
			
			_this.setAttribute("data-active", "true");
			_this.addEventListener(DCM.Event.mouseleave, function() {
			
				DCM.document.addEventListener(DCM.Event.click, onclickOutsideHAndler);
				
			});
			_this.addEventListener(DCM.Event.mouseenter, function() {
			
				DCM.document.removeEventListener(DCM.Event.click, onclickOutsideHAndler);
			
			});
			isOpen = true;
			
		},
		close = function close() {
			
			_this.setAttribute("data-active", "false");
			DCM.document.removeEventListener(DCM.Event.click, onclickOutsideHAndler);
			
			_this.removeEventListener(DCM.Event.mouseenter);
			_this.removeEventListener(DCM.Event.mouseleave);
			
			isOpen = false;
			
		},
		updateVisual = function updateVisual() {
			
			if(_this.previousActiveItem) {
				_this.previousActiveItem.removeEventHandler("CHANGE");
			};
			
			var 
			label = _this.activeItem.getText();
			
			if(_this.reorder) {
				menu.prepend(_this.activeItem);
			};
			
			_this.activeItem.addEventHandler("CHANGE", function() {
				trigger.setText(_this.activeItem.getText());
			});
			
			trigger.setText(label);
			
		},
		isOpen,
		inc = 0,
		reorder = _this.reorder = true,
		onclickOutsideHAndler = function onclickOutsideHAndler() {
			close();
		};
		
		_this.setWidth = function setWidth(value) {
			_this.setStyle("width", (value + "px"));
			menu.setStyle("width", (value + "px"));
		};
		
		trigger.setAttribute("data-select-role", "trigger");
		trigger.setType("HTMLSelectMenuTriggerElement");
		trigger.addEventListener(DCM.Event.click, function() {
			
			if(isOpen) {
				close();
			}
			else {
				open();
			};
			
		});
		
		menu.setAttribute("data-select-role", "menu");
		
		_this.setType("HTMLSelectMenuElement");
		_this.append(trigger);
		_this.append(menu);
		
		close();
		
	}
	catch(e) {
	
		DCM.warn("HTMLSelectMenuElement", e);
	
	};
	
};DCM.HTMLSelectMenuItemElement = function HTMLSelectMenuItemElement(HTMLSelectMenuElement) {

	try {

		var
		label = new DCM.HTMLSelectMenuItemLabelElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLSelectMenuItemElement");
		this.append(label);
		
		this.destroy = function destroy() {
			this.remove();
			HTMLSelectMenuElement.items.splice(DCM.getIndexOf(HTMLSelectMenuElement.items, this), 1);
			HTMLSelectMenuElement.items[HTMLSelectMenuElement.items.length-1].dispatchEventListener(DCM.Event.click);
		};
		
		this.setLabel = function setLabel(value) {
			label.setText(value);
			this.dispatchEventHandler("CHANGE");
		};
		
		this.setValue = function setValue(value) {
			this.value = value;
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLSelectMenuItemElement", e);
		
	};
	
};DCM.HTMLSelectMenuItemLabelElement = function HTMLSelectMenuItemLabelElement() {

	try {

		this._super = DCM.HTMLSpanElement;
		this._super();
		
		this.setType("HTMLSelectMenuItemLabelElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLSelectMenuItemLabelElement", e);
		
	};
	
};DCM.HTMLSentiballElement = function HTMLSentiballElement(size, frames) {

	try {
	
		var
		_this = this,
		imagePath = ("/images/sentiball" + size + ".png"),
		interval,
		framerate = 60,
		currentFrame = 0,
		isReverse,
		getLeftValueFromFrame = function(frame) {
			var 
			_return = ("-" + (frame*size) + "px");
			return _return;
		},
		reversePercentage = function reversePercentage(value) {
			var _return = Math.floor(100-value);
			//DCM.log("reversePercentage(" + value + ")", _return);
			return _return;
		},
		getFrameFromSentiment = function getFrameFromSentiment(value) {
			var _return = DCM.getPercent(value, frames);
			//DCM.log("getFrameFromSentiment(" + value + ")", _return);
			return _return;
		},
		setSentiment = _this.setSentiment = function setSentiment(value) {
			DCM.log("HTMLSentiballElement.setSentiment(" + value + ")");
			if(!value) {
				return;
			};
			_this.sentiment = value;
			sentimentValueLabel.setText(value);
			goToAndStop(getFrameFromSentiment(reversePercentage(value)));
		},
		goToAndStop = function goToAndStop(frame) {
		
			stop();
		
			isReverse = (frame<currentFrame);
			
			interval = setInterval(function() {
			
				sentiballImage.setStyle("left", getLeftValueFromFrame(currentFrame));
				
				if(currentFrame===frame) {
					
					stop();
					
				};
				
				if(isReverse) {
					currentFrame -= 1;
				}
				else {
					currentFrame += 1;
				};
				
			}, (1000/framerate));
			
		},
		stop = function stop() {
			
			clearInterval(interval);
			
		},
		sentiballImage = new DCM.HTMLImageElement(),
		sentimentValueLabel = new DCM.HTMLSentiballValueElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		sentiballImage.setAttribute("src", imagePath);
		sentiballImage.setStyle("position", "relative");
		
		_this.append(sentiballImage);
		_this.append(sentimentValueLabel);
		
		_this.setType("HTMLSentiballElement");
		
		_this.setWidth(size + "px");
		_this.setHeight(size + "px");
		_this.setStyle("overflow", "hidden");
		
		setSentiment(50);
	
	}
	catch(e) {
		
		DCM.warn("HTMLSentiballElement", e);
		
	};
	
};DCM.HTMLSentiballGraphicButtonElement = function HTMLSentiballGraphicButtonElement() {

	try {
		
		var
		_this = this;
		
		this._super = DCM.HTMLGraphicButtonToggleElement;
		this._super();
		
		this.setRole("sentiball");
		this.setSize("2");
		this.setLabel(DCM.Resources.getResource("ShowSentiball"));
		this.setType("HTMLSentiballGraphicButtonElement");
		
		this.addEventHandler("ACTIVE_CHANGE", function() {
			
			if(_this.active) {
				_this.setLabel(DCM.Resources.getResource("HideSentiball"));
			}
			else {
				_this.setLabel(DCM.Resources.getResource("ShowSentiball"));
			};
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLSentiballGraphicButtonElement", e);
		
	};
	
};DCM.HTMLSentiballValueElement = function HTMLSentiballValueElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLSentiballValueElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLSentiballValueElement", e);
		
	};
	
};DCM.HTMLSettingsModuleElement = function HTMLSettingsModuleElement() {

	try {
		
		var
		_this = this,
		body = new DCM.HTMLDivElement(),
		form = new DCM.HTMLFormElement(),
		fulllNameField = form.addField(),
		emailField = form.addField(),
		accountID = form.addField(),
		stopsAndLimitsTypeField = form.addField(),
		stopsAndLimitsType = new DCM.HTMLInlineRadioButtonGroupElement(),
		stopsAndLimitsTypePoints = stopsAndLimitsType.setItem(DCM.Resources.getResource("SettingsStopsAndLimitsTypePointsLabel"), "POINTS"),
		stopsAndLimitsTypeCurrency = stopsAndLimitsType.setItem(DCM.Resources.getResource("CurrencyLabel"), "CURRENCY"),
		stopsAndLimitsDisclaimer = new DCM.HTMLDivElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		_this.setType("HTMLSettingsModuleElement");
		
		body.setAttribute("data-settings-role", "body");
		
		_this.append(body);
		
		fulllNameField.label.setText(DCM.Resources.getResource("FullNameLabel"));
		
		emailField.label.setText(DCM.Resources.getResource("EmailAddressLabel"));
		
		accountID.label.setText(DCM.Resources.getResource("AccountIDLabel"));
		
		body.append(form);
		body.append(stopsAndLimitsDisclaimer);
		
		stopsAndLimitsDisclaimer.setText(DCM.Resources.getResource("SettingsStopsAndLimitsTypeDiscliamerLabel"));
		
		stopsAndLimitsType.setValue("POINTS");
		
		stopsAndLimitsTypeField.label.setText(DCM.Resources.getResource("SettingsStopsAndLimitsTypeLabel") + "*");
		stopsAndLimitsTypeField.input.append(stopsAndLimitsType);
		
		stopsAndLimitsType.addEventHandler("CHANGE", function() {
			
			DCM.AccountManager.setStopsAndLimitsType(stopsAndLimitsType.getValue());
			
		});
		
		DCM.AccountManager.addEventHandler("NAME_CHANGE", function() {
			
			fulllNameField.input.setText(DCM.AccountManager.name);
			
		});
		
		DCM.AccountManager.addEventHandler("ID_CHANGE", function() {

			accountID.input.setText(DCM.AccountManager.id);
			
		});
		
		DCM.AccountManager.addEventHandler("EMAIL_CHANGE", function() {
			
			emailField.input.setText(DCM.AccountManager.emailAddress);
		
		});
		
	}
	catch(e) {
	
		DCM.warn("HTMLSettingsModuleElement", e);
		
	};
	
};DCM.HTMLSpanElement = function HTMLSpanElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("span");
		
	}
	catch(e) {
		
		DCM.warn("HTMLSpanElement", e);
		
	};
	
};DCM.HTMLStaticDialogElement = function HTMLStaticDialogElement() {

	try {
		
		var
		_this = this,
		continueButton = _this.continueButton = new DCM.HTMLButtonElement(),
		continueHandler = function continueHandler() {
			if(!_this.suppressCloseOnContinue) {
				_this.close();
			};
			_this.dispatchEventHandler("ACCEPT");
			return false;
		};
		
		this._super = DCM.HTMLDialogElement;
		this._super();
		
		continueButton.setText(DCM.Resources.getResource("ContinueLabel"));
		continueButton.addEventListener(DCM.Event.click, continueHandler);
		
		_this.foot.append(continueButton);
		
		_this.setType("HTMLStaticDialogElement");
		
		continueButton.focus();
		
	}
	catch(e) {
		
		DCM.warn("HTMLStaticDialogElement", e);
		
	};
	
};DCM.HTMLStaticFootElement = function HTMLStaticFootElement() {

	try {

		var
		_this = this,
		inner = new DCM.HTMLDivElement(),
		upgradeButton = new DCM.HTMLButtonElement(),
		message = new DCM.HTMLDivElement(),
		clear = new DCM.HTMLClearElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		_this.setType("HTMLStaticFootElement");
		
		_this.append(inner);
		
		inner.append(message);
		inner.append(upgradeButton);
		inner.append(clear);
		
		upgradeButton.setText(DCM.Resources.getResource("UpgradeAccountFootButtonLabel"));
		
		message.setText(DCM.Resources.getResource("UpgradeAccountFootLabel"));
		message.setAttribute("data-role", "preview-upgrade-message");
		
		upgradeButton.addEventListener(DCM.Event.click, function() {
			
			DCM.AccountManager.openSelectAccountTypeDialog();
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLStaticFootElement", e);
		
	};

};DCM.HTMLStaticMessageDialogElement = function HTMLStaticMessageDialogElement() {

	try {
		
		var
		message = this.message = new DCM.HTMLDialogMessageElement();
		
		this._super = DCM.HTMLStaticDialogElement;
		this._super();
		
		this.body.append(message);
		
		this.setType("HTMLStaticMessageDialogElement");
		
		this.setMessage = function setMessage(value) {
			this.messageText = value;
			message.setText(this.messageText);
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLStaticMessageDialogElement", e);
		
	};
	
};DCM.HTMLStaticPanelElement = function HTMLStaticPanelElement() {

	try {

		var
		inner = new DCM.HTMLDivElement(),
		heading = new DCM.HTMLBrandIconElement(),
		accountDetailsPanel = new DCM.HTMLAccountDetailsPanelElement(),
		clearElement = new DCM.HTMLClearElement(),
		navigation = new DCM.HTMLHeadNavigationElement(),
		accountTypeToggle = new DCM.HTMLAccountTypeToggleElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLStaticPanelElement");
		
		this.append(inner);
		
		inner.append(heading);
		inner.append(accountTypeToggle);
		inner.append(navigation);
		inner.append(accountDetailsPanel);
		inner.append(clearElement);
		
	}
	catch(e) {
		
		DCM.warn("HTMLStaticPanelElement", e);
		
	};

};DCM.HTMLStaticSelectMenuElement = function HTMLStaticSelectMenuElement() {

	try {
		
		this._super = DCM.HTMLSelectMenuElement;
		this._super();
		
		this.reorder = false;
		
	}
	catch(e) {
		
		DCM.warn("HTMLStaticSelectMenuElement", e);
		
	};
	
};DCM.HTMLTabGroupElement = function HTMLTabGroupElement() {

	try {
		
		var 
		_this = this,
		tabs = [],
		nav = _this.nav = new DCM.HTMLTabNavigationElement(),
		addTab = _this.addTab = function addTab(label, id) {
		
			var 
			tab = new DCM.HTMLTabGroupItemElement(),
			navItem = tab.navItem = nav.addItem();
			
			navItem.label.setText(label);
			tab.setID(id);
			tab.enable();
			
			navItem.addEventListener(DCM.Event.click, function() {
				
				if(tab.enabled) {
					setValue(id);
				};
				
			});
			
			tabs.push(tab);
			_this.append(tab);
			
			setValue(tabs[0].id, true);
			
			return tab;
			
		},
		setValue = _this.setValue = function setValue(value, forced) {
		
			if(!forced&&value===_this.value) {
				return;
			};
			
			var 
			loop = tabs.length,
			targetTab;
			
			while(loop--) {
				tabs[loop].hide();
				tabs[loop].navItem.setActive(false);
			};
			
			targetTab = getTabByID(value);
			targetTab.show();
			targetTab.navItem.setActive(true);
			
			_this.active = targetTab;
			_this.value = value;
			_this.dispatchEventHandler("CHANGE");
			
		},
		getTabByID = function getTabByID(id) {
			var 
			loop = tabs.length,
			_return;
			
			while(loop--) {
				if(tabs[loop].id===id) {
					_return = tabs[loop];
					break;
				};
			};
			
			return _return;
		};
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		_this.append(nav);
		_this.setType("HTMLTabGroupElement");
	
	}
	catch(e) {
	
		DCM.warn("HTMLTabGroupElement", e);
	
	};
	
};DCM.HTMLTabGroupItemElement = function HTMLTabGroupItemElement() {

	try {
		
		var 
		_this = this;
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTabGroupItemElement");
		
		this.addEventHandler("ENABLED_CHANGE", function() {
			
			_this.navItem.setEnabled(_this.enabled);
			
		});
		
		this.setID = function setID(value) {
			this.id = value;
		};
		
	}
	catch(e) {
	
		DCM.warn("HTMLTabGroupItemElement", e);
	
	};
	
};DCM.HTMLTableElement = function HTMLTableElement() {

	try {
		
		var
		head = this.head = new DCM.HTMLTHeadElement(),
		body = this.body = new DCM.HTMLTBodyElement(),
		foot = this.foot = new DCM.HTMLTFootElement(),
		addColumnHeadingInc = 1,
		addRowInc = 1;
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("table");
		
		this.append(head);
		this.append(body);
		this.append(foot);
		
		this.addRow = function addRow() {
			var row = new DCM.HTMLTRElement();
			row.setRow(addRowInc);
			body.append(row);
			addRowInc ++;
			return row;
		};
		
		this.addColumnHeading = function addColumnHeading(text) {
			var th = new DCM.HTMLTHElement();
			th.setColumn(addColumnHeadingInc);
			head.append(th);
			addColumnHeadingInc ++;
			if(text) {
				th.setText(text);
			};
			return th;
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLTableElement", e);
		
	};
	
};DCM.HTMLTabNavigationElement = function HTMLTabNavigationElement() {

	try {
		
		var 
		clear = new DCM.HTMLClearElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTabNavigationElement");
		
		this.addItem = function addItem() {
			var item = new DCM.HTMLTabNavigationItemElement();
			this.append(item);
			this.append(clear);
			return item;
		};
	
	}
	catch(e) {
		
		DCM.warn("HTMLTabNavigationElement", e);
		
	};
	
};DCM.HTMLTabNavigationItemElement = function HTMLTabNavigationItemElement() {

	try {
		
		var 
		label = this.label = new DCM.HTMLTabNavigationItemLabelElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTabNavigationItemElement");
		
		this.append(label);
		
		this.setComplete = function setComplete() {
			this.setStatus("complete");
		};
		
		this.setStatus = function setStatus(value) {
			this.setAttribute("data-status", value);
		};
		
		this.setActive = function setActive(value) {
			this.setAttribute("data-active", value);
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLTabNavigationItemElement", e);
		
	};
	
};DCM.HTMLTabNavigationItemLabelElement = function HTMLTabNavigationItemLabelElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTabNavigationItemLabelElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTabNavigationItemLabelElement", e);
		
	};
	
};DCM.HTMLTBodyElement = function HTMLTBodyElement() {
	
	try {
	
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("tbody");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTBodyElement", e);
		
	};
	
};DCM.HTMLTDElement = function HTMLTDElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("td");
		
		this.setColumn = function setColumn(value) {
			this.setAttribute("data-table-column-id", value);	
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLTDElement", e);
		
	};
	
};DCM.HTMLTextAreaElement = function HTMLTextAreaElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("textarea");
		
		this.getValue = function getValue() {
			return this.displayObject.value;
		};
		
		this.setValue = function setValue(value) {
			this.displayObject.value = value;
		};
		
		this.setPlaceholder = function setPlaceholder(value) {
			this.setAttribute("placeholder", value);
		};
	
	}
	catch(e) {
		
		DCM.warn("HTMLTextAreaElement", e);
		
	};
	
};DCM.HTMLTextButtonElement = function HTMLTextButtonElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTextButtonElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTextButtonElement", e);
		
	};
	
};DCM.HTMLTextInputElement = function HTMLTextInputElement() {

	try {
		
		this._super = DCM.HTMLInputElement;
		this._super();
		
		this.setAttribute("type", "text");
		
		this.setPlaceholder = function setPlaceholder(value) {
			this.setAttribute("placeholder", value);
		};
	
	}
	catch(e) {
		
		DCM.warn("HTMLTextInputElement", e);
		
	};
	
};DCM.HTMLTFootElement = function HTMLTFootElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("tfoot");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTFootElement", e);
		
	};
	
};DCM.HTMLTHeadElement = function HTMLTHeadElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("thead");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTHeadElement", e);
		
	};
	
};DCM.HTMLTHElement = function HTMLTHElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.setColumn = function setColumn(value) {
			this.setAttribute("data-table-column-id", value);	
		};
		
		this.displayObject = document.createElement("th");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTHElement", e);
		
	};
	
};DCM.HTMLTicketModuleButton = function HTMLTicketModuleButton() {

	try {
		
		this._super = DCM.HTMLButtonElement;
		this._super();
		
		this.setType("HTMLTicketModuleButton");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleButton", e);
		
	};
	
};DCM.HTMLTicketModuleButtonElement = function HTMLTicketModuleButtonElement() {

	try {
		
		var
		label = this.label = new DCM.HTMLTicketModuleButtonLabelElement(),
		value = this.value = new DCM.HTMLTicketModuleButtonValueElement(),
		icon = this.icon = new DCM.HTMLIconElement();
		
		this._super = DCM.HTMLInlineButtonElement;
		this._super();
		
		this.setType("HTMLTicketModuleButtonElement");
		
		value.setText("-");
		
		this.append(label);
		this.append(value);
		this.append(icon);
		
		// not sure if this is needed
		label.setText(DCM.Resources.getResource("Default"));
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleButtonElement", e);
		
	};
	
};DCM.HTMLTicketModuleButtonLabelElement = function HTMLTicketModuleButtonLabelElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();

		this.setType("HTMLTicketModuleButtonLabelElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleButtonLabelElement", e);
		
	};
	
	
};DCM.HTMLTicketModuleButtonValueElement = function HTMLTicketModuleButtonValueElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();

		this.setType("HTMLTicketModuleButtonValueElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleButtonValueElement", e);
		
	};
	
};DCM.HTMLTicketModuleBuyButtonElement = function HTMLTicketModuleBuyButtonElement() {

	try {
		
		this._super = DCM.HTMLTicketModuleButtonElement;
		this._super();
		
		this.label.setText(DCM.Resources.getResource("BuyLabel"));
		this.setType("HTMLTicketModuleBuyButtonElement");
		this.icon.setText("UP");
		this.icon.setRole("deal-ticket-up-arrow");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleBuyButtonElement", e);
		
	};
	
};DCM.HTMLTicketModuleContextMenuElement = function HTMLTicketModuleContextMenuElement(target) {

	try {
		
		var
		_this = this;
		
		this._super = DCM.HTMLModuleContextMenuElement;
		this._super(target);
		
		if(!this.target.docked) {
			this.setItem(DCM.Resources.getResource("DockTicketLabel"), function() {
				_this.target.dock();
			});
		};
		
		this.setItem(DCM.Resources.getResource("addNoteLabel"), function() {
			
			// change so that alert can be added to position or instrument
			DCM.NoteManager.createNoteFromInstrument(_this.target.MarketPosition.instrument);
			
		});
		
		this.setItem(DCM.Resources.getResource("AddAlertLabel"), function() {
			
			// change so that alert can be added to position or instrument
			DCM.AlertManager.createAlertFromInstrument(_this.target.MarketPosition.instrument);
			
		});
		
		this.setItem(DCM.Resources.getResource("AddToWatchlistLabel"), function() {
		
			DCM.WatchlistManager.authorAddToWatchlist(_this.target.MarketPosition.instrument);
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleContextMenuElement", e);
		
	};
	
};DCM.HTMLTicketModuleElement = function HTMLTicketModuleElement(data) {

	try {
		
		var
		_this = this,
		data = _this.data = data,
		MarketPosition = _this.MarketPosition = new DCM.Position(data),
		OrderPosition = _this.OrderPosition = new DCM.Position(data),
		TradePosition = _this.TradePosition = new DCM.Position(data),
		WizardPosition = _this.WizardPosition = new DCM.Position(data),
		sellButton = new DCM.HTMLTicketModuleSellButtonElement(),
		buyButton = new DCM.HTMLTicketModuleBuyButtonElement(),
		tradeSizeStepper = _this.tradeSizeStepper = new DCM.HTMLNumericStepperElement(),
		tradeSizeLabel = new DCM.HTMLDivElement(),
		tradePriceLabel = new DCM.HTMLDivElement(),
		tradeStopStepper = _this.tradeStopStepper = new DCM.HTMLNumericStepperElement(),
		tradeLimitStepper = _this.tradeLimitStepper = new DCM.HTMLNumericStepperElement(),
		tradeForm = new DCM.HTMLFormElement(),
		orderForm = new DCM.HTMLFormElement(),
		// TRADE
		tradeSizeField = tradeForm.addField(),
		stopsAndLimitsGroup = tradeForm.addGroup(),
		stopField = stopsAndLimitsGroup.addField(),
		stopFieldLabel = new DCM.HTMLSpanElement(),
		limitField = stopsAndLimitsGroup.addField(),
		limitFieldLabel = new DCM.HTMLSpanElement(),
		// ORDER
		orderSizeField = orderForm.addField(),
		orderPriceField = orderForm.addField(),
		orderLifetimeField = orderForm.addField(),
		orderStopsAndLimitsGroup = orderForm.addGroup(),
		orderStopField = orderStopsAndLimitsGroup.addField(),
		orderStopFieldLabel = new DCM.HTMLSpanElement(),
		orderLimitField = orderStopsAndLimitsGroup.addField(),
		orderLimitFieldLabel = new DCM.HTMLSpanElement(),
		orderSizeLabel = new DCM.HTMLDivElement(),
		orderSizeCurrencyLabel = new DCM.HTMLDivElement(),
		orderSizeStepper = _this.orderSizeStepper = new DCM.HTMLNumericStepperElement(),
		orderPriceLabel = new DCM.HTMLDivElement(),
		orderPriceTypeLabel = new DCM.HTMLDivElement(),
		orderPriceStepper = _this.orderPriceStepper = new DCM.HTMLNumericStepperElement(),
		orderLifetimeType = _this.orderLifetimeType = new DCM.HTMLRadioButtonGroupElement(),
		orderLifetimeTypeCancelledItem = orderLifetimeType.setItem(DCM.Resources.getResource("CancelledLabel"), "CANCELLED"),
		orderLifetimeTypeTimeItem = orderLifetimeType.setItem(DCM.Resources.getResource("TimeLabel"), "TIME"),
		orderLifetimeTypeLabel = new DCM.HTMLDivElement(),
		orderLifetimeTypeValue = new DCM.HTMLDivElement(),
		orderStopStepper = _this.orderStopStepper = new DCM.HTMLNumericStepperElement(),
		orderLimitStepper = _this.orderLimitStepper = new DCM.HTMLNumericStepperElement(),
		// WIZARD
		wizardStopStepper = new DCM.HTMLNumericStepperElement(),
		wizardLimitStepper = new DCM.HTMLNumericStepperElement(),
		wizardPriceStepper = new DCM.HTMLNumericStepperElement(),
		wizardSizeStepper = new DCM.HTMLNumericStepperElement(),
		instrumentTicker = _this.instrumentTicker = new DCM.HTMLHeadingElement(),
		instrumentName = _this.instrumentName = new DCM.HTMLHeadingElement(),
		ticketHead = new DCM.HTMLTicketModuleHeadElement(),
		buyAndSellButtons = new DCM.HTMLDivElement(),
		buyAndSellButtonsClear = new DCM.HTMLClearElement(),
		forceOpenCheckbox = new DCM.HTMLCheckboxElement(),
		dealTicketLeftPanel = new DCM.HTMLTicketModuleLeftPanelElement(),
		dealTicketRightPanel = new DCM.HTMLTicketModuleRightPanelElement(),
		sentiballButton = new DCM.HTMLSentiballGraphicButtonElement(),
		graphButton = new DCM.HTMLGraphGraphicButtonElement(),
		notesButton = new DCM.HTMLNotesGraphicButtonElement(),
		setSharePrice = function setSharePrice(value) {
			tradePriceLabel.setText(DCM.Resources.getResource("PriceLabel") + ": " + value);
			orderSizeCurrencyLabel.setText(DCM.Resources.getResource("PriceLabel") + ": " + value);
		},
		setTradeMinSize = function setTradeMinSize(value) {
			tradeSizeLabel.setText(DCM.Resources.getResource("QuantityLabel") + " [" + DCM.Resources.getResource("MinimumAbbrLabel") + " " + value + "]");
			tradeSizeStepper.setMin(value);
		},
		setOrderMinSize = function setOrderMinSize(value) {
			orderSizeLabel.setText(DCM.Resources.getResource("QuantityLabel") + " [" + DCM.Resources.getResource("MinimumAbbrLabel") + " " + value + "]"); 
			orderSizeStepper.setMin(value);
		},
		setWizardMinSize = function setWizardMinSize(value) {
			wizardSizeStepper.setMin(value);
		},
		setTradeMinStop = function setTradeMinStop(value) {
		
			tradeStopStepper.setMin(value);
			
			var valueType;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				valueType = MarketPosition.instrument.currency;
			}
			else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				valueType = "PTS.";
			};
			
			stopFieldLabel.setText(DCM.Resources.getResource("StopLabel") + " [" + DCM.Resources.getResource("MinimumAbbrLabel") + " " + value + " " + valueType + "]");
			
		},
		setOrderMinStop = function setOrderMinStop(value) {
			
			orderStopStepper.setMin(value);
			
			var valueType;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				valueType = MarketPosition.instrument.currency;
			}
			else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				valueType = "PTS.";
			};
			
			orderStopFieldLabel.setText(DCM.Resources.getResource("StopLabel") + " [" + DCM.Resources.getResource("MinimumAbbrLabel") + " " + value + " " + valueType + "]");
			
		},
		setWizardMinStop = function setWizardMinStop(value) {
			wizardStopStepper.setMin(value);
		},
		setTradeMinLimit = function setTradeMinLimit(value) {
		
			tradeLimitStepper.setMin(value);
			
			var valueType;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				valueType = MarketPosition.instrument.currency;
			}
			else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				valueType = "PTS.";
			};
			
			limitFieldLabel.setText(DCM.Resources.getResource("LimitLabel") + " [" + DCM.Resources.getResource("MinimumAbbrLabel") + " " + value + " " + valueType + "]");
			
		},
		setOrderMinLimit = function setOrderMinLimit(value) {
			
			orderLimitStepper.setMin(value);
			
			var valueType;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				valueType = MarketPosition.instrument.currency;
			}
			else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				valueType = "PTS.";
			};
			
			orderLimitFieldLabel.setText(DCM.Resources.getResource("LimitLabel") + " [" + DCM.Resources.getResource("MinimumAbbrLabel") + " " + value + " " + valueType + "]");
			
		},
		setWizardMinLimit = function setWizardMinLimit(value) {
			wizardLimitStepper.setMin(value);
		},
		setSellPrice = _this.setSellPrice = function setSellPrice(value) {
			if(!value) {
				return;
			};
			sellButton.value.setText(value);
		},
		setBuyPrice = _this.setBuyPrice = function setBuyPrice(value) {
			if(!value) {
				return;
			};
			buyButton.value.setText(value);
		},
		setOrderStopStep = function setOrderStopStep(value) {
			orderStopStepper.setStep(value);
		},
		setWizardStopStep = function setWizardStopStep(value) {
			wizardStopStepper.setStep(value);
		},
		setTradeStopStep = function setTradeStopStep(value) {
			tradeStopStepper.setStep(value);
		},
		setOrderLimitStep = function setOrderLimitStep(value) {
			orderLimitStepper.setStep(value);
		},
		setWizardLimitStep = function setWizardLimitStep(value) {
			wizardLimitStepper.setStep(value);
		},
		setTradeLimitStep = function setTradeLimitStep(value) {
			tradeLimitStepper.setStep(value);
		},
		setOrderPriceStep = function setOrderPriceStep(value) {
			orderPriceStepper.setStep(value);
		},
		setWizardPriceStep = function setWizardPriceStep(value) {
			wizardPriceStepper.setStep(value);
		},
		setDefaultOrderPriceIncrement = function setDefaultOrderPriceIncrement(value) {
			orderPriceStepper.setDefaultIncrement(value);
		},
		setDefaultWizardPriceIncrement = function setDefaultWizardPriceIncrement(value) {
			wizardPriceStepper.setDefaultIncrement(value);
		},
		setDefaultOrderPriceDecrement = function setDefaultOrderPriceDecrement(value) {
			orderPriceStepper.setDefaultDecrement(value);
		},
		setDefaultWizardPriceDecrement = function setDefaultWizardPriceDecrement(value) {
			wizardPriceStepper.setDefaultDecrement(value);
		},
		setOrderMinPrice = function setOrderMinPrice(value) {
			orderPriceStepper.setMin(value);
		},
		setWizardMinPrice = function setWizardMinPrice(value) {
			wizardPriceStepper.setMin(value);
		},
		screenToDisplay,
		pendingScreen,
		// ORDER
		openOrderErrorHandler = function openOrderErrorHandler() {
		
			screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
			screenToDisplay.setMessage(DCM.Resources.getResource("TicketServerError"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		openOrderSuccessHandler = function openOrderSuccessHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleSuccessNotificationElement();
			
			screenToDisplay.setHeading(DCM.Resources.getResource("TicketOrderOpened"));
			screenToDisplay.setSide(_this.side);
			screenToDisplay.setNumberOfShares(data.size);
			screenToDisplay.setStop(data.stop);
			screenToDisplay.setLimit(data.limit);
			screenToDisplay.setPrice(data.price);
			screenToDisplay.setRef(data.ref);
			screenToDisplay.setMarket(MarketPosition.instrument.getDisplayTextAsHTML());
			
			orderSizeStepper.clear();
			orderPriceStepper.clear();
			orderStopStepper.clear();
			orderLimitStepper.clear();

			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		openOrderExceptionHandler = function openOrderExceptionHandler(exceptionCode) {
		
			if(exceptionCode==="DT0001") {
				
				DCM.AccountManager.openSelectAccountTypeDialog();
				
			}
			else if(exceptionCode==="U0002") {
				
				DCM.AccountManager.openAccountProcessPendingDialog();
				
			}
			else {
			
				screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
				screenToDisplay.setMessage(exceptionCode);
				
				_this.body.append(screenToDisplay);
				
			};
			
			pendingScreen.close();
			
		},
		openOrder = function openOrder() {
			
			pendingScreen = new DCM.HTMLTicketModulePendingNotificationElement();
			_this.body.append(pendingScreen);
			
			var service = new OrderPosition.OpenService();
			
			service.addEventHandler("SUCCESS", openOrderSuccessHandler);
			service.addEventHandler("EXCEPTION", openOrderExceptionHandler);
			service.addEventHandler("ERROR", openOrderErrorHandler);
			
			service.call();
			
		},
		closeOrderErrorHandler = function closeOrderErrorHandler() {
		
			screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
			screenToDisplay.setMessage(DCM.Resources.getResource("TicketServerError"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		closeOrderSuccessHandler = function closeOrderSuccessHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleSuccessNotificationElement();
			
			screenToDisplay.setHeading(DCM.Resources.getResource("TicketOrderClosed"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		closeOrderExceptionHandler = function closeOrderExceptionHandler(exceptionCode) {
		
			if(exceptionCode==="DT0001") {
				
				DCM.AccountManager.openSelectAccountTypeDialog();
				
			}
			else if(exceptionCode==="U0002") {
				
				DCM.AccountManager.openAccountProcessPendingDialog();
				
			}
			else {
			
				var exceptionScreen;
				
				exceptionScreen = new DCM.HTMLTicketModuleErrorNotificationElement();
				exceptionScreen.setMessage(exceptionCode);
				
				_this.body.append(exceptionScreen);
				
			};
			
			pendingScreen.close();
			
		},
		closeOrder = function closeOrder() {
			
			pendingScreen = new DCM.HTMLTicketModulePendingNotificationElement();
			_this.body.append(pendingScreen);
			
			var service = new OrderPosition.CloseService();
			service.addEventHandler("SUCCESS", closeOrderSuccessHandler);
			service.addEventHandler("EXCEPTION", closeOrderExceptionHandler);
			service.addEventHandler("ERROR", closeOrderErrorHandler);
			service.call();
			
		},
		editOrderErrorHandler = function editOrderErrorHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
			screenToDisplay.setMessage(DCM.Resources.getResource("TicketServerError"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		editOrderSuccessHandler = function editOrderSuccessHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleSuccessNotificationElement();
			
			screenToDisplay.setHeading(DCM.Resources.getResource("TicketOrderModified"));
			screenToDisplay.setMarket(MarketPosition.instrument.getDisplayTextAsHTML());
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},		
		editOrderExceptionHandler = function editOrderExceptionHandler(exceptionCode) {
		
			if(exceptionCode==="DT0001") {
				
				DCM.AccountManager.openSelectAccountTypeDialog();
				
			}
			else if(exceptionCode==="U0002") {
				
				DCM.AccountManager.openAccountProcessPendingDialog();
				
			}
			else {
			
				screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
				screenToDisplay.setMessage(exceptionCode);
				
				_this.body.append(screenToDisplay);
				
			};
			
			pendingScreen.close();
			
		},
		editOrder = function editOrder() {
			
			pendingScreen = new DCM.HTMLTicketModulePendingNotificationElement();
			_this.body.append(pendingScreen);
			
			var service = new OrderPosition.EditService();
			service.addEventHandler("SUCCESS", editOrderSuccessHandler);
			service.addEventHandler("EXCEPTION", editOrderExceptionHandler);
			service.addEventHandler("ERROR", editOrderErrorHandler);
			
			service.call();
			
		},
		// POSITION
		openPositionErrorHandler = function openPositionErrorHandler() {
		
			screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
			screenToDisplay.setMessage(DCM.Resources.getResource("TicketServerError"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		openPositionSuccessHandler = function openPositionSuccessHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleSuccessNotificationElement();
			
			screenToDisplay.setHeading(DCM.Resources.getResource("PositionOpenSuccess"));
			screenToDisplay.setSide(_this.side);
			screenToDisplay.setNumberOfShares(data.size);
			screenToDisplay.setStop(data.stop);
			screenToDisplay.setLimit(data.limit);
			screenToDisplay.setPrice(data.price);
			screenToDisplay.setRef(data.ref);
			screenToDisplay.setMarket(MarketPosition.instrument.getDisplayTextAsHTML());
			
			tradeSizeStepper.clear();
			tradeStopStepper.clear();
			tradeLimitStepper.clear();
			forceOpenCheckbox.setChecked(false);
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		openPositionExceptionHandler = function openPositionExceptionHandler(exceptionCode) {
		
			if(exceptionCode==="DT0001") {
				
				DCM.AccountManager.openSelectAccountTypeDialog();
				
			}
			else if(exceptionCode==="U0002") {
				
				DCM.AccountManager.openAccountProcessPendingDialog();
				
			}
			else {
				
				screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
				screenToDisplay.setMessage(exceptionCode);
				
				_this.body.append(screenToDisplay);
				
			};
			
			pendingScreen.close();
			
		},
		openPosition = function openPosition() {
		
			pendingScreen = new DCM.HTMLTicketModulePendingNotificationElement();
			
			_this.body.append(pendingScreen);
			
			var placeTradeService = new TradePosition.OpenService();
			
			
			
			placeTradeService.addEventHandler("SUCCESS", openPositionSuccessHandler);
			placeTradeService.addEventHandler("EXCEPTION", openPositionExceptionHandler);
			placeTradeService.addEventHandler("ERROR", openPositionErrorHandler);
			
			placeTradeService.call();
			
		},
		editPositionErrorHandler = function editPositionErrorHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
			screenToDisplay.setMessage(DCM.Resources.getResource("TicketServerError"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		editPositionSuccessHandler = function editPositionSuccessHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleSuccessNotificationElement();
			
			screenToDisplay.setHeading(DCM.Resources.getResource("TicketPositionModified"));
			screenToDisplay.setMarket(MarketPosition.instrument.getDisplayTextAsHTML());
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},		
		editPositionExceptionHandler = function editPositionExceptionHandler(exceptionCode) {
			
			if(exceptionCode==="DT0001") {
				
				DCM.AccountManager.openSelectAccountTypeDialog();
				
			}
			else if(exceptionCode==="U0002") {
				
				DCM.AccountManager.openAccountProcessPendingDialog();
				
			}
			else {
			
				screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
				screenToDisplay.setMessage(exceptionCode);
				
				_this.body.append(screenToDisplay);
				
			};
			
			pendingScreen.close();
			
		},
		editPosition = function editPosition() {
			
			pendingScreen = new DCM.HTMLTicketModulePendingNotificationElement();
			_this.body.append(pendingScreen);
			
			var service = new TradePosition.EditService();
			service.addEventHandler("SUCCESS", editPositionSuccessHandler);
			service.addEventHandler("EXCEPTION", editPositionExceptionHandler);
			service.addEventHandler("ERROR", editPositionErrorHandler);
			
			service.call();
			
		},
		closePositionErrorHandler = function closePositionErrorHandler() {
		
			screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
			screenToDisplay.setMessage(DCM.Resources.getResource("TicketServerError"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		closePositionSuccessHandler = function closePositionSuccessHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleSuccessNotificationElement();
			
			screenToDisplay.setHeading(DCM.Resources.getResource("TicketPositionClosed"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		closePositionExceptionHandler = function closePositionExceptionHandler(exceptionCode) {
		
			DCM.log("EXCEPTION[" + exceptionCode + "]");
			
			if(exceptionCode==="DT0001") {
				
				DCM.AccountManager.openSelectAccountTypeDialog();
				
			}
			else if(exceptionCode==="U0002") {
				
				DCM.AccountManager.openAccountProcessPendingDialog();
				
			}
			else {
			
				screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
				screenToDisplay.setMessage(exceptionCode);
				
				_this.body.append(screenToDisplay);
				
			};
			
			pendingScreen.close();
			
		},
		closePosition = function closePosition() {
			
			pendingScreen = new DCM.HTMLTicketModulePendingNotificationElement();
			_this.body.append(pendingScreen);
			
			var service = new TradePosition.CloseService();
			service.addEventHandler("SUCCESS", closePositionSuccessHandler);
			service.addEventHandler("EXCEPTION", closePositionExceptionHandler);
			service.addEventHandler("ERROR", closePositionErrorHandler);
			service.call();
			
		},
		buyPriceChangeHandler = function buyPriceChangeHandler() {
			setBuyPrice(MarketPosition.instrument.getBuyPrice());
			calculateMarketInformation();
		},
		sellPriceChangeHandler = function sellPriceChangeHandler() {
			setSellPrice(MarketPosition.instrument.getSellPrice());
			calculateMarketInformation();
		},
		sentimentChangeHandler = function sentimentChangeHandler() {
			sentiball.setSentiment(MarketPosition.instrument.getSentiment());
		},
		highPriceChangeHAndler = function highPriceChangeHAndler() {
			priceHighValue.setText(MarketPosition.instrument.getPriceHigh());
		},
		LowPriceChangeHAndler = function LowPriceChangeHAndler() {
			priceLowValue.setText(MarketPosition.instrument.getPriceLow());
		},
		sentimentHighChangeHandler = function sentimentHighChangeHandler() {
			sentimentHighValue.setText(MarketPosition.instrument.getSentimentHigh());
		},
		sentimentLowChangeHandler = function sentimentLowChangeHandler() {
			sentimentLowValue.setText(MarketPosition.instrument.getSentimentLow());
		},
		sentimentDailyChangeHandler = function sentimentDailyChangeHandler() {
			sentimentDailyChangeValue.setText(MarketPosition.instrument.getSentimentChange());
		},
		sentiball = new DCM.HTMLSentiballElement(120, 89),
		sentiballHead = new DCM.HTMLTicketModuleHeadElement(),
		sentiballHeading = new DCM.HTMLHeadingElement(),
		sentiballSubHeading = new DCM.HTMLAnchorElement(),
		sentiballChartingComiingSoon = new DCM.HTMLDivElement(),
		detailsTable = new DCM.HTMLRowElement(),
		col1 = detailsTable.addColumn(),
		col2 = detailsTable.addColumn(),
		col3 = detailsTable.addColumn(),
		col4 = detailsTable.addColumn(),
		spacer = new DCM.HTMLColumnHeadElement(),
		priceHeading = new DCM.HTMLColumnHeadElement(),
		sentimentHeading = new DCM.HTMLColumnHeadElement(),
		highPriceHeading = new DCM.HTMLColumnHeadElement(),
		lowPriceHeading = new DCM.HTMLColumnHeadElement(),
		dailyChangeHeading = new DCM.HTMLColumnHeadElement(),
		priceHighValue = new DCM.HTMLColumnBodyElement(),
		priceLowValue = new DCM.HTMLColumnBodyElement(),
		priceDailyChangeValue = new DCM.HTMLColumnBodyElement(),
		sentimentHighValue = new DCM.HTMLColumnBodyElement(),
		sentimentLowValue = new DCM.HTMLColumnBodyElement(),
		sentimentDailyChangeValue = new DCM.HTMLColumnBodyElement(),
		stopPriceNotification = new DCM.HTMLDivElement(),
		limitPriceNotification = new DCM.HTMLDivElement(),
		stopPointsValue,
		limitPointsValue,
		orderStopPriceNotification = new DCM.HTMLDivElement(),
		orderLimitPriceNotification = new DCM.HTMLDivElement(),
		setMinsAndSteps = function setMinsAndSteps() {
		
			if(viewTabs.value==="TRADE") {
			
				setTradeMinSize(TradePosition.getMinSize());
				setTradeMinStop(TradePosition.getMinStop());
				setTradeMinLimit(TradePosition.getMinLimit());
				
				setTradeStopStep(TradePosition.getStopStep());
				setTradeLimitStep(TradePosition.getLimitStep());
				
				setDefaultOrderPriceIncrement(TradePosition.getBuyPrice());
				setDefaultOrderPriceDecrement(TradePosition.getSellPrice());
				
			}
			else if(viewTabs.value==="ORDER") {
			
				setOrderMinSize(OrderPosition.getMinSize());
				setOrderMinStop(OrderPosition.getMinStop());
				setOrderMinLimit(OrderPosition.getMinLimit());
				setOrderMinPrice(OrderPosition.getPriceStep());
				
				setOrderStopStep(OrderPosition.getStopStep());
				setOrderLimitStep(OrderPosition.getLimitStep());
				setOrderPriceStep(OrderPosition.getPriceStep());
				
				setDefaultOrderPriceIncrement(OrderPosition.getBuyPrice());
				setDefaultOrderPriceDecrement(OrderPosition.getSellPrice());
				
			}
			else if(viewTabs.value==="WIZARD") {
				
				setWizardMinSize(WizardPosition.getMinSize());
				setWizardMinStop(WizardPosition.getMinStop());
				setWizardMinLimit(WizardPosition.getMinLimit());
				setWizardMinPrice(WizardPosition.getPriceStep());
				
				setWizardStopStep(WizardPosition.getStopStep());
				setWizardLimitStep(WizardPosition.getLimitStep());
				setWizardPriceStep(WizardPosition.getPriceStep());
				
				setDefaultWizardPriceIncrement(WizardPosition.getBuyPrice());
				setDefaultWizardPriceDecrement(WizardPosition.getSellPrice());
				
			};
			
		},
		calculateMarketInformation = function calculateMarketInformation() {
		
			if(MarketPosition.instrument) {
			
				setMinsAndSteps();
				
				calculateStopMarketInformation();
				calculateLimitMarketInformation();
				
				checkForComplete();
			
			};
			
		},
		calculateStopMarketInformation = function calculateStopMarketInformation() {
			
			var
			value,
			sell,
			buy,
			currencyValue,
			message,
			sellInfo,
			buyInfo;
			
			if(viewTabs.value==="TRADE") {
			
				if(!tradeStopStepper.value||!tradeSizeStepper.value) {
					return;
				};
				
				if(TradePosition.status==="OPEN") {
					
					sell = TradePosition.getEntryPrice(true);
					buy = TradePosition.getEntryPrice(true);
					
				}
				else {
				
					sell = Number(TradePosition.instrument.sellPrice);
					buy = Number(TradePosition.instrument.buyPrice);
					
				};
			
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
					
					currencyValue = tradeStopStepper.value;
					stopPointsValue = TradePosition.getStop(true);
					value = stopPointsValue;
					message = "Pts.";
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					currencyValue = TradePosition.getStopAsCurrency(true);
					stopPointsValue = Number(tradeStopStepper.value);
					value = currencyValue;
					message = TradePosition.instrument.currency;
					
				};
				
				if(TradePosition.status==="OPEN") {
			
					sell = (sell-stopPointsValue);
					buy = (buy+stopPointsValue);
					
				}
				else {
				
					sell = (sell+stopPointsValue);
					buy = (buy-stopPointsValue);
					
				};
				
			}
			else if(viewTabs.value==="ORDER") {
			
				if(!orderStopStepper.value||!orderSizeStepper.value) {
					return;
				};
				
				if(OrderPosition.status==="OPEN") {
					
					sell = OrderPosition.getEntryPrice(true);
					buy = OrderPosition.getEntryPrice(true);
					
				}
				else {
				
					sell = Number(orderPriceStepper.value);
					buy = Number(orderPriceStepper.value);
					
				};
			
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					currencyValue = orderStopStepper.value;
					
					stopPointsValue = OrderPosition.getStopAsPoints();
					value = stopPointsValue;
					message = "Pts.";
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					currencyValue = OrderPosition.getStopAsCurrency();
					
					stopPointsValue = orderStopStepper.value;
					value = currencyValue;
					message = OrderPosition.instrument.currency;
					
				};
				
				if(OrderPosition.status==="OPEN") {
			
					sell = (sell-stopPointsValue);
					buy = (buy+stopPointsValue);
					
				}
				else {
				
					sell = (sell+stopPointsValue);
					buy = (buy-stopPointsValue);
					
				};
				
			}
			else {
				
				return;
				
			};
			
			buyInfo = ("<strong>" + message + "</strong> " + value + "<br /><strong>Stop</strong> " + buy.toFixed(MarketPosition.instrument.decimalPlaces) + " [est.]");
			sellInfo = ("<strong>" + message + "</strong> " + value + "<br /><strong>Stop</strong> " + sell.toFixed(MarketPosition.instrument.decimalPlaces) + " [est.]");
			
			if(_this.side==="BUY") {
				
				if(viewTabs.value==="TRADE") {
					stopPriceNotification.setText(buyInfo);
				}
				else if(viewTabs.value==="ORDER") {
					orderStopPriceNotification.setText(buyInfo);
				};
				
			}
			else if(_this.side==="SELL") {
			
				if(viewTabs.value==="TRADE") {
					stopPriceNotification.setText(sellInfo);
				}
				else if(viewTabs.value==="ORDER") {
					orderStopPriceNotification.setText(sellInfo);
				};
			
			}
			else {
				
				stopPriceNotification.setText("");
				orderStopPriceNotification.setText("");
				
			};
			
		},
		calculateLimitMarketInformation = function calculateLimitMarketInformation() {
			
			var
			value,
			sell,
			buy,
			currencyValue,
			message,
			sellInfo,
			buyInfo;
			
			if(viewTabs.value==="TRADE") {
			
				if(!tradeLimitStepper.value||!tradeSizeStepper.value) {
					return;
				};
				
				
				if(TradePosition.status==="OPEN") {
					
					sell = TradePosition.getEntryPrice(true);
					buy = TradePosition.getEntryPrice(true);
				
				}
				else {
					
					sell = Number(TradePosition.instrument.sellPrice);
					buy = Number(TradePosition.instrument.buyPrice);
					
				};
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
					
					currencyValue = tradeLimitStepper.value;
					limitPointsValue = TradePosition.getLimit(true);
					value = limitPointsValue;
					message = "Pts.";
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					currencyValue = TradePosition.getLimitAsCurrency(true);
					limitPointsValue = Number(tradeLimitStepper.value);
					value = currencyValue;
					message = TradePosition.instrument.currency;
					
				};
				
				if(TradePosition.status==="OPEN") {
				
					sell = (sell+limitPointsValue);
					buy = (buy-limitPointsValue);
					
				}
				else {
				
					sell = (sell-limitPointsValue);
					buy = (buy+limitPointsValue);
					
				};
				
			}
			else if(viewTabs.value==="ORDER") {
			
				if(!orderLimitStepper.value||!orderSizeStepper.value) {
					return;
				};
			
			
				if(OrderPosition.status==="OPEN") {
					
					sell = OrderPosition.getEntryPrice(true);
					buy = OrderPosition.getEntryPrice(true);
					
				}
				else {
				
					sell = Number(orderPriceStepper.value);
					buy = Number(orderPriceStepper.value);
					
				};
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
					
					currencyValue = orderLimitStepper.value;
					
					limitPointsValue = OrderPosition.getLimitAsPoints();
					
					value = limitPointsValue;
					message = "Pts.";
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					currencyValue = OrderPosition.getLimitAsCurrency();
					
					limitPointsValue = orderLimitStepper.value;
					
					value = currencyValue;
					message = OrderPosition.instrument.currency;
					
				};
				
				if(OrderPosition.status==="OPEN") {
				
					sell = (sell+limitPointsValue);
					buy = (buy-limitPointsValue);
					
				}
				else {
				
					sell = (sell-limitPointsValue);
					buy = (buy+limitPointsValue);
					
				};
				
			}
			else {
				
				return;
				
			};
			
			buyInfo = ("<strong>" + message + "</strong> " + value + "<br /><strong>Limit</strong> " + buy.toFixed(MarketPosition.instrument.decimalPlaces) + " [est.]");
			sellInfo = ("<strong>" + message + "</strong> " + value + "<br /><strong>Limit</strong> " + sell.toFixed(MarketPosition.instrument.decimalPlaces) + " [est.]");
			
			if(_this.side==="BUY") {
			
				if(viewTabs.value==="TRADE") {
			
					limitPriceNotification.setText(buyInfo);
					
				}
				else if(viewTabs.value==="ORDER") {
					
					orderLimitPriceNotification.setText(buyInfo);
					
				};
			
			}
			else if(_this.side==="SELL") {
			
				if(viewTabs.value==="TRADE") {
			
					limitPriceNotification.setText(sellInfo);
					
				}
				else if(viewTabs.value==="ORDER") {
					
					orderLimitPriceNotification.setText(sellInfo);
					
				};
				
			}
			else {
				
				limitPriceNotification.setText("");
				orderLimitPriceNotification.setText("");
				
			};
			
		},
		viewTabs = _this.viewTabs = new DCM.HTMLTabGroupElement(),
		tradeTab = _this.tradeTab = viewTabs.addTab(DCM.Resources.getResource("TicketTradeTabLabel"), "TRADE"),
		orderTab = _this.orderTab = viewTabs.addTab(DCM.Resources.getResource("TicketOrderTabLabel"), "ORDER"),
		wizardTab = _this.wizardTab = viewTabs.addTab(DCM.Resources.getResource("TicketWizardTabLabel"), "WIZARD"),
		wizardTabTabs = new DCM.HTMLTabGroupElement(),
		wizardTabTabsDirection = wizardTabTabs.addTab("Direction", "DIRECTION"),
		wizardTabTabsQuantity = wizardTabTabs.addTab("Quantity", "QUANTITY"),
		wizardTabTabsStop = wizardTabTabs.addTab("Stop", "STOP"),
		wizardTabTabsLimit = wizardTabTabs.addTab("Limit", "LIMIT"),
		wizardTabTabsPrice = wizardTabTabs.addTab("Price", "PRICE"),
		wizardTabTabsSummary = wizardTabTabs.addTab("Summary", "SUMMARY"),
		wizardTabTabsDirectionPanel = new DCM.HTMLTicketModuleWizardElement(),
		wizardTabTabsDirectionMessageDesc = new DCM.HTMLDivElement(),
		wizardTabTabsDirectionMessageBody = new DCM.HTMLDivElement(),
		wizardTabTabsQuantityPanel = new DCM.HTMLTicketModuleWizardElement(),
		wizardTabTabsQuantityMessageBody = new DCM.HTMLDivElement(),
		wizardTabTabsStopPanel = new DCM.HTMLTicketModuleWizardElement(),
		wizardTabTabsStopBody = new DCM.HTMLDivElement(),
		wizardTabTabsLimitPanel = new DCM.HTMLTicketModuleWizardElement(),
		wizardTabTabsLimitBody = new DCM.HTMLDivElement(),
		wizardTabTabsPricePanel = new DCM.HTMLTicketModuleWizardElement(),
		wizardTabTabsPriceBody = new DCM.HTMLDivElement(),
		wizardTabTabsSummaryPanel = new DCM.HTMLTicketModuleWizardElement(),
		wizardTabTabsSummaryBody = new DCM.HTMLDivElement(),
		wizardButtonWrap = new DCM.HTMLDivElement(),
		wizardCancelButton = new DCM.HTMLInlineButtonElement(),
		wizardNextButton = new DCM.HTMLInlineButtonElement(),
		checkForComplete = function checkForComplete() {
		
			if(viewTabs.value==="TRADE") {
				
				checkTradeFormComplete();
				
			}
			else if(viewTabs.value==="ORDER") {
				
				checkOrderFormComplete();
				
			}
			else if(viewTabs.value==="WIZARD") {
				
				checkForWizardComplete();
				
			};
			
		},
		placeTradeButton = _this.placeTradeButton = new DCM.HTMLTicketModuleButton(),
		placeOrderButton = _this.placeOrderButton = new DCM.HTMLTicketModuleButton(),
		setOrderType = _this.setOrderType = function setOrderType(value) {
			DCM.log("setOrderType(" + value + ")");
			orderPriceTypeLabel.setText("Type: " + value);
			OrderPosition.setType(value);
		},
		getOrderType = function getOrderType() {
			
			var 
			targetPrice,
			_return;
			
			if(!orderPriceStepper.value||!_this.side) {
				_return = "-";
				return _return;
			};
			
			if(_this.side==="BUY") {
					
				targetPrice = OrderPosition.instrument.buyPrice;
				
				if(orderPriceStepper.value<targetPrice) {
					_return = "LIMIT";
				}
				else if(orderPriceStepper.value>targetPrice) {
					_return = "STOP";
				};
			
			}
			else if(_this.side==="SELL") {
			
				targetPrice = OrderPosition.instrument.sellPrice;
				
				if(orderPriceStepper.value<targetPrice) {
					_return = "STOP";
				}
				else if(orderPriceStepper.value>targetPrice) {
					_return = "LIMIT";
				};
				
			};
			
			return _return;
			
		},
		setSide = _this.setSide = function setSide(value) {
		
			_this.side = value;
		
			if(_this.side==="SELL") {
			
				sellButton.unsuppress();
				buyButton.suppress();
				
				calculateWizardPotentialProfit();
				
				wizardTabTabsQuantityPanel.head.setText("Would you like to<br />SELL a specific quantity?");
				
				MarketPosition.setDirection("SELL");
				OrderPosition.setDirection("SELL");
				TradePosition.setDirection("SELL");
				
			}
			else if(_this.side==="BUY") {
				
				buyButton.unsuppress();
				sellButton.suppress();
				
				calculateWizardPotentialProfit();
				
				wizardTabTabsQuantityPanel.head.setText("Would you like to<br />BUY a specific quantity?");
				
				MarketPosition.setDirection("BUY");
				OrderPosition.setDirection("BUY");
				TradePosition.setDirection("BUY");
				
			}
			else {
				
				sellButton.unsuppress();
				buyButton.unsuppress();
				
				MarketPosition.setDirection(null);
				OrderPosition.setDirection(null);
				TradePosition.setDirection(null);
			
			};
			
			setOrderType(getOrderType());
			calculateMarketInformation();
			//checkForComplete();
			
		},
		setLockedIntoSide = _this.setLockedIntoSide = function setLockedIntoSide(value) {
			_this.lockedIntoSide = value;
		},
		setMode = _this.setMode = function setMode(value) {
		
			_this.mode = value;
			
			if(value==="CANCEL") {
				placeTradeButton.setText(DCM.Resources.getResource("ClosePositionLabel"));
				placeOrderButton.setText(DCM.Resources.getResource("CloseOrderLabel"));
			}
			else if(value==="EDIT") {
				placeTradeButton.setText(DCM.Resources.getResource("ModifyPositionLabel"));
				placeOrderButton.setText(DCM.Resources.getResource("ModifyOrderLabel"));
			}
			else if(value==="NEW") {
				placeTradeButton.setText(DCM.Resources.getResource("PlaceTradeLabel"));
				placeOrderButton.setText(DCM.Resources.getResource("PlaceOrderLabel"));
			};
			
		},
		setMarketPosition = _this.setMarketPosition = function setMarketPosition(Position) {
			MarketPosition = _this.MarketPosition = Position;
		},
		stopsAndLimitsTypeChange = function stopsAndLimitsTypeChange() {
		
			DCM.log("DCM.AccountManager.CHANGE");
		
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
				tradeStopStepper.setFixed(2);
				orderStopStepper.setFixed(2);
				tradeLimitStepper.setFixed(2);
				orderLimitStepper.setFixed(2);
				
				if(tradeLimitStepper.value) {
					tradeLimitStepper.setValue(TradePosition.getLimitAsCurrency());
				};
				
				if(tradeStopStepper.value) {
					tradeStopStepper.setValue(TradePosition.getStopAsCurrency());
				};
				
				if(orderLimitStepper.value) {
					orderLimitStepper.setValue(OrderPosition.getLimitAsCurrency());
				};
				
				if(orderStopStepper.value) {
					orderStopStepper.setValue(OrderPosition.getStopAsCurrency());
				};
				
			}
			else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				
				tradeStopStepper.setFixed(0);
				orderStopStepper.setFixed(0);
				tradeLimitStepper.setFixed(0);
				orderLimitStepper.setFixed(0);
				
				if(tradeLimitStepper.value) {
					tradeLimitStepper.setValue(TradePosition.getLimit());
				};
				
				if(tradeStopStepper.value) {
					tradeStopStepper.setValue(TradePosition.getStop());
				};
				
				if(orderLimitStepper.value) {
					orderLimitStepper.setValue(OrderPosition.getLimit());
				};
				
				if(orderStopStepper.value) {
					orderStopStepper.setValue(OrderPosition.getStop());
				};
				
			};
			
			calculateMarketInformation();
		
		},
		checkOrderFormComplete = function checkOrderFormComplete() {
		
			var isInvalidPrice = orderPriceStepper.value>OrderPosition.instrument.sellPrice&&orderPriceStepper.value<OrderPosition.instrument.buyPrice;
				
			if(isInvalidPrice) {
				orderPriceStepper.setValid(false);
			}
			else {
				orderPriceStepper.setValid(true);
			};
		
			if(_this.side&&orderPriceStepper.value&&!isInvalidPrice&&orderSizeStepper.value) {
				
				placeOrderButton.enable();
				
			}
			else {
				
				placeOrderButton.disable();
				
			};
			
		},
		checkTradeFormComplete = function checkTradeFormComplete() {
		
			if(_this.side&&tradeSizeStepper.value) {
				
				placeTradeButton.enable();
				
			}
			else {
				
				placeTradeButton.disable();
				
			};
		
		},
		checkForWizardComplete = function checkForWizardComplete() {
			
			if(_this.side) {
				
				wizardNextButton.enable();
				
			}
			else {
				
				wizardNextButton.disable();
				
			};
			
		},
		calculateWizardPotentialProfit = function calculateWizardPotentialProfit() {
			
			if(_this.side==="SELL") {
			
				wizardTabTabsQuantityMessageBody.setText("If you were to <em>SELL " + wizardSizeStepper.value + "</em>; you'd profit <em>" + WizardPosition.getPotentialProfit() + "</em> for each <span data-type=\"keyword\">point</span> the <span data-type=\"keyword\">market-price</span> drops <em>BELOW</em> your <span data-type=\"keyword\">entry-price</span>.");
				
			}
			else if(_this.side==="BUY") {
				
				wizardTabTabsQuantityMessageBody.setText("If you were to <em>BUY " + wizardSizeStepper.value + "</em>; you'd profit <em>" + WizardPosition.getPotentialProfit() + "</em> for each <span data-type=\"keyword\">point</span> the <span data-type=\"keyword\">market-price</span> rises <em>ABOVE</em> your <span data-type=\"keyword\">entry-price</span>.");
				
			};
			
		},
		wizardDetailsTable = new DCM.HTMLDivElement(),
		priceRow = new DCM.HTMLRowElement(),
		sizeRow = new DCM.HTMLRowElement(),
		stopRow = new DCM.HTMLRowElement(),
		limitRow = new DCM.HTMLRowElement(),
		detailsTablePriceHeading = priceRow.addColumn(),
		detailsTablePriceValue = priceRow.addColumn(),
		detailsTableStopHeading = stopRow.addColumn(),
		detailsTableStopValue = stopRow.addColumn(),
		detailsTableLimitHeading = limitRow.addColumn(),
		detailsTableLimitValue = limitRow.addColumn(),
		detailsTableSizeHeading = sizeRow.addColumn(),
		detailsTableSizeValue = sizeRow.addColumn();
		
		this._super = DCM.HTMLModuleElement;
		this._super();
		
		//DCM.log("new HTMLTicketModuleElement()", _this);
		
		if(!MarketPosition.instrument) {
		
			_this.close();
			
			throw("INSTRUMENT CANNOT BE FOUND");
			
		};
		
		setMode("NEW");
		// commented out to allow sentimabll to display
		//_this.collapse();
		
		sentiballButton.toggle();
		
		setLockedIntoSide(false);
		
		_this.setIcon("deal-ticket");
		_this.setHeading(DCM.Resources.getResource("DealTicketPanelHeading"));
		_this.setContextMenu("HTMLTicketModuleContextMenuElement");
		
		MarketPosition.instrument.subscribe();
		MarketPosition.instrument.addEventHandler("BUY_PRICE_CHANGE", buyPriceChangeHandler).dispatch();
		MarketPosition.instrument.addEventHandler("SELL_PRICE_CHANGE", sellPriceChangeHandler).dispatch();
		MarketPosition.instrument.addEventHandler("SENTIMENT_CHANGE", sentimentChangeHandler).dispatch();
		MarketPosition.instrument.addEventHandler("HIGH_PRICE_CHANGE", highPriceChangeHAndler).dispatch();
		MarketPosition.instrument.addEventHandler("LOW_PRICE_CHANGE", LowPriceChangeHAndler).dispatch();
		MarketPosition.instrument.addEventHandler("SENTIMENT_HIGH_CHANGE", sentimentHighChangeHandler).dispatch();
		MarketPosition.instrument.addEventHandler("SENTIMENT_LOW_CHANGE", sentimentLowChangeHandler).dispatch();
		MarketPosition.instrument.addEventHandler("SENTIMENTCHANGE_CHANGE", sentimentDailyChangeHandler).dispatch();
		
		detailsTable.setAttribute("data-deal-ticket-role", "data-table");
		
		_this.body.append(dealTicketLeftPanel);
		_this.body.append(dealTicketRightPanel);
		
		sentiballHead.append(sentiballHeading);
		sentiballHead.append(sentiballSubHeading);
		
		sentiballHeading.setText(DCM.Resources.getResource("SentiballHeadingLabel"));
		sentiballHeading.setRole("standard-orange");
		sentiballHeading.setSize("medium");
		
		sentiballSubHeading.setText(DCM.Resources.getResource("SentiballSubHeadingLabel"));
		//sentiballSubHeading.setRole("standard-grey");
		//sentiballSubHeading.setSize("small");
		sentiballSubHeading.setAttribute("data-ticket-role", "sentiment-sub-heading");
		sentiballSubHeading.setHref("http://www.dcmcap.com/education/dcm_capital_information/sentiment/#dcmeducation-content");
		sentiballSubHeading.setAttribute("target", "_blank");
		
		dealTicketRightPanel.append(sentiballHead);
		dealTicketRightPanel.append(sentiball);
		dealTicketRightPanel.append(detailsTable);
		dealTicketRightPanel.append(sentiballChartingComiingSoon);
		
		sentiballChartingComiingSoon.setAttribute("data-ticket-role", "senti-charting-soon");
		sentiballChartingComiingSoon.setText("Sentiment charting coming soon");
		
		highPriceHeading.setText("High");
		lowPriceHeading.setText("Low");
		dailyChangeHeading.setText("Daily-change");
		
		spacer.setText("&nbsp;");
		priceHeading.setText("Price");
		sentimentHeading.setText("Sentiment");
		
		col1.append(spacer);
		col1.append(priceHeading);
		col1.append(sentimentHeading);
		
		col2.append(highPriceHeading);
		col2.append(priceHighValue);
		col2.append(sentimentHighValue);
		priceHighValue.setText("-");
		sentimentHighValue.setText("-");
		
		col3.append(lowPriceHeading);
		col3.append(priceLowValue);
		col3.append(sentimentLowValue);
		priceLowValue.setText("-");
		sentimentLowValue.setText("-");
		
		col4.append(dailyChangeHeading);
		col4.append(priceDailyChangeValue);
		col4.append(sentimentDailyChangeValue);
		priceDailyChangeValue.setText("-");
		sentimentDailyChangeValue.setText("-");
		
		tradePriceLabel.setAttribute("data-deal-ticket-role", "sub-label");
		
		buyAndSellButtons.setAttribute("data-deal-ticket-role", "buy-and-sell");
		
		instrumentTicker.setSize("medium");
		instrumentTicker.setRole("standard-orange");
		
		instrumentName.setSize("small");
		instrumentName.setRole("standard-grey");
		
		ticketHead.append(instrumentTicker);
		ticketHead.append(instrumentName);
		
		dealTicketLeftPanel.append(ticketHead);
		
		buyAndSellButtons.append(sellButton);
		buyAndSellButtons.append(buyButton);
		buyAndSellButtons.append(buyAndSellButtonsClear);
		
		dealTicketLeftPanel.append(buyAndSellButtons);
		
		dealTicketLeftPanel.append(viewTabs);
		
		tradeTab.append(tradeForm);
		tradeTab.append(placeTradeButton);
		tradeTab.navItem.setAttribute("title", DCM.Resources.getResource("TicketTradeTooltipLabel"));
		
		placeTradeButton.disable();
		
		placeTradeButton.addEventListener(DCM.Event.click, function() {
			
			if(this.enabled) {
				
				if(_this.mode==="EDIT") {
				
					editPosition();
					
				}
				else if(_this.mode==="CANCEL") {
				
					closePosition();
					
				}
				else if(_this.mode==="NEW") {
				
					openPosition();
					
				};
				
			};
			
		});
		
		tradeSizeLabel.setAttribute("title", DCM.Resources.getResource("QuantityTooltipLabel"));
		tradePriceLabel.setAttribute("title", DCM.Resources.getResource("PriceTooltipLabel"));
		tradeSizeField.label.append(tradeSizeLabel);
		tradeSizeField.label.append(tradePriceLabel);
		tradeSizeField.input.append(tradeSizeStepper);
		tradeSizeField.input.append(forceOpenCheckbox);
		forceOpenCheckbox.setLabel(DCM.Resources.getResource("ForceOpenLabel"));
		
		forceOpenCheckbox.addEventHandler("CHANGE", function() {
			
			TradePosition.setForceOpen(forceOpenCheckbox.getChecked());
			
		});
		
		tradeSizeStepper.addEventHandler("CHANGE", function() {
		
			if(tradeSizeStepper.value) {
			
				TradePosition.setSize(tradeSizeStepper.value);
				
			}
			else {
				
				TradePosition.setSize(null);
				
			};
			
			checkTradeFormComplete();
			
			calculateMarketInformation();
			
		});
		
		DCM.AccountManager.addEventHandler("STOPSANDLIMITSTYPE_CHANGE", stopsAndLimitsTypeChange).dispatch();
		
		stopField.input.append(tradeStopStepper);
		stopField.input.append(stopPriceNotification);
		stopField.setAttribute("data-deal-ticket-role", "stopField");
		stopPriceNotification.setAttribute("data-type", "stopPriceNotification");
		stopFieldLabel.setAttribute("title", DCM.Resources.getResource("StopTooltipLabel"));
		stopField.label.append(stopFieldLabel);
		
		tradeStopStepper.addEventHandler("CHANGE", function() {
		
			if(tradeStopStepper.value) {
			
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {

					TradePosition.setStopAsCurrency(tradeStopStepper.value);
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					TradePosition.setStop(tradeStopStepper.value);
					
				};
			
				calculateStopMarketInformation();
			
			}
			else {
			
				TradePosition.setStop(null);
				
				stopPriceNotification.setText("");
			
			};
			
			checkTradeFormComplete();
			
		});
		
		limitField.input.append(tradeLimitStepper);
		limitField.input.append(limitPriceNotification);
		limitPriceNotification.setAttribute("data-type", "limitPriceNotification");
		limitField.setAttribute("data-deal-ticket-role", "limitField");
		tradeLimitStepper.addEventHandler("CHANGE", function() {
			
			if(tradeLimitStepper.value) {
			
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {

					TradePosition.setLimitAsCurrency(tradeLimitStepper.value);
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					TradePosition.setLimit(tradeLimitStepper.value);
					
				};
				
				calculateLimitMarketInformation();
				
			}
			else {
				
				TradePosition.setLimit(null);
				
				limitPriceNotification.setText("");
				
			};
			
			checkTradeFormComplete();
			
		});
		limitFieldLabel.setAttribute("title", DCM.Resources.getResource("LimitTooltipLabel"));
		limitField.label.append(limitFieldLabel);
		
		orderTab.append(orderForm);
		orderTab.append(placeOrderButton);
		orderTab.navItem.setAttribute("title", DCM.Resources.getResource("TicketOrderTooltipLabel"));
		
		placeOrderButton.addEventListener(DCM.Event.click, function() {
		
			if(this.enabled) {
			
				if(_this.mode==="EDIT") {
				
					editOrder();
					
				}
				else if(_this.mode==="CANCEL") {
				
					closeOrder();
					
				}
				else if(_this.mode==="NEW") {
				
					openOrder();
				
				};
			
			};
			
		});
		placeOrderButton.disable();
		
		orderSizeCurrencyLabel.setAttribute("data-deal-ticket-role", "sub-label");
		orderSizeCurrencyLabel.setAttribute("title", DCM.Resources.getResource("PriceTooltipLabel"));
		orderSizeLabel.setAttribute("title", DCM.Resources.getResource("QuantityTooltipLabel"));
		orderSizeField.label.append(orderSizeLabel);
		orderSizeField.label.append(orderSizeCurrencyLabel);
		orderSizeField.input.append(orderSizeStepper);
		orderSizeStepper.addEventHandler("CHANGE", function() {
			
			if(orderSizeStepper.value) {
			
				OrderPosition.setSize(orderSizeStepper.value);
				
			}
			else {
			
				OrderPosition.setSize(null);
			
			};
			
			checkOrderFormComplete();
			
			calculateMarketInformation();
			
		});
		
		orderPriceTypeLabel.setAttribute("data-deal-ticket-role", "sub-label");
		
		orderPriceField.label.append(orderPriceLabel);
		orderPriceField.label.append(orderPriceTypeLabel);
		orderPriceField.input.append(orderPriceStepper);
		orderPriceLabel.setText(DCM.Resources.getResource("PriceLabel"));
		orderPriceStepper.setFixed(MarketPosition.instrument.decimalPlaces);
		orderPriceStepper.addEventHandler("CHANGE", function() {
			
			if(orderPriceStepper.value) {
			
				OrderPosition.setEntryPrice(orderPriceStepper.value);
				
			}
			else {
			
				OrderPosition.setEntryPrice(null);
				
			};
			
			setOrderType(getOrderType());
			
			calculateMarketInformation();
			
			checkOrderFormComplete();
			
		});
		
		setOrderType(getOrderType());
		
		orderLifetimeField.label.append(orderLifetimeTypeLabel);
		orderLifetimeField.label.append(orderLifetimeTypeValue);
		
		orderLifetimeTypeLabel.setAttribute("title", DCM.Resources.getResource("GoodTIllTooltipLabel"));
		orderLifetimeTypeLabel.setText(DCM.Resources.getResource("GoodTillLabel"));
		orderLifetimeTypeValue.setText(DCM.Resources.getResource("CancelledLabel"));
		orderLifetimeTypeValue.setAttribute("data-deal-ticket-role", "sub-label");
		
		orderLifetimeField.input.append(orderLifetimeType);
		orderLifetimeType.setValue("CANCELLED");
		orderLifetimeType.addEventHandler("CHANGE", function() {
			
			if(this.value==="TIME") {
				
				var 
				dateSelector = new DCM.HTMLSelectDateDialogElement(),
				acceptHandler = function acceptHandler() {
					
					OrderPosition.setExpireTime(dateSelector.getDate());
					orderLifetimeTypeValue.setText(dateSelector.getDisplayDate());
					
				};
				
				dateSelector.addEventHandler("ACCEPT", acceptHandler);
				dateSelector.queue();
				
			}
			else if(this.value==="CANCELLED") {
				
				orderLifetimeTypeValue.setText(DCM.Resources.getResource("CancelledLabel"));
				
				OrderPosition.setExpireTime(null);
				
			};
			
		});
		
		orderStopField.input.append(orderStopStepper);
		orderStopField.input.append(orderStopPriceNotification);
		orderStopField.setAttribute("data-deal-ticket-role", "stopField");
		orderStopStepper.addEventHandler("CHANGE", function() {
		
			if(orderStopStepper.value) {
				
				OrderPosition.setStop(orderStopStepper.value);
				calculateStopMarketInformation();
			
			}
			else {
					
				OrderPosition.setStop(null);
				orderStopPriceNotification.setText("");
				
			};
			
			checkOrderFormComplete();
			
		});
		orderStopFieldLabel.setAttribute("title", DCM.Resources.getResource("StopTooltipLabel"));
		orderStopField.label.append(orderStopFieldLabel);
		
		orderLimitField.input.append(orderLimitStepper);
		orderLimitField.input.append(orderLimitPriceNotification);
		orderLimitField.setAttribute("data-deal-ticket-role", "limitField");
		orderLimitStepper.addEventHandler("CHANGE", function() {
		
			if(orderLimitStepper.value) {
				
				OrderPosition.setLimit(orderLimitStepper.value);
				calculateLimitMarketInformation();
				
			}
			else {
			
				OrderPosition.setLimit(null);
				orderLimitPriceNotification.setText("");
				
			};
			
			checkOrderFormComplete();
			
		});
		orderLimitFieldLabel.setAttribute("title", DCM.Resources.getResource("LimitTooltipLabel"));
		orderLimitField.label.append(orderLimitFieldLabel);
		
		viewTabs.addEventHandler("CHANGE", function() {
		
			checkForComplete();
			
			calculateMarketInformation();
		
		});
		viewTabs.setHeight("250px");
		
		sellButton.addEventListener(DCM.Event.click, function() {
		
			if(_this.side!=="SELL"&&!_this.lockedIntoSide) {
				
				setSide("SELL");
				
			}
			else if(!_this.lockedIntoSide) {
			
				setSide(null);
				
			};

			return false;
		
		});
		
		buyButton.addEventListener(DCM.Event.click, function() {
		
			if(_this.side!=="BUY"&&!_this.lockedIntoSide) {
			
				setSide("BUY");
				
			}
			else if(!_this.lockedIntoSide) {
			
				setSide(null);
				
			};
			
			return false;
		
		});
		
		sentiballButton.addEventListener(DCM.Event.click, function() {
			
			_this.resize();
			
			sentiballButton.toggle();
		
		});
		
		graphButton.addEventListener(DCM.Event.click, function() {
			
			MarketPosition.instrument.openChart();
			
		});
		
		notesButton.addEventListener(DCM.Event.click, function() {
			
			DCM.NoteManager.createNoteFromInstrument(_this.MarketPosition.instrument);
		
		});
		
		_this.buttonWrap.prepend(graphButton);
		_this.buttonWrap.prepend(notesButton);
		_this.buttonWrap.prepend(sentiballButton);
		
		_this.setType("HTMLTicketModuleElement");
		
		instrumentTicker.setText(MarketPosition.instrument.getTicker());
		instrumentName.setText(MarketPosition.instrument.getName());
		
		setSharePrice(MarketPosition.instrument.sharePrice + " " + MarketPosition.instrument.currency);
		
		_this.addEventHandler("CLOSE", function() {
			
			_this.destroy();
			
			DCM.TicketManager.tickets.splice(DCM.getIndexOf(DCM.TicketManager.tickets, _this), 1);
			
		});
		
		wizardTabTabsDirection.append(wizardTabTabsDirectionPanel);
		wizardTabTabsDirectionPanel.head.setText("Would you like to<br />BUY or SELL?");
		wizardTabTabsDirectionPanel.body.append(wizardTabTabsDirectionMessageDesc);
		wizardTabTabsDirectionPanel.body.append(wizardTabTabsDirectionMessageBody);
		wizardTabTabsDirectionMessageDesc.setText("<span data-direction=\"BUY\">BUY</span> and <span data-direction=\"SELL\">SELL</span> represent the direction in which you expect the market to move; UP or DOWN.");
		wizardTabTabsDirectionMessageDesc.setAttribute("data-wizard-role", "desc");
		wizardTabTabsDirectionMessageBody.setText("Take a moment to analyse the live <span data-type=\"keyword\">Sentiment</span> of this market, before selecting a direction above.");
		wizardTabTabsDirectionMessageBody.setAttribute("data-wizard-role", "desc");
		
		wizardTabTabsQuantity.append(wizardTabTabsQuantityPanel);
		wizardTabTabsQuantityPanel.body.append(wizardSizeStepper);
		wizardTabTabsQuantityPanel.body.append(wizardTabTabsQuantityMessageBody);
		wizardTabTabsQuantityMessageBody.setAttribute("data-wizard-role", "desc");
		wizardSizeStepper.setAttribute("data-wizard-role", "stepper");
		wizardSizeStepper.addEventHandler("CHANGE", function() {
		
			if(wizardSizeStepper.value) {
			
				WizardPosition.setSize(wizardSizeStepper.value);
				
			}
			else {
				
				WizardPosition.setSize(null);
				
			};
			
			calculateWizardPotentialProfit();
			
			// not sure whether this is required here...
			calculateMarketInformation();
			
		});
		wizardSizeStepper.setValue(1);
		
		wizardTabTabsStop.append(wizardTabTabsStopPanel);
		wizardTabTabsStopPanel.head.setText("Would you like to<br />limit the amount you could lose?");
		wizardTabTabsStopPanel.body.append(wizardStopStepper);
		wizardTabTabsStopPanel.body.append(wizardTabTabsStopBody);
		wizardTabTabsStopBody.setText("By setting a <span data-type=\"keyword\">stop</span>; your position would automatically close if it were to reach a given amount of loss.");
		wizardTabTabsStopBody.setAttribute("data-wizard-role", "desc");
		wizardStopStepper.setAttribute("data-wizard-role", "stepper");
		wizardStopStepper.addEventHandler("CHANGE", function() {
		
			if(tradeStopStepper.value) {
			
				WizardPosition.setStop(tradeStopStepper.value);
			
			}
			else {
			
				WizardPosition.setStop(null);
				
			};
			
			// not sure whether this is required here...
			calculateMarketInformation();
			
		});
		
		wizardTabTabsLimit.append(wizardTabTabsLimitPanel);
		wizardTabTabsLimitPanel.head.setText("Would you like to<br />limit the amount you could profit?");
		wizardTabTabsLimitPanel.body.append(wizardLimitStepper);
		wizardTabTabsLimitPanel.body.append(wizardTabTabsLimitBody);
		wizardTabTabsLimitBody.setText("By setting a <span data-type=\"keyword\">limit</span>; your position would automatically close if it were to reach a given amount of profit.");
		wizardTabTabsLimitBody.setAttribute("data-wizard-role", "desc");
		wizardLimitStepper.setAttribute("data-wizard-role", "stepper");
		wizardLimitStepper.addEventHandler("CHANGE", function() {
		
			if(wizardLimitStepper.value) {
			
				WizardPosition.setLimit(wizardLimitStepper.value);
			
			}
			else {
			
				WizardPosition.setLimit(null);
				
			};
			
			// not sure whether this is required here...
			calculateMarketInformation();
			
		});
		
		wizardTabTabsPrice.append(wizardTabTabsPricePanel);
		wizardTabTabsPricePanel.head.setText("Would you like to<br />wait for a specific price?");
		wizardTabTabsPricePanel.body.append(wizardPriceStepper);
		wizardTabTabsPricePanel.body.append(wizardTabTabsPriceBody);
		wizardPriceStepper.setFixed(MarketPosition.instrument.decimalPlaces);
		wizardPriceStepper.setAttribute("data-wizard-role", "stepper");
		wizardPriceStepper.addEventHandler("CHANGE", function() {
		
			if(wizardPriceStepper.value) {
			
				WizardPosition.setEntryPrice(wizardPriceStepper.value);
			
			}
			else {
			
				WizardPosition.setEntryPrice(null);
				
			};
			
			// not sure whether this is required here...
			calculateMarketInformation();
			
		});
		wizardTabTabsPriceBody.setText("By setting a <span data-type=\"keyword\">price</span>; your position will automatically open when the <span data-type=\"keyword\">market-price</span> matches a given value.");
		wizardTabTabsPriceBody.setAttribute("data-wizard-role", "desc");
		
		wizardTabTabsSummary.append(wizardTabTabsSummaryPanel);
		wizardTabTabsSummaryPanel.head.setText("Transaction Summary");
		wizardTabTabsSummaryPanel.body.append(wizardDetailsTable);
		wizardTabTabsSummaryPanel.body.append(wizardTabTabsSummaryBody);
		wizardTabTabsSummaryBody.setText("Please review your transaction before selecting continue, to place your order.");
		wizardTabTabsSummaryBody.setAttribute("data-wizard-role", "desc");
		
		detailsTablePriceHeading.setText(DCM.Resources.getResource("PriceLabel"));
		detailsTableStopHeading.setText(DCM.Resources.getResource("StopLabel"));
		detailsTableLimitHeading.setText(DCM.Resources.getResource("LimitLabel"));
		detailsTableSizeHeading.setText(DCM.Resources.getResource("SizeLabel"));
		
		wizardDetailsTable.append(sizeRow);
		wizardDetailsTable.append(priceRow);
		wizardDetailsTable.append(stopRow);
		wizardDetailsTable.append(limitRow);
		
		wizardButtonWrap.append(wizardNextButton);
		wizardButtonWrap.append(wizardCancelButton);
		wizardTab.append(wizardButtonWrap);
		wizardButtonWrap.setType("HTMLWizardButtonWrapElement");
		
		wizardNextButton.disable();
		wizardCancelButton.disable();
		
		wizardTab.append(wizardTabTabs);
		wizardTab.navItem.hide();
		wizardTabTabs.nav.hide();
		
		wizardCancelButton.setText("Cancel");
		wizardNextButton.setText("Continue");
		
		wizardNextButton.addEventListener(DCM.Event.click, function() {
			
			if(this.enabled) {
				switch(wizardTabTabs.value) {
					case "DIRECTION":
						wizardTabTabs.setValue("QUANTITY");
						wizardCancelButton.enable();
					break;
					case "QUANTITY":
						wizardTabTabs.setValue("STOP");
					break;
					case "STOP":
						wizardTabTabs.setValue("LIMIT");
					break;
					case "LIMIT":
						wizardTabTabs.setValue("PRICE");
					break;
					case "PRICE":
						wizardTabTabs.setValue("SUMMARY");
						
						detailsTablePriceValue.setText(WizardPosition.getEntryPrice());
						detailsTableStopValue.setText(WizardPosition.getStop());
						detailsTableLimitValue.setText(WizardPosition.getLimit());
						detailsTableSizeValue.setText(WizardPosition.getSize());
						
					break;
					case "SUMMARY":
						// place trade
					break;
					
				};
			};
		});
		
		wizardCancelButton.addEventListener(DCM.Event.click, function() {
		
			if(this.enabled) {
				wizardTabTabs.setValue("DIRECTION");
				wizardCancelButton.disable();
				wizardSizeStepper.setValue(1);
				wizardStopStepper.clear();
				wizardLimitStepper.clear();
				wizardPriceStepper.clear();
			};
			
		});
		
		calculateMarketInformation();
		
		_this.addEventHandler("DESTROY", function() {
			
			MarketPosition.instrument.removeEventHandler("BUY_PRICE_CHANGE", buyPriceChangeHandler);
			MarketPosition.instrument.removeEventHandler("SELL_PRICE_CHANGE", sellPriceChangeHandler);
			MarketPosition.instrument.removeEventHandler("SENTIMENT_CHANGE", sentimentChangeHandler);
			MarketPosition.instrument.removeEventHandler("HIGH_PRICE_CHANGE", highPriceChangeHAndler);
			MarketPosition.instrument.removeEventHandler("LOW_PRICE_CHANGE", LowPriceChangeHAndler);
			MarketPosition.instrument.removeEventHandler("SENTIMENT_HIGH_CHANGE", sentimentHighChangeHandler);
			MarketPosition.instrument.removeEventHandler("SENTIMENT_LOW_CHANGE", sentimentLowChangeHandler);
			MarketPosition.instrument.removeEventHandler("SENTIMENTCHANGE_CHANGE", sentimentDailyChangeHandler);
			
		});
	
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleElement", e);
		
	};
	
};DCM.HTMLTicketModuleErrorNotificationElement = function HTMLTicketModuleErrorNotificationElement() {

	try {
		
		var
		_this = this,
		errorHolder = new DCM.HTMLTicketModuleErrorNotificationMessageElement(),
		setMessage = _this.setMessage = function setMessage(value) {
			errorHolder.setText(value);
		};
		
		this._super = DCM.HTMLTicketModuleInteractiveNotificationElement;
		this._super();
		
		_this.setType("HTMLTicketModuleErrorNotificationElement");
		
		_this.head.setText("Transaction Rejected");
		_this.body.append(errorHolder);
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleErrorNotificationElement", e);
		
	};
	
};DCM.HTMLTicketModuleErrorNotificationMessageElement = function HTMLTicketModuleErrorNotificationMessageElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleErrorNotificationMessageElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleErrorNotificationMessageElement", e);
		
	};
	
};DCM.HTMLTicketModuleHeadElement = function HTMLTicketModuleHeadElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleHeadElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleHeadElement", e);
		
	};
	
};DCM.HTMLTicketModuleInteractiveNotificationElement = function HTMLTicketModuleInteractiveNotificationElement() {

	try {
		
		var
		_this = this,
		continueButton = new DCM.HTMLButtonElement();
		
		this._super = DCM.HTMLTicketModuleNotificationElement;
		this._super();
		
		_this.setType("HTMLTicketModuleInteractiveNotificationElement");
		
		_this.foot.append(continueButton);
		continueButton.setText("Continue");
		
		continueButton.addEventListener(DCM.Event.click, function() {
			
			_this.close();
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleInteractiveNotificationElement", e);
		
	};
	
};DCM.HTMLTicketModuleLeftPanelElement = function HTMLTicketModuleLeftPanelElement() {

	try {
		
		this._super = DCM.HTMLTicketModulePanelElement;
		this._super();
		
		this.setType("HTMLTicketModuleLeftPanelElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleLeftPanelElement", e);
		
	};
	
};DCM.HTMLTicketModuleNotificationBodyElement = function HTMLTicketModuleNotificationBodyElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleNotificationBodyElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleNotificationBodyElement", e);
		
	};
	
};DCM.HTMLTicketModuleNotificationElement = function HTMLTicketModuleNotificationElement() {

	try {
		
		var
		head = this.head = new DCM.HTMLTicketModuleNotificationHeadElement(),
		body = this.body = new DCM.HTMLTicketModuleNotificationBodyElement(),
		foot = this.foot = new DCM.HTMLTicketModuleNotificationFootElement(),
		wrap = new DCM.HTMLTicketModuleNotificationWrapElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleNotificationElement");
		
		this.append(wrap);
		
		this.close = function close() {
			
			this.remove();
		
		};
		
		this.setHeading = function setHeading(value) {
			
			head.setText(value);
			
		};
		
		wrap.append(head);
		wrap.append(body);
		wrap.append(foot);
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleNotificationElement", e);
		
	};
	
};DCM.HTMLTicketModuleNotificationFootElement = function HTMLTicketModuleNotificationFootElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleNotificationFootElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleNotificationFootElement", e);
		
	};
	
};DCM.HTMLTicketModuleNotificationHeadElement = function HTMLTicketModuleNotificationHeadElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleNotificationHeadElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleNotificationHeadElement", e);
		
	};
	
};DCM.HTMLTicketModuleNotificationWrapElement = function HTMLTicketModuleNotificationWrapElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleNotificationWrapElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleNotificationWrapElement", e);
		
	};
	
};DCM.HTMLTicketModulePanelElement = function HTMLTicketModulePanelElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModulePanelElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModulePanelElement", e);
		
	};
	
};DCM.HTMLTicketModulePendingNotificationElement = function HTMLTicketModulePendingNotificationElement() {

	try {
		
		this._super = DCM.HTMLTicketModuleNotificationElement;
		this._super();
		
		this.setType("HTMLTicketModulePendingNotificationElement");
		this.head.setText("Processing Transation");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModulePendingNotificationElement", e);
		
	};
	
};DCM.HTMLTicketModuleRightPanelElement = function HTMLTicketModuleRightPanelElement() {

	try {
		
		this._super = DCM.HTMLTicketModulePanelElement;
		this._super();
		
		this.setType("HTMLTicketModuleRightPanelElement");
	
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleRightPanelElement", e);
		
	};
	
};DCM.HTMLTicketModuleSellButtonElement = function HTMLTicketModuleSellButtonElement() {

	try {
		
		this._super = DCM.HTMLTicketModuleButtonElement;
		this._super();
		
		this.label.setText(DCM.Resources.getResource("SellLabel"));
		this.setType("HTMLTicketModuleSellButtonElement");
		this.icon.setText("DOWN");
		this.icon.setRole("deal-ticket-down-arrow");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleSellButtonElement", e);
		
	};
	
};DCM.HTMLTicketModuleSuccessInstrumentNameElement = function HTMLTicketModuleSuccessInstrumentNameElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleSuccessInstrumentNameElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleSuccessInstrumentNameElement", e);
		
	};
	
};DCM.HTMLTicketModuleSuccessNotificationElement = function HTMLTicketModuleSuccessNotificationElement() {

	try {
		
		var
		_this = this,
		numberOfSharesHolder = new DCM.HTMLTicketModuleSuccessSharesElement(),
		sideHolder = new DCM.HTMLTicketModuleSuccessSideElement(),
		setNumberOfShares = _this.setNumberOfShares = function setNumberOfShares(value) {
			numberOfSharesHolder.setText(value);
		},
		setSide = _this.setSide = function setSide(value) {
			sideHolder.setText(value==="BUY"?"Bought":"Sold");
			sideHolder.setAttribute("data-direction", value);
		},
		setPrice = _this.setPrice = function setPrice(value) {
			priceValue.setText(value);
		},
		setStop = _this.setStop = function setStop(value) {
			if(!value) {
				return;
			};
			stopValue.setText(value);
		},
		setLimit = _this.setLimit = function setLimit(value) {
			if(!value) {
				return;
			};
			limitValue.setText(value);
		},
		setSize = _this.setSize = function setSize(value) {
			if(!value) {
				return;
			};
			sizeValue.setText(value);
		},
		setMarket = _this.setMarket = function setMarket(value) {
			if(!value) {
				return;
			};
			marketValue.setText(value);
		},
		setRef = _this.setRef = function setRef(value) {
			referenceValue.setText(value);
		},
		detailsTable = new DCM.HTMLDivElement(),
		priceRow = new DCM.HTMLRowElement(),
		marketRow = new DCM.HTMLRowElement(),
		sizeRow = new DCM.HTMLRowElement(),
		stopRow = new DCM.HTMLRowElement(),
		limitRow = new DCM.HTMLRowElement(),
		referenceRow = new DCM.HTMLRowElement(),
		priceHeading = priceRow.addColumn(),
		priceValue = priceRow.addColumn(),
		stopHeading = stopRow.addColumn(),
		stopValue = stopRow.addColumn(),
		limitHeading = limitRow.addColumn(),
		limitValue = limitRow.addColumn(),
		referenceHeading = referenceRow.addColumn(),
		referenceValue = referenceRow.addColumn(),
		marketHeading = marketRow.addColumn(),
		marketValue = marketRow.addColumn(),
		sizeHeading = sizeRow.addColumn(),
		sizeValue = sizeRow.addColumn();
		
		this._super = DCM.HTMLTicketModuleInteractiveNotificationElement;
		this._super();
		
		_this.setType("HTMLTicketModuleSuccessNotificationElement");
		
		priceHeading.setText("Price");
		referenceHeading.setText("Reference");
		stopHeading.setText("Stop");
		limitHeading.setText("Limit");
		sizeHeading.setText("Size");
		marketHeading.setText("Market");
		
		setStop("-");
		setLimit("-");
		
		_this.setHeading(DCM.Resources.getResource("TicketTransactionComplete"));
		
		_this.body.append(numberOfSharesHolder);
		_this.body.append(sideHolder);
		
		detailsTable.append(marketRow);
		detailsTable.append(sizeRow);
		detailsTable.append(priceRow);
		detailsTable.append(stopRow);
		detailsTable.append(limitRow);
		detailsTable.append(referenceRow);
		
		_this.body.append(detailsTable);
	
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleSuccessNotificationElement", e);
		
	};
	
};DCM.HTMLTicketModuleSuccessSharesElement = function HTMLTicketModuleSuccessSharesElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleSuccessSharesElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleSuccessSharesElement", e);
		
	};
	
};DCM.HTMLTicketModuleSuccessSideElement = function HTMLTicketModuleSuccessSideElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleSuccessSideElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleSuccessSideElement", e);
		
	};
	
};DCM.HTMLTicketModuleSuccessTickerElement = function HTMLTicketModuleSuccessTickerElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleSuccessTickerElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleSuccessTickerElement", e);
		
	};
	
};DCM.HTMLTicketModuleWizardBodyElement = function HTMLTicketModuleWizardBodyElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleWizardBodyElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleWizardBodyElement", e);
		
	};
	
};DCM.HTMLTicketModuleWizardElement = function HTMLTicketModuleWizardElement() {

	try {
		
		var
		head = this.head = new DCM.HTMLTicketModuleWizardHeadElement(),
		body = this.body = new DCM.HTMLTicketModuleWizardBodyElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleWizardElement");
		this.append(head);
		this.append(body);
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleWizardElement", e);
		
	};
	
};DCM.HTMLTicketModuleWizardHeadElement = function HTMLTicketModuleWizardHeadElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleWizardHeadElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleWizardHeadElement", e);
		
	};
	
};DCM.HTMLToastElement = function HTMLToastElement() {

	try {
		
		var
		timer,
		_this = this,
		destroy = function destroy() {
			_this.remove();
			DCM.ToastManager.toasts.splice(DCM.getIndexOf(DCM.ToastManager.toasts, _this), 1);
		};
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
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
		
	}
	catch(e) {
	
		DCM.warn("HTMLToastElement", e);
	
	};
	
};DCM.HTMLToolbarElement = function HTMLToolbarElement() {

	try {
		
		var
		_this = this,
		modules = _this.modules = new DCM.HTMLToolbarItemElement(),
		//account = _this.account = new DCM.HTMLToolbarItemElement(),
		finder = _this.finder = new DCM.HTMLToolbarItemElement(),
		settings = _this.settings = new DCM.HTMLToolbarItemElement(),
		logout = _this.logout = new DCM.HTMLToolbarItemElement(),
		moduleMenuPopout = new DCM.HTMLToolbarPopoutElement(),
		finderPopout = new DCM.HTMLToolbarPopoutElement(),
		finderModule = new DCM.HTMLFinderModuleElement(),
		moduleMenu = modules.menu = new DCM.HTMLModuleMenuElement(),
		activateItem = _this.activateItem = function activateItem(itemName) {
			DCM.log("HTMLToolbarElement.activateItem()", arguments);
			if(moduleMenu[itemName]) {
				moduleMenu[itemName].activate();
			};
		},
		deactivateItem = _this.deactivateItem = function deactivateItem(itemName) {
			DCM.log("HTMLToolbarElement.deactivateItem()", arguments);
			if(moduleMenu[itemName]) {
				moduleMenu[itemName].deactivate();
			};
		},
		settingsPopout = new DCM.HTMLToolbarPopoutElement(),
		settingsModule = new DCM.HTMLSettingsModuleElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		modules.append(moduleMenuPopout);
		moduleMenuPopout.append(moduleMenu);
		
		finder.append(finderPopout);
		finderPopout.append(finderModule);
		
		modules.setLabel(DCM.Resources.getResource("ModulesToolbarItem"));
		modules.icon.setRole("add-module");
		modules.setRole("add-module");
		
		//account.setLabel(DCM.Resources.getResource("AccountToolbarItem"));
		//account.icon.setRole("my-account");
		//account.setRole("my-account");
		
		finder.setLabel(DCM.Resources.getResource("FinderToolbarItem"));
		finder.icon.setRole("finder");
		finder.setRole("finder");
		
		settings.setLabel(DCM.Resources.getResource("SettingsToolbarItem"));
		settings.icon.setRole("settings");
		settings.setRole("settings");
		
		settings.append(settingsPopout);
		settingsPopout.append(settingsModule);
		
		logout.setLabel(DCM.Resources.getResource("LogoutToolbarItem"));
		logout.icon.setRole("logout");
		logout.setRole("logout");
		
		logout.addEventListener(DCM.Event.click, function() {
		
			var logoutConfirmation = new DCM.HTMLConfirmationDialogElement();
			logoutConfirmation.setHeading(DCM.Resources.getResource("LogoutConfirmHeading"));
			logoutConfirmation.setMessage(DCM.Resources.getResource("LogoutConfirmMessage"));
			logoutConfirmation.addEventHandler("ACCEPT", function() {
				DCM.Net.navigateToURL("/logout");
			});
			logoutConfirmation.queue();
			
			return false;
			
		});
		
		_this.append(modules);
		//_this.append(account);
		_this.append(finder);
		_this.append(settings);
		_this.append(logout);
		
		_this.setType("HTMLToolbarElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLToolbarElement", e);
	
	};
	
};DCM.HTMLToolbarItemElement = function HTMLToolbarItemElement() {

	try {
		
		var
		icon = this.icon = new DCM.HTMLIconElement(),
		button = this.button = new DCM.HTMLGraphicButtonElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		icon.setSize("1");
		
		button.append(icon);
		this.append(button);
		
		this.setType("HTMLToolbarItemElement");
		
		this.setLabel = function(value) {
			icon.setText(value);
			icon.setAttribute("title", value);
			button.setAttribute("title", value);
		};
		
	}
	catch(e) {
	
		DCM.warn("HTMLToolbarItemElement", e);
	
	};
	
};DCM.HTMLToolbarPopoutElement = function HTMLToolbarPopoutElement() {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setAttribute("data-toolbar-role", "pop-out");
		
	}
	catch(e) {
		
		DCM.warn("HTMLToolbarPopoutElement", e);
		
	};

};DCM.HTMLTooltipElement = function HTMLTooltipElement() {

	try {
		
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
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		_this.setType("HTMLTooltipElement");
		
		_this.setStyle("position", "fixed");
		
		setXOffset(20);
		setYOffset(5);
		setDelay(700);
		_this.setWidth("220px");
		_this.hide();
		open();
		
	}
	catch(e) {
	
		DCM.warn("HTMLTooltipElement", e);
	
	};
	
};DCM.HTMLTRElement = function HTMLTRElement() {

	try {
	
		var addColumnInc = 1;
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("tr");
		
		this.addColumn = function addColumn(text) {
			var col = new DCM.HTMLTDElement();
			col.setColumn(addColumnInc);
			this.append(col);
			addColumnInc ++;
			if(text) {
				col.setText(text);
			};
			return col;
		};
		
		this.setRow = function setRow(value) {
			this.setAttribute("data-table-row-id", value);
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLTRElement", e);
		
	};
	
};DCM.HTMLTweetsModuleElement = function HTMLTweetsModuleElement() {
	
	try {

		var
		_this = this,
		lightstreamerHandler = function lightstreamerHandler() {
			this.onItemUpdate = function(data) {
				addItem(data.getValue("newsId"), data.getValue("news_title"));
			};
		},
		subscribe = _this.subscribe = function subscribe() {
		
			var newsSubscription = new Lightstreamer.Subscription("DISTINCT", "dcmnews_bussines", ["newsId", "news_title"]);
			newsSubscription.addListener(new lightstreamerHandler());
			newsSubscription.setDataAdapter("dcm_news");
			newsSubscription.setRequestedSnapshot("yes");
			DCM.sharingClient.subscribe(newsSubscription);
			
		},
		addItem = _this.addItem = function addItem(id, title) {
		
			var item = new DCM.HTMLNewsModuleItemElement(id, title);
			
			_this.scroller.body.prepend(item);
			
		};
		
		this._super = DCM.HTMLScrollableModuleElement;
		this._super();
		
		this.setIcon("tweets");
		this.setHeading(DCM.Resources.getResource("TweetsPanelHeading"));
		this.setType("HTMLTweetsModuleElement");
		
		subscribe();
	
	}
	catch(e) {
	
		DCM.warn("HTMLTweetsModuleElement", e);
	
	};
	
};DCM.HTMLULElement = function HTMLULElement() {
		
	try {
	
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("ul");
		this.setType("HTMLULElement");
		
		this.addItem = function addItem() {
			var item = new DCM.HTMLLIElement();
			this.append(item);
			return item;
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLULElement", e);
		
	};
	
};DCM.HTMLUpgradeAccountDialogElement = function HTMLUpgradeAccountDialogElement() {

	try {
	
		this._super = DCM.HTMLUpgradeDialogElement;
		this._super();
		
		var 
		_this = this,
		tabGroup = new DCM.HTMLTabGroupElement(),
		personalDetailsTab = tabGroup.addTab(DCM.Resources.getResource("UpgradeAccountPersonalTabLabel"), "PERSONAL"),
		personalTabNumber = new DCM.HTMLDivElement(),
		addressTab = tabGroup.addTab(DCM.Resources.getResource("UpgradeAccountAddressTabLabel"), "ADDRESS"),
		addressTabNumber = new DCM.HTMLDivElement(),
		experianceTab = tabGroup.addTab(DCM.Resources.getResource("UpgradeAccountExperianceTabLabel"), "EXPERIANCE"),
		experianceTabNumber = new DCM.HTMLDivElement(),
		finaancialDetailsTab = tabGroup.addTab(DCM.Resources.getResource("UpgradeAccountFinancialTabLabel"), "FINANCIAL"),
		financialTabNumber = new DCM.HTMLDivElement(),
		finishTab = tabGroup.addTab(DCM.Resources.getResource("UpgradeAccountReviewTabLabel"), "FINISH"),
		finishTabNumber = new DCM.HTMLDivElement(),
		personalDetailsFrom = new DCM.HTMLFormElement(),
		addressForm = new DCM.HTMLFormElement(),
		experianceForm = new DCM.HTMLFormElement(),
		finaancialDetailsForm = new DCM.HTMLFormElement(),
		
		fullNameField = personalDetailsFrom.addField(),
		fullNameTitleInput = new DCM.HTMLCustomInlineTextInputElement(),
		fullNameFirstNameInput = new DCM.HTMLCustomInlineTextInputElement(),
		fullNameLastNameInput = new DCM.HTMLCustomInlineTextInputElement(),
		
		dateOfBirthField = personalDetailsFrom.addField(),
		dateOfBirthDayInput = new DCM.HTMLCustomInlineNumericInputElement(),
		dateOfBirthMonthInput = new DCM.HTMLCustomInlineNumericInputElement(),
		dateOfBirthYearInput = new DCM.HTMLCustomInlineNumericInputElement(),
		
		contactField = personalDetailsFrom.addField(),
		contactPrimaryNumberInput = new DCM.HTMLCustomInlineNumericInputElement(),
		contactMobileNumberInput = new DCM.HTMLCustomInlineNumericInputElement(),
		contactEmailInput = new DCM.HTMLCustomTextInputElement(),
		
		employmentField = personalDetailsFrom.addField(),
		employmentTypeRadioButtonGroup = new DCM.HTMLInlineRadioButtonGroupElement(),
		occupationInput = new DCM.HTMLCustomInlineTextInputElement(),
		industryInput = new DCM.HTMLCustomInlineTextInputElement(),
		
		addressField = addressForm.addField(),
		addressFirstLineInput = new DCM.HTMLCustomTextInputElement(),
		addressSecondLineInput = new DCM.HTMLCustomTextInputElement(),
		addressCityInput = new DCM.HTMLCustomInlineTextInputElement(),
		addressPostcodeInput = new DCM.HTMLCustomInlineTextInputElement(),
		addressCountryInput = new DCM.HTMLCustomInlineTextInputElement(),
		
		addressTimeAtField = addressForm.addField(),
		addressTimeAtYearsInput = new DCM.HTMLCustomInlineNumericInputElement(),
		addressTimeAtMonthsInput = new DCM.HTMLCustomInlineNumericInputElement(),
		
		previousAddressField = addressForm.addField(),
		previousAddressFirstLineInput = new DCM.HTMLCustomTextInputElement(),
		previousAddressSecondLineInput = new DCM.HTMLCustomTextInputElement(),
		previousAddressCityInput = new DCM.HTMLCustomInlineTextInputElement(),
		previousAddressPostcodeInput = new DCM.HTMLCustomInlineTextInputElement(),
		previousAddressCountryInput = new DCM.HTMLCustomInlineTextInputElement(),
		
		whatHaveYouTradedField = experianceForm.addField(),
		whatHaveYouTradedForm = new DCM.HTMLFormElement(),
		sharesOrBonds = whatHaveYouTradedForm.addField(),
		sharesOrBondsRadioGroup = new DCM.HTMLInlineRadioButtonGroupElement(),
		optionsTrading = whatHaveYouTradedForm.addField(),
		optionsTradingRadioGroup = new DCM.HTMLInlineRadioButtonGroupElement(),
		spreadBetting = whatHaveYouTradedForm.addField(),
		spreadBettingRadioGroup = new DCM.HTMLInlineRadioButtonGroupElement(),
		howHaveYouTradedField = experianceForm.addField(),
		howHaveYouTradedRadioGroup = new DCM.HTMLInlineRadioButtonGroupElement(),
		qualificationsField = experianceForm.addField(),
		qualificationsInput = new DCM.HTMLCustomTextInputElement(),
		occupationalExperianceCheckBox = new DCM.HTMLCheckboxElement(),
		qualificationsCheckBox = new DCM.HTMLCheckboxElement(),
		
		incomeBeforeTaxField = finaancialDetailsForm.addField(),
		incomeBeforeTaxInput = new DCM.HTMLCustomNumericInputElement(),
		savingsAndInvestmentsField = finaancialDetailsForm.addField(),
		savingsAndInvestmentsInput = new DCM.HTMLCustomNumericInputElement(),
		sourceOfFundsField = finaancialDetailsForm.addField(),
		sourceOfFundsRadioButtonGroup = new DCM.HTMLInlineRadioButtonGroupElement(),
		sourceOfFundsInput = new DCM.HTMLCustomTextInputElement(),
		statementsField = finaancialDetailsForm.addField(),
		statementsCheckBox = new DCM.HTMLCheckboxElement(),
		sendDataButton = new DCM.HTMLButtonElement(),
		finishMessage = new DCM.HTMLDivElement(),
		finishMessageFoot = new DCM.HTMLDivElement(),
		serviceCaller = new DCM.GenerateRegistrationFormService(),
		formURL,
		personalCompleteChecker = function personalCompleteChecker() {
			
			var 
			title = fullNameTitleInput.getValue(),
			firstName = fullNameFirstNameInput.getValue(),
			lastName = fullNameLastNameInput.getValue(),
			DOBDay = dateOfBirthDayInput.getValue(),
			DOBMonth = dateOfBirthMonthInput.getValue(),
			DOBYear = dateOfBirthYearInput.getValue(),
			contactNumber = contactPrimaryNumberInput.getValue(),
			email = contactEmailInput.getValue(),
			employmentStatus = employmentTypeRadioButtonGroup.getValue(),
			occupation = occupationInput.getValue(),
			industry = industryInput.getValue();
			
			if(title&&firstName&&lastName&&DOBDay&&DOBMonth&&DOBYear&&contactNumber&&email&&employmentStatus) {
				_this.forwardButton.enable();
				personalTabNumber.setAttribute("data-status", "complete");
				addressTab.enable();
			}
			else {
				_this.forwardButton.disable();
				personalTabNumber.setAttribute("data-status", "incomplete");
				addressTab.disable();
			};
			
		},
		addressCompleteChecker = function addressCompleteChecker() {
		
			var
			firtsLine = addressFirstLineInput.getValue(),
			secondLine = addressSecondLineInput.getValue(),
			town = addressCityInput.getValue(),
			postcode = addressPostcodeInput.getValue(),
			country = addressCountryInput.getValue(),
			timeAtYears = addressTimeAtYearsInput.getValue(),
			timeAtMonths = addressTimeAtMonthsInput.getValue();
			
			if(firtsLine&&town&&postcode&&country&&(timeAtYears||timeAtMonths)) {
				_this.forwardButton.enable();
				addressTabNumber.setAttribute("data-status", "complete");
				experianceTab.enable();
			}
			else {
				_this.forwardButton.disable();
				addressTabNumber.setAttribute("data-status", "incomplete");
				experianceTab.disable();
			};
			
		},
		experianceCompleteChecker = function experianceCompleteChecker() {
		
			var
			sharesOrBonds = sharesOrBondsRadioGroup.getValue(),
			exchangeTrading = optionsTradingRadioGroup.getValue(),
			OCTTrading = spreadBettingRadioGroup.getValue(),
			howTraded = howHaveYouTradedRadioGroup.getValue(),
			occupationalExp = occupationalExperianceCheckBox.getChecked(),
			qualifications = qualificationsCheckBox.getChecked(),
			releventExp = qualificationsInput.getValue();
			
			if(sharesOrBonds&&exchangeTrading&&OCTTrading&&howTraded&&(occupationalExp||qualifications||releventExp)) {
				_this.forwardButton.enable();
				experianceTabNumber.setAttribute("data-status", "complete");
				finaancialDetailsTab.enable();
			}
			else {
				_this.forwardButton.disable();
				experianceTabNumber.setAttribute("data-status", "incomplete");
				finaancialDetailsTab.disable();
			};
			
		},
		financialCompleteChecker = function financialCompleteChecker() {
			
			var
			income = incomeBeforeTaxInput.getValue(),
			savings = savingsAndInvestmentsInput.getValue(),
			fundSource = sourceOfFundsRadioButtonGroup.getValue(),
			otherFundSorce = sourceOfFundsInput.getValue();
			
			if(income&&savings&&(fundSource||otherFundSorce)) {
				_this.forwardButton.enable();
				financialTabNumber.setAttribute("data-status", "complete");
				finishTab.enable();
			}
			else {
				_this.forwardButton.disable();
				financialTabNumber.setAttribute("data-status", "incomplete");
				finishTab.disable();
			};
			
		},
		personalChangeHandler = function personalChangeHandler() {
			personalCompleteChecker();
		},
		addressChangeHandler = function addressChangeHandler() {
			addressCompleteChecker();
		},
		experianceChangeHandler = function experianceChangeHandler() {
			experianceCompleteChecker();
		},
		financialChangeHandler = function financialChangeHandler() {
			financialCompleteChecker();
		},
		lineElement = new DCM.HTMLDivElement(),
		tabGroupChangeHandler = function tabGroupChangeHandler() {
			
			switch(tabGroup.value) {
				case "PERSONAL":
					personalCompleteChecker();
					//DCM.log(DCM.accountType + "_Personal");
					_gaq.push(["_trackPageview", "/SB_Personal"]);
					_this.backButton.disable();
					//_this.forwardButton.enable();
				break;
				case "ADDRESS":
					addressCompleteChecker();
					//DCM.log(DCM.accountType + "_Address");
					_gaq.push(["_trackPageview", "/SB_Address"]);
					_this.backButton.enable();
					//_this.forwardButton.enable();
				break;
				case "EXPERIANCE":
					experianceCompleteChecker();
					//DCM.log(DCM.accountType + "_Experience");
					_gaq.push(["_trackPageview", "/SB_Experience"]);
					_this.backButton.enable();
					//_this.forwardButton.enable();
				break;
				case "FINANCIAL":
					financialCompleteChecker();
					//DCM.log(DCM.accountType + "_Financial");
					_gaq.push(["_trackPageview", "/SB_Financial"]);
					_this.backButton.enable();
					//_this.forwardButton.enable();
				break;
				case "FINISH":
					//DCM.log(DCM.accountType + "_Download");
					_gaq.push(["_trackPageview", "/SB_Download"]);
					_this.backButton.enable();
					_this.forwardButton.disable();
					
					serviceCaller.setParam("title", fullNameTitleInput.getValue());	
					serviceCaller.setParam("forename", fullNameFirstNameInput.getValue());
					serviceCaller.setParam("surname", fullNameLastNameInput.getValue());
					serviceCaller.setParam("dob", dateOfBirthDayInput.getValue() + "/" + dateOfBirthMonthInput.getValue() + "/" + dateOfBirthYearInput.getValue());
					serviceCaller.setParam("tele", contactPrimaryNumberInput.getValue());
					serviceCaller.setParam("mobile", contactMobileNumberInput.getValue());
					serviceCaller.setParam("emailAddress", contactEmailInput.getValue());
					serviceCaller.setParam("employState", employmentTypeRadioButtonGroup.getValue());
					serviceCaller.setParam("occupation", occupationInput.getValue());
					serviceCaller.setParam("industry", industryInput.getValue());
					serviceCaller.setParam("homeAddress", addressFirstLineInput.getValue() + " " + addressSecondLineInput.getValue());
					serviceCaller.setParam("city", addressCityInput.getValue());
					serviceCaller.setParam("postcode", addressPostcodeInput.getValue());
					serviceCaller.setParam("country", addressCountryInput.getValue());
					serviceCaller.setParam("timeAddY", addressTimeAtYearsInput.getValue());
					serviceCaller.setParam("timeAddM", addressTimeAtMonthsInput.getValue());
					serviceCaller.setParam("addressPrev", previousAddressFirstLineInput.getValue() + " " + previousAddressSecondLineInput.getValue());
					serviceCaller.setParam("cityPrev", previousAddressCityInput.getValue());
					serviceCaller.setParam("postcodePrev", previousAddressPostcodeInput.getValue());
					serviceCaller.setParam("countryPrev", previousAddressCountryInput.getValue());
					serviceCaller.setParam("income", incomeBeforeTaxInput.getValue());
					serviceCaller.setParam("investments", savingsAndInvestmentsInput.getValue());
					serviceCaller.setParam("fundSource", (function() {
						
						var 
						sourceOfFundsRadioButtonGroupValue = sourceOfFundsRadioButtonGroup.getValue(),
						_return = sourceOfFundsRadioButtonGroupValue;
						
						if(!_return) {
							_return = sourceOfFundsInput.getValue();
						};
						
						return _return;
						
					})());
					serviceCaller.setParam("statement", statementsCheckBox.getChecked());
					serviceCaller.setParam("expShares", sharesOrBondsRadioGroup.getValue());
					serviceCaller.setParam("expExchange", optionsTradingRadioGroup.getValue());
					serviceCaller.setParam("expOtc", spreadBettingRadioGroup.getValue());
					serviceCaller.setParam("occupational", occupationalExperianceCheckBox.getChecked());
					serviceCaller.setParam("occQual", qualificationsCheckBox.getChecked());
					serviceCaller.setParam("tradedBefore", howHaveYouTradedRadioGroup.getValue());
					serviceCaller.setParam("desOfQual", qualificationsInput.getValue());
					serviceCaller.setParam("accountTypeRequested", DCM.accountType);
					
					sendDataButton.setText(DCM.Resources.getResource("GeneratingApplicationFormLabel"));
					sendDataButton.disable();
				
					serviceCaller.call();
					
				break;
			};
			
		},
		previousHandler = function previousHandler() {
		
			switch(tabGroup.value) {
				case "FINISH":
					tabGroup.setValue("FINANCIAL");
				break;
				case "FINANCIAL":
					tabGroup.setValue("EXPERIANCE");
				break;
				case "EXPERIANCE":
					tabGroup.setValue("ADDRESS");
				break;
				case "ADDRESS":
					tabGroup.setValue("PERSONAL");
				break;
			};
			
			return false;
		
		},
		nextHandler = function nextHandler() {
		
			switch(tabGroup.value) {
				case "PERSONAL":
					tabGroup.setValue("ADDRESS");
				break;
				case "ADDRESS":
					tabGroup.setValue("EXPERIANCE");
				break;
				case "EXPERIANCE":
					tabGroup.setValue("FINANCIAL");
				break;
				case "FINANCIAL":
					tabGroup.setValue("FINISH");
				break;
				case "FINISH":
					finishTabNumber.setAttribute("data-status", "complete");
					_this.close();
				break;
			};
			
			return false;
		
		};
		
		lineElement.setAttribute("data-role", "step-line");
		
		tabGroup.nav.prepend(lineElement);
		
		personalTabNumber.setText("1");
		personalDetailsTab.navItem.prepend(personalTabNumber);
		
		addressTabNumber.setText("2");
		addressTab.navItem.prepend(addressTabNumber);
		
		experianceTabNumber.setText("3");
		experianceTab.navItem.prepend(experianceTabNumber);
		
		financialTabNumber.setText("4");
		finaancialDetailsTab.navItem.prepend(financialTabNumber);
		
		finishTabNumber.setText("5");
		finishTab.navItem.prepend(finishTabNumber);
		
		personalTabNumber.setAttribute("data-tab-role", "number");
		addressTabNumber.setAttribute("data-tab-role", "number");
		experianceTabNumber.setAttribute("data-tab-role", "number");
		financialTabNumber.setAttribute("data-tab-role", "number");
		finishTabNumber.setAttribute("data-tab-role", "number");
		
		addressTab.disable();
		experianceTab.disable();
		finaancialDetailsTab.disable();
		finishTab.disable();
		
		_this.body.append(tabGroup);
		_this.setHeading(DCM.Resources.getResource("UpgradeAccountLabel"));
		_this.setType("HTMLUpgradeAccountDialogElement");
		_this.setSuppressCloseOnContinue(true);
		
		personalCompleteChecker();
		
		tabGroup.setHeight("450px");
		
		tabGroup.addEventHandler("CHANGE", tabGroupChangeHandler);
		tabGroupChangeHandler();
		
		_this.addEventHandler("NEXT", nextHandler);
		_this.addEventHandler("PREVIOUS", previousHandler);
		
		personalDetailsTab.append(personalDetailsFrom);
		addressTab.append(addressForm);
		experianceTab.append(experianceForm);
		finaancialDetailsTab.append(finaancialDetailsForm);

		fullNameField.label.setText(DCM.Resources.getResource("FullNameLabel"));
		fullNameField.input.append(fullNameTitleInput);
		fullNameTitleInput.setPlaceholder(DCM.Resources.getResource("TitleLabel"));
		fullNameTitleInput.setAttribute("data-role", "title");
		fullNameTitleInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
		
		fullNameField.input.append(fullNameFirstNameInput);
		fullNameFirstNameInput.setPlaceholder(DCM.Resources.getResource("FirstNameLabel"));
		fullNameFirstNameInput.setAttribute("data-role", "first-name");
		fullNameFirstNameInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
		fullNameFirstNameInput.setValue(DCM.AccountManager.firstName);
		
		fullNameField.input.append(fullNameLastNameInput);
		fullNameLastNameInput.setPlaceholder(DCM.Resources.getResource("LastNameLabel"));
		fullNameLastNameInput.setAttribute("data-role", "last-name");
		fullNameLastNameInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
		fullNameLastNameInput.setValue(DCM.AccountManager.lastName);
		
		dateOfBirthField.label.setText(DCM.Resources.getResource("DateOfBirthLabel"));
		dateOfBirthField.input.append(dateOfBirthDayInput);
		dateOfBirthDayInput.setPlaceholder(DCM.Resources.getResource("DayLabel"));
		dateOfBirthDayInput.setMaxLength(2);
		dateOfBirthDayInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
		dateOfBirthDayInput.setAttribute("data-role", "dob-day");
		
		dateOfBirthField.input.append(dateOfBirthMonthInput);
		dateOfBirthMonthInput.setPlaceholder(DCM.Resources.getResource("MonthLabel"));
		dateOfBirthMonthInput.setMaxLength(2);
		dateOfBirthMonthInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
		dateOfBirthMonthInput.setAttribute("data-role", "dob-month");
		
		dateOfBirthField.input.append(dateOfBirthYearInput);
		dateOfBirthYearInput.setPlaceholder(DCM.Resources.getResource("YearLabel"));
		dateOfBirthYearInput.setMaxLength(4);
		dateOfBirthYearInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
		dateOfBirthYearInput.setAttribute("data-role", "dob-year");
		
		contactField.label.setText(DCM.Resources.getResource("ContactInformationLabel"));
		contactField.input.append(contactPrimaryNumberInput);
		contactPrimaryNumberInput.setPlaceholder(DCM.Resources.getResource("PrimaryNumberLabel"));
		contactPrimaryNumberInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
		contactPrimaryNumberInput.setAttribute("data-role", "contact-primary");
		
		contactField.input.append(contactMobileNumberInput);
		contactMobileNumberInput.setPlaceholder(DCM.Resources.getResource("MobileNumberLabel"));
		contactMobileNumberInput.setAttribute("data-role", "contact-mobile");
		
		contactField.input.append(contactEmailInput);
		contactEmailInput.setPlaceholder(DCM.Resources.getResource("EmailAddressLabel"));
		contactEmailInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
		contactEmailInput.setAttribute("data-role", "contact-email");
		contactEmailInput.setValue(DCM.AccountManager.emailAddress);
		
		employmentTypeRadioButtonGroup.setItem(DCM.Resources.getResource("EmployedLabel"), "EMPLOYED");
		employmentTypeRadioButtonGroup.setItem(DCM.Resources.getResource("SelfEmployedLabel"), "SELFEMPLOYED");
		employmentTypeRadioButtonGroup.setItem(DCM.Resources.getResource("UnemployedLabel"), "UNEMPLOYED");
		employmentTypeRadioButtonGroup.setItem(DCM.Resources.getResource("RetiredLabel"), "RETIRED");
		employmentField.label.setText(DCM.Resources.getResource("EmploymentStatusLabel"));
		employmentField.input.append(employmentTypeRadioButtonGroup);
		employmentTypeRadioButtonGroup.addEventHandler("CHANGE", personalChangeHandler);
		
		employmentField.input.append(occupationInput);
		occupationInput.setPlaceholder(DCM.Resources.getResource("OccupationLabel"));
		occupationInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
		occupationInput.setAttribute("data-role", "employment-occupation");
		employmentField.input.append(industryInput);
		industryInput.setPlaceholder(DCM.Resources.getResource("IndustryLabel"));
		industryInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
		industryInput.setAttribute("data-role", "employment-industry");
		
		// ADDRESS
		addressField.label.setText(DCM.Resources.getResource("HomeAddressLabel"));
		addressField.input.append(addressFirstLineInput);
		addressFirstLineInput.setPlaceholder(DCM.Resources.getResource("FirstLineAddressLabel"));
		addressFirstLineInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
		
		addressField.input.append(addressSecondLineInput);
		addressSecondLineInput.setPlaceholder(DCM.Resources.getResource("SecondLineAddressLabel"));
		addressSecondLineInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
		
		addressField.input.append(addressCityInput);
		addressCityInput.setPlaceholder(DCM.Resources.getResource("TownCityLabel"));
		addressCityInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
		
		addressField.input.append(addressPostcodeInput);
		addressPostcodeInput.setPlaceholder(DCM.Resources.getResource("PostcodeLabel"));
		addressPostcodeInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
		
		addressField.input.append(addressCountryInput);
		addressCountryInput.setPlaceholder(DCM.Resources.getResource("CountryLabel"));
		addressCountryInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
		
		addressTimeAtField.label.setText(DCM.Resources.getResource("TimeAtCurrentAddressLabel"));
		addressTimeAtField.input.append(addressTimeAtYearsInput);
		addressTimeAtYearsInput.setPlaceholder(DCM.Resources.getResource("YearsLabel"));
		addressTimeAtYearsInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
		
		addressTimeAtField.input.append(addressTimeAtMonthsInput);
		addressTimeAtMonthsInput.setPlaceholder(DCM.Resources.getResource("MonthsLabel"));
		addressTimeAtMonthsInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
		
		previousAddressField.label.setText(DCM.Resources.getResource("PreviousAddressLabel"));
		previousAddressField.input.append(previousAddressFirstLineInput);
		previousAddressFirstLineInput.setPlaceholder(DCM.Resources.getResource("FirstLineAddressLabel"));
		previousAddressField.input.append(previousAddressSecondLineInput);
		previousAddressSecondLineInput.setPlaceholder(DCM.Resources.getResource("SecondLineAddressLabel"));
		previousAddressField.input.append(previousAddressCityInput);
		previousAddressCityInput.setPlaceholder(DCM.Resources.getResource("TownCityLabel"));
		previousAddressField.input.append(previousAddressPostcodeInput);
		previousAddressPostcodeInput.setPlaceholder(DCM.Resources.getResource("PostcodeLabel"));
		previousAddressField.input.append(previousAddressCountryInput);
		previousAddressCountryInput.setPlaceholder(DCM.Resources.getResource("CountryLabel"));
		
		// EXPERIANCE
		whatHaveYouTradedField.label.setLabel(DCM.Resources.getResource("WhatHaveYouTradedLabel"));
		whatHaveYouTradedField.input.append(whatHaveYouTradedForm);
		
		sharesOrBonds.label.setText(DCM.Resources.getResource("SharesOrBondsLabel"));
		sharesOrBonds.input.append(sharesOrBondsRadioGroup);
		sharesOrBondsRadioGroup.setItem(DCM.Resources.getResource("FrequentlyLabel"), "FREQUENTLY");
		sharesOrBondsRadioGroup.setItem(DCM.Resources.getResource("SometimesLabel"), "SOMETIMES");
		sharesOrBondsRadioGroup.setItem(DCM.Resources.getResource("NeverLabel"), "RARELY");
		sharesOrBondsRadioGroup.addEventHandler("CHANGE", experianceChangeHandler);
		
		optionsTrading.label.setText(DCM.Resources.getResource("ExchangeTradedLabel"));
		optionsTrading.input.append(optionsTradingRadioGroup);
		optionsTradingRadioGroup.setItem(DCM.Resources.getResource("FrequentlyLabel"), "FREQUENTLY");
		optionsTradingRadioGroup.setItem(DCM.Resources.getResource("SometimesLabel"), "SOMETIMES");
		optionsTradingRadioGroup.setItem(DCM.Resources.getResource("NeverLabel"), "RARELY");
		optionsTradingRadioGroup.addEventHandler("CHANGE", experianceChangeHandler);
		
		spreadBetting.label.setText(DCM.Resources.getResource("SpreadbettingLabel"));
		spreadBetting.input.append(spreadBettingRadioGroup);
		spreadBettingRadioGroup.setItem(DCM.Resources.getResource("FrequentlyLabel"), "FREQUENTLY");
		spreadBettingRadioGroup.setItem(DCM.Resources.getResource("SometimesLabel"), "SOMETIMES");
		spreadBettingRadioGroup.setItem(DCM.Resources.getResource("NeverLabel"), "RARELY");
		spreadBettingRadioGroup.addEventHandler("CHANGE", experianceChangeHandler);
		
		howHaveYouTradedField.label.setText(DCM.Resources.getResource("HowHaveYouTradedLabel"));
		howHaveYouTradedField.input.append(howHaveYouTradedRadioGroup);
		howHaveYouTradedRadioGroup.setItem(DCM.Resources.getResource("ExcecutionOnlyLabel"), "EXCECUTION");
		howHaveYouTradedRadioGroup.setItem(DCM.Resources.getResource("ManagedLabel"), "MANAGED");
		howHaveYouTradedRadioGroup.setItem(DCM.Resources.getResource("NoneApplicableLabel"), "NONE");
		howHaveYouTradedRadioGroup.addEventHandler("CHANGE", experianceChangeHandler);

		qualificationsField.label.setText(DCM.Resources.getResource("ExperianceDetailsLabel"));
		qualificationsField.input.append(occupationalExperianceCheckBox);
		occupationalExperianceCheckBox.setLabel(DCM.Resources.getResource("OccupationalExperianceLabel"));
		occupationalExperianceCheckBox.addEventHandler("CHANGE", experianceChangeHandler);
		qualificationsField.input.append(qualificationsCheckBox);
		qualificationsCheckBox.setLabel(DCM.Resources.getResource("QualificationsLabel"));
		qualificationsCheckBox.addEventHandler("CHANGE", experianceChangeHandler);
		qualificationsField.input.append(qualificationsInput);
		qualificationsInput.setPlaceholder(DCM.Resources.getResource("OtherReleventExperianceLabel"));
		qualificationsInput.input.addEventListener(DCM.Event.change, experianceChangeHandler);
		
		// FINANCIAL
		incomeBeforeTaxField.label.setText(DCM.Resources.getResource("IncomeBeforeTaxLabel"));
		incomeBeforeTaxField.input.append(incomeBeforeTaxInput);
		incomeBeforeTaxInput.setPlaceholder(DCM.Resources.getResource("SpecifyAmountInGBPLabel"));
		incomeBeforeTaxInput.input.addEventListener(DCM.Event.change, financialChangeHandler);
		
		savingsAndInvestmentsField.label.setText(DCM.Resources.getResource("ValueOfSavingsLabel"));
		savingsAndInvestmentsField.input.append(savingsAndInvestmentsInput);
		savingsAndInvestmentsInput.setPlaceholder(DCM.Resources.getResource("SpecifyAmountInGBPLabel"));
		savingsAndInvestmentsInput.input.addEventListener(DCM.Event.change, financialChangeHandler);
		
		sourceOfFundsRadioButtonGroup.setItem(DCM.Resources.getResource("EmploymentLabel"), "EMPLOYMENT");
		sourceOfFundsRadioButtonGroup.setItem(DCM.Resources.getResource("InhreitanceLabel"), "INHREITANCE");
		sourceOfFundsRadioButtonGroup.setItem(DCM.Resources.getResource("InvestmentLabel"), "INVESTMENT");
		sourceOfFundsField.label.setText(DCM.Resources.getResource("SourceOfFundsLabel"));
		sourceOfFundsField.input.append(sourceOfFundsRadioButtonGroup);
		sourceOfFundsRadioButtonGroup.addEventHandler("CHANGE", financialChangeHandler);
		sourceOfFundsField.input.append(sourceOfFundsInput);
		sourceOfFundsInput.setPlaceholder(DCM.Resources.getResource("OtherLabel"));
		sourceOfFundsInput.input.addEventListener(DCM.Event.change, financialChangeHandler);
		
		statementsField.label.setText(DCM.Resources.getResource("StatementsLabel"));
		statementsField.input.append(statementsCheckBox);
		statementsCheckBox.setLabel(DCM.Resources.getResource("StatementsByPostLabel"));
		
		finishTab.append(finishMessage);
		finishTab.append(sendDataButton);
		//finishTab.append(finishMessageFoot);
		
		finishMessage.setText(DCM.Resources.getResource("UpgradeReviewLabel"));
		finishMessage.setAttribute("data-role", "message");
		
		//finishMessageFoot.setText(DCM.Resources.getResource("UpgradeReviewFootLabel"));
		//finishMessageFoot.setAttribute("data-role", "message");
		
		sendDataButton.setText(DCM.Resources.getResource("GenerateApplicationFormLabel"));
		sendDataButton.setAttribute("data-role", "download-form");
		
		sendDataButton.addEventListener(DCM.Event.click, function() {
		
			window.open(formURL);
		
		});
		
		serviceCaller.addEventHandler("SUCCESS", function(data) {
			
			DCM.log("data.accForm", data.accForm);
			
			formURL = data.accForm;
			
			sendDataButton.enable();
			
			sendDataButton.setText(DCM.Resources.getResource("GenerateApplicationFormLabel"));
			
			_gaq.push(["_trackPageview", "/SB_DownloadComplete"]);
			
		});
	
	}
	catch(e) {
		
		DCM.warn("HTMLUpgradeAccountDialogElement", e);
		
	};
	
};DCM.HTMLUpgradeDialogElement = function HTMLUpgradeDialogElement() {

	try {
		
		var
		_this = this,
		backButton = _this.backButton = new DCM.HTMLDialogLeftButtonElement(),
		forwardButton = _this.forwardButton = new DCM.HTMLDialogRightButtonElement(),
		forwardHandler = function forwardHandler() {
		
			_this.dispatchEventHandler("NEXT");
			
			return false;
		
		},
		backHandler = function backHandler() {
			
			_this.dispatchEventHandler("PREVIOUS");
			
			return false;
			
		},
		closeButton = new DCM.HTMLDivElement(),
		closeHandler = function closeHandler() {
			
			_this.close();
		
		};
		
		this._super = DCM.HTMLDialogElement;
		this._super();
		
		closeButton.setText(DCM.Resources.getResource("CloseLabel"));
		closeButton.setAttribute("data-dialog-role", "close");
		
		forwardButton.setText(DCM.Resources.getResource("NextLabel"));
		forwardButton.addEventListener(DCM.Event.click, forwardHandler);
		
		backButton.setText(DCM.Resources.getResource("PreviousLabel"));
		backButton.addEventListener(DCM.Event.click, backHandler);
		
		_this.body.append(closeButton);
		_this.foot.append(backButton);
		_this.foot.append(forwardButton);
		
		_this.setType("HTMLUpgradeDialogElement");
		
		forwardButton.focus();
		
		closeButton.addEventListener(DCM.Event.click, closeHandler);
		
	}
	catch(e) {
		
		DCM.warn("HTMLUpgradeDialogElement", e);
		
	};
	
};DCM.HTMLUsersModuleElement = function HTMLUsersModuleElement() {
	
	try {
	
		this._super = DCM.HTMLScrollableModuleElement;
		this._super();
		
		var 
		_this = this,
		_table = new DCM.HTMLTableElement(),
		nameFilter = new DCM.HTMLCustomTextInputElement(),
		keyFilter = new DCM.HTMLCustomTextInputElement(),
		idFilter = new DCM.HTMLCustomTextInputElement(),
		instrumentsFilter = new DCM.HTMLCustomTextInputElement(),
		nameCol = _table.addColumnHeading(),
		idCol = _table.addColumnHeading("ID"),
		keyCol = _table.addColumnHeading("API Key"),
		statusCol = _table.addColumnHeading("Status"),
		instsCol = _table.addColumnHeading("Instruments"),
		addUser = function addUser(name, id, key, status, instruments) {
			
			var 
			instruments = (instruments||[]),
			_item = new DCM.HTMLUsersModuleItemElement(),
			numberOfInstruments = instruments.length;
			
			_item.setName(name);
			_item.setID(id);
			_item.setKey(key);
			_item.setStatus(status);
			
			while(numberOfInstruments--) {
				
				_item.attachInstrument(DCM.APIInstrumentManager.getInstrumentById(instruments[numberOfInstruments]));
				
			};
			
			_table.body.prepend(_item);
			
			DCM.APIUserManager.add(_item);
			dataManager.setItem(_item);
			
		},
		dataManager = new DCM.DataManager(),
		filter = function filter() {
			
			var 
			nameValue = nameFilter.getValue().toLowerCase(),
			nameRegex = new RegExp("^" + nameValue),
			
			idValue = idFilter.getValue().toLowerCase(),
			idRegex = new RegExp("^" + idValue),
			
			keyValue = keyFilter.getValue().toLowerCase(),
			keyRegex = new RegExp("^" + keyValue),
			
			instrumentsValue = instrumentsFilter.getValue().toLowerCase(),
			
			filteredData,
			toHide = dataManager.data.length,
			toShow;
			
			while(toHide--) {
				
				dataManager.data[toHide].setVisible(false);
				
			};
			
			filteredData = dataManager.getDataByFilter(function() {
				
				var 
				instruments = this.getInstrumentNames(),
				instrumentsRegex = new RegExp("(" + instruments + ")", "g");
				
				//console.log("instruments", instruments, typeof(instruments), instrumentsRegex, instrumentsRegex.test(instrumentsValue));
				
				return this.name&&nameRegex.test(this.name.toLowerCase());
				
			}, nameValue);
			
			toShow = filteredData.length;
			
			while(toShow--) {
				
				filteredData[toShow].setVisible(true);
				
			};
			
		},
		service = new DCM.GetAPIUsersService();
		
		_this.setUnpinable(false);
		_this.setAutoStart(false);
		_this.setHeading("Users");
		_this.setType("HTMLUsersModuleElement");
		_this.setMoveable(false);
		
		_this.scroller.body.append(_table);
		_this.scroller.setHeight(350);
		
		nameFilter.setPlaceholder("Name");
		nameFilter.addEventListener(DCM.Event.keyup, function() {
			
			filter();
			
		});
		
		keyFilter.setPlaceholder("API Key");
		
		idFilter.setPlaceholder("ID");
		
		instrumentsFilter.setPlaceholder("Instruments");
		instrumentsFilter.addEventListener(DCM.Event.keyup, function() {
			
			filter();
			
		});
		
		nameCol.append(nameFilter);
		
		DCM.log("dataManager", dataManager);
		
		DCM.APIInstrumentManager.addEventHandler("LOAD_COMPLETE", function() {
		
			service.call();
			
		});
		
		service.addEventHandler("SUCCESS", function(e) {
			
			var 
			users = e.users,
			numberOfUsers = users.length;
			
			while(numberOfUsers--) {
				
				var user = users[numberOfUsers];
				console.log("user", user);
				addUser(user.name, user.apiId, user.apiKey, user.enabled, user.myInsturments);
				
			};
			
		});
		
	}
	catch(e) {
	
		DCM.warn("HTMLUsersModuleElement", e);	
	
	};
};DCM.HTMLUsersModuleItemDialogElement = function HTMLUsersModuleItemDialogElement() {

	try {
	
		this._super = DCM.HTMLDynamicDialogElement;
		this._super();
	
		var 
		_this = this,
		form = new DCM.HTMLFormElement(),
		formNameGroup = form.addField(),
		formNameInput = new DCM.HTMLCustomTextInputElement(),
		formEnabledGroup = form.addField(),
		formEnabledRadioButtons = new DCM.HTMLRadioButtonGroupElement();
		
		formEnabledRadioButtons.setItem("Enabled", "ENABLED");
		formEnabledRadioButtons.setItem("Disabled", "DISABLED");
		
		formNameGroup.label.setText("Name");
		formNameGroup.input.append(formNameInput);
		
		formEnabledGroup.label.setText("Status");
		formEnabledGroup.input.append(formEnabledRadioButtons);
		
		this.setHeading("User");
		
		this.body.append(form);
		
	}
	catch(e) {
		
		DCM.warn("HTMLUsersModuleItemDialogElement", e);
		
	};
	
};DCM.HTMLWatchlistElement = function HTMLWatchlistElement(data, module) {

	try {
	
		this._super = DCM.HTMLDivElement;
		this._super();
	
		var 
		_this = this,
		_table = _this.table = new DCM.HTMLTableElement(),
		tableWrap = new DCM.HTMLDivElement(),
		module = _this.module = module,
		items = [],
		marketCol = _table.addColumnHeading(DCM.Resources.getResource("MarketLabel")),
		sellCol = _table.addColumnHeading(DCM.Resources.getResource("SellLabel")),
		buyCol = _table.addColumnHeading(DCM.Resources.getResource("BuyLabel")),
		changeCol = _table.addColumnHeading(DCM.Resources.getResource("ChangeLabel")),
		sentimentCol = _this.sentimentCol = _table.addColumnHeading(DCM.Resources.getResource("SentimentLabel")),
		sentimentChangeCol = _this.sentimentChangeCol = _table.addColumnHeading(DCM.Resources.getResource("SentimentChangeLabel")),
		lowCol = _table.addColumnHeading(DCM.Resources.getResource("LowLabel")),
		highCol = _table.addColumnHeading(DCM.Resources.getResource("HighLabel")),
		updatedCol = _table.addColumnHeading(DCM.Resources.getResource("UpdatedLabel")),
		data = _this.data = data,
		itemDestroyHandler = function itemDestroyHandler() {
			
			items.splice(DCM.getIndexOf(items, this), 1);
			
			if(items.length===0) {
				showNoItemsNotification();
			};
			
		},
		addItem = _this.addItem = function addItem(data) {
		
			var item = new DCM.HTMLWatchlistModuleItemElement(data, _this);	
			_table.body.prepend(item);
			hideNoItemsNotification();
			
			item.addEventHandler("DESTROY", itemDestroyHandler);
			
			items.push(item);
			return item;
		
		},
		destroy = _this.destroy = function destroy() {
			_this.remove();
			DCM.WatchlistManager.watchlists.splice(DCM.getIndexOf(DCM.WatchlistManager.watchlists, _this), 1);
			module.dataChanger.setValue(DCM.WatchlistManager.watchlists[0].name);
			dataChangerItem.destroy();
		},
		rename = _this.rename = function rename(value) {
			setName(value);
			dataChangerItem.setLabel(value);
			dataChangerItem.setValue(value);
		},
		setName = _this.setName = function setName(value) {
			_this.name = value;
		},
		setDeleteable = _this.setDeleteable = function setDeleteable(value) {
			_this.deleteable = value;
		},
		service = _this.service = new DCM.GetWatchlistService(),
		serviceSuccessHandler = function serviceSuccessHandler(data) {
		
			// emptying may not be best
			_table.body.empty();
			
			var target = data.insts;
			
			for(var prop in target) {
			
				addItem(target[prop]);
				
			};
			
		},
		noItemsNotification = _this.noItemsNotification = new DCM.HTMLNoItemsNotificationElement(),
		dataChangerItem = module.dataChanger.setItem(data.name, data.name),
		showNoItemsNotification = _this.showNoItemsNotification = function showNoItemsNotification() {
			
			noItemsNotification.show();
			tableWrap.hide();
			
		},
		hideNoItemsNotification = _this.hideNoItemsNotification = function hideNoItemsNotification() {
			
			noItemsNotification.hide();
			tableWrap.show();
			
		};
		
		//DCM.log("new HTMLWatchlistElement()", _this);
		
		noItemsNotification.setText(DCM.Resources.getResource("NoWatchlistItemsLabel"));
		
		setName(data.name);
		setDeleteable(data.isDeletable);
		
		service.setParam("watchlist", _this.name);
		service.addEventHandler("SUCCESS", serviceSuccessHandler);
		
		tableWrap.append(_table);
		
		_this.append(tableWrap);
		_this.append(noItemsNotification);
		
		showNoItemsNotification();
		
		marketCol.setAttribute("title", DCM.Resources.getResource("MarketTooltipLabel"));
		sellCol.setAttribute("title", DCM.Resources.getResource("SellTooltipLabel"));
		buyCol.setAttribute("title", DCM.Resources.getResource("BuyTooltipLabel"));
		changeCol.setAttribute("title", DCM.Resources.getResource("PiceChangeTooltipLabel"));
		sentimentCol.setAttribute("title", DCM.Resources.getResource("SentimentTooltipLabel"));
		sentimentChangeCol.setAttribute("title", DCM.Resources.getResource("SentimentChangeTooltipLabel"));
		lowCol.setAttribute("title", DCM.Resources.getResource("PiceLowTooltipLabel"));
		highCol.setAttribute("title", DCM.Resources.getResource("PiceHighTooltipLabel"));
		updatedCol.setAttribute("title", DCM.Resources.getResource("UpdateTimeTooltipLabel"));
		
	}
	catch(e) {
	
		DCM.warn("HTMLWatchlistElement", e);
	
	};
	
};DCM.HTMLWatchlistModuleContextMenuElement = function HTMLWatchlistModuleContextMenuElement(target) {

	try {
		
		var
		_this = this,
		deleteWatchlistItem;
		
		this._super = DCM.HTMLModuleContextMenuElement;
		this._super(target);
		
		deleteWatchlistItem = this.setItem(DCM.Resources.getResource("DeleteWatchlistLabel"), function() {
		
			DCM.WatchlistManager.authorDeleteWatchlist(_this.target.activeWatchlist);
			
		});
		
		this.setItem(DCM.Resources.getResource("CreateWatchlistLabel"), function() {
			
			DCM.WatchlistManager.authorNewWatchlist(_this.target);
			
		});
		
		if(this.target.activeWatchlist.deleteable===false) {
		
			deleteWatchlistItem.disable();
		
		};
		
		/*
		_this.setItem("Rename watchlist", function() {
		
			DCM.WatchlistManager.authorWatchlistRename(_this.target.activeWatchlist);
			
		});
		*/
		
	}
	catch(e) {
		
		DCM.warn("HTMLWatchlistModuleContextMenuElement", e);
		
	};
	
};DCM.HTMLWatchlistModuleElement = function HTMLWatchlistModuleElement() {
	
	try {
	
		var 
		_this = this,
		dataChanger = _this.dataChanger = new DCM.HTMLDynamicSelectMenuElement(),
		watchlistsGetter = new DCM.GetWatchlistsService(),
		addWatchlist = _this.addWatchlist = function addWatchlist(data) {
			DCM.WatchlistManager.createWatchlist(data, _this);
		},
		setActiveWatchlist = _this.setActiveWatchlist = function setActiveWatchlist(value) {
			_this.activeWatchlist = value;
		},
		dataChangerChangeHandler = function dataChangerChangeHandler() {
		
			_this.scroller.body.empty();
			
			var toLoad = DCM.WatchlistManager.getWatchlistByName(dataChanger.getValue());
			setActiveWatchlist(toLoad);
			
			_this.scroller.body.append(toLoad);
			
			toLoad.service.call();
			
		},
		watchlistsGetterSuccessHandler = function watchlistsGetterSuccessHandler(data) {
		
			var target;
			
			target = data.wls;
		
			for(var prop in target) {
		
				addWatchlist(target[prop]);
				
			};
			
			dataChanger.setValue(target[0].name);
			
		};
		
		this._super = DCM.HTMLScrollableModuleElement;
		this._super();
		
		//_this.setSize(4);
		_this.setIcon("global-watchlist");
		_this.setType("HTMLWatchlistModuleElement");
		_this.setResizeable(true);
		_this.setContextMenu("HTMLWatchlistModuleContextMenuElement");
		
		_this._headingHolder.empty();
		_this._headingHolder.append(dataChanger);
		
		dataChanger.addEventHandler("CHANGE", dataChangerChangeHandler);
		
		watchlistsGetter.addEventHandler("SUCCESS", watchlistsGetterSuccessHandler);
		watchlistsGetter.call();
		
	}
	catch(e) {
		
		DCM.warn("HTMLWatchlistModuleElement", e);
		
	};
	
};DCM.HTMLWatchlistModuleItemContextMenuElement = function HTMLWatchlistModuleItemContextMenuElement(target) {

	try {
		
		var
		_this = this;
		
		this._super = DCM.HTMLContextMenuElement;
		this._super(target);
		
		this.setItem(DCM.Resources.getResource("RemoveFromWatchlistLabel"), function() {
			
			DCM.WatchlistManager.authorDeleteFromWatchlist(_this.target);
			
		});
		
		this.setItem(DCM.Resources.getResource("OpenTicketLabel"), function() {
			
			_this.target.instrument.openTicket();
			
		});
		
		this.setItem(DCM.Resources.getResource("PinTicketToDashboard"), function() {
			
			var ticket = _this.target.instrument.openTicket();
			ticket.pin();
			
		});
		
		this.setItem(DCM.Resources.getResource("OpenChartLabel"), function() {
			
			_this.target.instrument.openChart();
			
		});
		
		this.setItem(DCM.Resources.getResource("PinChartToDashboardLabel"), function() {
			
			var chart = _this.target.instrument.openChart();
			chart.pin();
			
		});
		
		this.setItem(DCM.Resources.getResource("addNoteLabel"), function() {
			
			_this.target.instrument.addNote();
			
		});
		
		this.setItem(DCM.Resources.getResource("AddAlertLabel"), function() {
			
			_this.target.instrument.addAlert();
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLWatchlistModuleItemContextMenuElement", e);
		
	};
	
};DCM.HTMLWatchlistModuleItemElement = function HTMLWatchlistModuleItemElement(data, watchlist) {

	try {
	
		this._super = DCM.HTMLTRElement;
		this._super();

		var 
		_this = this,
		data = _this.data = data,
		marketCol,
		sellCol,
		buyCol,
		changeCol,
		updatedCol,
		lowCol,
		highCol,
		sentimentCol,
		sentimentChangeCol,
		setStatus = _this.setStatus = function setStatus(value) {
			_this.setAttribute("data-status", value);
		},
		setLowPrice = _this.setLowPrice = function setLowPrice(value) {
			if(!value) {
				return;
			};
			lowCol.setText(value);
		},
		setHighPrice = _this.setHighPrice = function setHighPrice(value) {
			if(!value) {
				return;
			};
			highCol.setText(value);
		},
		setPriceChange = _this.setPriceChange = function setPriceChange(displayValue, numericValue) {
			//DCM.log("setPriceChange(" + displayValue + ")", typeof(displayValue));
			if(!displayValue) {
				return;
			};
			changeCol.setText(displayValue);
			var directionName;
			if(numericValue>0) {
				directionName = "POSITIVE";
			}
			else if(numericValue<0) {
				directionName = "NEGATIVE";
			}
			else {
				directionName = "NONE";
			};
			changeCol.setAttribute("data-value-direction-name", directionName);
			
		},
		setSellPrice = _this.setSellPrice = function setSellPrice(value, direction) {
			if(!value) {
				return;
			};
			sellCol.setAttribute("data-value-direction", "NONE");
			sellCol.setAttribute("data-value-direction", direction);
			sellCol.setText(value);
		},
		setBuyPrice = _this.setBuyPrice = function setBuyPrice(value, direction) {
			if(!value) {
				return;
			};
			buyCol.setAttribute("data-value-direction", "NONE");
			buyCol.setAttribute("data-value-direction", direction);
			buyCol.setText(value);
		},
		setUpdated = _this.setUpdated = function setUpdated(value) {
			if(!value) {
				return;
			};
			updatedCol.setText(value);
		},
		setVisualName = _this.setVisualName = function setVisualName(value, title) {
			marketCol.setText(value);
			_this.setAttribute("title", title);
		},
		setSentiment = _this.setSentiment = function setSentiment(value, direction) {
			//DCM.log("HTMLWatchlistModuleItemElement.setSentiment(" + value + ")");
			if(!value) {
				return;
			};
			sentimentCol.setAttribute("data-value-direction", "NONE");
			sentimentCol.setAttribute("data-value-direction", direction);
			sentimentCol.setText(value);
		},
		setSentimentChange = function setSentimentChange(value) {
			if(!value) {
				return;
			};
			sentimentChangeCol.setText(value);
		},
		disableSentiment = _this.disableSentiment = function disableSentiment() {
			sentimentCol.setAttribute("data-sentiment-enabled", false);
			watchlist.sentimentCol.setAttribute("data-sentiment-enabled", false);
			sentimentCol.setText("00.00");
		},
		destroy = _this.destroy = function destroy() {
			
			_this.remove();
			_this.dispatchEventHandler("DESTROY");
			
			instrument.removeEventHandler("PRICE_CHANGE", priceChangeHandler);
			instrument.removeEventHandler("SELL_PRICE_CHANGE", sellPriceChangeHandler);
			instrument.removeEventHandler("BUY_PRICE_CHANGE", buyPriceChangeHandler);
			instrument.removeEventHandler("HIGH_PRICE_CHANGE", highPriceChangeHandler);
			instrument.removeEventHandler("LOW_PRICE_CHANGE", lowPriceChangeHandler);
			instrument.removeEventHandler("PRICECHANGE_CHANGE", pricechangeChangeHandler);
			instrument.removeEventHandler("STATUS_CHANGE", statusChangeHandler);
			instrument.removeEventHandler("SENTIMENT_CHANGE", sentimentChangeHandler);
			instrument.removeEventHandler("SENTIMENTCHANGE_CHANGE", sentimentChangeChangeHandler);
			
		},
		watchlist = _this.watchlist = watchlist,
		instrument = _this.instrument = DCM.InstrumentManager.getInstrumentById(data.securityID),
		priceChangeHandler = function priceChangeHandler() {
			setUpdated(instrument.updateTime);
		},
		sellPriceChangeHandler = function sellPriceChangeHandler(e) {
			setSellPrice(instrument.getSellPrice(), e.direction);
		},
		buyPriceChangeHandler = function buyPriceChangeHandler(e) {
			setBuyPrice(instrument.getBuyPrice(), e.direction);
		},
		highPriceChangeHandler = function highPriceChangeHandler() {
			setHighPrice(instrument.getPriceHigh());
		},
		lowPriceChangeHandler = function lowPriceChangeHandler() {
			setLowPrice(instrument.getPriceLow());
		},
		sentimentChangeHandler = function sentimentChangeHandler(e) {
			setSentiment(instrument.getSentiment(), e.direction);
		},
		pricechangeChangeHandler = function pricechangeChangeHandler() {
			setPriceChange(instrument.getPriceChange(), instrument.getPriceChange(true));
		},
		sentimentChangeChangeHandler = function sentimentChangeChangeHandler() {
			setSentimentChange(instrument.getSentimentChange());
		},
		statusChangeHandler = function statusChangeHandler() {
			setStatus(instrument.getStatusName());
		};
		
		marketCol = this.addColumn("-");
		sellCol = this.addColumn("-");
		buyCol = this.addColumn("-");
		changeCol = this.addColumn("-");
		
		sentimentCol = this.addColumn("-");
		sentimentChangeCol = this.addColumn("-");
		
		lowCol = this.addColumn("-");
		highCol = this.addColumn("-");
		updatedCol = this.addColumn("-");
		
		if(!instrument) {
		
			throw("instrument is undefined");
			
		};
		
		instrument.subscribe();
		
		instrument.addEventHandler("PRICE_CHANGE", priceChangeHandler).dispatch();
		instrument.addEventHandler("SELL_PRICE_CHANGE", sellPriceChangeHandler).dispatch({
			direction: "NO_DIRECTION"
		});
		instrument.addEventHandler("BUY_PRICE_CHANGE", buyPriceChangeHandler).dispatch({
			direction: "NO_DIRECTION"
		});
		instrument.addEventHandler("HIGH_PRICE_CHANGE", highPriceChangeHandler).dispatch();
		instrument.addEventHandler("LOW_PRICE_CHANGE", lowPriceChangeHandler).dispatch();
		instrument.addEventHandler("PRICECHANGE_CHANGE", pricechangeChangeHandler).dispatch();
		instrument.addEventHandler("STATUS_CHANGE", statusChangeHandler).dispatch();
		
		if(DCM.AccountManager.sentimentEnabled) {
		
			instrument.addEventHandler("SENTIMENT_CHANGE", sentimentChangeHandler).dispatch({
				direction: "NO_DIRECTION"
			});
			
			instrument.addEventHandler("SENTIMENTCHANGE_CHANGE", sentimentChangeChangeHandler).dispatch();
		
		}
		else {
			disableSentiment();
		};
		
		_this.addEventListener(DCM.Event.contextmenu, function(e) {
			
			var _contextMenu = new DCM.HTMLWatchlistModuleItemContextMenuElement(_this);
			_contextMenu.setX(e.clientX);
			_contextMenu.setY(e.clientY);
			
			return false;
		
		});
		
		_this.addEventListener(DCM.Event.doubleclick, function(e) {
		
			instrument.openTicket();
		
			return false;
		
		});
		
		setVisualName(instrument.getDisplayTextAsHTML(), instrument.getDisplayText());
		
	}
	catch(e) {
		
		DCM.warn("HTMLWatchlistModuleItemElement", e);
	
	};
	
};DCM.Instrument = function Instrument(data) {

	try {
		
		var
		_this = this,
		data = _this.data = data,
		lightstreamerHandler = function lightstreamerHandler() {
			this.onItemUpdate = function(data) {
			
				if(!debugLogged) {
					//DCM.log("onItemUpdate[" + _this.getName() + "] " + data.getValue("senti_last") + " " + data.getValue("price_high") + " " + data.getValue("price_low"));
					debugLogged = true;
				};
				
				_this.setSellPrice(processPrice(data.getValue("price_bid")));
				_this.setBuyPrice(processPrice(data.getValue("price_ask")));
				_this.setPriceHigh(processPrice(data.getValue("price_high")));
				_this.setPriceLow(processPrice(data.getValue("price_low")));
				_this.setSentiment(data.getValue("senti_last"));
				_this.setSentimentChange(data.getValue("senti_change_daily"));
				_this.setStatus(data.getValue("status"));
				_this.setSentimentHigh(data.getValue("senti_high"));
				_this.setSentimentLow(data.getValue("senti_low"));
				_this.setUpdateTime(data.getValue("time"));
				
				_this.setPriceChange(((_this.getSellPrice(true)+_this.getBuyPrice(true))/2)-_this.openPrice);
				
				// should probably change this as it seems to only be used for setting updated time
				_this.dispatchEventHandler("PRICE_CHANGE");
				
			};
		},
		setSubscribed = function setSubscribed(value) {
			_this.subscribed = value;
		},
		processPrice = _this.processPrice = function processPrice(value) {
			if(!value) {
				return value;
			};
			var _return = (value*_this.priceMultiplier).toFixed(_this.decimalPlaces);
			return _return;
		},
		debugLogged = false;
		
		this._super = DCM.EventDispatcher;
		this._super();
		
		this.setDecimalPlaces = function setDecimalPlaces(value) {
			this.decimalPlaces = value;
		};
		
		this.setOpenPrice = function setOpenPrice(value) {
			// price at the beginnning of the day - perhaps should be renamed
			this.openPrice = value;
		};
		
		this.setPriceMultiplier = function setPriceMultiplier(value) {
			this.priceMultiplier = value;
		};
		
		this.getSentiment = function getSentiment() {
			return this.sentiment;
		};
		
		this.setSentiment = function setSentiment(value) {
		
			//DCM.log("Instrument[" + _this.getName() + "].setSentiment(" + value + ")");
		
			if(!value) {
				return;
			}
			else {
				value = Number(value).toFixed(2);
				if(value===_this.sentiment) {
					return;
				};
			};
			
			var 
			changeDirection = DCM.getChangeDirectionName(value, _this.sentiment);
			
			_this.sentiment = value;
			
			_this.dispatchEventHandler("SENTIMENT_CHANGE", {
				direction: changeDirection
			});
			
		};
		
		this.getSellPrice = function getSellPrice(asNumber) {
			var 
			_return = _this.sellPrice;
			if(asNumber) {
				_return = Number(_return);
			};
			return _return;
		};
		
		this.setSellPrice = function setSellPrice(value) {
		
			if(!value||value===_this.sellPrice) {
				return;
			};
			
			var 
			changeDirection = DCM.getChangeDirectionName(value, _this.sellPrice);
			
			_this.sellPrice = value;
			
			_this.dispatchEventHandler("SELL_PRICE_CHANGE", {
				direction: changeDirection
			});
			
		};
		
		this.getBuyPrice = function getBuyPrice(asNumber) {
			var 
			_return = _this.buyPrice;
			if(asNumber) {
				_return = Number(_return);
			};
			return _return;
		};
		
		this.setBuyPrice = function setBuyPrice(value) {
		
			if(!value||value===_this.buyPrice) {
				return;
			};
			
			var 
			changeDirection = DCM.getChangeDirectionName(value, _this.buyPrice);
			
			_this.buyPrice = value;
			
			_this.dispatchEventHandler("BUY_PRICE_CHANGE", {
				direction: changeDirection
			});
			
		};
		
		this.getPriceChange = function getPriceChange(asNumber) {
			var _return = _this.priceChange;
			if(asNumber) {
				_return = Number(_return);
			}
			else if(_return>0) {
				return ("+" + _return);
			};
			return _return;
		};
		
		this.setPriceChange = function setPriceChange(value) {
			if(!value) {
				return;
			}
			else {
				value = Number(value).toFixed(_this.decimalPlaces);
				if(value===_this.priceChange) {
					return;
				};
			};
			_this.priceChange = value;
			_this.dispatchEventHandler("PRICECHANGE_CHANGE");
		};
		
		this.getPriceLow = function getPriceLow() {
			return _this.priceLow;
		};
		
		this.setPriceLow = function setPriceLow(value) {
			if(!value) {
				return;
			}
			else {
				if(value===_this.priceLow) {
					return;
				};
			};
			_this.priceLow = value;
			_this.dispatchEventHandler("LOW_PRICE_CHANGE");
		};
		
		this.getPriceHigh = function getPriceHigh() {
			return _this.priceHigh;
		};
		
		this.setPriceHigh = function setPriceHigh(value) {
			if(!value) {
				return;
			}
			else {
				//value = Number(value).toFixed(_this.decimalPlaces);
				if(value===_this.priceHigh) {
					return;
				};
			};
			_this.priceHigh = value;
			_this.dispatchEventHandler("HIGH_PRICE_CHANGE");
		};
		
		this.getSentimentChange = function getSentimentChange() {
			return _this.sentimentChange;
		};
		
		this.setSentimentChange = function setSentimentChange(value) {
			if(!value||value===_this.sentimentChange) {
				return;
			};
			_this.sentimentChange = value;
			_this.dispatchEventHandler("SENTIMENTCHANGE_CHANGE");
		};
		
		this.getSentimentHigh = function getSentimentHigh() {
			return _this.sentimentHigh;
		};
		
		this.setSentimentHigh = function setSentimentHigh(value) {
			if(!value||value===_this.sentimentHigh) {
				return;
			};
			_this.sentimentHigh = value;
			_this.dispatchEventHandler("SENTIMENT_HIGH_CHANGE");
		};
		
		this.getSentimentLow = function getSentimentLow() {
			return _this.sentimentLow;
		};
		
		this.setSentimentLow = function setSentimentLow(value) {
			if(!value||value===_this.sentimentLow) {
				return;
			};
			_this.sentimentLow = value;
			_this.dispatchEventHandler("SENTIMENT_LOW_CHANGE");
		};
		
		this.getTicker = function getTicker() {
			
			var 
			_return = _this.ticker;
			
			return _return;
			
		};
		
		this.setTicker = function setTicker(value) {
			if(!value) {
				return;
			};
			_this.ticker = value;
		};
		
		this.getName = function getName() {
			
			var 
			_return = _this.name,
			expiryDate = this.getExpiryDate();
			
			if(expiryDate) {
				_return += (" [" + expiryDate + "]");
			};
			
			return _return;
			
		};
		
		this.setName = function setName(value) {
			if(!value) {
				return;
			};
			_this.name = value;
		};
		
		this.setCategory = function setCategory(value) {
			if(!value) {
				return;
			};
			_this.category = value;
		};
		
		this.getStatus = function getStatus() {
			return _this.status;
		};
		
		this.getStatusName = function getStatusName() {
			var _return = "ACTIVE";
			if(_this.status!==3) {
				_return = "INACTIVE";
			};
			return _return;
		};
		
		this.setStatus = function setStatus(value) {
			if(DCM.isUndefinedOrNull(value)||value===_this.status) {
				return;
			};
			_this.status = value;
			_this.dispatchEventHandler("STATUS_CHANGE");
		};
		
		this.setDelayed = function setDelayed(value) {
			_this.delayed = value;
		};
		
		this.setCurrency = function setCurrency(value) {
			_this.currency = value;
		};
		
		this.setId = function setId(value) {
			if(!value) {
				return;
			};
			_this.id = value;
		};
		
		this.setMinTrailingStop = function setMinTrailingStop(value) {
			if(!value) {
				return;
			};
			_this.minTrailingStop = value;
		};
		
		this.setMinGuaranteedStop = function setMinGuaranteedStop(value) {
			if(!value) {
				return;
			};
			_this.minGuaranteedStop = value;
		};
		
		this.getExpiryDate = function getExpiryDate() {
			var _return = _this.expireDate;
			return _return;
		};
		
		this.setExpiryDate = function setExpiryDate(value) {
			if(!value) {
				return;
			};
			_this.expireDate = value;
		};
		
		this.setSharePrice = function setSharePrice(value) {
			if(!value) {
				return;
			};
			_this.sharePrice = value;
		};
		
		this.setContractMultiplier = function setContractMultiplier(value) {
			if(!value) {
				return;
			};
			_this.contractMultiplier = value;
		};
		
		this.setSlippagePerContract = function setSlippagePerContract(value) {
			if(!value) {
				return;
			};
			_this.slippagePerContract = value;
		};
		
		this.setPipSize = function setPipSize(value) {
			if(!value) {
				return;
			};
			_this.pipSize = value;
		};
		
		this.setPipValue = function setPipValue(value) {
			if(!value) {
				return;
			};
			_this.pipValue = value;
		};
		
		this.setMinSize = function setMinSize(value) {
			this.minSize = value;
		};
		
		this.setMinStop = function setMinStop(value) {
			this.minStop = value;
		};
		
		this.setMinLimit = function setMinLimit(value) {
			// not used but probably should be...
			this.minLimit = value;
		};
		
		this.setUpdateTime = function setUpdateTime(value) {
			if(!value) {
				return;
			};
			this.updateTime = value;
		};
		
		this.setMinPointIncrement = function setMinPointIncrement(value) {
			this.minPointIncrement = value;
		};
		
		this.subscribe = function subscribe() {
		
			if(_this.subscribed) {
				return;
			};
			
			DCM.log("Instrument[" + _this.id + "].subscribe()");
			
			var stockSubscription = new Lightstreamer.Subscription("MERGE", ["item" + _this.id], ["price_bid", "price_ask", "time", "senti_last", "senti_change_daily", "price_high", "price_low", "status", "senti_high", "senti_low"]);
			stockSubscription.addListener(new lightstreamerHandler());
			stockSubscription.setDataAdapter("dcm_prices");
			stockSubscription.setRequestedSnapshot("yes");
			DCM.sharingClient.subscribe(stockSubscription);
			
			setSubscribed(true);
			
		};
		
		this.addAlert = function addAlert() {
			
			DCM.AlertManager.createAlertFromInstrument(this);
			
		};
		
		this.addNote = function addNote() {
			
			DCM.NoteManager.createNoteFromInstrument(this);
			
		};
		
		this.openChart = function openChart() {
			
			var chartModule = new DCM.HTMLChartModuleElement(this.id);
			chartModule.open();
			chartModule.undock();
			
			return chartModule;
			
		};
		
		this.openTicket = function openTicket() {
			
			var ticket = DCM.TicketManager.createTicket({
				securityID: this.id
			});
			
			ticket.undock();
			
			if(this.getStatusName()==="INACTIVE") {
				
				ticket.viewTabs.setValue("ORDER");
				ticket.tradeTab.disable();
				ticket.wizardTab.disable();
			
			};
			
			return ticket;
			
		};
		
		this.getDisplayText = function getDisplayText() {
			
			var 
			_return = (this.getTicker() + " - " + this.getName());
			
			return _return;
			
		};
		
		this.getDisplayTextAsHTML = function getDisplayTextAsHTML() {
		
			var 
			_return = ("<span data-role=\"ticker\">" + this.getTicker() + "</span><span data-role=\"market-name\"> - " + this.getName() + "</span>");
			
			return _return;
		
		};
		
		setSubscribed(false);
		
		if(data.category) {
			this.setCategory(data.category);
		}
		else {
			this.setCategory("NONE");
		};
		
		this.setDecimalPlaces(data.numDec);
		this.setCurrency(data.currency);
		this.setName(data.securityDesc);
		this.setTicker(data.symbol);
		this.setId(data.securityID);
		this.setMinSize(data.minSize);
		this.setSharePrice(data.contractSizePerPip);
		this.setMinGuaranteedStop(data.minGStopDistance);
		this.setExpiryDate(data.maturityMonthYear);
		this.setMinStop(data.minStopDistance);
		this.setMinTrailingStop(data.minTrail);
		this.setContractMultiplier(data.contractMultiplier);
		this.setSlippagePerContract(data.slippagePerContract);
		this.setPipSize(data.pipSize);
		this.setPipValue(data.pipValue);
		this.setDelayed(data.isDelayed);
		this.setMinPointIncrement(data.tickIncrement);
		this.setPriceMultiplier(data.priceMultipler);
		// perhaps use process price
		this.setOpenPrice(data.openPrice*_this.priceMultiplier);
		
		//setStatus(data.status);
		this.setStatus(3);
	
	}
	catch(e) {
		
		DCM.warn("Instrument", e);
		
	};
	
};DCM.LoginService = function LoginService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dealer_platform_login_login");
		this.setErrorMessage(DCM.Resources.getResource("ERROR41"));
		this.setParam("username", "");
		this.setParam("password", "");
		this.setParam("locale", "engb");
		
	}
	catch(e) {
		
		DCM.warn("LoginService", e);
		
	};
	
};DCM.NoteManager = new function NoteManager() {

	try {
		
		var
		_this = this,
		notes = _this.notes = [],
		createNote = _this.createNote = function createNote(data) {
			var note = new DCM.HTMLNotesModuleItemElement(data);
			notes.push(note);
			return note;
		},
		createNoteFromInstrument = _this.createNoteFromInstrument = function createNoteFromInstrument(instrument) {
			
			authorNewNote(instrument.id, null, instrument.sellPrice, instrument.buyPrice, instrument.sentiment);
			
		},
		createNoteFromPosition = _this.createNoteFromPosition = function createNoteFromPosition(position) {
			
			authorNewNote(position.instrument.id, position.entryPrice, position.instrument.sellPrice, position.instrument.buyPrice, position.instrument.sentiment);
			
		},
		authorNewNote = _this.authorNewNote = function authorNewNote(instrumentSymbolDesc, entryPrice, bidPrice, askPrice, sentiLast) {
			
			var 
			_dialog = new DCM.HTMLNotesModuleItemCreateDialogElement(),
			instrumentSymbolDesc = (instrumentSymbolDesc||""),
			entryPrice = (entryPrice||""),
			bidPrice = (bidPrice||""),
			askPrice = (askPrice||""),
			sentiLast = (sentiLast||"");
			
			_dialog.addEventHandler("ACCEPT", function() {
			
				publishNewNote(_dialog.getValue(), instrumentSymbolDesc, entryPrice, bidPrice, askPrice, sentiLast);
				
			});
			
			_dialog.queue();
			
		},
		publishNewNote = _this.publishNewNote = function publishNewNote(noteBody, instrumentSymbolDesc, entryPrice, bidPrice, askPrice, sentiLast) {
		
			var 
			publishNewNoteService = new DCM.CreateNoteService(),
			publishNewNoteServiceSuccessHandler = function publishNewNoteServiceSuccessHandler(data) {
				
				DCM.ModuleManager.getModuleByType("HTMLNotesModuleElement").addNote(data.newNote);
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteCreateSuccessLabel"));
				
			},
			publishNewNoteServiceErrorHandler = function publishNewNoteServiceErrorHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteCreateErrorLabel"));
				
			},
			publishNewNoteServiceExceptionHandler = function publishNewNoteServiceExceptionHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteCreateErrorLabel"));
				
			};
			
			publishNewNoteService.setParam("noteContent", noteBody);
			publishNewNoteService.setParam("instrumentSymbolDesc", instrumentSymbolDesc);
			publishNewNoteService.setParam("entryPrice", entryPrice);
			publishNewNoteService.setParam("bidPrice", bidPrice);
			publishNewNoteService.setParam("askPrice", askPrice);
			publishNewNoteService.setParam("sentiLast", sentiLast);
			publishNewNoteService.addEventHandler("SUCCESS", publishNewNoteServiceSuccessHandler);
			publishNewNoteService.addEventHandler("ERROR", publishNewNoteServiceErrorHandler);
			publishNewNoteService.addEventHandler("EXCEPTION", publishNewNoteServiceExceptionHandler);
			publishNewNoteService.call();
			
		},
		authorDeleteNote = _this.authorDeleteNote = function authorDeleteNote(note) {
			
			var 
			authorDeleteNoteConfirm = new DCM.HTMLConfirmationDialogElement(),
			authorDeleteNoteConfirmAcceptHandler = function authorDeleteNoteConfirmAcceptHandler() {
			
				publishDeleteNote(note);
				
			};
			
			authorDeleteNoteConfirm.setHeading(DCM.Resources.getResource("NoteDeleteConfirmHeading"));
			authorDeleteNoteConfirm.setMessage(DCM.Resources.getResource("NoteDeleteConfirmMessage"));
			authorDeleteNoteConfirm.addEventHandler("ACCEPT", authorDeleteNoteConfirmAcceptHandler);
			authorDeleteNoteConfirm.queue();
			
		},
		publishDeleteNote = _this.publishDeleteNote = function publishDeleteNote(note) {
			
			var 
			publishDeleteNoteService = new DCM.DeleteNoteService(),
			publishDeleteNoteServiceSuccessHandler = function publishDeleteNoteServiceSuccessHandler(data) {
				
				note.destroy();
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteDeleteSuccessLabel"));
				
			},
			publishDeleteNoteServiceErrorHandler = function publishDeleteNoteServiceErrorHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteDeleteErrorLabel"));
				
			},
			publishDeleteNoteServiceExceptionHandler = function publishDeleteNoteServiceExceptionHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteDeleteErrorLabel"));
				
			};
			
			publishDeleteNoteService.setParam("noteId", note.id);
			publishDeleteNoteService.addEventHandler("SUCCESS", publishDeleteNoteServiceSuccessHandler);
			publishDeleteNoteService.addEventHandler("ERROR", publishDeleteNoteServiceErrorHandler);
			publishDeleteNoteService.addEventHandler("EXCEPTION", publishDeleteNoteServiceExceptionHandler);
			publishDeleteNoteService.call();
		
		},
		authorEditNote = _this.authorEditNote = function authorEditNote(note) {
			
			var 
			_dialog = new DCM.HTMLNotesModuleItemEditDialogElement(),
			authorEditNoteAcceptHandler = function authorEditNoteAcceptHandler() {
			
				publishEditNote(note, _dialog.getValue());
				
			};
			
			_dialog.setValue(note.noteBody);
			_dialog.addEventHandler("ACCEPT", authorEditNoteAcceptHandler);
			_dialog.queue();
			
		},
		publishEditNote = _this.publishEditNote = function publishEditNote(note, noteBody) {
			
			var 
			publishEditNoteService = new DCM.EditNoteService(),
			publishEditNoteServiceSuccessHandler = function publishEditNoteServiceSuccessHandler(data) {
				
				note.setNoteBody(noteBody);
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteEditSuccessLabel"));
				
			},
			publishEditNoteServiceErrorHandler = function publishEditNoteServiceErrorHandler(data) {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteEditErrorLabel"));
				
			},
			publishEditNoteServiceExceptionHandler = function publishEditNoteServiceExceptionHandler(data) {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteEditErrorLabel"));
				
			};
			
			publishEditNoteService.setParam("noteId", note.id);
			publishEditNoteService.setParam("noteContent", noteBody);
			publishEditNoteService.addEventHandler("SUCCESS", publishEditNoteServiceSuccessHandler);
			publishEditNoteService.addEventHandler("ERROR", publishEditNoteServiceSuccessHandler);
			publishEditNoteService.addEventHandler("EXCEPTION", publishEditNoteServiceSuccessHandler);
			publishEditNoteService.call();
			
		};
		
		this._super = DCM.EventDispatcher;
		this._super();
		
	}
	catch(e) {
		
		DCM.warn("NoteManager", e);
		
	};
	
};DCM.OpenAccountService = function OpenAccountService() {
	
	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dealer_platform_open_account_create");
		this.setErrorMessage(DCM.Resources.getResource("ERROR42"));
		this.setParam("firstname", "");
		this.setParam("lastname", "");
		this.setParam("emailAddress", "");
		this.setParam("password", "");
		
	}
	catch(e) {
	
		DCM.warn("OpenAccountService", e);
	
	};
	
};DCM.OpenOrderService = function OpenOrderService() {
	
	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_order_open_place");
		this.setErrorMessage(DCM.Resources.getResource("ERROR43"));
		this.setParam("securityId", "");
		this.setParam("currency", "");
		this.setParam("size", "");
		this.setParam("price", "");
		this.setParam("side", "");
		this.setParam("stopPrice", "");
		this.setParam("limitPrice", "");
		this.setParam("gtd", "");
		this.setParam("type", "");
		this.setParam("trailing", "");
		
	}
	catch(e) {
	
		DCM.warn("OpenOrderService", e);
	
	};
	
};DCM.OpenPositionService = function OpenPositionService() {
	
	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_order_place");
		this.setErrorMessage(DCM.Resources.getResource("ERROR44"));
		this.setParam("securityId", "");
		this.setParam("currency", "");
		this.setParam("size", "");
		this.setParam("side", "");
		this.setParam("stopPrice", "");
		this.setParam("limitPrice", "");
		this.setParam("trailing", "");
		
	}
	catch(e) {
	
		DCM.warn("OpenPositionService", e);
	
	};
	
};DCM.OrderManager = new function OrderManager() {

	try {
		
		var
		_this = this,
		orders = _this.orders = [],
		createOrder = _this.createOrder = function createOrder(data) {
			var
			Order = new DCM.Position(data),
			orderElement = new DCM.HTMLOrdersModuleItemElement(Order);
			orders.push(Order);
			_this.dispatchEventHandler("CREATE");
			return orderElement;
		},
		getOrderById = _this.getOrderById = function getOrderById(id) {
			var 
			loop = orders.length,
			_return;
			while(loop--) {
				if(orders[loop].id===id) {
					_return = orders[loop];
					break;
				};
			};
			return _return;
		},
		getCurrentOrderIDs = _this.getCurrentOrderIDs = function getCurrentOrderIDs() {
			var 
			loop = orders.length,
			_return = [];
			while(loop--) {
				_return.push(orders[loop].id);
			};
			return _return;
		},
		authorEditOrder = _this.authorEditOrder = function authorEditOrder(Order) {
		
			var 
			ticket = Order.instrument.openTicket(),
			stopAndLimitStepperChangeHandler = function stopAndLimitStepperChangeHandler() {
				
				var 
				stopValue = ticket.orderStopStepper.getValue()||null,
				limitValue = ticket.orderLimitStepper.getValue()||null;
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					if(stopValue==Order.getStopAsCurrency()&&limitValue==Order.getLimitAsCurrency()) {
					
						ticket.orderSizeStepper.enable();
						ticket.setMode("CANCEL");
					
					}
					else {
					
						ticket.orderSizeStepper.disable();
						ticket.setMode("EDIT");
					
					};
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					if(stopValue==Order.getStop()&&limitValue==Order.getLimit()) {
					
						ticket.orderSizeStepper.enable();
						ticket.setMode("CANCEL");
					
					}
					else {
					
						ticket.orderSizeStepper.disable();
						ticket.setMode("EDIT");
					
					};
				
				};
				
			},
			orderSizeStepperChangeHandler = function orderSizeStepperChangeHandler() {
			
				if(this.getValue()==Order.getSize()) {
				
					ticket.orderStopStepper.enable();
					ticket.orderLimitStepper.enable();
					ticket.setMode("CANCEL");
					
				}
				else {
				
					ticket.orderStopStepper.disable();
					ticket.orderLimitStepper.disable();
					ticket.setMode("EDIT");
					
				};
				
			},
			orderPriceStepperChangeHandler = function orderPriceStepperChangeHandler() {
			
				if(this.getValue()==Order.getEntryPrice()) {
				
					ticket.orderStopStepper.enable();
					ticket.orderLimitStepper.enable();
					ticket.setMode("CANCEL");
					
				}
				else {
				
					ticket.orderStopStepper.disable();
					ticket.orderLimitStepper.disable();
					ticket.setMode("EDIT");
					
				};
				
			};
			
			// create duplicate of current Order
			ticket.OrderPosition.setStatus(Order.getStatus());
			ticket.OrderPosition.setId(Order.getId());
			ticket.OrderPosition.setStop(Order.getStop());
			ticket.OrderPosition.setLimit(Order.getLimit());
			ticket.OrderPosition.setSize(Order.getSize());
			ticket.OrderPosition.setEntryPrice(Order.getEntryPrice());
			ticket.OrderPosition.setType(Order.getType());
			
			ticket.setLockedIntoSide(true);
			
			ticket.viewTabs.setValue("ORDER");
			
			ticket.tradeTab.disable();
			ticket.wizardTab.disable();
			
			ticket.orderSizeStepper.setValue(Order.getSize());
			ticket.orderSizeStepper.setMax(Order.getSize());
			
			ticket.orderPriceStepper.setValue(Order.getEntryPrice());
			
			if(Order.getStop()) {
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					ticket.orderStopStepper.setValue(Order.getStopAsCurrency());
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					ticket.orderStopStepper.setValue(Order.getStop());
				
				};

			};
			
			if(Order.getLimit()) {
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					ticket.orderLimitStepper.setValue(Order.getLimitAsCurrency());
				
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				
					ticket.orderLimitStepper.setValue(Order.getLimit());
					
				};
				
			};
			
			ticket.orderSizeStepper.addEventHandler("CHANGE", orderSizeStepperChangeHandler);
			ticket.orderPriceStepper.addEventHandler("CHANGE", orderPriceStepperChangeHandler);
			ticket.orderStopStepper.addEventHandler("CHANGE", stopAndLimitStepperChangeHandler);
			ticket.orderLimitStepper.addEventHandler("CHANGE", stopAndLimitStepperChangeHandler);
			
			if(Order.direction==="BUY") {
				ticket.setSide("SELL");
			}
			else if(Order.direction==="SELL") {
				ticket.setSide("BUY");
			};
			
			ticket.setMode("CANCEL");
			
		},
		publishCloseOrder = _this.publishCloseOrder = function publishCloseOrder(Order) {
			
			DCM.log("PositionManager.publishCloseOrder()");
			
			var 
			service = new Order.CloseService(),
			closeSuccessHandler = function closeSuccessHandler() {
		
				DCM.ToastManager.createToast(DCM.Resources.getResource("OrderCloseSuccessLabel"));
				
			},
			closeErrorHandler = function closeErrorHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("OrderCloseErrorLabel"));
				
			};
			
			service.addEventHandler("SUCCESS", closeSuccessHandler);
			service.addEventHandler("EXCEPTION", closeErrorHandler);
			service.addEventHandler("ERROR", closeErrorHandler);
			service.call();
			
		};
		
		this._super = DCM.EventDispatcher;
		this._super();
		
	}
	catch(e) {
		
		DCM.warn("OrderManager", e);
		
	};
	
};DCM.PortfolioManager = new function PortfolioManager() {

	try {
		
		var
		_this = this,
		portfolios = _this.portfolios = [],
		createPortfolio = _this.createPortfolio = function createPortfolio(params) {
			
			var 
			portfolio = DCM.ModuleManager.createModule("HTMLPortfolioModuleElement", params, true);
			portfolios.push(portfolio);
			return portfolio;
			
		},
		getPortfolioByName = _this.getPortfolioByName = function getPortfolioByName(portfolioName) {
			
			var 
			_return,
			loop = portfolios.length;
			while(loop--) {
				if(portfolios[loop].name===portfolioName) {
					_return = portfolios[loop];
					break;
				};
			};
			return _return;
			
		},
		updatePortfolio = _this.updatePortfolio = function updatePortfolio(portfolioName) {
			getPortfolioByName(portfolioName).update();
		},
		getAllNames = _this.getAllNames = function getAllNames() {
			
			var
			_return = [],
			loop = portfolios.length;
			while(loop--) {
				_return.unshift(portfolios[loop].name);
			};
			return _return;
			
		},
		getConsiderationData = _this.getConsiderationData = function getConsiderationData() {
			
			var
			_return = [],
			loop = portfolios.length;
			while(loop--) {
				_return.unshift([portfolios[loop].name.toUpperCase(), portfolios[loop].consideration]);
			};
			_return.unshift(["Portfolio", "value"]);
			return _return;
			
		},
		getProfitAndLossData = _this.getProfitAndLossData = function getProfitAndLossData() {
		
			var
			_return = [],
			columns = [],
			values = [],
			loop = portfolios.length;
			while(loop--) {
				columns.unshift(portfolios[loop].name.toUpperCase());
				values.unshift(portfolios[loop].getProfitAndLoss(true));
			};
			columns.unshift("Portfolio");
			values.unshift(DCM.Resources.getResource("ProfitLossLabel"));
			_return.push(columns);
			_return.push(values);
			return _return;
			
		},
		authorNewPortfolio = _this.authorNewPortfolio = function authorNewPortfolio() {
			
			var 
			authorNewPortfolioPrompt = new DCM.HTMLPromptTextFieldDialogElement(),
			authorNewPortfolioPromptAcceptHandler = function authorNewPortfolioPromptAcceptHandler() {
			
				publishNewPortfolio(authorNewPortfolioPrompt.getValue());
				
			};
			
			authorNewPortfolioPrompt.setHeading(DCM.Resources.getResource("PortfolioCreateConfirmHeading"));
			authorNewPortfolioPrompt.setMessage(DCM.Resources.getResource("PortfolioCreateConfirmMessage"));
			authorNewPortfolioPrompt.addEventHandler("ACCEPT", authorNewPortfolioPromptAcceptHandler);
			authorNewPortfolioPrompt.queue();
			
		},
		publishNewPortfolio = _this.publishNewPortfolio = function publishNewPortfolio(portfolioName) {
		
			var 
			publishNewPortfolioService = new DCM.CreatePortfolioService(),
			publishNewPortfolioServiceSuccessHandler = function publishNewPortfolioServiceSuccessHandler(data) {
				
				DCM.ModuleManager.getModuleByType("HTMLPortfoliosModuleElement").addPortfolio({
					title: portfolioName
				});
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("PortfolioCreatedSuccessLabel"));
				
			},
			publishNewPortfolioServiceErrorHandler = function publishNewPortfolioServiceErrorHandler(data) {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("PortfolioCreatedErrorLabel"));
				
			},
			publishNewPortfolioServiceExceptionHandler = function publishNewPortfolioServiceExceptionHandler(data) {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("PortfolioCreatedErrorLabel"));
				
			};
			
			publishNewPortfolioService.setParam("portfolioName", portfolioName);
			publishNewPortfolioService.addEventHandler("SUCCESS", publishNewPortfolioServiceSuccessHandler);
			publishNewPortfolioService.addEventHandler("ERROR", publishNewPortfolioServiceErrorHandler);
			publishNewPortfolioService.addEventHandler("EXCEPTION", publishNewPortfolioServiceExceptionHandler);
			publishNewPortfolioService.call();
			
		},
		authorAddToPortfolio = _this.authorAddToPortfolio = function authorAddToPortfolio(position) {
		
			var 
			selectPortfolioPrompt = new DCM.HTMLPromptSelectDialogElement(),
			allPortfolioNames = DCM.PortfolioManager.getAllNames(),
			selectPortfolioPromptAcceptHandler = function selectPortfolioPromptAcceptHandler() {
			
				publishAddToPortfolio(position, selectPortfolioPrompt.getValue());
				
			};
			
			selectPortfolioPrompt.setHeading(DCM.Resources.getResource("PortfolioAddToConfirmHeading"));
			selectPortfolioPrompt.setMessage(DCM.Resources.getResource("PortfolioAddToConfirmMessage"));
			
			for(var portfolioName in allPortfolioNames) {
				selectPortfolioPrompt.setItem(allPortfolioNames[portfolioName], allPortfolioNames[portfolioName]);
			};
			
			selectPortfolioPrompt.setValue(allPortfolioNames[0]);
			
			selectPortfolioPrompt.addEventHandler("ACCEPT", selectPortfolioPromptAcceptHandler);
			selectPortfolioPrompt.queue();
			
		},
		publishAddToPortfolio = _this.publishAddToPortfolio = function publishAddToPortfolio(position, portfolioToAddTo) {
			
			var 
			publishAddToPortfolioService = new DCM.AddToPortfolioService(),
			publishAddToPortfolioServiceSuccessHandler = function publishAddToPortfolioServiceSuccessHandler(data) {
			
				getPortfolioByName(portfolioToAddTo).addPosition(position);
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("ItemAddedToPortfolioSuccessLabel"));
				
			},
			publishAddToPortfolioServiceErrorHandler = function publishAddToPortfolioServiceErrorHandler(data) {
			
				DCM.ToastManager.createToast(DCM.Resources.getResource("ItemAddedToPortfolioErrorLabel"));
				
			},
			publishAddToPortfolioServiceExceptionHandler = function publishAddToPortfolioServiceExceptionHandler(data) {
			
				DCM.ToastManager.createToast(DCM.Resources.getResource("ItemAddedToPortfolioErrorLabel"));
				
			};
			
			publishAddToPortfolioService.setParam("portfolioName", portfolioToAddTo);
			publishAddToPortfolioService.setParam("positionId", position.id);
			publishAddToPortfolioService.addEventHandler("SUCCESS", publishAddToPortfolioServiceSuccessHandler);
			publishAddToPortfolioService.addEventHandler("ERROR", publishAddToPortfolioServiceErrorHandler);
			publishAddToPortfolioService.addEventHandler("EXCEPTION", publishAddToPortfolioServiceExceptionHandler);
			publishAddToPortfolioService.call();
			
		},
		authorDeletePortfolio = _this.authorDeletePortfolio = function authorDeletePortfolio(portfolio) {
		
			var 
			authorDeletePortfolioConfirm = new DCM.HTMLConfirmationDialogElement(),
			authorDeletePortfolioConfirmAcceptHandler = function authorDeletePortfolioConfirmAcceptHandler() {
			
				publishDeletePortfolio(portfolio);
				
			},
			portfolioName = portfolio.name;
			
			authorDeletePortfolioConfirm.setHeading(DCM.Resources.getResource("PortfolioDeleteConfirmHeading"));
			authorDeletePortfolioConfirm.setMessage(DCM.Resources.getResource("PortfolioDeleteConfirmMessage"));
			authorDeletePortfolioConfirm.addEventHandler("ACCEPT", authorDeletePortfolioConfirmAcceptHandler);
			authorDeletePortfolioConfirm.queue();
		
		},
		publishDeletePortfolio = _this.publishDeletePortfolio = function publishDeletePortfolio(portfolio) {
			
			var 
			publishDeletePortfolioService = new DCM.DeletePortfolioService(),
			publishDeletePortfolioServiceSuccessHandler = function publishDeletePortfolioServiceSuccessHandler(data) {
				
				portfolio.destroy();
				
				// perhaps re-consider this - perhaps apply event-driven system if it isn't already
				DCM.ModuleManager.getModuleByType("HTMLPortfoliosModuleElement").updateChart();
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("PortfolioDeleteSuccessLabel"));
				
			},
			publishDeletePortfolioServiceErrorHandler = function publishDeletePortfolioServiceErrorHandler(data) {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("PortfolioDeleteErrorLabel"));
				
			}
			publishDeletePortfolioServiceExceptionHandler = function publishDeletePortfolioServiceExceptionHandler(data) {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("PortfolioDeleteErrorLabel"));
				
			},
			portfolioName = portfolio.name;
			
			publishDeletePortfolioService.setParam("portfolioName", portfolioName);
			publishDeletePortfolioService.addEventHandler("SUCCESS", publishDeletePortfolioServiceSuccessHandler);
			publishDeletePortfolioService.addEventHandler("ERROR", publishDeletePortfolioServiceErrorHandler);
			publishDeletePortfolioService.addEventHandler("EXCEPTION", publishDeletePortfolioServiceExceptionHandler);
			publishDeletePortfolioService.call();
			
		},
		authorDeleteFromPortfolio = _this.authorDeleteFromPortfolio = function authorDeleteFromPortfolio(portfolioItem) {
			
			var 
			authorDeleteFromPortfolioConfirm = new DCM.HTMLConfirmationDialogElement(),
			authorDeleteFromPortfolioConfirmAcceptHandler = function authorDeleteFromPortfolioConfirmAcceptHandler() {
				
				publishDeleteFromPortfolio(portfolioItem);
				
			};
			
			authorDeleteFromPortfolioConfirm.setHeading(DCM.Resources.getResource("PortfolioRemoveFromConfirmHeading"));
			authorDeleteFromPortfolioConfirm.setMessage(DCM.Resources.getResource("PortfolioRemoveFromConfirmMessage"));
			authorDeleteFromPortfolioConfirm.addEventHandler("ACCEPT", authorDeleteFromPortfolioConfirmAcceptHandler);
			authorDeleteFromPortfolioConfirm.queue();
			
		},
		publishDeleteFromPortfolio = _this.publishDeleteFromPortfolio = function publishDeleteFromPortfolio(portfolioItem) {
		
			var 
			publishDeleteFromPortfolioService = new DCM.DeleteFromPortfolioService(),
			publishDeleteFromPortfolioServiceSuccessHandler = function publishDeleteFromPortfolioServiceSuccessHandler(data) {
				
				portfolioItem.destroy();
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("ItemDeletedFromPortfolioSuccessLabel"));
				
			},
			publishDeleteFromPortfolioServiceErrorHandler = function publishDeleteFromPortfolioServiceErrorHandler(data) {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("ItemDeletedFromPortfolioErrorLabel"));
				
			},
			publishDeleteFromPortfolioServiceExceptionHandler = function publishDeleteFromPortfolioServiceExceptionHandler(data) {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("ItemDeletedFromPortfolioErrorLabel"));
				
			};
			
			publishDeleteFromPortfolioService.setParam("portfolioName", portfolioItem.portfolio.name);
			publishDeleteFromPortfolioService.setParam("positionId", portfolioItem.position.id);
			publishDeleteFromPortfolioService.addEventHandler("SUCCESS", publishDeleteFromPortfolioServiceSuccessHandler);
			publishDeleteFromPortfolioService.addEventHandler("ERROR", publishDeleteFromPortfolioServiceErrorHandler);
			publishDeleteFromPortfolioService.addEventHandler("EXCEPTION", publishDeleteFromPortfolioServiceExceptionHandler);
			publishDeleteFromPortfolioService.call();
		
		};
		
	}
	catch(e) {
		
		DCM.warn("PortfolioManager", e);
		
	};
	
};DCM.Position = function Position(data) {

	try {
	
		this._super = DCM.EventDispatcher;
		this._super();
	
		var
		_this = this,
		data = _this.data = data,
		setInstrument = function setInstrument(id) {
			var instrument = DCM.InstrumentManager.getInstrumentById(id);
			if(!instrument) {
				throw("INSTRUMENT [" + id + "] NOT FOUND");
			};
			_this.instrument = instrument;
		},
		priceChangeHandler = function priceChangeHandler() {
		
			if(_this.direction==="BUY") {
				
				_this.setMarketPrice(_this.instrument.sellPrice);
				_this.setProfitAndLoss(pointsToCurrency((_this.marketPrice-_this.entryPrice), _this.size));
				
			}
			else if(_this.direction==="SELL") {
				
				_this.setMarketPrice(_this.instrument.buyPrice);
				_this.setProfitAndLoss(pointsToCurrency((_this.entryPrice-_this.marketPrice), _this.size));
				
			};
			
		},
		sellPriceChangeHandler = function sellPriceChangeHandler() {
			priceChangeHandler();
		},
		buyPriceChangeHandler = function buyPriceChangeHandler() {
			priceChangeHandler();
		},
		setConsideration = function setConsideration(value) {
			_this.consideration = value;
		},
		sharesToCurrency = _this.sharesToCurrency = function sharesToCurrency(value, asNumber) {
			
			if(value===undefined) {
				return;
			};
			
			var 
			_return = (value*_this.instrument.sharePrice).toFixed(2);
			if(asNumber) {
				_return = Number(_return);
			};
			
			return _return;
		
		},
		currencyToShares = function currencyToShares(value, asNumber) {
			
			if(!value) {
				return;
			};
			
			var 
			_return = (value/_this.instrument.sharePrice);
			if(asNumber) {
				_return = Number(_return);
			};
			
			return _return;
		
		},
		pointsToCurrency = _this.pointsToCurrency = function pointsToCurrency(value, size) {
			
			if(value===undefined) {
				return;
			};
			
			var 
			_return;
			
			_return = (sharesToCurrency(value, true)*size).toFixed(2);
			
			return _return;
		
		},
		currencyToPoints = function currencyToPoints(value, size) {
		
			if(!value) {
				return;
			};
			
			var 
			_return;
			
			_return = roundPointValue(currencyToShares(value)/size);
			
			return _return;
		
		},
		roundPointValue = function roundPointValue(value) {
		
			var
			minPointIncrement = _this.instrument.minPointIncrement,
			_return = (Math.ceil(value/minPointIncrement)*minPointIncrement);
			return _return;
		
		};
		
		this.setStatus = function setStatus(value) {
			// NEW, PENDING, OPEN
			_this.status = value;
		};
		
		this.getStatus = function getStatus() {
			return _this.status;
		};
		
		this.getExpireTime = function getExpireTime() {
			var _return = _this.expireTime;
			return _return;
		};
		
		this.setExpireTime = function setExpireTime(value) {
			_this.expireTime = value;
			_this.dispatchEventHandler("EXPIRE_CHANGE");
		};
		
		this.getType = function getType() {
			return _this.type;
		};
		
		this.setType = function setType(value) {
			if(value===_this.type) {
				return;
			};
			_this.type = value;
			_this.dispatchEventHandler("TYPE_CHANGE");
		};
		
		this.getId = function getId() {
			return _this.id;
		};
		
		this.setId = function setId(value) {
			_this.id = value;
		};
		
		this.getSize = function getSize() {
		
			var 
			_return = _this.size;
			
			return _return;
			
		};
		
		this.getSizeAsHTML = function getSizeAsHTML() {
			
			return ("<span data-direction=\"" + _this.direction + "\"><span data-role=\"direction-indecator\">" + (_this.direction==="SELL"?"-":"+") + "</span>" + _this.size + "</span>");
			
		};
		
		this.setSize = function setSize(value) {
			if(value===_this.size) {
				return;
			};
			_this.size = value;
			_this.dispatchEventHandler("SIZE_CHANGE");
		};
		
		this.getStop = function getStop(asNumber) {
			var _return = _this.stop;
			if(_return&&asNumber) {
				_return = Number(_return);
			};
			return _return;
		};
		
		this.setStop = function setStop(value) {
			if(value===_this.stop) {
				return;
			};
			_this.stop = value;
			_this.dispatchEventHandler("STOP_CHANGE");
		};
		
		this.getStopPrice = function getStopPrice() {
			var _return;
			if(DCM.isNull(_this.stop)) {
				return null;
			};
			if(_this.direction==="SELL") {
				_return = (this.getEntryPrice(true) + this.getStop(true));
			}
			else if(_this.direction==="BUY") {
				_return = (this.getEntryPrice(true) - this.getStop(true));
			};
			return _return.toFixed(_this.instrument.decimalPlaces);
		};
		
		this.setStopPrice = function setStopPrice(value) {
			_this.stopPrice = value;
		};
		
		this.getStopAsCurrency = function getStopAsCurrency(asNumber) {
			var _return = pointsToCurrency(_this.stop, _this.size);
			if(asNumber) {
				Number(_return);
			};
			return _return;
		};
		
		this.setStopAsCurrency = function setStopAsCurrency(value) {
			this.setStop(currencyToPoints(value, _this.size));
		};
		
		this.getLimit = function getLimit(asNumber) {
			var _return = _this.limit;
			if(_return&&asNumber) {
				_return = Number(_return);
			};
			return _return;
		};
		
		this.setLimit = function setLimit(value) {
			if(value===_this.limit) {
				return;
			};
			_this.limit = value;
			_this.dispatchEventHandler("LIMIT_CHANGE");
		};
		
		this.getLimitAsCurrency = function getLimitAsCurrency(asNumber) {
			var _return = pointsToCurrency(_this.limit, _this.size);
			if(asNumber) {
				Number(_return);
			};
			return _return;
		};
		
		this.setLimitAsCurrency = function setLimitAsCurrency(value) {
			this.setLimit(currencyToPoints(value, _this.size));
		};
		
		this.getLimitPrice = function getLimitPrice() {
			var _return;
			if(DCM.isNull(_this.limit)) {
				return null;
			};
			if(_this.direction==="SELL") {
				_return = (this.getEntryPrice(true) - this.getLimit(true));
			}
			else if(_this.direction==="BUY") {
				_return = (this.getEntryPrice(true) + this.getLimit(true));
			};
			return _return.toFixed(_this.instrument.decimalPlaces);
		};
		
		this.setLimitPrice = function setLimitPrice(value) {
			_this.limitPrice = value;
		};
		
		this.getDirection = function getDirection() {
			
			var 
			_return = _this.direction;
			
			return _return;
			
		};
		
		this.setDirection = function setDirection(value) {
			if(value==="1") {
				value = "BUY";
			}
			else if(value==="2") {
				value = "SELL";
			};
			_this.direction = value;
		};
		
		this.getMarketPrice = function getMarketPrice() {
			return _this.marketPrice;
		};
		
		this.setMarketPrice = function setMarketPrice(value) {
		
			if(!value||value===_this.marketPrice) {
				return;
			};
			
			var 
			changeDirection = DCM.getChangeDirectionName(value, _this.marketPrice);
			
			_this.marketPrice = value;
			
			_this.dispatchEventHandler("MARKET_PRICE_CHANGE", {
				direction: changeDirection
			});
		
		};
		
		this.getEntryPrice = function getEntryPrice(asNumber) {
			var _return = _this.entryPrice;
			if(_return&&asNumber) {
				_return = Number(_return);
			};
			return _return;
		};
		
		this.setEntryPrice = function setEntryPrice(value) {
			if(value===_this.entryPrice) {
				return;
			};
			_this.entryPrice = value;
			_this.dispatchEventHandler("ENTRY_PRICE_CHANGE");
		};
		
		this.getProfitAndLoss = function getProfitAndLoss(asNumber) {
			
			var 
			_return = _this.profitAndLoss,
			isDefined = !DCM.isUndefined(_return);
			
			if(isDefined&&asNumber) {
				_return = Number(_return);
			}
			else if(isDefined) {
				_return = (_return + " " + _this.instrument.currency);
			}
			else {
				_return = null;
			};
			
			return _return;
			
		};
		
		this.getProfitAndLossAsHTML = function getProfitAndLossAsHTML() {
			
			var 
			directionName,
			numericValue = this.getProfitAndLoss(true),
			displayValue = this.getProfitAndLoss(),
			_return;
			
			if(DCM.isNull(numericValue)) {
				return;
			};
			
			if(numericValue>0) {
				directionName = "POSITIVE";
				_return = ("<span data-value-direction-name=\"" + directionName + "\">+" + displayValue + "</span>");
			}
			else if(numericValue<0) {
				directionName = "NEGATIVE";
				_return = ("<span data-value-direction-name=\"" + directionName + "\">" + displayValue + "</span>");
			}
			else {
				directionName = "NONE";
				_return = ("<span data-value-direction-name=\"" + directionName + "\">" + displayValue + "</span>");
			};
			
			return _return;
			
		};
		
		this.setProfitAndLoss = function setProfitAndLoss(value) {
			
			if(!value||value===_this.profitAndLoss) {
				return;
			};
			
			var 
			changeDirection = DCM.getChangeDirectionName(value, _this.profitAndLoss),
			eventName = ("PROFITLOSS_" + changeDirection);
			
			_this.profitAndLoss = value;
			
			_this.dispatchEventHandler(eventName);
			_this.dispatchEventHandler("PROFITLOSS_CHANGE");
		
		};
		
		this.OpenService = function OpenService() {
		
			var 
			_OpenService = this;
		
			if(_this.entryPrice) {
				
				_OpenService._super = DCM.OpenOrderService;
				_OpenService._super();
				
				_OpenService.setParam("price", _this.entryPrice);
				_OpenService.setParam("type", _this.type);
				
				if(_this.getExpireTime()) {
					_OpenService.setParam("gtd", _this.getExpireTime());
				};
				
			}
			else {
				
				_OpenService._super = DCM.OpenPositionService;
				_OpenService._super();
				
				_OpenService.setParam("forceOpen", _this.forceOpen);
				
			};
			
			if(_this.stop) {
				_OpenService.setParam("stopPrice", this.getStop());
			};
			
			if(_this.limit) {
				_OpenService.setParam("limitPrice", this.getLimit());
			};			
			
			_OpenService.setParam("securityId", _this.instrument.id);
			_OpenService.setParam("currency", _this.instrument.currency);
			_OpenService.setParam("size", _this.size);
			_OpenService.setParam("side", _this.direction);
			
		};
		
		this.EditService = function EditService() {
			
			var 
			_EditService = this;
			
			if(_this.status==="PENDING") {
				
				_EditService._super = DCM.EditOrderService;
				_EditService._super();
				
				_EditService.setParam("openOrderId", _this.id);
				_EditService.setParam("price", _this.entryPrice);
				
				if(_this.getExpireTime()) {
					_EditService.setParam("gtd", _this.getExpireTime());
				};
				
			}
			else if(_this.status==="OPEN") {
			
				_EditService._super = DCM.EditPositionService;
				_EditService._super();
				
				_EditService.setParam("positionId", _this.id);
			
			};
			
			_EditService.setParam("size", _this.size);
			
			if(_this.stop) {
				_EditService.setParam("stopPrice", this.getStop());
			};
			
			if(_this.limit) {
				_EditService.setParam("limitPrice", this.getLimit());
			};
			
		};
		
		this.CloseService = function CloseService() {
		
			var 
			_CloseService = this;
			
			if(_this.status==="PENDING") {
				
				_CloseService._super = DCM.CloseOrderService;
				
				_CloseService._super();
				
				_CloseService.setParam("orderId", _this.id);
				
			}
			else if(_this.status==="OPEN") {
				
				_CloseService._super = DCM.ClosePositionService;
				
				_CloseService._super();
			
				_CloseService.setParam("positionId", _this.id);
				_CloseService.setParam("side", _this.direction);
				
				if(_this.stop) {
					_CloseService.setParam("stopPrice", _this.stop);
				};
				
				if(_this.limit) {
					_CloseService.setParam("limitPrice", _this.limit);
				};
				
				if(_this.trailingStop) {
					_CloseService.setParam("tstop", _this.trailingStop);
				};
				
			};
		
		};
		
		this.setForceOpen = function setForceOpen(value) {
			_this.forceOpen = value;
		};
		
		this.getMinStop = function getMinStop() {
			
			var 
			_return = _this.instrument.minStop;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
			
				_return = pointsToCurrency(_return, _this.size||1);
				
			};
			
			return _return;
			
		};
		
		this.getMinLimit = function getMinLimit() {
			
			var 
			_return = _this.instrument.minPointIncrement;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
			
				_return = pointsToCurrency(_return, _this.size||1);
				
			};
			
			return _return;
			
		};
		
		this.getMinTrailingStop = function getMinTrailingStop() {
			
			var 
			_return = _this.instrument.minTrailingStop;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
			
				_return = pointsToCurrency(_return, _this.size||1);
				
			};
			
			return _return;
			
		};
		
		this.getStopStep = function getStopStep() {
			
			var 
			_return = _this.instrument.minPointIncrement;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
			
				_return = pointsToCurrency(_return, 1);
				
			};
			
			return _return;
			
		};
		
		this.getTrailingStopStep = function getTrailingStopStep() {
			
			var 
			_return = _this.instrument.minPointIncrement;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
			
				_return = pointsToCurrency(_return, 1);
				
			};
			
			return _return;
			
		};
		
		this.getLimitStep = function getLimitStep() {
			
			var 
			_return = _this.instrument.minPointIncrement;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
			
				_return = pointsToCurrency(_return, 1);
				
			};
			
			return _return;
			
		};
		
		this.getPriceStep = function getPriceStep() {
		
			// probably don't need this - could call instrument directly
			
			var 
			_return = _this.instrument.minPointIncrement;
			
			return _return;
			
		};
		
		this.getMinSize = function getMinSize() {
		
			// probably don't need this - could call instrument directly
			
			var 
			_return = _this.instrument.minSize;
			
			return _return;
			
		};
		
		this.getSellPrice = function getSellPrice() {
		
			// probably don't need this - could call instrument directly
		
			var 
			_return = _this.instrument.sellPrice;
			
			return _return;
			
		};
		
		this.getBuyPrice = function getBuyPrice() {
		
			// probably don't need this - could call instrument directly
			
			var 
			_return = _this.instrument.buyPrice;
			
			return _return;
			
		};
		
		this.getPotentialProfit = function getPotentialProfit() {
			
			return (sharesToCurrency(_this.size) + " " + _this.instrument.currency);
			
		};
		
		this.clear = function clear() {
			
			this.setStop(null);
			this.setLimit(null);
			this.setEntryPrice(null);
			this.setSize(null);
			this.setForceOpen(null);
			
		};
		
		this.close = function close() {
			
			if(_this.status==="PENDING") {
				DCM.OrderManager.orders.splice(DCM.getIndexOf(DCM.OrderManager.orders, _this), 1);
			}
			else if(_this.status==="OPEN") {
				DCM.PositionManager.positions.splice(DCM.getIndexOf(DCM.PositionManager.positions, _this), 1);
			};
			
			_this.dispatchEventHandler("CLOSE");
			
		};
		
		this.modify = function modify(_data) {
			
			// temp fixed for dodgey item comming back which doesn't exist in instrument library
			if(DCM.isUndefined(_this.instrument)) {
				return;
			};
			
			//DCM.log("Position.modify()", this, _this);
			
			data = _this.data = _data;
			
			if(_data.size) {
				this.setSize(_data.size);
			};
			
			if(_data.orderQuantity) {
				this.setSize(_data.orderQuantity);
			};
			
			if(_data.price) {
				this.setEntryPrice(_this.instrument.processPrice(_data.price));
			};
				
			if(_data.side) {
				this.setDirection(_data.side);
			};
			
			if(_data.isGtc) {
				this.setExpireTime("Cancelled");
			};
			
			if(_data.gtdDate) {
				this.setExpireTime(_data.gtdDate);
			};
			
			if(!DCM.isUndefined(_data.stopOffset)) {
				this.setStop(_data.stopOffset);
			};
			
			if(!DCM.isUndefined(_data.contingentStopOffset)) {
				this.setStop(_data.contingentStopOffset);
			};
			
			if(!DCM.isUndefined(_data.limitOffet)) {
				this.setLimit(_data.limitOffet);
			};
			
			if(!DCM.isUndefined(_data.contingentLimitOffset)) {
				this.setLimit(_data.contingentLimitOffset);
			};
			
			if(_data.orderType) {
				this.setType(_data.orderType);
			};
			
			if(_this.size&&_this.entryPrice) {
				setConsideration((_this.size*_this.entryPrice));
			};
			
		};
		
		//DCM.log("new Position()", _this);
		
		this.setStatus("NEW");
		this.clear();
		this.setForceOpen(false);
		
		if(data.id) {
			
			this.setId(data.id);
			
		};
		
		if(data.instrumentId) {
			
			setInstrument(data.instrumentId);
		
		}
		else if(data.securityID) {
			
			setInstrument(data.securityID);
		
		}
		else if(data.instrumentSecurityId) {
			
			setInstrument(data.instrumentSecurityId);
		
		};
		
		this.modify(data);
		
		if(data.orderType&&data.orderQuantity) {
			
			this.setStatus("PENDING");
		
		}
		else if(data.size) {
			
			this.setStatus("OPEN");
		
		};
		
		_this.instrument.subscribe();
		_this.instrument.addEventHandler("SELL_PRICE_CHANGE", sellPriceChangeHandler).dispatch();
		_this.instrument.addEventHandler("BUY_PRICE_CHANGE", buyPriceChangeHandler).dispatch();
		
	}
	catch(e) {
		
		DCM.warn("Position" + e);
		
	};
	
};DCM.PositionManager = new function PositionManager() {

	try {
		
		var
		_this = this,
		positions = _this.positions = [],
		createOpenPosition = _this.createOpenPosition = function createOpenPosition(data) {
			
			var 
			Position = new DCM.Position(data),
			positionElement = new DCM.HTMLPositionsModuleItemElement(Position);
			
			positions.push(Position);
			_this.dispatchEventHandler("CREATE", Position.id);
			return positionElement;
		
		},
		getPositionById = _this.getPositionById = function getPositionById(id) {
			
			var 
			loop = positions.length,
			_return;
			
			while(loop--) {
				if(positions[loop].id===id) {
					_return = positions[loop];
					break;
				};
			};
			
			return _return;
		
		},
		getCurrentPositionIDs = _this.getCurrentPositionIDs = function getCurrentPositionIDs() {
		
			var 
			loop = positions.length,
			_return = [];
			
			while(loop--) {
				_return.push(positions[loop].id);
			};
			
			return _return;
		
		},
		authorEditPosition = _this.authorEditPosition = function authorEditPosition(Position) {
		
			var 
			ticket = Position.instrument.openTicket(),
			stopAndLimitStepperChangeHandler = function stopAndLimitStepperChangeHandler() {
				
				var 
				stopValue = ticket.tradeStopStepper.getValue()||null,
				limitValue = ticket.tradeLimitStepper.getValue()||null;
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					if(stopValue==Position.getStopAsCurrency()&&limitValue==Position.getLimitAsCurrency()) {
						
						ticket.tradeSizeStepper.enable();
						ticket.setMode("CANCEL");
					
					}
					else {
						
						ticket.tradeSizeStepper.disable();
						ticket.setMode("EDIT");
					
					};
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					if(stopValue==Position.getStop()&&limitValue==Position.getLimit()) {
						
						ticket.tradeSizeStepper.enable();
						ticket.setMode("CANCEL");
					
					}
					else {
						
						ticket.tradeSizeStepper.disable();
						ticket.setMode("EDIT");
					
					};
				
				};
				
			},
			tradeSizeStepperChangeHandler = function tradeSizeStepperChangeHandler() {
			
				if(this.getValue()==Position.getSize()) {
				
					ticket.tradeStopStepper.enable();
					ticket.tradeLimitStepper.enable();
					ticket.setMode("CANCEL");
					
				}
				else {
				
					ticket.tradeStopStepper.disable();
					ticket.tradeLimitStepper.disable();
					ticket.setMode("EDIT");
					
				};
				
			};
			
			// create duplicate of current position
			ticket.TradePosition.setStatus(Position.getStatus());
			ticket.TradePosition.setId(Position.getId());
			ticket.TradePosition.setStop(Position.getStop());
			ticket.TradePosition.setLimit(Position.getLimit());
			ticket.TradePosition.setSize(Position.getSize());
			ticket.TradePosition.setEntryPrice(Position.getEntryPrice());
			
			ticket.setLockedIntoSide(true);
			
			ticket.orderTab.disable();
			ticket.wizardTab.disable();
			
			ticket.tradeSizeStepper.setValue(Position.getSize());
			ticket.tradeSizeStepper.setMax(Position.getSize());
			
			if(Position.getStop()) {
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					ticket.tradeStopStepper.setValue(Position.getStopAsCurrency());
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					ticket.tradeStopStepper.setValue(Position.getStop());
				
				};

			};
			
			if(Position.getLimit()) {
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					ticket.tradeLimitStepper.setValue(Position.getLimitAsCurrency());
				
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				
					ticket.tradeLimitStepper.setValue(Position.getLimit());
					
				};
				
			};
			
			ticket.tradeSizeStepper.addEventHandler("CHANGE", tradeSizeStepperChangeHandler);
			ticket.tradeStopStepper.addEventHandler("CHANGE", stopAndLimitStepperChangeHandler);
			ticket.tradeLimitStepper.addEventHandler("CHANGE", stopAndLimitStepperChangeHandler);
			
			if(Position.direction==="BUY") {
				ticket.setSide("SELL");
			}
			else if(Position.direction==="SELL") {
				ticket.setSide("BUY");
			};
			
			ticket.setMode("CANCEL");
			
		},
		publishEditPosition = _this.publishEditPosition = function publishEditPosition() {
			
			
		
		},
		publishClosePosition = _this.publishClosePosition = function publishClosePosition(Position) {
			
			//DCM.log("PositionManager.publishClosePosition()");
			
			var 
			service = new Position.CloseService(),
			closeSuccessHandler = function closeSuccessHandler(data) {
			
				var
				closePositionNotification = new DCM.HTMLNotifyDialogElement(),
				table = new DCM.HTMLTableElement(),
				row1 = table.addRow(),
				row1Col1 = row1.addColumn(DCM.Resources.getResource("PriceLabel")),
				row1Col2 = row1.addColumn(data.price),
				row2 = table.addRow(),
				row2Col1 = row2.addColumn(DCM.Resources.getResource("SizeLabel")),
				row2Col2 = row2.addColumn(data.size),
				row3 = table.addRow(),
				row3Col1 = row3.addColumn(DCM.Resources.getResource("DirectionLabel")),
				row3Col2 = row3.addColumn(data.side),
				row4 = table.addRow(),
				row4Col1 = row4.addColumn(DCM.Resources.getResource("ReferenceNumberLabel")),
				row4Col2 = row4.addColumn(data.ref);
				
				closePositionNotification.setHeading(DCM.Resources.getResource("PositionClosedNotificationHeading"));
				closePositionNotification.setMessage(DCM.Resources.getResource("PositionClosedNotificationBody"));
				closePositionNotification.queue();
				
				closePositionNotification.body.append(table);
				
				// used to use toast but then for some reason a tonne of closing information needs to be displayed
				//DCM.ToastManager.createToast(DCM.Resources.getResource("PositionCloseSuccessLabel"));
				
			},
			closeErrorHandler = function closeErrorHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("PositionCloseErrorLabel"));
				
			},
			closeExceptionHandler = function closeExceptionHandler(exceptionCode) {
				
				if(exceptionCode==="DT0001") {
				
					DCM.AccountManager.openSelectAccountTypeDialog();
					
				}
				else if(exceptionCode==="U0002") {
				
					DCM.AccountManager.openAccountProcessPendingDialog();
					
				}
				else {
					
					DCM.ToastManager.createToast(DCM.Resources.getResource(exceptionCode));
					
				};
				
			};
			
			service.addEventHandler("SUCCESS", closeSuccessHandler);
			service.addEventHandler("EXCEPTION", closeExceptionHandler);
			service.addEventHandler("ERROR", closeErrorHandler);
			service.call();
			
		};
		
		this._super = DCM.EventDispatcher;
		this._super();
		
	}
	catch(e) {
		
		DCM.warn("PositionManager", e);
		
	};
	
};DCM.RenameWatchlistService = function RenameWatchlistService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_watchlist_rename");
		this.setErrorMessage(DCM.Resources.getResource("ERROR45"));
		
	}
	catch(e) {
		
		DCM.warn("RenameWatchlistService", e);
		
	};
	
};DCM.RequestPasswordService = function RequestPasswordService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dealer_platform_login_forgot");
		this.setErrorMessage(DCM.Resources.getResource("ERROR46"));
		
	}
	catch(e) {
		
		DCM.warn("RequestPasswordService", e);
		
	};
	
};DCM.ResetPasswordService = function ResetPasswordService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/retrieve_user_details_reset");
		this.setErrorMessage(DCM.Resources.getResource("ERROR47"));

	}
	catch(e) {
		
		DCM.warn("ResetPasswordService", e);
		
	};
	
};DCM.ServiceCaller = function ServiceCaller() {
		
	try {
		
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
		
		this._super = DCM.EventDispatcher;
		this._super();
		
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
		
	}
	catch(e) {
	
		DCM.warn("ServiceCaller", e);
	
	};

};DCM.SetAlertReadService = function SetAlertReadService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_alert_markAsRead");
		this.setErrorMessage(DCM.Resources.getResource("ERROR48"));
		
	}
	catch(e) {
		
		DCM.warn("SetAlertReadService", e);
		
	};
	
};DCM.SetSettingsService = function SetSettingsService() {

	try {
	
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_setting_save");
		this.setErrorMessage(DCM.Resources.getResource("ERROR49"));
		
	}
	catch(e) {
		
		DCM.warn("SetSettingsService", e);
		
	};
	
};DCM.StandardServiceCaller = function StandardServiceCaller() {
	
	try {
		
		this._super = DCM.ServiceCaller;
		this._super();
		
		this.setNotifyUserOnError(false);
		
		this.processResult = function processResult(data) {
		
			if(data.status===true) {
				this.dispatchEventHandler("SUCCESS", data);
			}
			else if(data.status===false) {
				this.dispatchEventHandler("EXCEPTION", data.error);
			};
			
		};
		
	}
	catch(e) {
	
		DCM.warn("StandardServiceCaller", e);
	
	};
	
};DCM.SwitchAccountService = function SwitchAccountService() {

	try {
	
		this._super = DCM.StandardServiceCaller;
		this._super();
		
		this.setMethod("/dcmdealer_account_change");
		this.setErrorMessage(DCM.Resources.getResource("ERROR50"));
		
	}
	catch(e) {
		
		DCM.warn("SwitchAccountService", e);
		
	};
	
};