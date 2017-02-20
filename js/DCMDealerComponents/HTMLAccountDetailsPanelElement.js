DCM.HTMLAccountDetailsPanelElement = ROCK.createClass(DCM.HTMLDivElement, function() {

	var 
	_this = this,
	detailsRow = new DCM.HTMLRowElement(),
	fundsRow = detailsRow.addColumn(),
	fundsRowHeading = new DCM.HTMLHeadingElement(),
	fundsRowValue = new DCM.HTMLDivElement(),
	equityRow = detailsRow.addColumn(),
	equityRowHeading = new DCM.HTMLHeadingElement(),
	equityRowValue = new DCM.HTMLDivElement(),
	marginRow = detailsRow.addColumn(),
	marginRowHeading = new DCM.HTMLHeadingElement(),
	marginRowValue = new DCM.HTMLDivElement(),
	profitLossRow = detailsRow.addColumn(),
	profitLossRowHeading = new DCM.HTMLHeadingElement(),
	profitLossRowValue = new DCM.HTMLDivElement();
	
	_this.setType("HTMLAccountDetailsPanelElement");
	
	fundsRowHeading.setText(DCM.Resources.getResource("FundsLabel"));
	fundsRow.append(fundsRowValue);
	fundsRow.append(fundsRowHeading);
	fundsRowHeading.setSize("extra-small");
	fundsRowHeading.setRole("orange-uppercase");
	
	equityRowHeading.setText(DCM.Resources.getResource("EquityLabel"));
	equityRow.append(equityRowValue);
	equityRow.append(equityRowHeading);
	equityRowHeading.setSize("extra-small");
	equityRowHeading.setRole("orange-uppercase");
	
	marginRowHeading.setText(DCM.Resources.getResource("MarginLabel"));
	marginRow.append(marginRowValue);
	marginRow.append(marginRowHeading);
	marginRowHeading.setSize("extra-small");
	marginRowHeading.setRole("orange-uppercase");
	
	profitLossRowHeading.setText(DCM.Resources.getResource("ProfitLossLabel"));
	profitLossRow.append(profitLossRowValue);
	profitLossRow.append(profitLossRowHeading);
	profitLossRowHeading.setSize("extra-small");
	profitLossRowHeading.setRole("orange-uppercase");
	
	_this.append(detailsRow);
	
	DCM.AccountManager.addEventHandler("MARGIN_CHANGE", function() {
	
		marginRowValue.setText(DCM.AccountManager.getMargin());
		
	});

	DCM.AccountManager.addEventHandler("FUNDS_CHANGE", function() {
		
		fundsRowValue.setText(DCM.AccountManager.getFunds());
		
	});
	
	DCM.AccountManager.addEventHandler("PROFITLOSS_CHANGE", function() {
		
		profitLossRowValue.setText(DCM.AccountManager.getProfitLoss());
		
	});
	
	DCM.AccountManager.addEventHandler("EQUITY_CHANGE", function() {
		
		equityRowValue.setText(DCM.AccountManager.getEquity());
		
	});

});