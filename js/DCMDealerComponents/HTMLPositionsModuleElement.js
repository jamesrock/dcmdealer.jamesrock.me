DCM.HTMLPositionsModuleElement = ROCK.createClass(DCM.HTMLScrollableModuleElement, function HTMLPositionsModuleElement() {
	
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
	
});