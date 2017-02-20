DCM.HTMLPositionsModuleItemElement = ROCK.createClass(DCM.HTMLTRElement, function HTMLPositionsModuleItemElement(Position) {
	
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
	
});