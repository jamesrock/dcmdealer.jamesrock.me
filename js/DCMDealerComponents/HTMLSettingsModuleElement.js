DCM.HTMLSettingsModuleElement = ROCK.createClass(function HTMLSettingsModuleElement() {

	try {
		
		var
		_this = this,
		body = new DCM.HTMLDivElement(),
		form = new DCM.HTMLFormElement(),
		fulllNameField = form.addField(),
		emailField = form.addField(),
		accountID = form.addField(),
		stopsAndLimitsTypeField = form.addField(),
		stopsAndLimitsType = new DCM.HTMLInlineRadioButtonGroupElement(),
		stopsAndLimitsTypePoints = stopsAndLimitsType.setItem(DCM.Resources.getResource("SettingsStopsAndLimitsTypePointsLabel"), "POINTS"),
		stopsAndLimitsTypeCurrency = stopsAndLimitsType.setItem(DCM.Resources.getResource("CurrencyLabel"), "CURRENCY"),
		stopsAndLimitsDisclaimer = new DCM.HTMLDivElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		_this.setType("HTMLSettingsModuleElement");
		
		body.setAttribute("data-settings-role", "body");
		
		_this.append(body);
		
		fulllNameField.label.setText(DCM.Resources.getResource("FullNameLabel"));
		
		emailField.label.setText(DCM.Resources.getResource("EmailAddressLabel"));
		
		accountID.label.setText(DCM.Resources.getResource("AccountIDLabel"));
		
		body.append(form);
		body.append(stopsAndLimitsDisclaimer);
		
		stopsAndLimitsDisclaimer.setText(DCM.Resources.getResource("SettingsStopsAndLimitsTypeDiscliamerLabel"));
		
		stopsAndLimitsType.setValue("POINTS");
		
		stopsAndLimitsTypeField.label.setText(DCM.Resources.getResource("SettingsStopsAndLimitsTypeLabel") + "*");
		stopsAndLimitsTypeField.input.append(stopsAndLimitsType);
		
		stopsAndLimitsType.addEventHandler("CHANGE", function() {
			
			DCM.AccountManager.setStopsAndLimitsType(stopsAndLimitsType.getValue());
			
		});
		
		DCM.AccountManager.addEventHandler("NAME_CHANGE", function() {
			
			fulllNameField.input.setText(DCM.AccountManager.name);
			
		});
		
		DCM.AccountManager.addEventHandler("ID_CHANGE", function() {

			accountID.input.setText(DCM.AccountManager.id);
			
		});
		
		DCM.AccountManager.addEventHandler("EMAIL_CHANGE", function() {
			
			emailField.input.setText(DCM.AccountManager.emailAddress);
		
		});
		
	}
	catch(e) {
	
		DCM.warn("HTMLSettingsModuleElement", e);
		
	};
	
};