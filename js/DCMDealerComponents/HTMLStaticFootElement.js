DCM.HTMLStaticFootElement = ROCK.createClass(function HTMLStaticFootElement() {

	try {

		var
		_this = this,
		inner = new DCM.HTMLDivElement(),
		upgradeButton = new DCM.HTMLButtonElement(),
		message = new DCM.HTMLDivElement(),
		clear = new DCM.HTMLClearElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		_this.setType("HTMLStaticFootElement");
		
		_this.append(inner);
		
		inner.append(message);
		inner.append(upgradeButton);
		inner.append(clear);
		
		upgradeButton.setText(DCM.Resources.getResource("UpgradeAccountFootButtonLabel"));
		
		message.setText(DCM.Resources.getResource("UpgradeAccountFootLabel"));
		message.setAttribute("data-role", "preview-upgrade-message");
		
		upgradeButton.addEventListener(DCM.Event.click, function() {
			
			DCM.AccountManager.openSelectAccountTypeDialog();
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLStaticFootElement", e);
		
	};

};