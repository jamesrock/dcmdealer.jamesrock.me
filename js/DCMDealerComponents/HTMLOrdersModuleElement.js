DCM.HTMLOrdersModuleElement = ROCK.createClass(DCM.HTMLScrollableModuleElement, function HTMLOrdersModuleElement() {

	var 
	_this = this,
	_table = new DCM.HTMLTableElement(),
	noOrdersNotification = _this.noOrdersNotification = new DCM.HTMLNoItemsNotificationElement(),
	col1 = _table.addColumnHeading(DCM.Resources.getResource("MarketLabel")),
	col2 = _table.addColumnHeading(DCM.Resources.getResource("SizeLabel")),
	col3 = _table.addColumnHeading(DCM.Resources.getResource("LevelLabel")),
	col4 = _table.addColumnHeading(DCM.Resources.getResource("MarketPriceLabel")),
	col5 = _table.addColumnHeading(DCM.Resources.getResource("TypeLabel")),
	col6 = _table.addColumnHeading(DCM.Resources.getResource("StopLabel")),
	col8 = _table.addColumnHeading(DCM.Resources.getResource("LimitLabel")),
	col9 = _table.addColumnHeading(DCM.Resources.getResource("GoodTillLabel")),
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
	tableWrap = this.tableWrap = new DCM.HTMLDivElement();
	
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
	
	this.showNoOrdersNotification();

});
DCM.HTMLOrdersModuleElement.prototype.addOrder = function(data) {
	
	var item = DCM.OrderManager.createOrder(data);
	_table.body.append(item);
	hideNoOrdersNotification();
	
	item.addEventHandler("DESTROY", function() {
		if(DCM.OrderManager.orders.length===0) {
			this.showNoOrdersNotification();
		};
	});
	
	return item;

};
DCM.HTMLOrdersModuleElement.prototype.showNoOrdersNotification = function() {
	
	this.noOrdersNotification.show();
	this.tableWrap.hide();
	
};
DCM.HTMLOrdersModuleElement.prototype.hideNoOrdersNotification = function() {
	
	this.noOrdersNotification.hide();
	this.tableWrap.show();
	
};