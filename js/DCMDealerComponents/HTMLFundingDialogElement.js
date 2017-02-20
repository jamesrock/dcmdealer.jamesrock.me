DCM.HTMLFundingDialogElement = ROCK.createClass(DCM.HTMLStaticMessageDialogElement, function HTMLFundingDialogElement() {
		
	var 
	_this = this,
	head = new DCM.HTMLDivElement(),
	body = new DCM.HTMLDivElement(),
	foot = new DCM.HTMLDivElement(),
	table = new DCM.HTMLTableElement(),
	
	heading1 = table.addColumnHeading("&nbsp"),
	heading2 = table.addColumnHeading("Spread Betting"),
	heading3 = table.addColumnHeading("CFD Trading"),
	
	row1 = table.addRow(),
	row1Col1 = row1.addColumn("Address"),
	row1Col2 = row1.addColumn("Lloyds TSB 39<br />Threadneedle Street<br />London<br />EC2R 8AU"),
	row1Col3 = row1.addColumn("Lloyds TSB 39<br />Threadneedle Street<br />London<br />EC2R 8AU"),
	row2 = table.addRow(),
	row2Col1 = row2.addColumn("Account name"),
	row2Col2 = row2.addColumn("IG Index Ltd Client Account"),
	row2Col3 = row2.addColumn("IG Markets Ltd Client Account"),
	row3 = table.addRow(),
	row3Col1 = row3.addColumn("Account number"),
	row3Col2 = row3.addColumn("01870836"),
	row3Col3 = row3.addColumn("02360254"),
	row4 = table.addRow(),
	row4Col1 = row4.addColumn("Sort Code"),
	row4Col2 = row4.addColumn("30-00-09"),
	row4Col3 = row4.addColumn("30-00-09"),
	row5 = table.addRow(),
	row5Col1 = row5.addColumn("IBAN"),
	row5Col2 = row5.addColumn("GB74LOYD30000901870836"),
	row5Col3 = row5.addColumn("GB98LOYD30000902360254"),
	row6 = table.addRow(),
	row6Col1 = row6.addColumn("BIC"),
	row6Col2 = row6.addColumn("LOYDGB21013"),
	row6Col3 = row6.addColumn("LOYDGB21013");
	
	table.setAttribute("data-role", "funding-account-details");
	
	_this.continueButton.setText(DCM.Resources.getResource("CloseLabel"));
	_this.setHeading(DCM.Resources.getResource("FundingDialogHeading"));
	
	head.setText(DCM.Resources.getResource("FundingDialogHead", [{
		placeholder: "ACCOUNT_NUMBER",
		label: DCM.AccountManager.getID()
	}]));
	head.setAttribute("data-role", "funding-head");
	body.setText(DCM.Resources.getResource("FundingDialogBody"));
	body.setAttribute("data-role", "funding-body");
	foot.setText(DCM.Resources.getResource("FundingDialogFoot"));
	foot.setAttribute("data-role", "funding-foot");
	
	_this.setType("HTMLFundingDialogElement");
	
	_this.setWidth(750);
	
	_this.position();
	_this.body.append(head);
	_this.body.append(body);
	_this.body.append(table);
	_this.body.append(foot);
		
});