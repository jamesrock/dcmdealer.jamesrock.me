DCM.HTMLPortfolioModuleElement = ROCK.createClass(DCM.HTMLScrollableModuleElement, function HTMLPortfolioModuleElement(data) {

	// consider re-working the porfolio getters/setters logic

	var
	_this = this,
	items = _this.items = [],
	table = new DCM.HTMLTableElement(),
	foot = new DCM.HTMLModuleFootElement(),
	marketHeading = table.addColumnHeading(DCM.Resources.getResource("MarketLabel")),
	profitAndLossHeading = table.addColumnHeading(DCM.Resources.getResource("ProfitLossLabel")),
	data = _this.data = data,
	profitAndLossToSet,
	considerationToSet;
	
	_this.body.append(foot);
	
	foot.setText(DCM.Resources.getResource("ProfitLossLabel") + ":");
	
	_this.setMoveable(false);
	_this.setUnpinable(false);
	_this.setType("HTMLPortfolioModuleElement");
	_this.setServiceCall("GetPortfolioService");
	_this.serviceCall.setParam("portfolioName", data.title);
	_this.setContextMenu("HTMLPortfolioModuleContextMenuElement");
	
	_this.addEventHandler("UPDATE", function(data) {
	
		table.body.empty();
		
		var positions = data.positions;
		
		for(var position in positions) {
			addPosition(positions[position]);
		};
		
	});
	
	_this.addEventHandler("DESTROY", function() {
	
		DCM.PortfolioManager.portfolios.splice(DCM.getIndexOf(DCM.PortfolioManager.portfolios, _this), 1);
		
	});
	
	_this.update();
	
	_this.scroller.body.append(table);
	_this.scroller.setHeight(120);
	
	table.setAttribute("data-portfolio-role", "table");
	
	setName(data.title);
	setProfitAndLoss(0);
	setConsideration(0);
	
});
DCM.HTMLPortfolioModuleElement.prototype.setName = function(value) {
	
	var val = _this.name = value;
	_this.setHeading(val);

};
DCM.HTMLPortfolioModuleElement.prototype.getProfitAndLoss = function(asNumber) {
		
	var _return = this.profitAndLoss;
	
	if(asNumber) {
		_return = Number(_return);
	}
	else {
		_return = Number(_return).toFixed(2);
	};
	
	return _return;
	
};
DCM.HTMLPortfolioModuleElement.prototype.getProfitAndLossAsHTML = function() {
	
	var 
	directionName,
	numericValue = getProfitAndLoss(true),
	displayValue = getProfitAndLoss(),
	_return;
	
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
DCM.HTMLPortfolioModuleElement.prototype.setProfitAndLoss = function(value) {
	
	//DCM.log("HTMLPortfolioModuleElement.setProfitAndLoss(" + value + ")");
	
	if(DCM.isNull(value)) {
		return;
	};
	
	this.profitAndLoss = value;
	
	foot.setText(DCM.Resources.getResource("ProfitLossLabel") + ": " + this.getProfitAndLossAsHTML());
	this.dispatchEventHandler("PROFITLOSS_CHANGE");
	
};
DCM.HTMLPortfolioModuleElement.prototype.setConsideration = function(value) {
	
	//DCM.log("HTMLPortfolioModuleElement.setConsideration(" + value + ")");
	this.consideration = value;
	this.dispatchEventHandler("CONSIDERATION_CHANGE");

};
DCM.HTMLPortfolioModuleElement.prototype.addPosition = function(data) {
		
	var 
	item = new DCM.HTMLPortfolioModuleItemElement(data, this),
	profitlossChangeHandler = function profitlossChangeHandler() {
	
		profitAndLossToSet = 0;
		
		for(var _item in items) {
			profitAndLossToSet += items[_item].position.getProfitAndLoss(true);
		};
		
		setProfitAndLoss(profitAndLossToSet);
		
	},
	sizeChangeHandler = function sizeChangeHandler() {
	
		considerationToSet = 0;
		
		for(var _item in items) {
			considerationToSet += items[_item].position.consideration;
		};
		
		setConsideration(considerationToSet);
		
	},
	destroyHandler = function destroyHandler() {
	
		items.splice(DCM.getIndexOf(items, item), 1);
		
		profitlossChangeHandler();
		sizeChangeHandler();
		
		item.removeEventHandler("PROFITLOSS_CHANGE", profitlossChangeHandler);
		item.removeEventHandler("SIZE_CHANGE", sizeChangeHandler);
		item.removeEventHandler("DESTROY", destroyHandler);
		
	};
	
	table.body.prepend(item);
	items.push(item);
	
	item.addEventHandler("PROFITLOSS_CHANGE", profitlossChangeHandler).dispatch();
	item.addEventHandler("SIZE_CHANGE", sizeChangeHandler).dispatch();
	item.addEventHandler("DESTROY", destroyHandler);
	
	return item;

};