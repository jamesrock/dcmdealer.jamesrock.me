DCM.HTMLSelectAccountTypeDialogElement = ROCK.createClass(DCM.HTMLStaticMessageDialogElement, function HTMLSelectAccountTypeDialogElement() {

	var 
	_this = this,
	spreadBettingButton = new DCM.HTMLSelectAccountTypeSpreadDialogButtonElement(),
	CFDButton = new DCM.HTMLSelectAccountTypeCFDDialogButtonElement(),
	openAccountUpgradeDialog = function openAccountUpgradeDialog() {
		DCM.AccountManager.openUpgradeAccountDialog();
		_this.close();
	},
	spreadBettingButtonClickHandler = function spreadBettingButtonClickHandler() {
		DCM.accountType = "SB";
		openAccountUpgradeDialog();
	},
	CFDButtonClickHandler = function CFDButtonClickHandler() {
		DCM.accountType = "CFD";
		openAccountUpgradeDialog();
	},
	riskWarning = new DCM.HTMLDisclaimerElement(),
	importantLinks = new DCM.HTMLDivElement();

	importantLinks.setText(DCM.Resources.getResource("UpgradeAccountDisclaimerLinksLabel"));
	
	importantLinks.setType("HTMLLegalDocumentsElement");
	
	_this.continueButton.setText("Cancel");
	_this.setMessage(DCM.Resources.getResource("UpgradeAccountMessageLabel"));
	_this.setHeading(DCM.Resources.getResource("UpgradeAccountHeadingLabel"));
	_this.setType("HTMLSelectAccountTypeDialogElement");
	
	_this.body.append(spreadBettingButton);
	_this.body.append(CFDButton);
	_this.body.append(importantLinks);
	_this.body.append(riskWarning);
	
	spreadBettingButton.addEventListener(DCM.Event.click, spreadBettingButtonClickHandler);
	CFDButton.addEventListener(DCM.Event.click, CFDButtonClickHandler);
	
});