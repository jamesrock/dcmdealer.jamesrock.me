DCM.Position = ROCK.createClass(DCM.EventDispatcher, function Position(data) {

	// some very strange stuff going on in here - to investigate

	var
	_this = this,
	data = _this.data = data,
	setInstrument = function setInstrument(id) {
		var instrument = DCM.InstrumentManager.getInstrumentById(id);
		if(!instrument) {
			throw("INSTRUMENT [" + id + "] NOT FOUND");
		};
		_this.instrument = instrument;
	},
	priceChangeHandler = function priceChangeHandler() {
	
		if(_this.direction==="BUY") {
			
			_this.setMarketPrice(_this.instrument.sellPrice);
			_this.setProfitAndLoss(pointsToCurrency((_this.marketPrice-_this.entryPrice), _this.size));
			
		}
		else if(_this.direction==="SELL") {
			
			_this.setMarketPrice(_this.instrument.buyPrice);
			_this.setProfitAndLoss(pointsToCurrency((_this.entryPrice-_this.marketPrice), _this.size));
			
		};
		
	},
	sellPriceChangeHandler = function sellPriceChangeHandler() {
		priceChangeHandler();
	},
	buyPriceChangeHandler = function buyPriceChangeHandler() {
		priceChangeHandler();
	},
	setConsideration = function setConsideration(value) {
		_this.consideration = value;
	},
	sharesToCurrency = _this.sharesToCurrency = function sharesToCurrency(value, asNumber) {
		
		if(value===undefined) {
			return;
		};
		
		var 
		_return = (value*_this.instrument.sharePrice).toFixed(2);
		if(asNumber) {
			_return = Number(_return);
		};
		
		return _return;
	
	},
	currencyToShares = function currencyToShares(value, asNumber) {
		
		if(!value) {
			return;
		};
		
		var 
		_return = (value/_this.instrument.sharePrice);
		if(asNumber) {
			_return = Number(_return);
		};
		
		return _return;
	
	},
	pointsToCurrency = _this.pointsToCurrency = function pointsToCurrency(value, size) {
		
		if(value===undefined) {
			return;
		};
		
		var 
		_return;
		
		_return = (sharesToCurrency(value, true)*size).toFixed(2);
		
		return _return;
	
	},
	currencyToPoints = function currencyToPoints(value, size) {
	
		if(!value) {
			return;
		};
		
		var 
		_return;
		
		_return = roundPointValue(currencyToShares(value)/size);
		
		return _return;
	
	},
	roundPointValue = function roundPointValue(value) {
	
		var
		minPointIncrement = _this.instrument.minPointIncrement,
		_return = (Math.ceil(value/minPointIncrement)*minPointIncrement);
		return _return;
	
	};
	
	this.setStatus = function setStatus(value) {
		// NEW, PENDING, OPEN
		_this.status = value;
	};
	
	this.getStatus = function getStatus() {
		return _this.status;
	};
	
	this.getExpireTime = function getExpireTime() {
		var _return = _this.expireTime;
		return _return;
	};
	
	this.setExpireTime = function setExpireTime(value) {
		_this.expireTime = value;
		_this.dispatchEventHandler("EXPIRE_CHANGE");
	};
	
	this.getType = function getType() {
		return _this.type;
	};
	
	this.setType = function setType(value) {
		if(value===_this.type) {
			return;
		};
		_this.type = value;
		_this.dispatchEventHandler("TYPE_CHANGE");
	};
	
	this.getId = function getId() {
		return _this.id;
	};
	
	this.setId = function setId(value) {
		_this.id = value;
	};
	
	this.getSize = function getSize() {
	
		var 
		_return = _this.size;
		
		return _return;
		
	};
	
	this.getSizeAsHTML = function getSizeAsHTML() {
		
		return ("<span data-direction=\"" + _this.direction + "\"><span data-role=\"direction-indecator\">" + (_this.direction==="SELL"?"-":"+") + "</span>" + _this.size + "</span>");
		
	};
	
	this.setSize = function setSize(value) {
		if(value===_this.size) {
			return;
		};
		_this.size = value;
		_this.dispatchEventHandler("SIZE_CHANGE");
	};
	
	this.getStop = function getStop(asNumber) {
		var _return = _this.stop;
		if(_return&&asNumber) {
			_return = Number(_return);
		};
		return _return;
	};
	
	this.setStop = function setStop(value) {
		if(value===_this.stop) {
			return;
		};
		_this.stop = value;
		_this.dispatchEventHandler("STOP_CHANGE");
	};
	
	this.getStopPrice = function getStopPrice() {
		var _return;
		if(DCM.isNull(_this.stop)) {
			return null;
		};
		if(_this.direction==="SELL") {
			_return = (this.getEntryPrice(true) + this.getStop(true));
		}
		else if(_this.direction==="BUY") {
			_return = (this.getEntryPrice(true) - this.getStop(true));
		};
		return _return.toFixed(_this.instrument.decimalPlaces);
	};
	
	this.setStopPrice = function setStopPrice(value) {
		_this.stopPrice = value;
	};
	
	this.getStopAsCurrency = function getStopAsCurrency(asNumber) {
		var _return = pointsToCurrency(_this.stop, _this.size);
		if(asNumber) {
			Number(_return);
		};
		return _return;
	};
	
	this.setStopAsCurrency = function setStopAsCurrency(value) {
		this.setStop(currencyToPoints(value, _this.size));
	};
	
	this.getLimit = function getLimit(asNumber) {
		var _return = _this.limit;
		if(_return&&asNumber) {
			_return = Number(_return);
		};
		return _return;
	};
	
	this.setLimit = function setLimit(value) {
		if(value===_this.limit) {
			return;
		};
		_this.limit = value;
		_this.dispatchEventHandler("LIMIT_CHANGE");
	};
	
	this.getLimitAsCurrency = function getLimitAsCurrency(asNumber) {
		var _return = pointsToCurrency(_this.limit, _this.size);
		if(asNumber) {
			Number(_return);
		};
		return _return;
	};
	
	this.setLimitAsCurrency = function setLimitAsCurrency(value) {
		this.setLimit(currencyToPoints(value, _this.size));
	};
	
	this.getLimitPrice = function getLimitPrice() {
		var _return;
		if(DCM.isNull(_this.limit)) {
			return null;
		};
		if(_this.direction==="SELL") {
			_return = (this.getEntryPrice(true) - this.getLimit(true));
		}
		else if(_this.direction==="BUY") {
			_return = (this.getEntryPrice(true) + this.getLimit(true));
		};
		return _return.toFixed(_this.instrument.decimalPlaces);
	};
	
	this.setLimitPrice = function setLimitPrice(value) {
		_this.limitPrice = value;
	};
	
	this.getDirection = function getDirection() {
		
		var 
		_return = _this.direction;
		
		return _return;
		
	};
	
	this.setDirection = function setDirection(value) {
		if(value==="1") {
			value = "BUY";
		}
		else if(value==="2") {
			value = "SELL";
		};
		_this.direction = value;
	};
	
	this.getMarketPrice = function getMarketPrice() {
		return _this.marketPrice;
	};
	
	this.setMarketPrice = function setMarketPrice(value) {
	
		if(!value||value===_this.marketPrice) {
			return;
		};
		
		var 
		changeDirection = DCM.getChangeDirectionName(value, _this.marketPrice);
		
		_this.marketPrice = value;
		
		_this.dispatchEventHandler("MARKET_PRICE_CHANGE", {
			direction: changeDirection
		});
	
	};
	
	this.getEntryPrice = function getEntryPrice(asNumber) {
		var _return = _this.entryPrice;
		if(_return&&asNumber) {
			_return = Number(_return);
		};
		return _return;
	};
	
	this.setEntryPrice = function setEntryPrice(value) {
		if(value===_this.entryPrice) {
			return;
		};
		_this.entryPrice = value;
		_this.dispatchEventHandler("ENTRY_PRICE_CHANGE");
	};
	
	this.getProfitAndLoss = function getProfitAndLoss(asNumber) {
		
		var 
		_return = _this.profitAndLoss,
		isDefined = !DCM.isUndefined(_return);
		
		if(isDefined&&asNumber) {
			_return = Number(_return);
		}
		else if(isDefined) {
			_return = (_return + " " + _this.instrument.currency);
		}
		else {
			_return = null;
		};
		
		return _return;
		
	};
	
	this.getProfitAndLossAsHTML = function getProfitAndLossAsHTML() {
		
		var 
		directionName,
		numericValue = this.getProfitAndLoss(true),
		displayValue = this.getProfitAndLoss(),
		_return;
		
		if(DCM.isNull(numericValue)) {
			return;
		};
		
		if(numericValue>0) {
			directionName = "POSITIVE";
			_return = ("<span data-value-direction-name=\"" + directionName + "\">+" + displayValue + "</span>");
		}
		else if(numericValue<0) {
			directionName = "NEGATIVE";
			_return = ("<span data-value-direction-name=\"" + directionName + "\">" + displayValue + "</span>");
		}
		else {
			directionName = "NONE";
			_return = ("<span data-value-direction-name=\"" + directionName + "\">" + displayValue + "</span>");
		};
		
		return _return;
		
	};
	
	this.setProfitAndLoss = function setProfitAndLoss(value) {
		
		if(!value||value===_this.profitAndLoss) {
			return;
		};
		
		var 
		changeDirection = DCM.getChangeDirectionName(value, _this.profitAndLoss),
		eventName = ("PROFITLOSS_" + changeDirection);
		
		_this.profitAndLoss = value;
		
		_this.dispatchEventHandler(eventName);
		_this.dispatchEventHandler("PROFITLOSS_CHANGE");
	
	};
	
	this.OpenService = function OpenService() {
	
		var 
		_OpenService = this;
	
		if(_this.entryPrice) {
			
			_OpenService._super = DCM.OpenOrderService;
			_OpenService._super();
			
			_OpenService.setParam("price", _this.entryPrice);
			_OpenService.setParam("type", _this.type);
			
			if(_this.getExpireTime()) {
				_OpenService.setParam("gtd", _this.getExpireTime());
			};
			
		}
		else {
			
			_OpenService._super = DCM.OpenPositionService;
			_OpenService._super();
			
			_OpenService.setParam("forceOpen", _this.forceOpen);
			
		};
		
		if(_this.stop) {
			_OpenService.setParam("stopPrice", this.getStop());
		};
		
		if(_this.limit) {
			_OpenService.setParam("limitPrice", this.getLimit());
		};			
		
		_OpenService.setParam("securityId", _this.instrument.id);
		_OpenService.setParam("currency", _this.instrument.currency);
		_OpenService.setParam("size", _this.size);
		_OpenService.setParam("side", _this.direction);
		
	};
	
	this.EditService = function EditService() {
		
		var 
		_EditService = this;
		
		if(_this.status==="PENDING") {
			
			_EditService._super = DCM.EditOrderService;
			_EditService._super();
			
			_EditService.setParam("openOrderId", _this.id);
			_EditService.setParam("price", _this.entryPrice);
			
			if(_this.getExpireTime()) {
				_EditService.setParam("gtd", _this.getExpireTime());
			};
			
		}
		else if(_this.status==="OPEN") {
		
			_EditService._super = DCM.EditPositionService;
			_EditService._super();
			
			_EditService.setParam("positionId", _this.id);
		
		};
		
		_EditService.setParam("size", _this.size);
		
		if(_this.stop) {
			_EditService.setParam("stopPrice", this.getStop());
		};
		
		if(_this.limit) {
			_EditService.setParam("limitPrice", this.getLimit());
		};
		
	};
	
	this.CloseService = function CloseService() {
	
		var 
		_CloseService = this;
		
		if(_this.status==="PENDING") {
			
			_CloseService._super = DCM.CloseOrderService;
			
			_CloseService._super();
			
			_CloseService.setParam("orderId", _this.id);
			
		}
		else if(_this.status==="OPEN") {
			
			_CloseService._super = DCM.ClosePositionService;
			
			_CloseService._super();
		
			_CloseService.setParam("positionId", _this.id);
			_CloseService.setParam("side", _this.direction);
			
			if(_this.stop) {
				_CloseService.setParam("stopPrice", _this.stop);
			};
			
			if(_this.limit) {
				_CloseService.setParam("limitPrice", _this.limit);
			};
			
			if(_this.trailingStop) {
				_CloseService.setParam("tstop", _this.trailingStop);
			};
			
		};
	
	};
	
	this.setForceOpen = function setForceOpen(value) {
		_this.forceOpen = value;
	};
	
	this.getMinStop = function getMinStop() {
		
		var 
		_return = _this.instrument.minStop;
		
		if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
		
			_return = pointsToCurrency(_return, _this.size||1);
			
		};
		
		return _return;
		
	};
	
	this.getMinLimit = function getMinLimit() {
		
		var 
		_return = _this.instrument.minPointIncrement;
		
		if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
		
			_return = pointsToCurrency(_return, _this.size||1);
			
		};
		
		return _return;
		
	};
	
	this.getMinTrailingStop = function getMinTrailingStop() {
		
		var 
		_return = _this.instrument.minTrailingStop;
		
		if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
		
			_return = pointsToCurrency(_return, _this.size||1);
			
		};
		
		return _return;
		
	};
	
	this.getStopStep = function getStopStep() {
		
		var 
		_return = _this.instrument.minPointIncrement;
		
		if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
		
			_return = pointsToCurrency(_return, 1);
			
		};
		
		return _return;
		
	};
	
	this.getTrailingStopStep = function getTrailingStopStep() {
		
		var 
		_return = _this.instrument.minPointIncrement;
		
		if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
		
			_return = pointsToCurrency(_return, 1);
			
		};
		
		return _return;
		
	};
	
	this.getLimitStep = function getLimitStep() {
		
		var 
		_return = _this.instrument.minPointIncrement;
		
		if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
		
			_return = pointsToCurrency(_return, 1);
			
		};
		
		return _return;
		
	};
	
	this.getPriceStep = function getPriceStep() {
	
		// probably don't need this - could call instrument directly
		
		var 
		_return = _this.instrument.minPointIncrement;
		
		return _return;
		
	};
	
	this.getMinSize = function getMinSize() {
	
		// probably don't need this - could call instrument directly
		
		var 
		_return = _this.instrument.minSize;
		
		return _return;
		
	};
	
	this.getSellPrice = function getSellPrice() {
	
		// probably don't need this - could call instrument directly
	
		var 
		_return = _this.instrument.sellPrice;
		
		return _return;
		
	};
	
	this.getBuyPrice = function getBuyPrice() {
	
		// probably don't need this - could call instrument directly
		
		var 
		_return = _this.instrument.buyPrice;
		
		return _return;
		
	};
	
	this.getPotentialProfit = function getPotentialProfit() {
		
		return (sharesToCurrency(_this.size) + " " + _this.instrument.currency);
		
	};
	
	this.clear = function clear() {
		
		this.setStop(null);
		this.setLimit(null);
		this.setEntryPrice(null);
		this.setSize(null);
		this.setForceOpen(null);
		
	};
	
	this.close = function close() {
		
		if(_this.status==="PENDING") {
			DCM.OrderManager.orders.splice(DCM.getIndexOf(DCM.OrderManager.orders, _this), 1);
		}
		else if(_this.status==="OPEN") {
			DCM.PositionManager.positions.splice(DCM.getIndexOf(DCM.PositionManager.positions, _this), 1);
		};
		
		_this.dispatchEventHandler("CLOSE");
		
	};
	
	this.modify = function modify(_data) {
		
		// temp fixed for dodgey item comming back which doesn't exist in instrument library
		if(DCM.isUndefined(_this.instrument)) {
			return;
		};
		
		//DCM.log("Position.modify()", this, _this);
		
		data = _this.data = _data;
		
		if(_data.size) {
			this.setSize(_data.size);
		};
		
		if(_data.orderQuantity) {
			this.setSize(_data.orderQuantity);
		};
		
		if(_data.price) {
			this.setEntryPrice(_this.instrument.processPrice(_data.price));
		};
			
		if(_data.side) {
			this.setDirection(_data.side);
		};
		
		if(_data.isGtc) {
			this.setExpireTime("Cancelled");
		};
		
		if(_data.gtdDate) {
			this.setExpireTime(_data.gtdDate);
		};
		
		if(!DCM.isUndefined(_data.stopOffset)) {
			this.setStop(_data.stopOffset);
		};
		
		if(!DCM.isUndefined(_data.contingentStopOffset)) {
			this.setStop(_data.contingentStopOffset);
		};
		
		if(!DCM.isUndefined(_data.limitOffet)) {
			this.setLimit(_data.limitOffet);
		};
		
		if(!DCM.isUndefined(_data.contingentLimitOffset)) {
			this.setLimit(_data.contingentLimitOffset);
		};
		
		if(_data.orderType) {
			this.setType(_data.orderType);
		};
		
		if(_this.size&&_this.entryPrice) {
			setConsideration((_this.size*_this.entryPrice));
		};
		
	};
	
	//DCM.log("new Position()", _this);
	
	this.setStatus("NEW");
	this.clear();
	this.setForceOpen(false);
	
	if(data.id) {
		
		this.setId(data.id);
		
	};
	
	if(data.instrumentId) {
		
		setInstrument(data.instrumentId);
	
	}
	else if(data.securityID) {
		
		setInstrument(data.securityID);
	
	}
	else if(data.instrumentSecurityId) {
		
		setInstrument(data.instrumentSecurityId);
	
	};
	
	this.modify(data);
	
	if(data.orderType&&data.orderQuantity) {
		
		this.setStatus("PENDING");
	
	}
	else if(data.size) {
		
		this.setStatus("OPEN");
	
	};
	
	_this.instrument.subscribe();
	_this.instrument.addEventHandler("SELL_PRICE_CHANGE", sellPriceChangeHandler).dispatch();
	_this.instrument.addEventHandler("BUY_PRICE_CHANGE", buyPriceChangeHandler).dispatch();
	
});