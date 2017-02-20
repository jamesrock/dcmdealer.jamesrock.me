DCM.PortfolioManager = new function PortfolioManager() {

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
	
};