DCM.HTMLDocumentContextMenuElement = ROCK.createClass(DCM.HTMLContextMenuElement, function HTMLDocumentContextMenuElement() {
	
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
	
};