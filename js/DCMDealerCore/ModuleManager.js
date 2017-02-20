(function() {

	try {

		var 
		panelNameMap = {
			"ACCOUNT_OVERVIEW": "HTMLAccountOverviewModuleElement",
			"DEAL_TICKET": "HTMLTicketModuleElement",
			"ALERTS": "HTMLAlertsModuleElement",
			"NOTES": "HTMLNotesModuleElement",
			"GLOBAL_WATCHLIST": "HTMLWatchlistModuleElement",
			"OPEN_POSITIONS": "HTMLPositionsModuleElement",
			"CLOSED_POSITIONS": "HTMLClosedPositionsModuleElement",
			"NEWS": "HTMLNewsModuleElement",
			"MY_PORTFOLIO": "HTMLPortfoliosModuleElement",
			"PORTFOLIO": "HTMLPortfolioModuleElement",
			"TRADING_WIZARD": "HTMLTradingWizardModuleElement",
			"ORDERS": "HTMLOrdersModuleElement"
		};

		var ModuleManager = DCM.ModuleManager = ROCK.createStatic(ROCK.createClass(Object, function() {

			this.modules = [];

		}));
		ModuleManager.prototype.createModule = function(panelType, data, bypassMapping) {
			
			var
			module = new DCM[(bypassMapping?panelType:panelNameMap[panelType])](data);
			modules.push(module);
			module.open();
			return module;

		};
		ModuleManager.prototype.stopAll = function() {
			
			for(var prop in modules) {
				modules[prop].stop();
			};

		};
		ModuleManager.prototype.startAll = function() {
			
			for(var prop in modules) {
				modules[prop].start();
			};

		};
		ModuleManager.prototype.updateAll = function() {
			
			for(var prop in modules) {
				modules[prop].update();
			};

		};
		ModuleManager.prototype.getModuleByType = function(moduleType) {
			
			var 
			_return,
			loop = modules.length;
			while(loop--) {
				if(modules[loop].type===moduleType) {
					_return = modules[loop];
					break;
				};
			};
			return _return;
		
		};
		ModuleManager.prototype.updateModule = function(moduleType) {
			
			getModuleByType(moduleType).update();
		
		};
		ModuleManager.prototype.closeModule = function(moduleType) {
			
			getModuleByType(moduleType).close();
		
		};
		ModuleManager.prototype.toggleModule = function(moduleType) {
			
			getModuleByType(moduleType).toggle();

		};

	}
	catch(e) {
		
		DCM.warn("ModuleManager", e);
	
	};

})();