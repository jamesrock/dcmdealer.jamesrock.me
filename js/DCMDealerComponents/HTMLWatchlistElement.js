DCM.HTMLWatchlistElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLWatchlistElement(data, module) {

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
	
});