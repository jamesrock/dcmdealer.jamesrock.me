DCM.Instrument = ROCK.createClass(DCM.EventDispatcher, function Instrument(data) {

	var
	_this = this,
	data = _this.data = data,
	lightstreamerHandler = function lightstreamerHandler() {
		this.onItemUpdate = function(data) {
		
			if(!debugLogged) {
				//DCM.log("onItemUpdate[" + _this.getName() + "] " + data.getValue("senti_last") + " " + data.getValue("price_high") + " " + data.getValue("price_low"));
				debugLogged = true;
			};
			
			_this.setSellPrice(processPrice(data.getValue("price_bid")));
			_this.setBuyPrice(processPrice(data.getValue("price_ask")));
			_this.setPriceHigh(processPrice(data.getValue("price_high")));
			_this.setPriceLow(processPrice(data.getValue("price_low")));
			_this.setSentiment(data.getValue("senti_last"));
			_this.setSentimentChange(data.getValue("senti_change_daily"));
			_this.setStatus(data.getValue("status"));
			_this.setSentimentHigh(data.getValue("senti_high"));
			_this.setSentimentLow(data.getValue("senti_low"));
			_this.setUpdateTime(data.getValue("time"));
			
			_this.setPriceChange(((_this.getSellPrice(true)+_this.getBuyPrice(true))/2)-_this.openPrice);
			
			// should probably change this as it seems to only be used for setting updated time
			_this.dispatchEventHandler("PRICE_CHANGE");
			
		};
	},
	setSubscribed = function setSubscribed(value) {
		_this.subscribed = value;
	},
	processPrice = _this.processPrice = function processPrice(value) {
		if(!value) {
			return value;
		};
		var _return = (value*_this.priceMultiplier).toFixed(_this.decimalPlaces);
		return _return;
	},
	debugLogged = false;
	
	this.setDecimalPlaces = function setDecimalPlaces(value) {
		this.decimalPlaces = value;
	};
	
	this.setOpenPrice = function setOpenPrice(value) {
		// price at the beginnning of the day - perhaps should be renamed
		this.openPrice = value;
	};
	
	this.setPriceMultiplier = function setPriceMultiplier(value) {
		this.priceMultiplier = value;
	};
	
	this.getSentiment = function getSentiment() {
		return this.sentiment;
	};
	
	this.setSentiment = function setSentiment(value) {
	
		//DCM.log("Instrument[" + _this.getName() + "].setSentiment(" + value + ")");
	
		if(!value) {
			return;
		}
		else {
			value = Number(value).toFixed(2);
			if(value===_this.sentiment) {
				return;
			};
		};
		
		var 
		changeDirection = DCM.getChangeDirectionName(value, _this.sentiment);
		
		_this.sentiment = value;
		
		_this.dispatchEventHandler("SENTIMENT_CHANGE", {
			direction: changeDirection
		});
		
	};
	
	this.getSellPrice = function getSellPrice(asNumber) {
		var 
		_return = _this.sellPrice;
		if(asNumber) {
			_return = Number(_return);
		};
		return _return;
	};
	
	this.setSellPrice = function setSellPrice(value) {
	
		if(!value||value===_this.sellPrice) {
			return;
		};
		
		var 
		changeDirection = DCM.getChangeDirectionName(value, _this.sellPrice);
		
		_this.sellPrice = value;
		
		_this.dispatchEventHandler("SELL_PRICE_CHANGE", {
			direction: changeDirection
		});
		
	};
	
	this.getBuyPrice = function getBuyPrice(asNumber) {
		var 
		_return = _this.buyPrice;
		if(asNumber) {
			_return = Number(_return);
		};
		return _return;
	};
	
	this.setBuyPrice = function setBuyPrice(value) {
	
		if(!value||value===_this.buyPrice) {
			return;
		};
		
		var 
		changeDirection = DCM.getChangeDirectionName(value, _this.buyPrice);
		
		_this.buyPrice = value;
		
		_this.dispatchEventHandler("BUY_PRICE_CHANGE", {
			direction: changeDirection
		});
		
	};
	
	this.getPriceChange = function getPriceChange(asNumber) {
		var _return = _this.priceChange;
		if(asNumber) {
			_return = Number(_return);
		}
		else if(_return>0) {
			return ("+" + _return);
		};
		return _return;
	};
	
	this.setPriceChange = function setPriceChange(value) {
		if(!value) {
			return;
		}
		else {
			value = Number(value).toFixed(_this.decimalPlaces);
			if(value===_this.priceChange) {
				return;
			};
		};
		_this.priceChange = value;
		_this.dispatchEventHandler("PRICECHANGE_CHANGE");
	};
	
	this.getPriceLow = function getPriceLow() {
		return _this.priceLow;
	};
	
	this.setPriceLow = function setPriceLow(value) {
		if(!value) {
			return;
		}
		else {
			if(value===_this.priceLow) {
				return;
			};
		};
		_this.priceLow = value;
		_this.dispatchEventHandler("LOW_PRICE_CHANGE");
	};
	
	this.getPriceHigh = function getPriceHigh() {
		return _this.priceHigh;
	};
	
	this.setPriceHigh = function setPriceHigh(value) {
		if(!value) {
			return;
		}
		else {
			//value = Number(value).toFixed(_this.decimalPlaces);
			if(value===_this.priceHigh) {
				return;
			};
		};
		_this.priceHigh = value;
		_this.dispatchEventHandler("HIGH_PRICE_CHANGE");
	};
	
	this.getSentimentChange = function getSentimentChange() {
		return _this.sentimentChange;
	};
	
	this.setSentimentChange = function setSentimentChange(value) {
		if(!value||value===_this.sentimentChange) {
			return;
		};
		_this.sentimentChange = value;
		_this.dispatchEventHandler("SENTIMENTCHANGE_CHANGE");
	};
	
	this.getSentimentHigh = function getSentimentHigh() {
		return _this.sentimentHigh;
	};
	
	this.setSentimentHigh = function setSentimentHigh(value) {
		if(!value||value===_this.sentimentHigh) {
			return;
		};
		_this.sentimentHigh = value;
		_this.dispatchEventHandler("SENTIMENT_HIGH_CHANGE");
	};
	
	this.getSentimentLow = function getSentimentLow() {
		return _this.sentimentLow;
	};
	
	this.setSentimentLow = function setSentimentLow(value) {
		if(!value||value===_this.sentimentLow) {
			return;
		};
		_this.sentimentLow = value;
		_this.dispatchEventHandler("SENTIMENT_LOW_CHANGE");
	};
	
	this.getTicker = function getTicker() {
		
		var 
		_return = _this.ticker;
		
		return _return;
		
	};
	
	this.setTicker = function setTicker(value) {
		if(!value) {
			return;
		};
		_this.ticker = value;
	};
	
	this.getName = function getName() {
		
		var 
		_return = _this.name,
		expiryDate = this.getExpiryDate();
		
		if(expiryDate) {
			_return += (" [" + expiryDate + "]");
		};
		
		return _return;
		
	};
	
	this.setName = function setName(value) {
		if(!value) {
			return;
		};
		_this.name = value;
	};
	
	this.setCategory = function setCategory(value) {
		if(!value) {
			return;
		};
		_this.category = value;
	};
	
	this.getStatus = function getStatus() {
		return _this.status;
	};
	
	this.getStatusName = function getStatusName() {
		var _return = "ACTIVE";
		if(_this.status!==3) {
			_return = "INACTIVE";
		};
		return _return;
	};
	
	this.setStatus = function setStatus(value) {
		if(DCM.isUndefinedOrNull(value)||value===_this.status) {
			return;
		};
		_this.status = value;
		_this.dispatchEventHandler("STATUS_CHANGE");
	};
	
	this.setDelayed = function setDelayed(value) {
		_this.delayed = value;
	};
	
	this.setCurrency = function setCurrency(value) {
		_this.currency = value;
	};
	
	this.setId = function setId(value) {
		if(!value) {
			return;
		};
		_this.id = value;
	};
	
	this.setMinTrailingStop = function setMinTrailingStop(value) {
		if(!value) {
			return;
		};
		_this.minTrailingStop = value;
	};
	
	this.setMinGuaranteedStop = function setMinGuaranteedStop(value) {
		if(!value) {
			return;
		};
		_this.minGuaranteedStop = value;
	};
	
	this.getExpiryDate = function getExpiryDate() {
		var _return = _this.expireDate;
		return _return;
	};
	
	this.setExpiryDate = function setExpiryDate(value) {
		if(!value) {
			return;
		};
		_this.expireDate = value;
	};
	
	this.setSharePrice = function setSharePrice(value) {
		if(!value) {
			return;
		};
		_this.sharePrice = value;
	};
	
	this.setContractMultiplier = function setContractMultiplier(value) {
		if(!value) {
			return;
		};
		_this.contractMultiplier = value;
	};
	
	this.setSlippagePerContract = function setSlippagePerContract(value) {
		if(!value) {
			return;
		};
		_this.slippagePerContract = value;
	};
	
	this.setPipSize = function setPipSize(value) {
		if(!value) {
			return;
		};
		_this.pipSize = value;
	};
	
	this.setPipValue = function setPipValue(value) {
		if(!value) {
			return;
		};
		_this.pipValue = value;
	};
	
	this.setMinSize = function setMinSize(value) {
		this.minSize = value;
	};
	
	this.setMinStop = function setMinStop(value) {
		this.minStop = value;
	};
	
	this.setMinLimit = function setMinLimit(value) {
		// not used but probably should be...
		this.minLimit = value;
	};
	
	this.setUpdateTime = function setUpdateTime(value) {
		if(!value) {
			return;
		};
		this.updateTime = value;
	};
	
	this.setMinPointIncrement = function setMinPointIncrement(value) {
		this.minPointIncrement = value;
	};
	
	this.subscribe = function subscribe() {
	
		if(_this.subscribed) {
			return;
		};
		
		DCM.log("Instrument[" + _this.id + "].subscribe()");
		
		var stockSubscription = new Lightstreamer.Subscription("MERGE", ["item" + _this.id], ["price_bid", "price_ask", "time", "senti_last", "senti_change_daily", "price_high", "price_low", "status", "senti_high", "senti_low"]);
		stockSubscription.addListener(new lightstreamerHandler());
		stockSubscription.setDataAdapter("dcm_prices");
		stockSubscription.setRequestedSnapshot("yes");
		DCM.sharingClient.subscribe(stockSubscription);
		
		setSubscribed(true);
		
	};
	
	this.addAlert = function addAlert() {
		
		DCM.AlertManager.createAlertFromInstrument(this);
		
	};
	
	this.addNote = function addNote() {
		
		DCM.NoteManager.createNoteFromInstrument(this);
		
	};
	
	this.openChart = function openChart() {
		
		var chartModule = new DCM.HTMLChartModuleElement(this.id);
		chartModule.open();
		chartModule.undock();
		
		return chartModule;
		
	};
	
	this.openTicket = function openTicket() {
		
		var ticket = DCM.TicketManager.createTicket({
			securityID: this.id
		});
		
		ticket.undock();
		
		if(this.getStatusName()==="INACTIVE") {
			
			ticket.viewTabs.setValue("ORDER");
			ticket.tradeTab.disable();
			ticket.wizardTab.disable();
		
		};
		
		return ticket;
		
	};
	
	this.getDisplayText = function getDisplayText() {
		
		var 
		_return = (this.getTicker() + " - " + this.getName());
		
		return _return;
		
	};
	
	this.getDisplayTextAsHTML = function getDisplayTextAsHTML() {
	
		var 
		_return = ("<span data-role=\"ticker\">" + this.getTicker() + "</span><span data-role=\"market-name\"> - " + this.getName() + "</span>");
		
		return _return;
	
	};
	
	setSubscribed(false);
	
	if(data.category) {
		this.setCategory(data.category);
	}
	else {
		this.setCategory("NONE");
	};
	
	this.setDecimalPlaces(data.numDec);
	this.setCurrency(data.currency);
	this.setName(data.securityDesc);
	this.setTicker(data.symbol);
	this.setId(data.securityID);
	this.setMinSize(data.minSize);
	this.setSharePrice(data.contractSizePerPip);
	this.setMinGuaranteedStop(data.minGStopDistance);
	this.setExpiryDate(data.maturityMonthYear);
	this.setMinStop(data.minStopDistance);
	this.setMinTrailingStop(data.minTrail);
	this.setContractMultiplier(data.contractMultiplier);
	this.setSlippagePerContract(data.slippagePerContract);
	this.setPipSize(data.pipSize);
	this.setPipValue(data.pipValue);
	this.setDelayed(data.isDelayed);
	this.setMinPointIncrement(data.tickIncrement);
	this.setPriceMultiplier(data.priceMultipler);
	// perhaps use process price
	this.setOpenPrice(data.openPrice*_this.priceMultiplier);
	
	//setStatus(data.status);
	this.setStatus(3);

});