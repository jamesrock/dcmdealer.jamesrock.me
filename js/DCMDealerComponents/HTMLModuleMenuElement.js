DCM.HTMLModuleMenuElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLModuleMenuElement() {
		
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
	
});