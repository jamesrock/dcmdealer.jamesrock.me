DCM.HTMLWatchlistModuleItemElement = ROCK.createClass(DCM.HTMLTRElement, function HTMLWatchlistModuleItemElement(data, watchlist) {

	var 
	_this = this,
	data = _this.data = data,
	marketCol,
	sellCol,
	buyCol,
	changeCol,
	updatedCol,
	lowCol,
	highCol,
	sentimentCol,
	sentimentChangeCol,
	setStatus = _this.setStatus = function setStatus(value) {
		_this.setAttribute("data-status", value);
	},
	setLowPrice = _this.setLowPrice = function setLowPrice(value) {
		if(!value) {
			return;
		};
		lowCol.setText(value);
	},
	setHighPrice = _this.setHighPrice = function setHighPrice(value) {
		if(!value) {
			return;
		};
		highCol.setText(value);
	},
	setPriceChange = _this.setPriceChange = function setPriceChange(displayValue, numericValue) {
		//DCM.log("setPriceChange(" + displayValue + ")", typeof(displayValue));
		if(!displayValue) {
			return;
		};
		changeCol.setText(displayValue);
		var directionName;
		if(numericValue>0) {
			directionName = "POSITIVE";
		}
		else if(numericValue<0) {
			directionName = "NEGATIVE";
		}
		else {
			directionName = "NONE";
		};
		changeCol.setAttribute("data-value-direction-name", directionName);
		
	},
	setSellPrice = _this.setSellPrice = function setSellPrice(value, direction) {
		if(!value) {
			return;
		};
		sellCol.setAttribute("data-value-direction", "NONE");
		sellCol.setAttribute("data-value-direction", direction);
		sellCol.setText(value);
	},
	setBuyPrice = _this.setBuyPrice = function setBuyPrice(value, direction) {
		if(!value) {
			return;
		};
		buyCol.setAttribute("data-value-direction", "NONE");
		buyCol.setAttribute("data-value-direction", direction);
		buyCol.setText(value);
	},
	setUpdated = _this.setUpdated = function setUpdated(value) {
		if(!value) {
			return;
		};
		updatedCol.setText(value);
	},
	setVisualName = _this.setVisualName = function setVisualName(value, title) {
		marketCol.setText(value);
		_this.setAttribute("title", title);
	},
	setSentiment = _this.setSentiment = function setSentiment(value, direction) {
		//DCM.log("HTMLWatchlistModuleItemElement.setSentiment(" + value + ")");
		if(!value) {
			return;
		};
		sentimentCol.setAttribute("data-value-direction", "NONE");
		sentimentCol.setAttribute("data-value-direction", direction);
		sentimentCol.setText(value);
	},
	setSentimentChange = function setSentimentChange(value) {
		if(!value) {
			return;
		};
		sentimentChangeCol.setText(value);
	},
	disableSentiment = _this.disableSentiment = function disableSentiment() {
		sentimentCol.setAttribute("data-sentiment-enabled", false);
		watchlist.sentimentCol.setAttribute("data-sentiment-enabled", false);
		sentimentCol.setText("00.00");
	},
	destroy = _this.destroy = function destroy() {
		
		_this.remove();
		_this.dispatchEventHandler("DESTROY");
		
		instrument.removeEventHandler("PRICE_CHANGE", priceChangeHandler);
		instrument.removeEventHandler("SELL_PRICE_CHANGE", sellPriceChangeHandler);
		instrument.removeEventHandler("BUY_PRICE_CHANGE", buyPriceChangeHandler);
		instrument.removeEventHandler("HIGH_PRICE_CHANGE", highPriceChangeHandler);
		instrument.removeEventHandler("LOW_PRICE_CHANGE", lowPriceChangeHandler);
		instrument.removeEventHandler("PRICECHANGE_CHANGE", pricechangeChangeHandler);
		instrument.removeEventHandler("STATUS_CHANGE", statusChangeHandler);
		instrument.removeEventHandler("SENTIMENT_CHANGE", sentimentChangeHandler);
		instrument.removeEventHandler("SENTIMENTCHANGE_CHANGE", sentimentChangeChangeHandler);
		
	},
	watchlist = _this.watchlist = watchlist,
	instrument = _this.instrument = DCM.InstrumentManager.getInstrumentById(data.securityID),
	priceChangeHandler = function priceChangeHandler() {
		setUpdated(instrument.updateTime);
	},
	sellPriceChangeHandler = function sellPriceChangeHandler(e) {
		setSellPrice(instrument.getSellPrice(), e.direction);
	},
	buyPriceChangeHandler = function buyPriceChangeHandler(e) {
		setBuyPrice(instrument.getBuyPrice(), e.direction);
	},
	highPriceChangeHandler = function highPriceChangeHandler() {
		setHighPrice(instrument.getPriceHigh());
	},
	lowPriceChangeHandler = function lowPriceChangeHandler() {
		setLowPrice(instrument.getPriceLow());
	},
	sentimentChangeHandler = function sentimentChangeHandler(e) {
		setSentiment(instrument.getSentiment(), e.direction);
	},
	pricechangeChangeHandler = function pricechangeChangeHandler() {
		setPriceChange(instrument.getPriceChange(), instrument.getPriceChange(true));
	},
	sentimentChangeChangeHandler = function sentimentChangeChangeHandler() {
		setSentimentChange(instrument.getSentimentChange());
	},
	statusChangeHandler = function statusChangeHandler() {
		setStatus(instrument.getStatusName());
	};
	
	marketCol = this.addColumn("-");
	sellCol = this.addColumn("-");
	buyCol = this.addColumn("-");
	changeCol = this.addColumn("-");
	
	sentimentCol = this.addColumn("-");
	sentimentChangeCol = this.addColumn("-");
	
	lowCol = this.addColumn("-");
	highCol = this.addColumn("-");
	updatedCol = this.addColumn("-");
	
	if(!instrument) {
	
		throw("instrument is undefined");
		
	};
	
	instrument.subscribe();
	
	instrument.addEventHandler("PRICE_CHANGE", priceChangeHandler).dispatch();
	instrument.addEventHandler("SELL_PRICE_CHANGE", sellPriceChangeHandler).dispatch({
		direction: "NO_DIRECTION"
	});
	instrument.addEventHandler("BUY_PRICE_CHANGE", buyPriceChangeHandler).dispatch({
		direction: "NO_DIRECTION"
	});
	instrument.addEventHandler("HIGH_PRICE_CHANGE", highPriceChangeHandler).dispatch();
	instrument.addEventHandler("LOW_PRICE_CHANGE", lowPriceChangeHandler).dispatch();
	instrument.addEventHandler("PRICECHANGE_CHANGE", pricechangeChangeHandler).dispatch();
	instrument.addEventHandler("STATUS_CHANGE", statusChangeHandler).dispatch();
	
	if(DCM.AccountManager.sentimentEnabled) {
	
		instrument.addEventHandler("SENTIMENT_CHANGE", sentimentChangeHandler).dispatch({
			direction: "NO_DIRECTION"
		});
		
		instrument.addEventHandler("SENTIMENTCHANGE_CHANGE", sentimentChangeChangeHandler).dispatch();
	
	}
	else {
		disableSentiment();
	};
	
	_this.addEventListener(DCM.Event.contextmenu, function(e) {
		
		var _contextMenu = new DCM.HTMLWatchlistModuleItemContextMenuElement(_this);
		_contextMenu.setX(e.clientX);
		_contextMenu.setY(e.clientY);
		
		return false;
	
	});
	
	_this.addEventListener(DCM.Event.doubleclick, function(e) {
	
		instrument.openTicket();
	
		return false;
	
	});
	
	setVisualName(instrument.getDisplayTextAsHTML(), instrument.getDisplayText());
	
});