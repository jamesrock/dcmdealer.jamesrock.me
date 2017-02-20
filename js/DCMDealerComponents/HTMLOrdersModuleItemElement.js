DCM.HTMLOrdersModuleItemElement = ROCK.createClass(DCM.HTMLTRElement, function HTMLOrdersModuleItemElement(Order) {

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
	
});
DCM.HTMLOrdersModuleItemElement.prototype.setOrderType = function setOrderType(value) {
	
	if(!value) {
		return;
	};
	typeColumn.setText(value);

};
DCM.HTMLOrdersModuleItemElement.prototype.setGoodTill = function setGoodTill(value) {
	
	if(!value) {
		return;
	};
	expireColumn.setText(value);

};
DCM.HTMLOrdersModuleItemElement.prototype.setInstrumentName = function setInstrumentName(value, title) {
	
	marketColumn.setText(value);
	_this.setAttribute("title", title);

};
DCM.HTMLOrdersModuleItemElement.prototype.setSize = function setSize(value) {
	
	sizeValue.setText(value);
	sizeValue.setAttribute("data-direction", Order.direction);

};
DCM.HTMLOrdersModuleItemElement.prototype.setStop = function setStop(value) {
	
	if(!value) {
		return;
	};
	stopColumn.setText(value);

};
DCM.HTMLOrdersModuleItemElement.prototype.setLimit = function setLimit(value) {
	
	if(!value) {
		return;
	};
	limitColumn.setText(value);

};
DCM.HTMLOrdersModuleItemElement.prototype.setEntryPrice = function setEntryPrice(value) {
	
	if(!value) {
		return;
	};
	priceColumn.setText(value);

};
DCM.HTMLOrdersModuleItemElement.prototype.setMarketPrice = function setMarketPrice(value, direction) {
	
	marketPriceColumn.setAttribute("data-value-direction", "NONE");
	marketPriceColumn.setAttribute("data-value-direction", direction);
	marketPriceColumn.setText(value);

};
DCM.HTMLOrdersModuleItemElement.prototype.destroy = function destroy() {
	
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
	
};
DCM.HTMLOrdersModuleItemElement.prototype.editOrder = function editOrder() {
	
	DCM.OrderManager.authorEditOrder(Order);

};