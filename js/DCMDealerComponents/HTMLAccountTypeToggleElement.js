DCM.HTMLAccountTypeToggleElement = ROCK.createClass(DCM.HTMLRadioButtonGroupElement, function() {

	var
	_this = this,
	CFDItem,
	spreadItem,
	suppressChangeEvent = true;
	
	CFDItem = _this.setItem(DCM.Resources.getResource("SwitchAccountCFDTradingLabel"), "CFD");
	spreadItem = _this.setItem(DCM.Resources.getResource("SwitchAccountSpreadBettingLabel"), "SPREAD");
	
	_this.setType("HTMLAccountTypeToggleElement");
	
	_this.addEventHandler("CHANGE", function() {
		
		if(!suppressChangeEvent&&DCM.AccountManager.getType()!==this.getValue()) {
			DCM.AccountManager.switchAccount();
		};
		
		suppressChangeEvent = false;
		
	});
	
	DCM.AccountManager.addEventHandler("TYPE_CHANGE", function() {
		
		_this.setValue(DCM.AccountManager.type);
		
	});
	
	DCM.AccountManager.addEventHandler("SWITCH_REJECT", function() {
		
		_this.setValue(DCM.AccountManager.type);
		
	});

});