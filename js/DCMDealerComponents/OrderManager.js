DCM.OrderManager = new function OrderManager() {

	try {
		
		var
		_this = this,
		orders = _this.orders = [],
		createOrder = _this.createOrder = function createOrder(data) {
			var
			Order = new DCM.Position(data),
			orderElement = new DCM.HTMLOrdersModuleItemElement(Order);
			orders.push(Order);
			_this.dispatchEventHandler("CREATE");
			return orderElement;
		},
		getOrderById = _this.getOrderById = function getOrderById(id) {
			var 
			loop = orders.length,
			_return;
			while(loop--) {
				if(orders[loop].id===id) {
					_return = orders[loop];
					break;
				};
			};
			return _return;
		},
		getCurrentOrderIDs = _this.getCurrentOrderIDs = function getCurrentOrderIDs() {
			var 
			loop = orders.length,
			_return = [];
			while(loop--) {
				_return.push(orders[loop].id);
			};
			return _return;
		},
		authorEditOrder = _this.authorEditOrder = function authorEditOrder(Order) {
		
			var 
			ticket = Order.instrument.openTicket(),
			stopAndLimitStepperChangeHandler = function stopAndLimitStepperChangeHandler() {
				
				var 
				stopValue = ticket.orderStopStepper.getValue()||null,
				limitValue = ticket.orderLimitStepper.getValue()||null;
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					if(stopValue==Order.getStopAsCurrency()&&limitValue==Order.getLimitAsCurrency()) {
					
						ticket.orderSizeStepper.enable();
						ticket.setMode("CANCEL");
					
					}
					else {
					
						ticket.orderSizeStepper.disable();
						ticket.setMode("EDIT");
					
					};
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					if(stopValue==Order.getStop()&&limitValue==Order.getLimit()) {
					
						ticket.orderSizeStepper.enable();
						ticket.setMode("CANCEL");
					
					}
					else {
					
						ticket.orderSizeStepper.disable();
						ticket.setMode("EDIT");
					
					};
				
				};
				
			},
			orderSizeStepperChangeHandler = function orderSizeStepperChangeHandler() {
			
				if(this.getValue()==Order.getSize()) {
				
					ticket.orderStopStepper.enable();
					ticket.orderLimitStepper.enable();
					ticket.setMode("CANCEL");
					
				}
				else {
				
					ticket.orderStopStepper.disable();
					ticket.orderLimitStepper.disable();
					ticket.setMode("EDIT");
					
				};
				
			},
			orderPriceStepperChangeHandler = function orderPriceStepperChangeHandler() {
			
				if(this.getValue()==Order.getEntryPrice()) {
				
					ticket.orderStopStepper.enable();
					ticket.orderLimitStepper.enable();
					ticket.setMode("CANCEL");
					
				}
				else {
				
					ticket.orderStopStepper.disable();
					ticket.orderLimitStepper.disable();
					ticket.setMode("EDIT");
					
				};
				
			};
			
			// create duplicate of current Order
			ticket.OrderPosition.setStatus(Order.getStatus());
			ticket.OrderPosition.setId(Order.getId());
			ticket.OrderPosition.setStop(Order.getStop());
			ticket.OrderPosition.setLimit(Order.getLimit());
			ticket.OrderPosition.setSize(Order.getSize());
			ticket.OrderPosition.setEntryPrice(Order.getEntryPrice());
			ticket.OrderPosition.setType(Order.getType());
			
			ticket.setLockedIntoSide(true);
			
			ticket.viewTabs.setValue("ORDER");
			
			ticket.tradeTab.disable();
			ticket.wizardTab.disable();
			
			ticket.orderSizeStepper.setValue(Order.getSize());
			ticket.orderSizeStepper.setMax(Order.getSize());
			
			ticket.orderPriceStepper.setValue(Order.getEntryPrice());
			
			if(Order.getStop()) {
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					ticket.orderStopStepper.setValue(Order.getStopAsCurrency());
					
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
					
					ticket.orderStopStepper.setValue(Order.getStop());
				
				};

			};
			
			if(Order.getLimit()) {
				
				if(DCM.AccountManager.stopsAndLimitsType==="CURRENCY") {
				
					ticket.orderLimitStepper.setValue(Order.getLimitAsCurrency());
				
				}
				else if(DCM.AccountManager.stopsAndLimitsType==="POINTS") {
				
					ticket.orderLimitStepper.setValue(Order.getLimit());
					
				};
				
			};
			
			ticket.orderSizeStepper.addEventHandler("CHANGE", orderSizeStepperChangeHandler);
			ticket.orderPriceStepper.addEventHandler("CHANGE", orderPriceStepperChangeHandler);
			ticket.orderStopStepper.addEventHandler("CHANGE", stopAndLimitStepperChangeHandler);
			ticket.orderLimitStepper.addEventHandler("CHANGE", stopAndLimitStepperChangeHandler);
			
			if(Order.direction==="BUY") {
				ticket.setSide("SELL");
			}
			else if(Order.direction==="SELL") {
				ticket.setSide("BUY");
			};
			
			ticket.setMode("CANCEL");
			
		},
		publishCloseOrder = _this.publishCloseOrder = function publishCloseOrder(Order) {
			
			DCM.log("PositionManager.publishCloseOrder()");
			
			var 
			service = new Order.CloseService(),
			closeSuccessHandler = function closeSuccessHandler() {
		
				DCM.ToastManager.createToast(DCM.Resources.getResource("OrderCloseSuccessLabel"));
				
			},
			closeErrorHandler = function closeErrorHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("OrderCloseErrorLabel"));
				
			};
			
			service.addEventHandler("SUCCESS", closeSuccessHandler);
			service.addEventHandler("EXCEPTION", closeErrorHandler);
			service.addEventHandler("ERROR", closeErrorHandler);
			service.call();
			
		};
		
		this._super = DCM.EventDispatcher;
		this._super();
		
	}
	catch(e) {
		
		DCM.warn("OrderManager", e);
		
	};
	
};