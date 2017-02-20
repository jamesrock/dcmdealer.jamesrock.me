(function() {

	try {

		var AccountManager = DCM.AccountManager = ROCK.createClass(DCM.EventDispatcher, function() {

			var
			_this = this,
			PREVIEW_STRING = "PREVIEW",		
			timer,
			accountDetailsService = new DCM.GetAccountOverviewService(),
			userDetailsService = _this.userDetailsService = new DCM.GetUserService(),		
			footerAppended = false;
			
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
			
		});
		AccountManager.prototype.isPreviewAccount = function() {
			
			var _return = (getID()==="DCM_PREVIEW");
			return _return;

		};
		AccountManager.prototype.getType = function() {
			
			return this.type;

		};
		AccountManager.prototype.setType = function(value) {
			
			if(value===this.type) {
				return;
			};
			this.type = value;
			this.dispatchEventHandler("TYPE_CHANGE");

		};
		AccountManager.prototype.getMargin = function() {
			
			if(isPreviewAccount()) {
				return PREVIEW_STRING;
			};
			return (this.margin + " " + this.currency);

		};
		AccountManager.prototype.setMargin = function(value) {
			
			this.margin = value;
			this.dispatchEventHandler("MARGIN_CHANGE");

		};
		AccountManager.prototype.getFunds = function() {
			
			if(isPreviewAccount()) {
				return PREVIEW_STRING;
			};
			return (this.funds + " " + this.currency);

		};
		AccountManager.prototype.setFunds = function(value) {
			
			this.funds = value;
			this.dispatchEventHandler("FUNDS_CHANGE");

		};
		AccountManager.prototype.getEquity = function() {
			
			if(isPreviewAccount()) {
				return PREVIEW_STRING;
			};
			return (this.equity + " " + this.currency);

		};
		AccountManager.prototype.setEquity = function(value) {
			
			this.equity = value;
			this.dispatchEventHandler("EQUITY_CHANGE");

		};
		AccountManager.prototype.getProfitLoss = function() {
			
			if(isPreviewAccount()) {
				return PREVIEW_STRING;
			};
			return (this.profitLoss + " " + this.currency);

		};
		AccountManager.prototype.setProfitLoss = function(value) {
			
			this.profitLoss = value;
			this.dispatchEventHandler("PROFITLOSS_CHANGE");

		};
		AccountManager.prototype.setCurrency = function(value) {
			
			this.currency = value;
			this.dispatchEventHandler("");

		};
		AccountManager.prototype.setSentimentEnabled = function(value) {
			
			this.sentimentEnabled = value;

		};
		AccountManager.prototype.switchAccount = function() {
			
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
		
		};
		AccountManager.prototype.setName = function(value) {
			
			this.name = value;
			this.dispatchEventHandler("NAME_CHANGE");

		};
		AccountManager.prototype.getID = function() {
			
			var _return = _this.id;			
			return _return;
			
		};
		AccountManager.prototype.setId = function(value) {
			
			this.id = value;
			this.dispatchEventHandler("ID_CHANGE");

		};
		AccountManager.prototype.update = function() {
		
			accountDetailsService.call();
		
		};
		AccountManager.prototype.start = function() {
			
			stop();
			update();
			timer = setInterval(update, 500);
			
		};
		AccountManager.prototype.stop = function() {
			
			clearInterval(timer);

		};
		AccountManager.prototype.openUpgradeAccountDialog = function() {
			
			var upgradeAccountDialog = new DCM.HTMLUpgradeAccountDialogElement();
			upgradeAccountDialog.queue();

		};
		AccountManager.prototype.openSelectAccountTypeDialog = function() {
			
			var selectAccountTypeDialog = new DCM.HTMLSelectAccountTypeDialogElement();
			selectAccountTypeDialog.queue();

		};
		AccountManager.prototype.openAccountProcessPendingDialog = function() {
		
			var processingAccountDialog = new DCM.HTMLStaticMessageDialogElement();
			processingAccountDialog.setHeading(DCM.Resources.getResource("U0002Heading"));
			processingAccountDialog.setMessage(DCM.Resources.getResource("U0002"));
			processingAccountDialog.queue();
			
		};
		AccountManager.prototype.setStopsAndLimitsType = function(value) {
			
			this.stopsAndLimitsType = value;
			this.dispatchEventHandler("STOPSANDLIMITSTYPE_CHANGE");

		};
		AccountManager.prototype.setCulture = function(value) {
			
			this.culture = value;

		};
		AccountManager.prototype.setFirstName = function(value) {
			
			this.firstName = value;

		};
		AccountManager.prototype.setLastName = function(value) {
			
			this.lastName = value;

		};
		AccountManager.prototype.setTitle = function(value) {
			
			this.title = value;

		};
		AccountManager.prototype.setEmailAddress = function(value) {
			
			this.emailAddress = value;
			this.dispatchEventHandler("EMAIL_CHANGE");

		};

	}
	catch(e) {
		
		DCM.warn("AccountManager", e);
		
	};

})();