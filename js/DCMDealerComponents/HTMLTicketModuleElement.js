DCM.HTMLTicketModuleElement = ROCK.createClass(function HTMLTicketModuleElement(data) {

	try {
		
		var
		_this = this,
		data = _this.data = data,
		MarketPosition = _this.MarketPosition = new DCM.Position(data),
		OrderPosition = _this.OrderPosition = new DCM.Position(data),
		TradePosition = _this.TradePosition = new DCM.Position(data),
		WizardPosition = _this.WizardPosition = new DCM.Position(data),
		sellButton = new DCM.HTMLTicketModuleSellButtonElement(),
		buyButton = new DCM.HTMLTicketModuleBuyButtonElement(),
		tradeSizeStepper = _this.tradeSizeStepper = new DCM.HTMLNumericStepperElement(),
		tradeSizeLabel = new DCM.HTMLDivElement(),
		tradePriceLabel = new DCM.HTMLDivElement(),
		tradeStopStepper = _this.tradeStopStepper = new DCM.HTMLNumericStepperElement(),
		tradeLimitStepper = _this.tradeLimitStepper = new DCM.HTMLNumericStepperElement(),
		tradeForm = new DCM.HTMLFormElement(),
		orderForm = new DCM.HTMLFormElement(),
		// TRADE
		tradeSizeField = tradeForm.addField(),
		stopsAndLimitsGroup = tradeForm.addGroup(),
		stopField = stopsAndLimitsGroup.addField(),
		stopFieldLabel = new DCM.HTMLSpanElement(),
		limitField = stopsAndLimitsGroup.addField(),
		limitFieldLabel = new DCM.HTMLSpanElement(),
		// ORDER
		orderSizeField = orderForm.addField(),
		orderPriceField = orderForm.addField(),
		orderLifetimeField = orderForm.addField(),
		orderStopsAndLimitsGroup = orderForm.addGroup(),
		orderStopField = orderStopsAndLimitsGroup.addField(),
		orderStopFieldLabel = new DCM.HTMLSpanElement(),
		orderLimitField = orderStopsAndLimitsGroup.addField(),
		orderLimitFieldLabel = new DCM.HTMLSpanElement(),
		orderSizeLabel = new DCM.HTMLDivElement(),
		orderSizeCurrencyLabel = new DCM.HTMLDivElement(),
		orderSizeStepper = _this.orderSizeStepper = new DCM.HTMLNumericStepperElement(),
		orderPriceLabel = new DCM.HTMLDivElement(),
		orderPriceTypeLabel = new DCM.HTMLDivElement(),
		orderPriceStepper = _this.orderPriceStepper = new DCM.HTMLNumericStepperElement(),
		orderLifetimeType = _this.orderLifetimeType = new DCM.HTMLRadioButtonGroupElement(),
		orderLifetimeTypeCancelledItem = orderLifetimeType.setItem(DCM.Resources.getResource("CancelledLabel"), "CANCELLED"),
		orderLifetimeTypeTimeItem = orderLifetimeType.setItem(DCM.Resources.getResource("TimeLabel"), "TIME"),
		orderLifetimeTypeLabel = new DCM.HTMLDivElement(),
		orderLifetimeTypeValue = new DCM.HTMLDivElement(),
		orderStopStepper = _this.orderStopStepper = new DCM.HTMLNumericStepperElement(),
		orderLimitStepper = _this.orderLimitStepper = new DCM.HTMLNumericStepperElement(),
		// WIZARD
		wizardStopStepper = new DCM.HTMLNumericStepperElement(),
		wizardLimitStepper = new DCM.HTMLNumericStepperElement(),
		wizardPriceStepper = new DCM.HTMLNumericStepperElement(),
		wizardSizeStepper = new DCM.HTMLNumericStepperElement(),
		instrumentTicker = _this.instrumentTicker = new DCM.HTMLHeadingElement(),
		instrumentName = _this.instrumentName = new DCM.HTMLHeadingElement(),
		ticketHead = new DCM.HTMLTicketModuleHeadElement(),
		buyAndSellButtons = new DCM.HTMLDivElement(),
		buyAndSellButtonsClear = new DCM.HTMLClearElement(),
		forceOpenCheckbox = new DCM.HTMLCheckboxElement(),
		dealTicketLeftPanel = new DCM.HTMLTicketModuleLeftPanelElement(),
		dealTicketRightPanel = new DCM.HTMLTicketModuleRightPanelElement(),
		sentiballButton = new DCM.HTMLSentiballGraphicButtonElement(),
		graphButton = new DCM.HTMLGraphGraphicButtonElement(),
		notesButton = new DCM.HTMLNotesGraphicButtonElement(),
		setSharePrice = function setSharePrice(value) {
			tradePriceLabel.setText(DCM.Resources.getResource("PriceLabel") + ": " + value);
			orderSizeCurrencyLabel.setText(DCM.Resources.getResource("PriceLabel") + ": " + value);
		},
		setTradeMinSize = function setTradeMinSize(value) {
			tradeSizeLabel.setText(DCM.Resources.getResource("QuantityLabel") + " [" + DCM.Resources.getResource("MinimumAbbrLabel") + " " + value + "]");
			tradeSizeStepper.setMin(value);
		},
		setOrderMinSize = function setOrderMinSize(value) {
			orderSizeLabel.setText(DCM.Resources.getResource("QuantityLabel") + " [" + DCM.Resources.getResource("MinimumAbbrLabel") + " " + value + "]"); 
			orderSizeStepper.setMin(value);
		},
		setWizardMinSize = function setWizardMinSize(value) {
			wizardSizeStepper.setMin(value);
		},
		setTradeMinStop = function setTradeMinStop(value) {
		
			tradeStopStepper.setMin(value);
			
			var valueType;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				valueType = MarketPosition.instrument.currency;
			}
			else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				valueType = "PTS.";
			};
			
			stopFieldLabel.setText(DCM.Resources.getResource("StopLabel") + " [" + DCM.Resources.getResource("MinimumAbbrLabel") + " " + value + " " + valueType + "]");
			
		},
		setOrderMinStop = function setOrderMinStop(value) {
			
			orderStopStepper.setMin(value);
			
			var valueType;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				valueType = MarketPosition.instrument.currency;
			}
			else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				valueType = "PTS.";
			};
			
			orderStopFieldLabel.setText(DCM.Resources.getResource("StopLabel") + " [" + DCM.Resources.getResource("MinimumAbbrLabel") + " " + value + " " + valueType + "]");
			
		},
		setWizardMinStop = function setWizardMinStop(value) {
			wizardStopStepper.setMin(value);
		},
		setTradeMinLimit = function setTradeMinLimit(value) {
		
			tradeLimitStepper.setMin(value);
			
			var valueType;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				valueType = MarketPosition.instrument.currency;
			}
			else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				valueType = "PTS.";
			};
			
			limitFieldLabel.setText(DCM.Resources.getResource("LimitLabel") + " [" + DCM.Resources.getResource("MinimumAbbrLabel") + " " + value + " " + valueType + "]");
			
		},
		setOrderMinLimit = function setOrderMinLimit(value) {
			
			orderLimitStepper.setMin(value);
			
			var valueType;
			
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				valueType = MarketPosition.instrument.currency;
			}
			else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				valueType = "PTS.";
			};
			
			orderLimitFieldLabel.setText(DCM.Resources.getResource("LimitLabel") + " [" + DCM.Resources.getResource("MinimumAbbrLabel") + " " + value + " " + valueType + "]");
			
		},
		setWizardMinLimit = function setWizardMinLimit(value) {
			wizardLimitStepper.setMin(value);
		},
		setSellPrice = _this.setSellPrice = function setSellPrice(value) {
			if(!value) {
				return;
			};
			sellButton.value.setText(value);
		},
		setBuyPrice = _this.setBuyPrice = function setBuyPrice(value) {
			if(!value) {
				return;
			};
			buyButton.value.setText(value);
		},
		setOrderStopStep = function setOrderStopStep(value) {
			orderStopStepper.setStep(value);
		},
		setWizardStopStep = function setWizardStopStep(value) {
			wizardStopStepper.setStep(value);
		},
		setTradeStopStep = function setTradeStopStep(value) {
			tradeStopStepper.setStep(value);
		},
		setOrderLimitStep = function setOrderLimitStep(value) {
			orderLimitStepper.setStep(value);
		},
		setWizardLimitStep = function setWizardLimitStep(value) {
			wizardLimitStepper.setStep(value);
		},
		setTradeLimitStep = function setTradeLimitStep(value) {
			tradeLimitStepper.setStep(value);
		},
		setOrderPriceStep = function setOrderPriceStep(value) {
			orderPriceStepper.setStep(value);
		},
		setWizardPriceStep = function setWizardPriceStep(value) {
			wizardPriceStepper.setStep(value);
		},
		setDefaultOrderPriceIncrement = function setDefaultOrderPriceIncrement(value) {
			orderPriceStepper.setDefaultIncrement(value);
		},
		setDefaultWizardPriceIncrement = function setDefaultWizardPriceIncrement(value) {
			wizardPriceStepper.setDefaultIncrement(value);
		},
		setDefaultOrderPriceDecrement = function setDefaultOrderPriceDecrement(value) {
			orderPriceStepper.setDefaultDecrement(value);
		},
		setDefaultWizardPriceDecrement = function setDefaultWizardPriceDecrement(value) {
			wizardPriceStepper.setDefaultDecrement(value);
		},
		setOrderMinPrice = function setOrderMinPrice(value) {
			orderPriceStepper.setMin(value);
		},
		setWizardMinPrice = function setWizardMinPrice(value) {
			wizardPriceStepper.setMin(value);
		},
		screenToDisplay,
		pendingScreen,
		// ORDER
		openOrderErrorHandler = function openOrderErrorHandler() {
		
			screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
			screenToDisplay.setMessage(DCM.Resources.getResource("TicketServerError"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		openOrderSuccessHandler = function openOrderSuccessHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleSuccessNotificationElement();
			
			screenToDisplay.setHeading(DCM.Resources.getResource("TicketOrderOpened"));
			screenToDisplay.setSide(_this.side);
			screenToDisplay.setNumberOfShares(data.size);
			screenToDisplay.setStop(data.stop);
			screenToDisplay.setLimit(data.limit);
			screenToDisplay.setPrice(data.price);
			screenToDisplay.setRef(data.ref);
			screenToDisplay.setMarket(MarketPosition.instrument.getDisplayTextAsHTML());
			
			orderSizeStepper.clear();
			orderPriceStepper.clear();
			orderStopStepper.clear();
			orderLimitStepper.clear();

			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		openOrderExceptionHandler = function openOrderExceptionHandler(exceptionCode) {
		
			if(exceptionCode==="DT0001") {
				
				DCM.AccountManager.openSelectAccountTypeDialog();
				
			}
			else if(exceptionCode==="U0002") {
				
				DCM.AccountManager.openAccountProcessPendingDialog();
				
			}
			else {
			
				screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
				screenToDisplay.setMessage(exceptionCode);
				
				_this.body.append(screenToDisplay);
				
			};
			
			pendingScreen.close();
			
		},
		openOrder = function openOrder() {
			
			pendingScreen = new DCM.HTMLTicketModulePendingNotificationElement();
			_this.body.append(pendingScreen);
			
			var service = new OrderPosition.OpenService();
			
			service.addEventHandler("SUCCESS", openOrderSuccessHandler);
			service.addEventHandler("EXCEPTION", openOrderExceptionHandler);
			service.addEventHandler("ERROR", openOrderErrorHandler);
			
			service.call();
			
		},
		closeOrderErrorHandler = function closeOrderErrorHandler() {
		
			screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
			screenToDisplay.setMessage(DCM.Resources.getResource("TicketServerError"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		closeOrderSuccessHandler = function closeOrderSuccessHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleSuccessNotificationElement();
			
			screenToDisplay.setHeading(DCM.Resources.getResource("TicketOrderClosed"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		closeOrderExceptionHandler = function closeOrderExceptionHandler(exceptionCode) {
		
			if(exceptionCode==="DT0001") {
				
				DCM.AccountManager.openSelectAccountTypeDialog();
				
			}
			else if(exceptionCode==="U0002") {
				
				DCM.AccountManager.openAccountProcessPendingDialog();
				
			}
			else {
			
				var exceptionScreen;
				
				exceptionScreen = new DCM.HTMLTicketModuleErrorNotificationElement();
				exceptionScreen.setMessage(exceptionCode);
				
				_this.body.append(exceptionScreen);
				
			};
			
			pendingScreen.close();
			
		},
		closeOrder = function closeOrder() {
			
			pendingScreen = new DCM.HTMLTicketModulePendingNotificationElement();
			_this.body.append(pendingScreen);
			
			var service = new OrderPosition.CloseService();
			service.addEventHandler("SUCCESS", closeOrderSuccessHandler);
			service.addEventHandler("EXCEPTION", closeOrderExceptionHandler);
			service.addEventHandler("ERROR", closeOrderErrorHandler);
			service.call();
			
		},
		editOrderErrorHandler = function editOrderErrorHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
			screenToDisplay.setMessage(DCM.Resources.getResource("TicketServerError"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		editOrderSuccessHandler = function editOrderSuccessHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleSuccessNotificationElement();
			
			screenToDisplay.setHeading(DCM.Resources.getResource("TicketOrderModified"));
			screenToDisplay.setMarket(MarketPosition.instrument.getDisplayTextAsHTML());
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},		
		editOrderExceptionHandler = function editOrderExceptionHandler(exceptionCode) {
		
			if(exceptionCode==="DT0001") {
				
				DCM.AccountManager.openSelectAccountTypeDialog();
				
			}
			else if(exceptionCode==="U0002") {
				
				DCM.AccountManager.openAccountProcessPendingDialog();
				
			}
			else {
			
				screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
				screenToDisplay.setMessage(exceptionCode);
				
				_this.body.append(screenToDisplay);
				
			};
			
			pendingScreen.close();
			
		},
		editOrder = function editOrder() {
			
			pendingScreen = new DCM.HTMLTicketModulePendingNotificationElement();
			_this.body.append(pendingScreen);
			
			var service = new OrderPosition.EditService();
			service.addEventHandler("SUCCESS", editOrderSuccessHandler);
			service.addEventHandler("EXCEPTION", editOrderExceptionHandler);
			service.addEventHandler("ERROR", editOrderErrorHandler);
			
			service.call();
			
		},
		// POSITION
		openPositionErrorHandler = function openPositionErrorHandler() {
		
			screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
			screenToDisplay.setMessage(DCM.Resources.getResource("TicketServerError"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		openPositionSuccessHandler = function openPositionSuccessHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleSuccessNotificationElement();
			
			screenToDisplay.setHeading(DCM.Resources.getResource("PositionOpenSuccess"));
			screenToDisplay.setSide(_this.side);
			screenToDisplay.setNumberOfShares(data.size);
			screenToDisplay.setStop(data.stop);
			screenToDisplay.setLimit(data.limit);
			screenToDisplay.setPrice(data.price);
			screenToDisplay.setRef(data.ref);
			screenToDisplay.setMarket(MarketPosition.instrument.getDisplayTextAsHTML());
			
			tradeSizeStepper.clear();
			tradeStopStepper.clear();
			tradeLimitStepper.clear();
			forceOpenCheckbox.setChecked(false);
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		openPositionExceptionHandler = function openPositionExceptionHandler(exceptionCode) {
		
			if(exceptionCode==="DT0001") {
				
				DCM.AccountManager.openSelectAccountTypeDialog();
				
			}
			else if(exceptionCode==="U0002") {
				
				DCM.AccountManager.openAccountProcessPendingDialog();
				
			}
			else {
				
				screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
				screenToDisplay.setMessage(exceptionCode);
				
				_this.body.append(screenToDisplay);
				
			};
			
			pendingScreen.close();
			
		},
		openPosition = function openPosition() {
		
			pendingScreen = new DCM.HTMLTicketModulePendingNotificationElement();
			
			_this.body.append(pendingScreen);
			
			var placeTradeService = new TradePosition.OpenService();
			
			
			
			placeTradeService.addEventHandler("SUCCESS", openPositionSuccessHandler);
			placeTradeService.addEventHandler("EXCEPTION", openPositionExceptionHandler);
			placeTradeService.addEventHandler("ERROR", openPositionErrorHandler);
			
			placeTradeService.call();
			
		},
		editPositionErrorHandler = function editPositionErrorHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
			screenToDisplay.setMessage(DCM.Resources.getResource("TicketServerError"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		editPositionSuccessHandler = function editPositionSuccessHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleSuccessNotificationElement();
			
			screenToDisplay.setHeading(DCM.Resources.getResource("TicketPositionModified"));
			screenToDisplay.setMarket(MarketPosition.instrument.getDisplayTextAsHTML());
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},		
		editPositionExceptionHandler = function editPositionExceptionHandler(exceptionCode) {
			
			if(exceptionCode==="DT0001") {
				
				DCM.AccountManager.openSelectAccountTypeDialog();
				
			}
			else if(exceptionCode==="U0002") {
				
				DCM.AccountManager.openAccountProcessPendingDialog();
				
			}
			else {
			
				screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
				screenToDisplay.setMessage(exceptionCode);
				
				_this.body.append(screenToDisplay);
				
			};
			
			pendingScreen.close();
			
		},
		editPosition = function editPosition() {
			
			pendingScreen = new DCM.HTMLTicketModulePendingNotificationElement();
			_this.body.append(pendingScreen);
			
			var service = new TradePosition.EditService();
			service.addEventHandler("SUCCESS", editPositionSuccessHandler);
			service.addEventHandler("EXCEPTION", editPositionExceptionHandler);
			service.addEventHandler("ERROR", editPositionErrorHandler);
			
			service.call();
			
		},
		closePositionErrorHandler = function closePositionErrorHandler() {
		
			screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
			screenToDisplay.setMessage(DCM.Resources.getResource("TicketServerError"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		closePositionSuccessHandler = function closePositionSuccessHandler(data) {
		
			screenToDisplay = new DCM.HTMLTicketModuleSuccessNotificationElement();
			
			screenToDisplay.setHeading(DCM.Resources.getResource("TicketPositionClosed"));
			
			pendingScreen.close();
			_this.body.append(screenToDisplay);
			
		},
		closePositionExceptionHandler = function closePositionExceptionHandler(exceptionCode) {
		
			DCM.log("EXCEPTION[" + exceptionCode + "]");
			
			if(exceptionCode==="DT0001") {
				
				DCM.AccountManager.openSelectAccountTypeDialog();
				
			}
			else if(exceptionCode==="U0002") {
				
				DCM.AccountManager.openAccountProcessPendingDialog();
				
			}
			else {
			
				screenToDisplay = new DCM.HTMLTicketModuleErrorNotificationElement();
				screenToDisplay.setMessage(exceptionCode);
				
				_this.body.append(screenToDisplay);
				
			};
			
			pendingScreen.close();
			
		},
		closePosition = function closePosition() {
			
			pendingScreen = new DCM.HTMLTicketModulePendingNotificationElement();
			_this.body.append(pendingScreen);
			
			var service = new TradePosition.CloseService();
			service.addEventHandler("SUCCESS", closePositionSuccessHandler);
			service.addEventHandler("EXCEPTION", closePositionExceptionHandler);
			service.addEventHandler("ERROR", closePositionErrorHandler);
			service.call();
			
		},
		buyPriceChangeHandler = function buyPriceChangeHandler() {
			setBuyPrice(MarketPosition.instrument.getBuyPrice());
			calculateMarketInformation();
		},
		sellPriceChangeHandler = function sellPriceChangeHandler() {
			setSellPrice(MarketPosition.instrument.getSellPrice());
			calculateMarketInformation();
		},
		sentimentChangeHandler = function sentimentChangeHandler() {
			sentiball.setSentiment(MarketPosition.instrument.getSentiment());
		},
		highPriceChangeHAndler = function highPriceChangeHAndler() {
			priceHighValue.setText(MarketPosition.instrument.getPriceHigh());
		},
		LowPriceChangeHAndler = function LowPriceChangeHAndler() {
			priceLowValue.setText(MarketPosition.instrument.getPriceLow());
		},
		sentimentHighChangeHandler = function sentimentHighChangeHandler() {
			sentimentHighValue.setText(MarketPosition.instrument.getSentimentHigh());
		},
		sentimentLowChangeHandler = function sentimentLowChangeHandler() {
			sentimentLowValue.setText(MarketPosition.instrument.getSentimentLow());
		},
		sentimentDailyChangeHandler = function sentimentDailyChangeHandler() {
			sentimentDailyChangeValue.setText(MarketPosition.instrument.getSentimentChange());
		},
		sentiball = new DCM.HTMLSentiballElement(120, 89),
		sentiballHead = new DCM.HTMLTicketModuleHeadElement(),
		sentiballHeading = new DCM.HTMLHeadingElement(),
		sentiballSubHeading = new DCM.HTMLAnchorElement(),
		sentiballChartingComiingSoon = new DCM.HTMLDivElement(),
		detailsTable = new DCM.HTMLRowElement(),
		col1 = detailsTable.addColumn(),
		col2 = detailsTable.addColumn(),
		col3 = detailsTable.addColumn(),
		col4 = detailsTable.addColumn(),
		spacer = new DCM.HTMLColumnHeadElement(),
		priceHeading = new DCM.HTMLColumnHeadElement(),
		sentimentHeading = new DCM.HTMLColumnHeadElement(),
		highPriceHeading = new DCM.HTMLColumnHeadElement(),
		lowPriceHeading = new DCM.HTMLColumnHeadElement(),
		dailyChangeHeading = new DCM.HTMLColumnHeadElement(),
		priceHighValue = new DCM.HTMLColumnBodyElement(),
		priceLowValue = new DCM.HTMLColumnBodyElement(),
		priceDailyChangeValue = new DCM.HTMLColumnBodyElement(),
		sentimentHighValue = new DCM.HTMLColumnBodyElement(),
		sentimentLowValue = new DCM.HTMLColumnBodyElement(),
		sentimentDailyChangeValue = new DCM.HTMLColumnBodyElement(),
		stopPriceNotification = new DCM.HTMLDivElement(),
		limitPriceNotification = new DCM.HTMLDivElement(),
		stopPointsValue,
		limitPointsValue,
		orderStopPriceNotification = new DCM.HTMLDivElement(),
		orderLimitPriceNotification = new DCM.HTMLDivElement(),
		setMinsAndSteps = function setMinsAndSteps() {
		
			if(viewTabs.value==="TRADE") {
			
				setTradeMinSize(TradePosition.getMinSize());
				setTradeMinStop(TradePosition.getMinStop());
				setTradeMinLimit(TradePosition.getMinLimit());
				
				setTradeStopStep(TradePosition.getStopStep());
				setTradeLimitStep(TradePosition.getLimitStep());
				
				setDefaultOrderPriceIncrement(TradePosition.getBuyPrice());
				setDefaultOrderPriceDecrement(TradePosition.getSellPrice());
				
			}
			else if(viewTabs.value==="ORDER") {
			
				setOrderMinSize(OrderPosition.getMinSize());
				setOrderMinStop(OrderPosition.getMinStop());
				setOrderMinLimit(OrderPosition.getMinLimit());
				setOrderMinPrice(OrderPosition.getPriceStep());
				
				setOrderStopStep(OrderPosition.getStopStep());
				setOrderLimitStep(OrderPosition.getLimitStep());
				setOrderPriceStep(OrderPosition.getPriceStep());
				
				setDefaultOrderPriceIncrement(OrderPosition.getBuyPrice());
				setDefaultOrderPriceDecrement(OrderPosition.getSellPrice());
				
			}
			else if(viewTabs.value==="WIZARD") {
				
				setWizardMinSize(WizardPosition.getMinSize());
				setWizardMinStop(WizardPosition.getMinStop());
				setWizardMinLimit(WizardPosition.getMinLimit());
				setWizardMinPrice(WizardPosition.getPriceStep());
				
				setWizardStopStep(WizardPosition.getStopStep());
				setWizardLimitStep(WizardPosition.getLimitStep());
				setWizardPriceStep(WizardPosition.getPriceStep());
				
				setDefaultWizardPriceIncrement(WizardPosition.getBuyPrice());
				setDefaultWizardPriceDecrement(WizardPosition.getSellPrice());
				
			};
			
		},
		calculateMarketInformation = function calculateMarketInformation() {
		
			if(MarketPosition.instrument) {
			
				setMinsAndSteps();
				
				calculateStopMarketInformation();
				calculateLimitMarketInformation();
				
				checkForComplete();
			
			};
			
		},
		calculateStopMarketInformation = function calculateStopMarketInformation() {
			
			var
			value,
			sell,
			buy,
			currencyValue,
			message,
			sellInfo,
			buyInfo;
			
			if(viewTabs.value==="TRADE") {
			
				if(!tradeStopStepper.value||!tradeSizeStepper.value) {
					return;
				};
				
				if(TradePosition.status==="OPEN") {
					
					sell = TradePosition.getEntryPrice(true);
					buy = TradePosition.getEntryPrice(true);
					
				}
				else {
				
					sell = Number(TradePosition.instrument.sellPrice);
					buy = Number(TradePosition.instrument.buyPrice);
					
				};
			
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
					
					currencyValue = tradeStopStepper.value;
					stopPointsValue = TradePosition.getStop(true);
					value = stopPointsValue;
					message = "Pts.";
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					currencyValue = TradePosition.getStopAsCurrency(true);
					stopPointsValue = Number(tradeStopStepper.value);
					value = currencyValue;
					message = TradePosition.instrument.currency;
					
				};
				
				if(TradePosition.status==="OPEN") {
			
					sell = (sell-stopPointsValue);
					buy = (buy+stopPointsValue);
					
				}
				else {
				
					sell = (sell+stopPointsValue);
					buy = (buy-stopPointsValue);
					
				};
				
			}
			else if(viewTabs.value==="ORDER") {
			
				if(!orderStopStepper.value||!orderSizeStepper.value) {
					return;
				};
				
				if(OrderPosition.status==="OPEN") {
					
					sell = OrderPosition.getEntryPrice(true);
					buy = OrderPosition.getEntryPrice(true);
					
				}
				else {
				
					sell = Number(orderPriceStepper.value);
					buy = Number(orderPriceStepper.value);
					
				};
			
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					currencyValue = orderStopStepper.value;
					
					stopPointsValue = OrderPosition.getStopAsPoints();
					value = stopPointsValue;
					message = "Pts.";
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					currencyValue = OrderPosition.getStopAsCurrency();
					
					stopPointsValue = orderStopStepper.value;
					value = currencyValue;
					message = OrderPosition.instrument.currency;
					
				};
				
				if(OrderPosition.status==="OPEN") {
			
					sell = (sell-stopPointsValue);
					buy = (buy+stopPointsValue);
					
				}
				else {
				
					sell = (sell+stopPointsValue);
					buy = (buy-stopPointsValue);
					
				};
				
			}
			else {
				
				return;
				
			};
			
			buyInfo = ("<strong>" + message + "</strong> " + value + "<br /><strong>Stop</strong> " + buy.toFixed(MarketPosition.instrument.decimalPlaces) + " [est.]");
			sellInfo = ("<strong>" + message + "</strong> " + value + "<br /><strong>Stop</strong> " + sell.toFixed(MarketPosition.instrument.decimalPlaces) + " [est.]");
			
			if(_this.side==="BUY") {
				
				if(viewTabs.value==="TRADE") {
					stopPriceNotification.setText(buyInfo);
				}
				else if(viewTabs.value==="ORDER") {
					orderStopPriceNotification.setText(buyInfo);
				};
				
			}
			else if(_this.side==="SELL") {
			
				if(viewTabs.value==="TRADE") {
					stopPriceNotification.setText(sellInfo);
				}
				else if(viewTabs.value==="ORDER") {
					orderStopPriceNotification.setText(sellInfo);
				};
			
			}
			else {
				
				stopPriceNotification.setText("");
				orderStopPriceNotification.setText("");
				
			};
			
		},
		calculateLimitMarketInformation = function calculateLimitMarketInformation() {
			
			var
			value,
			sell,
			buy,
			currencyValue,
			message,
			sellInfo,
			buyInfo;
			
			if(viewTabs.value==="TRADE") {
			
				if(!tradeLimitStepper.value||!tradeSizeStepper.value) {
					return;
				};
				
				
				if(TradePosition.status==="OPEN") {
					
					sell = TradePosition.getEntryPrice(true);
					buy = TradePosition.getEntryPrice(true);
				
				}
				else {
					
					sell = Number(TradePosition.instrument.sellPrice);
					buy = Number(TradePosition.instrument.buyPrice);
					
				};
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
					
					currencyValue = tradeLimitStepper.value;
					limitPointsValue = TradePosition.getLimit(true);
					value = limitPointsValue;
					message = "Pts.";
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					currencyValue = TradePosition.getLimitAsCurrency(true);
					limitPointsValue = Number(tradeLimitStepper.value);
					value = currencyValue;
					message = TradePosition.instrument.currency;
					
				};
				
				if(TradePosition.status==="OPEN") {
				
					sell = (sell+limitPointsValue);
					buy = (buy-limitPointsValue);
					
				}
				else {
				
					sell = (sell-limitPointsValue);
					buy = (buy+limitPointsValue);
					
				};
				
			}
			else if(viewTabs.value==="ORDER") {
			
				if(!orderLimitStepper.value||!orderSizeStepper.value) {
					return;
				};
			
			
				if(OrderPosition.status==="OPEN") {
					
					sell = OrderPosition.getEntryPrice(true);
					buy = OrderPosition.getEntryPrice(true);
					
				}
				else {
				
					sell = Number(orderPriceStepper.value);
					buy = Number(orderPriceStepper.value);
					
				};
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
					
					currencyValue = orderLimitStepper.value;
					
					limitPointsValue = OrderPosition.getLimitAsPoints();
					
					value = limitPointsValue;
					message = "Pts.";
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					currencyValue = OrderPosition.getLimitAsCurrency();
					
					limitPointsValue = orderLimitStepper.value;
					
					value = currencyValue;
					message = OrderPosition.instrument.currency;
					
				};
				
				if(OrderPosition.status==="OPEN") {
				
					sell = (sell+limitPointsValue);
					buy = (buy-limitPointsValue);
					
				}
				else {
				
					sell = (sell-limitPointsValue);
					buy = (buy+limitPointsValue);
					
				};
				
			}
			else {
				
				return;
				
			};
			
			buyInfo = ("<strong>" + message + "</strong> " + value + "<br /><strong>Limit</strong> " + buy.toFixed(MarketPosition.instrument.decimalPlaces) + " [est.]");
			sellInfo = ("<strong>" + message + "</strong> " + value + "<br /><strong>Limit</strong> " + sell.toFixed(MarketPosition.instrument.decimalPlaces) + " [est.]");
			
			if(_this.side==="BUY") {
			
				if(viewTabs.value==="TRADE") {
			
					limitPriceNotification.setText(buyInfo);
					
				}
				else if(viewTabs.value==="ORDER") {
					
					orderLimitPriceNotification.setText(buyInfo);
					
				};
			
			}
			else if(_this.side==="SELL") {
			
				if(viewTabs.value==="TRADE") {
			
					limitPriceNotification.setText(sellInfo);
					
				}
				else if(viewTabs.value==="ORDER") {
					
					orderLimitPriceNotification.setText(sellInfo);
					
				};
				
			}
			else {
				
				limitPriceNotification.setText("");
				orderLimitPriceNotification.setText("");
				
			};
			
		},
		viewTabs = _this.viewTabs = new DCM.HTMLTabGroupElement(),
		tradeTab = _this.tradeTab = viewTabs.addTab(DCM.Resources.getResource("TicketTradeTabLabel"), "TRADE"),
		orderTab = _this.orderTab = viewTabs.addTab(DCM.Resources.getResource("TicketOrderTabLabel"), "ORDER"),
		wizardTab = _this.wizardTab = viewTabs.addTab(DCM.Resources.getResource("TicketWizardTabLabel"), "WIZARD"),
		wizardTabTabs = new DCM.HTMLTabGroupElement(),
		wizardTabTabsDirection = wizardTabTabs.addTab("Direction", "DIRECTION"),
		wizardTabTabsQuantity = wizardTabTabs.addTab("Quantity", "QUANTITY"),
		wizardTabTabsStop = wizardTabTabs.addTab("Stop", "STOP"),
		wizardTabTabsLimit = wizardTabTabs.addTab("Limit", "LIMIT"),
		wizardTabTabsPrice = wizardTabTabs.addTab("Price", "PRICE"),
		wizardTabTabsSummary = wizardTabTabs.addTab("Summary", "SUMMARY"),
		wizardTabTabsDirectionPanel = new DCM.HTMLTicketModuleWizardElement(),
		wizardTabTabsDirectionMessageDesc = new DCM.HTMLDivElement(),
		wizardTabTabsDirectionMessageBody = new DCM.HTMLDivElement(),
		wizardTabTabsQuantityPanel = new DCM.HTMLTicketModuleWizardElement(),
		wizardTabTabsQuantityMessageBody = new DCM.HTMLDivElement(),
		wizardTabTabsStopPanel = new DCM.HTMLTicketModuleWizardElement(),
		wizardTabTabsStopBody = new DCM.HTMLDivElement(),
		wizardTabTabsLimitPanel = new DCM.HTMLTicketModuleWizardElement(),
		wizardTabTabsLimitBody = new DCM.HTMLDivElement(),
		wizardTabTabsPricePanel = new DCM.HTMLTicketModuleWizardElement(),
		wizardTabTabsPriceBody = new DCM.HTMLDivElement(),
		wizardTabTabsSummaryPanel = new DCM.HTMLTicketModuleWizardElement(),
		wizardTabTabsSummaryBody = new DCM.HTMLDivElement(),
		wizardButtonWrap = new DCM.HTMLDivElement(),
		wizardCancelButton = new DCM.HTMLInlineButtonElement(),
		wizardNextButton = new DCM.HTMLInlineButtonElement(),
		checkForComplete = function checkForComplete() {
		
			if(viewTabs.value==="TRADE") {
				
				checkTradeFormComplete();
				
			}
			else if(viewTabs.value==="ORDER") {
				
				checkOrderFormComplete();
				
			}
			else if(viewTabs.value==="WIZARD") {
				
				checkForWizardComplete();
				
			};
			
		},
		placeTradeButton = _this.placeTradeButton = new DCM.HTMLTicketModuleButton(),
		placeOrderButton = _this.placeOrderButton = new DCM.HTMLTicketModuleButton(),
		setOrderType = _this.setOrderType = function setOrderType(value) {
			DCM.log("setOrderType(" + value + ")");
			orderPriceTypeLabel.setText("Type: " + value);
			OrderPosition.setType(value);
		},
		getOrderType = function getOrderType() {
			
			var 
			targetPrice,
			_return;
			
			if(!orderPriceStepper.value||!_this.side) {
				_return = "-";
				return _return;
			};
			
			if(_this.side==="BUY") {
					
				targetPrice = OrderPosition.instrument.buyPrice;
				
				if(orderPriceStepper.value<targetPrice) {
					_return = "LIMIT";
				}
				else if(orderPriceStepper.value>targetPrice) {
					_return = "STOP";
				};
			
			}
			else if(_this.side==="SELL") {
			
				targetPrice = OrderPosition.instrument.sellPrice;
				
				if(orderPriceStepper.value<targetPrice) {
					_return = "STOP";
				}
				else if(orderPriceStepper.value>targetPrice) {
					_return = "LIMIT";
				};
				
			};
			
			return _return;
			
		},
		setSide = _this.setSide = function setSide(value) {
		
			_this.side = value;
		
			if(_this.side==="SELL") {
			
				sellButton.unsuppress();
				buyButton.suppress();
				
				calculateWizardPotentialProfit();
				
				wizardTabTabsQuantityPanel.head.setText("Would you like to<br />SELL a specific quantity?");
				
				MarketPosition.setDirection("SELL");
				OrderPosition.setDirection("SELL");
				TradePosition.setDirection("SELL");
				
			}
			else if(_this.side==="BUY") {
				
				buyButton.unsuppress();
				sellButton.suppress();
				
				calculateWizardPotentialProfit();
				
				wizardTabTabsQuantityPanel.head.setText("Would you like to<br />BUY a specific quantity?");
				
				MarketPosition.setDirection("BUY");
				OrderPosition.setDirection("BUY");
				TradePosition.setDirection("BUY");
				
			}
			else {
				
				sellButton.unsuppress();
				buyButton.unsuppress();
				
				MarketPosition.setDirection(null);
				OrderPosition.setDirection(null);
				TradePosition.setDirection(null);
			
			};
			
			setOrderType(getOrderType());
			calculateMarketInformation();
			//checkForComplete();
			
		},
		setLockedIntoSide = _this.setLockedIntoSide = function setLockedIntoSide(value) {
			_this.lockedIntoSide = value;
		},
		setMode = _this.setMode = function setMode(value) {
		
			_this.mode = value;
			
			if(value==="CANCEL") {
				placeTradeButton.setText(DCM.Resources.getResource("ClosePositionLabel"));
				placeOrderButton.setText(DCM.Resources.getResource("CloseOrderLabel"));
			}
			else if(value==="EDIT") {
				placeTradeButton.setText(DCM.Resources.getResource("ModifyPositionLabel"));
				placeOrderButton.setText(DCM.Resources.getResource("ModifyOrderLabel"));
			}
			else if(value==="NEW") {
				placeTradeButton.setText(DCM.Resources.getResource("PlaceTradeLabel"));
				placeOrderButton.setText(DCM.Resources.getResource("PlaceOrderLabel"));
			};
			
		},
		setMarketPosition = _this.setMarketPosition = function setMarketPosition(Position) {
			MarketPosition = _this.MarketPosition = Position;
		},
		stopsAndLimitsTypeChange = function stopsAndLimitsTypeChange() {
		
			DCM.log("DCM.AccountManager.CHANGE");
		
			if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
				tradeStopStepper.setFixed(2);
				orderStopStepper.setFixed(2);
				tradeLimitStepper.setFixed(2);
				orderLimitStepper.setFixed(2);
				
				if(tradeLimitStepper.value) {
					tradeLimitStepper.setValue(TradePosition.getLimitAsCurrency());
				};
				
				if(tradeStopStepper.value) {
					tradeStopStepper.setValue(TradePosition.getStopAsCurrency());
				};
				
				if(orderLimitStepper.value) {
					orderLimitStepper.setValue(OrderPosition.getLimitAsCurrency());
				};
				
				if(orderStopStepper.value) {
					orderStopStepper.setValue(OrderPosition.getStopAsCurrency());
				};
				
			}
			else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				
				tradeStopStepper.setFixed(0);
				orderStopStepper.setFixed(0);
				tradeLimitStepper.setFixed(0);
				orderLimitStepper.setFixed(0);
				
				if(tradeLimitStepper.value) {
					tradeLimitStepper.setValue(TradePosition.getLimit());
				};
				
				if(tradeStopStepper.value) {
					tradeStopStepper.setValue(TradePosition.getStop());
				};
				
				if(orderLimitStepper.value) {
					orderLimitStepper.setValue(OrderPosition.getLimit());
				};
				
				if(orderStopStepper.value) {
					orderStopStepper.setValue(OrderPosition.getStop());
				};
				
			};
			
			calculateMarketInformation();
		
		},
		checkOrderFormComplete = function checkOrderFormComplete() {
		
			var isInvalidPrice = orderPriceStepper.value>OrderPosition.instrument.sellPrice&&orderPriceStepper.value<OrderPosition.instrument.buyPrice;
				
			if(isInvalidPrice) {
				orderPriceStepper.setValid(false);
			}
			else {
				orderPriceStepper.setValid(true);
			};
		
			if(_this.side&&orderPriceStepper.value&&!isInvalidPrice&&orderSizeStepper.value) {
				
				placeOrderButton.enable();
				
			}
			else {
				
				placeOrderButton.disable();
				
			};
			
		},
		checkTradeFormComplete = function checkTradeFormComplete() {
		
			if(_this.side&&tradeSizeStepper.value) {
				
				placeTradeButton.enable();
				
			}
			else {
				
				placeTradeButton.disable();
				
			};
		
		},
		checkForWizardComplete = function checkForWizardComplete() {
			
			if(_this.side) {
				
				wizardNextButton.enable();
				
			}
			else {
				
				wizardNextButton.disable();
				
			};
			
		},
		calculateWizardPotentialProfit = function calculateWizardPotentialProfit() {
			
			if(_this.side==="SELL") {
			
				wizardTabTabsQuantityMessageBody.setText("If you were to <em>SELL " + wizardSizeStepper.value + "</em>; you'd profit <em>" + WizardPosition.getPotentialProfit() + "</em> for each <span data-type=\"keyword\">point</span> the <span data-type=\"keyword\">market-price</span> drops <em>BELOW</em> your <span data-type=\"keyword\">entry-price</span>.");
				
			}
			else if(_this.side==="BUY") {
				
				wizardTabTabsQuantityMessageBody.setText("If you were to <em>BUY " + wizardSizeStepper.value + "</em>; you'd profit <em>" + WizardPosition.getPotentialProfit() + "</em> for each <span data-type=\"keyword\">point</span> the <span data-type=\"keyword\">market-price</span> rises <em>ABOVE</em> your <span data-type=\"keyword\">entry-price</span>.");
				
			};
			
		},
		wizardDetailsTable = new DCM.HTMLDivElement(),
		priceRow = new DCM.HTMLRowElement(),
		sizeRow = new DCM.HTMLRowElement(),
		stopRow = new DCM.HTMLRowElement(),
		limitRow = new DCM.HTMLRowElement(),
		detailsTablePriceHeading = priceRow.addColumn(),
		detailsTablePriceValue = priceRow.addColumn(),
		detailsTableStopHeading = stopRow.addColumn(),
		detailsTableStopValue = stopRow.addColumn(),
		detailsTableLimitHeading = limitRow.addColumn(),
		detailsTableLimitValue = limitRow.addColumn(),
		detailsTableSizeHeading = sizeRow.addColumn(),
		detailsTableSizeValue = sizeRow.addColumn();
		
		this._super = DCM.HTMLModuleElement;
		this._super();
		
		//DCM.log("new HTMLTicketModuleElement()", _this);
		
		if(!MarketPosition.instrument) {
		
			_this.close();
			
			throw("INSTRUMENT CANNOT BE FOUND");
			
		};
		
		setMode("NEW");
		// commented out to allow sentimabll to display
		//_this.collapse();
		
		sentiballButton.toggle();
		
		setLockedIntoSide(false);
		
		_this.setIcon("deal-ticket");
		_this.setHeading(DCM.Resources.getResource("DealTicketPanelHeading"));
		_this.setContextMenu("HTMLTicketModuleContextMenuElement");
		
		MarketPosition.instrument.subscribe();
		MarketPosition.instrument.addEventHandler("BUY_PRICE_CHANGE", buyPriceChangeHandler).dispatch();
		MarketPosition.instrument.addEventHandler("SELL_PRICE_CHANGE", sellPriceChangeHandler).dispatch();
		MarketPosition.instrument.addEventHandler("SENTIMENT_CHANGE", sentimentChangeHandler).dispatch();
		MarketPosition.instrument.addEventHandler("HIGH_PRICE_CHANGE", highPriceChangeHAndler).dispatch();
		MarketPosition.instrument.addEventHandler("LOW_PRICE_CHANGE", LowPriceChangeHAndler).dispatch();
		MarketPosition.instrument.addEventHandler("SENTIMENT_HIGH_CHANGE", sentimentHighChangeHandler).dispatch();
		MarketPosition.instrument.addEventHandler("SENTIMENT_LOW_CHANGE", sentimentLowChangeHandler).dispatch();
		MarketPosition.instrument.addEventHandler("SENTIMENTCHANGE_CHANGE", sentimentDailyChangeHandler).dispatch();
		
		detailsTable.setAttribute("data-deal-ticket-role", "data-table");
		
		_this.body.append(dealTicketLeftPanel);
		_this.body.append(dealTicketRightPanel);
		
		sentiballHead.append(sentiballHeading);
		sentiballHead.append(sentiballSubHeading);
		
		sentiballHeading.setText(DCM.Resources.getResource("SentiballHeadingLabel"));
		sentiballHeading.setRole("standard-orange");
		sentiballHeading.setSize("medium");
		
		sentiballSubHeading.setText(DCM.Resources.getResource("SentiballSubHeadingLabel"));
		//sentiballSubHeading.setRole("standard-grey");
		//sentiballSubHeading.setSize("small");
		sentiballSubHeading.setAttribute("data-ticket-role", "sentiment-sub-heading");
		sentiballSubHeading.setHref("http://www.dcmcap.com/education/dcm_capital_information/sentiment/#dcmeducation-content");
		sentiballSubHeading.setAttribute("target", "_blank");
		
		dealTicketRightPanel.append(sentiballHead);
		dealTicketRightPanel.append(sentiball);
		dealTicketRightPanel.append(detailsTable);
		dealTicketRightPanel.append(sentiballChartingComiingSoon);
		
		sentiballChartingComiingSoon.setAttribute("data-ticket-role", "senti-charting-soon");
		sentiballChartingComiingSoon.setText("Sentiment charting coming soon");
		
		highPriceHeading.setText("High");
		lowPriceHeading.setText("Low");
		dailyChangeHeading.setText("Daily-change");
		
		spacer.setText("&nbsp;");
		priceHeading.setText("Price");
		sentimentHeading.setText("Sentiment");
		
		col1.append(spacer);
		col1.append(priceHeading);
		col1.append(sentimentHeading);
		
		col2.append(highPriceHeading);
		col2.append(priceHighValue);
		col2.append(sentimentHighValue);
		priceHighValue.setText("-");
		sentimentHighValue.setText("-");
		
		col3.append(lowPriceHeading);
		col3.append(priceLowValue);
		col3.append(sentimentLowValue);
		priceLowValue.setText("-");
		sentimentLowValue.setText("-");
		
		col4.append(dailyChangeHeading);
		col4.append(priceDailyChangeValue);
		col4.append(sentimentDailyChangeValue);
		priceDailyChangeValue.setText("-");
		sentimentDailyChangeValue.setText("-");
		
		tradePriceLabel.setAttribute("data-deal-ticket-role", "sub-label");
		
		buyAndSellButtons.setAttribute("data-deal-ticket-role", "buy-and-sell");
		
		instrumentTicker.setSize("medium");
		instrumentTicker.setRole("standard-orange");
		
		instrumentName.setSize("small");
		instrumentName.setRole("standard-grey");
		
		ticketHead.append(instrumentTicker);
		ticketHead.append(instrumentName);
		
		dealTicketLeftPanel.append(ticketHead);
		
		buyAndSellButtons.append(sellButton);
		buyAndSellButtons.append(buyButton);
		buyAndSellButtons.append(buyAndSellButtonsClear);
		
		dealTicketLeftPanel.append(buyAndSellButtons);
		
		dealTicketLeftPanel.append(viewTabs);
		
		tradeTab.append(tradeForm);
		tradeTab.append(placeTradeButton);
		tradeTab.navItem.setAttribute("title", DCM.Resources.getResource("TicketTradeTooltipLabel"));
		
		placeTradeButton.disable();
		
		placeTradeButton.addEventListener(DCM.Event.click, function() {
			
			if(this.enabled) {
				
				if(_this.mode==="EDIT") {
				
					editPosition();
					
				}
				else if(_this.mode==="CANCEL") {
				
					closePosition();
					
				}
				else if(_this.mode==="NEW") {
				
					openPosition();
					
				};
				
			};
			
		});
		
		tradeSizeLabel.setAttribute("title", DCM.Resources.getResource("QuantityTooltipLabel"));
		tradePriceLabel.setAttribute("title", DCM.Resources.getResource("PriceTooltipLabel"));
		tradeSizeField.label.append(tradeSizeLabel);
		tradeSizeField.label.append(tradePriceLabel);
		tradeSizeField.input.append(tradeSizeStepper);
		tradeSizeField.input.append(forceOpenCheckbox);
		forceOpenCheckbox.setLabel(DCM.Resources.getResource("ForceOpenLabel"));
		
		forceOpenCheckbox.addEventHandler("CHANGE", function() {
			
			TradePosition.setForceOpen(forceOpenCheckbox.getChecked());
			
		});
		
		tradeSizeStepper.addEventHandler("CHANGE", function() {
		
			if(tradeSizeStepper.value) {
			
				TradePosition.setSize(tradeSizeStepper.value);
				
			}
			else {
				
				TradePosition.setSize(null);
				
			};
			
			checkTradeFormComplete();
			
			calculateMarketInformation();
			
		});
		
		DCM.AccountManager.addEventHandler("STOPSANDLIMITSTYPE_CHANGE", stopsAndLimitsTypeChange).dispatch();
		
		stopField.input.append(tradeStopStepper);
		stopField.input.append(stopPriceNotification);
		stopField.setAttribute("data-deal-ticket-role", "stopField");
		stopPriceNotification.setAttribute("data-type", "stopPriceNotification");
		stopFieldLabel.setAttribute("title", DCM.Resources.getResource("StopTooltipLabel"));
		stopField.label.append(stopFieldLabel);
		
		tradeStopStepper.addEventHandler("CHANGE", function() {
		
			if(tradeStopStepper.value) {
			
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {

					TradePosition.setStopAsCurrency(tradeStopStepper.value);
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					TradePosition.setStop(tradeStopStepper.value);
					
				};
			
				calculateStopMarketInformation();
			
			}
			else {
			
				TradePosition.setStop(null);
				
				stopPriceNotification.setText("");
			
			};
			
			checkTradeFormComplete();
			
		});
		
		limitField.input.append(tradeLimitStepper);
		limitField.input.append(limitPriceNotification);
		limitPriceNotification.setAttribute("data-type", "limitPriceNotification");
		limitField.setAttribute("data-deal-ticket-role", "limitField");
		tradeLimitStepper.addEventHandler("CHANGE", function() {
			
			if(tradeLimitStepper.value) {
			
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {

					TradePosition.setLimitAsCurrency(tradeLimitStepper.value);
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					TradePosition.setLimit(tradeLimitStepper.value);
					
				};
				
				calculateLimitMarketInformation();
				
			}
			else {
				
				TradePosition.setLimit(null);
				
				limitPriceNotification.setText("");
				
			};
			
			checkTradeFormComplete();
			
		});
		limitFieldLabel.setAttribute("title", DCM.Resources.getResource("LimitTooltipLabel"));
		limitField.label.append(limitFieldLabel);
		
		orderTab.append(orderForm);
		orderTab.append(placeOrderButton);
		orderTab.navItem.setAttribute("title", DCM.Resources.getResource("TicketOrderTooltipLabel"));
		
		placeOrderButton.addEventListener(DCM.Event.click, function() {
		
			if(this.enabled) {
			
				if(_this.mode==="EDIT") {
				
					editOrder();
					
				}
				else if(_this.mode==="CANCEL") {
				
					closeOrder();
					
				}
				else if(_this.mode==="NEW") {
				
					openOrder();
				
				};
			
			};
			
		});
		placeOrderButton.disable();
		
		orderSizeCurrencyLabel.setAttribute("data-deal-ticket-role", "sub-label");
		orderSizeCurrencyLabel.setAttribute("title", DCM.Resources.getResource("PriceTooltipLabel"));
		orderSizeLabel.setAttribute("title", DCM.Resources.getResource("QuantityTooltipLabel"));
		orderSizeField.label.append(orderSizeLabel);
		orderSizeField.label.append(orderSizeCurrencyLabel);
		orderSizeField.input.append(orderSizeStepper);
		orderSizeStepper.addEventHandler("CHANGE", function() {
			
			if(orderSizeStepper.value) {
			
				OrderPosition.setSize(orderSizeStepper.value);
				
			}
			else {
			
				OrderPosition.setSize(null);
			
			};
			
			checkOrderFormComplete();
			
			calculateMarketInformation();
			
		});
		
		orderPriceTypeLabel.setAttribute("data-deal-ticket-role", "sub-label");
		
		orderPriceField.label.append(orderPriceLabel);
		orderPriceField.label.append(orderPriceTypeLabel);
		orderPriceField.input.append(orderPriceStepper);
		orderPriceLabel.setText(DCM.Resources.getResource("PriceLabel"));
		orderPriceStepper.setFixed(MarketPosition.instrument.decimalPlaces);
		orderPriceStepper.addEventHandler("CHANGE", function() {
			
			if(orderPriceStepper.value) {
			
				OrderPosition.setEntryPrice(orderPriceStepper.value);
				
			}
			else {
			
				OrderPosition.setEntryPrice(null);
				
			};
			
			setOrderType(getOrderType());
			
			calculateMarketInformation();
			
			checkOrderFormComplete();
			
		});
		
		setOrderType(getOrderType());
		
		orderLifetimeField.label.append(orderLifetimeTypeLabel);
		orderLifetimeField.label.append(orderLifetimeTypeValue);
		
		orderLifetimeTypeLabel.setAttribute("title", DCM.Resources.getResource("GoodTIllTooltipLabel"));
		orderLifetimeTypeLabel.setText(DCM.Resources.getResource("GoodTillLabel"));
		orderLifetimeTypeValue.setText(DCM.Resources.getResource("CancelledLabel"));
		orderLifetimeTypeValue.setAttribute("data-deal-ticket-role", "sub-label");
		
		orderLifetimeField.input.append(orderLifetimeType);
		orderLifetimeType.setValue("CANCELLED");
		orderLifetimeType.addEventHandler("CHANGE", function() {
			
			if(this.value==="TIME") {
				
				var 
				dateSelector = new DCM.HTMLSelectDateDialogElement(),
				acceptHandler = function acceptHandler() {
					
					OrderPosition.setExpireTime(dateSelector.getDate());
					orderLifetimeTypeValue.setText(dateSelector.getDisplayDate());
					
				};
				
				dateSelector.addEventHandler("ACCEPT", acceptHandler);
				dateSelector.queue();
				
			}
			else if(this.value==="CANCELLED") {
				
				orderLifetimeTypeValue.setText(DCM.Resources.getResource("CancelledLabel"));
				
				OrderPosition.setExpireTime(null);
				
			};
			
		});
		
		orderStopField.input.append(orderStopStepper);
		orderStopField.input.append(orderStopPriceNotification);
		orderStopField.setAttribute("data-deal-ticket-role", "stopField");
		orderStopStepper.addEventHandler("CHANGE", function() {
		
			if(orderStopStepper.value) {
				
				OrderPosition.setStop(orderStopStepper.value);
				calculateStopMarketInformation();
			
			}
			else {
					
				OrderPosition.setStop(null);
				orderStopPriceNotification.setText("");
				
			};
			
			checkOrderFormComplete();
			
		});
		orderStopFieldLabel.setAttribute("title", DCM.Resources.getResource("StopTooltipLabel"));
		orderStopField.label.append(orderStopFieldLabel);
		
		orderLimitField.input.append(orderLimitStepper);
		orderLimitField.input.append(orderLimitPriceNotification);
		orderLimitField.setAttribute("data-deal-ticket-role", "limitField");
		orderLimitStepper.addEventHandler("CHANGE", function() {
		
			if(orderLimitStepper.value) {
				
				OrderPosition.setLimit(orderLimitStepper.value);
				calculateLimitMarketInformation();
				
			}
			else {
			
				OrderPosition.setLimit(null);
				orderLimitPriceNotification.setText("");
				
			};
			
			checkOrderFormComplete();
			
		});
		orderLimitFieldLabel.setAttribute("title", DCM.Resources.getResource("LimitTooltipLabel"));
		orderLimitField.label.append(orderLimitFieldLabel);
		
		viewTabs.addEventHandler("CHANGE", function() {
		
			checkForComplete();
			
			calculateMarketInformation();
		
		});
		viewTabs.setHeight("250px");
		
		sellButton.addEventListener(DCM.Event.click, function() {
		
			if(_this.side!=="SELL"&&!_this.lockedIntoSide) {
				
				setSide("SELL");
				
			}
			else if(!_this.lockedIntoSide) {
			
				setSide(null);
				
			};

			return false;
		
		});
		
		buyButton.addEventListener(DCM.Event.click, function() {
		
			if(_this.side!=="BUY"&&!_this.lockedIntoSide) {
			
				setSide("BUY");
				
			}
			else if(!_this.lockedIntoSide) {
			
				setSide(null);
				
			};
			
			return false;
		
		});
		
		sentiballButton.addEventListener(DCM.Event.click, function() {
			
			_this.resize();
			
			sentiballButton.toggle();
		
		});
		
		graphButton.addEventListener(DCM.Event.click, function() {
			
			MarketPosition.instrument.openChart();
			
		});
		
		notesButton.addEventListener(DCM.Event.click, function() {
			
			DCM.NoteManager.createNoteFromInstrument(_this.MarketPosition.instrument);
		
		});
		
		_this.buttonWrap.prepend(graphButton);
		_this.buttonWrap.prepend(notesButton);
		_this.buttonWrap.prepend(sentiballButton);
		
		_this.setType("HTMLTicketModuleElement");
		
		instrumentTicker.setText(MarketPosition.instrument.getTicker());
		instrumentName.setText(MarketPosition.instrument.getName());
		
		setSharePrice(MarketPosition.instrument.sharePrice + " " + MarketPosition.instrument.currency);
		
		_this.addEventHandler("CLOSE", function() {
			
			_this.destroy();
			
			DCM.TicketManager.tickets.splice(DCM.getIndexOf(DCM.TicketManager.tickets, _this), 1);
			
		});
		
		wizardTabTabsDirection.append(wizardTabTabsDirectionPanel);
		wizardTabTabsDirectionPanel.head.setText("Would you like to<br />BUY or SELL?");
		wizardTabTabsDirectionPanel.body.append(wizardTabTabsDirectionMessageDesc);
		wizardTabTabsDirectionPanel.body.append(wizardTabTabsDirectionMessageBody);
		wizardTabTabsDirectionMessageDesc.setText("<span data-direction=\"BUY\">BUY</span> and <span data-direction=\"SELL\">SELL</span> represent the direction in which you expect the market to move; UP or DOWN.");
		wizardTabTabsDirectionMessageDesc.setAttribute("data-wizard-role", "desc");
		wizardTabTabsDirectionMessageBody.setText("Take a moment to analyse the live <span data-type=\"keyword\">Sentiment</span> of this market, before selecting a direction above.");
		wizardTabTabsDirectionMessageBody.setAttribute("data-wizard-role", "desc");
		
		wizardTabTabsQuantity.append(wizardTabTabsQuantityPanel);
		wizardTabTabsQuantityPanel.body.append(wizardSizeStepper);
		wizardTabTabsQuantityPanel.body.append(wizardTabTabsQuantityMessageBody);
		wizardTabTabsQuantityMessageBody.setAttribute("data-wizard-role", "desc");
		wizardSizeStepper.setAttribute("data-wizard-role", "stepper");
		wizardSizeStepper.addEventHandler("CHANGE", function() {
		
			if(wizardSizeStepper.value) {
			
				WizardPosition.setSize(wizardSizeStepper.value);
				
			}
			else {
				
				WizardPosition.setSize(null);
				
			};
			
			calculateWizardPotentialProfit();
			
			// not sure whether this is required here...
			calculateMarketInformation();
			
		});
		wizardSizeStepper.setValue(1);
		
		wizardTabTabsStop.append(wizardTabTabsStopPanel);
		wizardTabTabsStopPanel.head.setText("Would you like to<br />limit the amount you could lose?");
		wizardTabTabsStopPanel.body.append(wizardStopStepper);
		wizardTabTabsStopPanel.body.append(wizardTabTabsStopBody);
		wizardTabTabsStopBody.setText("By setting a <span data-type=\"keyword\">stop</span>; your position would automatically close if it were to reach a given amount of loss.");
		wizardTabTabsStopBody.setAttribute("data-wizard-role", "desc");
		wizardStopStepper.setAttribute("data-wizard-role", "stepper");
		wizardStopStepper.addEventHandler("CHANGE", function() {
		
			if(tradeStopStepper.value) {
			
				WizardPosition.setStop(tradeStopStepper.value);
			
			}
			else {
			
				WizardPosition.setStop(null);
				
			};
			
			// not sure whether this is required here...
			calculateMarketInformation();
			
		});
		
		wizardTabTabsLimit.append(wizardTabTabsLimitPanel);
		wizardTabTabsLimitPanel.head.setText("Would you like to<br />limit the amount you could profit?");
		wizardTabTabsLimitPanel.body.append(wizardLimitStepper);
		wizardTabTabsLimitPanel.body.append(wizardTabTabsLimitBody);
		wizardTabTabsLimitBody.setText("By setting a <span data-type=\"keyword\">limit</span>; your position would automatically close if it were to reach a given amount of profit.");
		wizardTabTabsLimitBody.setAttribute("data-wizard-role", "desc");
		wizardLimitStepper.setAttribute("data-wizard-role", "stepper");
		wizardLimitStepper.addEventHandler("CHANGE", function() {
		
			if(wizardLimitStepper.value) {
			
				WizardPosition.setLimit(wizardLimitStepper.value);
			
			}
			else {
			
				WizardPosition.setLimit(null);
				
			};
			
			// not sure whether this is required here...
			calculateMarketInformation();
			
		});
		
		wizardTabTabsPrice.append(wizardTabTabsPricePanel);
		wizardTabTabsPricePanel.head.setText("Would you like to<br />wait for a specific price?");
		wizardTabTabsPricePanel.body.append(wizardPriceStepper);
		wizardTabTabsPricePanel.body.append(wizardTabTabsPriceBody);
		wizardPriceStepper.setFixed(MarketPosition.instrument.decimalPlaces);
		wizardPriceStepper.setAttribute("data-wizard-role", "stepper");
		wizardPriceStepper.addEventHandler("CHANGE", function() {
		
			if(wizardPriceStepper.value) {
			
				WizardPosition.setEntryPrice(wizardPriceStepper.value);
			
			}
			else {
			
				WizardPosition.setEntryPrice(null);
				
			};
			
			// not sure whether this is required here...
			calculateMarketInformation();
			
		});
		wizardTabTabsPriceBody.setText("By setting a <span data-type=\"keyword\">price</span>; your position will automatically open when the <span data-type=\"keyword\">market-price</span> matches a given value.");
		wizardTabTabsPriceBody.setAttribute("data-wizard-role", "desc");
		
		wizardTabTabsSummary.append(wizardTabTabsSummaryPanel);
		wizardTabTabsSummaryPanel.head.setText("Transaction Summary");
		wizardTabTabsSummaryPanel.body.append(wizardDetailsTable);
		wizardTabTabsSummaryPanel.body.append(wizardTabTabsSummaryBody);
		wizardTabTabsSummaryBody.setText("Please review your transaction before selecting continue, to place your order.");
		wizardTabTabsSummaryBody.setAttribute("data-wizard-role", "desc");
		
		detailsTablePriceHeading.setText(DCM.Resources.getResource("PriceLabel"));
		detailsTableStopHeading.setText(DCM.Resources.getResource("StopLabel"));
		detailsTableLimitHeading.setText(DCM.Resources.getResource("LimitLabel"));
		detailsTableSizeHeading.setText(DCM.Resources.getResource("SizeLabel"));
		
		wizardDetailsTable.append(sizeRow);
		wizardDetailsTable.append(priceRow);
		wizardDetailsTable.append(stopRow);
		wizardDetailsTable.append(limitRow);
		
		wizardButtonWrap.append(wizardNextButton);
		wizardButtonWrap.append(wizardCancelButton);
		wizardTab.append(wizardButtonWrap);
		wizardButtonWrap.setType("HTMLWizardButtonWrapElement");
		
		wizardNextButton.disable();
		wizardCancelButton.disable();
		
		wizardTab.append(wizardTabTabs);
		wizardTab.navItem.hide();
		wizardTabTabs.nav.hide();
		
		wizardCancelButton.setText("Cancel");
		wizardNextButton.setText("Continue");
		
		wizardNextButton.addEventListener(DCM.Event.click, function() {
			
			if(this.enabled) {
				switch(wizardTabTabs.value) {
					case "DIRECTION":
						wizardTabTabs.setValue("QUANTITY");
						wizardCancelButton.enable();
					break;
					case "QUANTITY":
						wizardTabTabs.setValue("STOP");
					break;
					case "STOP":
						wizardTabTabs.setValue("LIMIT");
					break;
					case "LIMIT":
						wizardTabTabs.setValue("PRICE");
					break;
					case "PRICE":
						wizardTabTabs.setValue("SUMMARY");
						
						detailsTablePriceValue.setText(WizardPosition.getEntryPrice());
						detailsTableStopValue.setText(WizardPosition.getStop());
						detailsTableLimitValue.setText(WizardPosition.getLimit());
						detailsTableSizeValue.setText(WizardPosition.getSize());
						
					break;
					case "SUMMARY":
						// place trade
					break;
					
				};
			};
		});
		
		wizardCancelButton.addEventListener(DCM.Event.click, function() {
		
			if(this.enabled) {
				wizardTabTabs.setValue("DIRECTION");
				wizardCancelButton.disable();
				wizardSizeStepper.setValue(1);
				wizardStopStepper.clear();
				wizardLimitStepper.clear();
				wizardPriceStepper.clear();
			};
			
		});
		
		calculateMarketInformation();
		
		_this.addEventHandler("DESTROY", function() {
			
			MarketPosition.instrument.removeEventHandler("BUY_PRICE_CHANGE", buyPriceChangeHandler);
			MarketPosition.instrument.removeEventHandler("SELL_PRICE_CHANGE", sellPriceChangeHandler);
			MarketPosition.instrument.removeEventHandler("SENTIMENT_CHANGE", sentimentChangeHandler);
			MarketPosition.instrument.removeEventHandler("HIGH_PRICE_CHANGE", highPriceChangeHAndler);
			MarketPosition.instrument.removeEventHandler("LOW_PRICE_CHANGE", LowPriceChangeHAndler);
			MarketPosition.instrument.removeEventHandler("SENTIMENT_HIGH_CHANGE", sentimentHighChangeHandler);
			MarketPosition.instrument.removeEventHandler("SENTIMENT_LOW_CHANGE", sentimentLowChangeHandler);
			MarketPosition.instrument.removeEventHandler("SENTIMENTCHANGE_CHANGE", sentimentDailyChangeHandler);
			
		});
	
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleElement", e);
		
	};
	
};