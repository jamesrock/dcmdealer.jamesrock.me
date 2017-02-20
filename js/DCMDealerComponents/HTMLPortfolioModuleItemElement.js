DCM.HTMLPortfolioModuleItemElement = ROCK.createClass(DCM.HTMLTRElement, function HTMLPortfolioModuleItemElement(data, portfolio) {

	var
	_this = this,
	data = _this.data = data,
	prop1,
	prop2,
	portfolio = _this.portfolio = portfolio,
	position = _this.position = DCM.PositionManager.getPositionById(data.id),
	itemHead = new DCM.HTMLDivElement(),
	itemFoot = new DCM.HTMLDivElement(),
	sizeChangeHandler = function sizeChangeHandler() {
		
		itemFoot.setText(position.getSizeAsHTML() + " @ " + position.entryPrice);
		_this.dispatchEventHandler("SIZE_CHANGE");

	},
	profitLossChangeHandler = function profitLossChangeHandler() {
		
		setProfitAndLoss(position.getProfitAndLossAsHTML());

	},
	positionCloseHandler = function positionCloseHandler() {
		
		destroy();

	},
	positionCreateHandler = function positionCreateHandler(_data) {

		// check it's the correct ID
		if(data.id===_data) {
		
			position = _this.position = DCM.PositionManager.getPositionById(_data);
			
			_this.setAttribute("title", position.instrument.getDisplayText());
			
			position.addEventHandler("CLOSE", positionCloseHandler);
			position.addEventHandler("SIZE_CHANGE", sizeChangeHandler).dispatch();
			position.addEventHandler("PROFITLOSS_CHANGE", profitLossChangeHandler).dispatch();
			
			itemHead.setText(position.instrument.getDisplayTextAsHTML());
			
			DCM.PositionManager.removeEventHandler("CREATE", positionCreateHandler);
		
		};
		
	};
	
	DCM.log("new HTMLPortfolioModuleItemElement()", _this);
	
	prop1 = _this.addColumn();
	prop2 = _this.addColumn("-");
	
	if(position) {
		
		positionCreateHandler(data.id);
	
	}
	else {
		
		DCM.PositionManager.addEventHandler("CREATE", positionCreateHandler);
		
	};
	
	itemHead.setAttribute("data-portfolio-item-role", "head");
	itemFoot.setAttribute("data-portfolio-item-role", "foot");
	
	prop1.append(itemHead);
	prop1.append(itemFoot);
	
	_this.addEventListener(DCM.Event.contextmenu, function(e) {
		
		var _contextMenu = new DCM.HTMLPortfolioModuleItemContextMenuElement(_this);
		_contextMenu.setX(e.clientX);
		_contextMenu.setY(e.clientY);
		
		return false;
	
	});
	
	_this.addEventListener(DCM.Event.doubleclick, function() {
		
		editPosition();
		
		return false;
		
	});
	
	/*
	_this.addEventListener(DCM.Event.mouseenter, function() {
	
		position.instrument.dispatchEventHandler("INTERACT_START");
		
		return false;
		
	});
	
	_this.addEventListener(DCM.Event.mouseleave, function() {
	
		position.instrument.dispatchEventHandler("INTERACT_END");
		
		return false;
		
	});
	*/
	/*
	
	position.instrument.addEventHandler("INTERACT_START", function() {
	
		_this.setAttribute("data-interactive", "true");
		
		return false;
		
	});
	
	position.instrument.addEventHandler("INTERACT_END", function() {
	
		_this.setAttribute("data-interactive", "false");
		
		return false;
		
	});
	*/

});
DCM.HTMLPortfolioModuleItemElement.prototype.destroy = function() {
			
	_this.remove();
	
	position.removeEventHandler("CLOSE", positionCloseHandler);
	position.removeEventHandler("SIZE_CHANGE", sizeChangeHandler);
	position.removeEventHandler("PROFITLOSS_CHANGE", profitLossChangeHandler);
	
	_this.dispatchEventHandler("DESTROY");
	
};
DCM.HTMLPortfolioModuleItemElement.prototype.setProfitAndLoss = function(value) {
	
	//DCM.log("HTMLPortfolioModuleItemElement.setProfitAndLoss(" + value + ")");
	if(!value) {
		return;
	};
	prop2.setText(value);
	_this.dispatchEventHandler("PROFITLOSS_CHANGE");

};
DCM.HTMLPortfolioModuleItemElement.prototype.editPosition = function() {
	
	DCM.PositionManager.authorEditPosition(position);

};