DCM.PositionManager = new function PositionManager() {

	try {
		
		var
		_this = this,
		positions = _this.positions = [],
		createOpenPosition = _this.createOpenPosition = function createOpenPosition(data) {
			
			var 
			Position = new DCM.Position(data),
			positionElement = new DCM.HTMLPositionsModuleItemElement(Position);
			
			positions.push(Position);
			_this.dispatchEventHandler("CREATE", Position.id);
			return positionElement;
		
		},
		getPositionById = _this.getPositionById = function getPositionById(id) {
			
			var 
			loop = positions.length,
			_return;
			
			while(loop--) {
				if(positions[loop].id===id) {
					_return = positions[loop];
					break;
				};
			};
			
			return _return;
		
		},
		getCurrentPositionIDs = _this.getCurrentPositionIDs = function getCurrentPositionIDs() {
		
			var 
			loop = positions.length,
			_return = [];
			
			while(loop--) {
				_return.push(positions[loop].id);
			};
			
			return _return;
		
		},
		authorEditPosition = _this.authorEditPosition = function authorEditPosition(Position) {
		
			var 
			ticket = Position.instrument.openTicket(),
			stopAndLimitStepperChangeHandler = function stopAndLimitStepperChangeHandler() {
				
				var 
				stopValue = ticket.tradeStopStepper.getValue()||null,
				limitValue = ticket.tradeLimitStepper.getValue()||null;
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					if(stopValue==Position.getStopAsCurrency()&&limitValue==Position.getLimitAsCurrency()) {
						
						ticket.tradeSizeStepper.enable();
						ticket.setMode("CANCEL");
					
					}
					else {
						
						ticket.tradeSizeStepper.disable();
						ticket.setMode("EDIT");
					
					};
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					if(stopValue==Position.getStop()&&limitValue==Position.getLimit()) {
						
						ticket.tradeSizeStepper.enable();
						ticket.setMode("CANCEL");
					
					}
					else {
						
						ticket.tradeSizeStepper.disable();
						ticket.setMode("EDIT");
					
					};
				
				};
				
			},
			tradeSizeStepperChangeHandler = function tradeSizeStepperChangeHandler() {
			
				if(this.getValue()==Position.getSize()) {
				
					ticket.tradeStopStepper.enable();
					ticket.tradeLimitStepper.enable();
					ticket.setMode("CANCEL");
					
				}
				else {
				
					ticket.tradeStopStepper.disable();
					ticket.tradeLimitStepper.disable();
					ticket.setMode("EDIT");
					
				};
				
			};
			
			// create duplicate of current position
			ticket.TradePosition.setStatus(Position.getStatus());
			ticket.TradePosition.setId(Position.getId());
			ticket.TradePosition.setStop(Position.getStop());
			ticket.TradePosition.setLimit(Position.getLimit());
			ticket.TradePosition.setSize(Position.getSize());
			ticket.TradePosition.setEntryPrice(Position.getEntryPrice());
			
			ticket.setLockedIntoSide(true);
			
			ticket.orderTab.disable();
			ticket.wizardTab.disable();
			
			ticket.tradeSizeStepper.setValue(Position.getSize());
			ticket.tradeSizeStepper.setMax(Position.getSize());
			
			if(Position.getStop()) {
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					ticket.tradeStopStepper.setValue(Position.getStopAsCurrency());
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					ticket.tradeStopStepper.setValue(Position.getStop());
				
				};

			};
			
			if(Position.getLimit()) {
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					ticket.tradeLimitStepper.setValue(Position.getLimitAsCurrency());
				
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				
					ticket.tradeLimitStepper.setValue(Position.getLimit());
					
				};
				
			};
			
			ticket.tradeSizeStepper.addEventHandler("CHANGE", tradeSizeStepperChangeHandler);
			ticket.tradeStopStepper.addEventHandler("CHANGE", stopAndLimitStepperChangeHandler);
			ticket.tradeLimitStepper.addEventHandler("CHANGE", stopAndLimitStepperChangeHandler);
			
			if(Position.direction==="BUY") {
				ticket.setSide("SELL");
			}
			else if(Position.direction==="SELL") {
				ticket.setSide("BUY");
			};
			
			ticket.setMode("CANCEL");
			
		},
		publishEditPosition = _this.publishEditPosition = function publishEditPosition() {
			
			
		
		},
		publishClosePosition = _this.publishClosePosition = function publishClosePosition(Position) {
			
			//DCM.log("PositionManager.publishClosePosition()");
			
			var 
			service = new Position.CloseService(),
			closeSuccessHandler = function closeSuccessHandler(data) {
			
				var
				closePositionNotification = new DCM.HTMLNotifyDialogElement(),
				table = new DCM.HTMLTableElement(),
				row1 = table.addRow(),
				row1Col1 = row1.addColumn(DCM.Resources.getResource("PriceLabel")),
				row1Col2 = row1.addColumn(data.price),
				row2 = table.addRow(),
				row2Col1 = row2.addColumn(DCM.Resources.getResource("SizeLabel")),
				row2Col2 = row2.addColumn(data.size),
				row3 = table.addRow(),
				row3Col1 = row3.addColumn(DCM.Resources.getResource("DirectionLabel")),
				row3Col2 = row3.addColumn(data.side),
				row4 = table.addRow(),
				row4Col1 = row4.addColumn(DCM.Resources.getResource("ReferenceNumberLabel")),
				row4Col2 = row4.addColumn(data.ref);
				
				closePositionNotification.setHeading(DCM.Resources.getResource("PositionClosedNotificationHeading"));
				closePositionNotification.setMessage(DCM.Resources.getResource("PositionClosedNotificationBody"));
				closePositionNotification.queue();
				
				closePositionNotification.body.append(table);
				
				// used to use toast but then for some reason a tonne of closing information needs to be displayed
				//DCM.ToastManager.createToast(DCM.Resources.getResource("PositionCloseSuccessLabel"));
				
			},
			closeErrorHandler = function closeErrorHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("PositionCloseErrorLabel"));
				
			},
			closeExceptionHandler = function closeExceptionHandler(exceptionCode) {
				
				if(exceptionCode==="DT0001") {
				
					DCM.AccountManager.openSelectAccountTypeDialog();
					
				}
				else if(exceptionCode==="U0002") {
				
					DCM.AccountManager.openAccountProcessPendingDialog();
					
				}
				else {
					
					DCM.ToastManager.createToast(DCM.Resources.getResource(exceptionCode));
					
				};
				
			};
			
			service.addEventHandler("SUCCESS", closeSuccessHandler);
			service.addEventHandler("EXCEPTION", closeExceptionHandler);
			service.addEventHandler("ERROR", closeErrorHandler);
			service.call();
			
		};
		
		this._super = DCM.EventDispatcher;
		this._super();
		
	}
	catch(e) {
		
		DCM.warn("PositionManager", e);
		
	};
	
};