DCM.HTMLAlertsModuleItemDialogElement = ROCK.createClass(DCM.HTMLDynamicDialogElement, function() {

	var 
	_this = this,
	alertMeWhenLabel = _this.alertMeWhenLabel = new DCM.HTMLDivElement(),
	propertySelect = _this.propertySelect = new DCM.HTMLSelectMenuElement(),
	isLabel = new DCM.HTMLDivElement(),
	conditionSelect = _this.conditionSelect = new DCM.HTMLSelectMenuElement(),
	valueInput = _this.valueInput = new DCM.HTMLNumericStepperElement(),
	row = new DCM.HTMLRowElement(),
	col1 = row.addColumn(),
	col2 = row.addColumn(),
	col3 = row.addColumn(),
	col4 = row.addColumn(),
	message = _this.message = new DCM.HTMLCustomTextAreaElement(),
	instrumentHolder = _this.instrumentHolder = new DCM.HTMLDivElement(),
	buyPriceItem = propertySelect.setItem(DCM.Resources.getResource("BuyPriceLabel"), "1"),
	sellPriceItem = propertySelect.setItem(DCM.Resources.getResource("SellPriceLabel"), "2"),
	sentimentItem = propertySelect.setItem(DCM.Resources.getResource("SentimentLabel"), "3"),
	priceChangeHandler = function priceChangeHandler() {
	
		buyPriceItem.setLabel(DCM.Resources.getResource("BuyPriceLabel") + " [" + _this.instrument.buyPrice + "]");
		sellPriceItem.setLabel(DCM.Resources.getResource("SellPriceLabel") + " [" + _this.instrument.sellPrice + "]");
		sentimentItem.setLabel(DCM.Resources.getResource("SentimentLabel") + " [" + _this.instrument.sentiment + "]");
		
	},
	notifyByEmailCheckbox = _this.notifyByEmailCheckbox = new DCM.HTMLCheckboxElement(),
	notifyBySMSCheckbox = _this.notifyBySMSCheckbox = new DCM.HTMLCheckboxElement();
	
	_this.setAttribute("data-dialog-role", "alert");
	
	_this.instrument.subscribe();
	_this.instrument.addEventHandler("PRICE_CHANGE", priceChangeHandler);
	priceChangeHandler();
	
	_this.setType("HTMLAlertsModuleItemDialogElement");
	
	col1.append(propertySelect);
	col2.append(isLabel);
	col3.append(conditionSelect);
	col4.append(valueInput);
	
	_this.body.append(instrumentHolder);
	_this.body.append(alertMeWhenLabel);
	_this.body.append(row);
	_this.body.append(message);
	_this.body.append(notifyByEmailCheckbox);
	_this.body.append(notifyBySMSCheckbox);
	
	notifyByEmailCheckbox.setLabel(DCM.Resources.getResource("AlertNotifyEmailLabel"));
	notifyBySMSCheckbox.setLabel(DCM.Resources.getResource("AlertNotifySMSLabel"));
	
	message.setAttribute("data-alert-role", "message");
	message.setPlaceholder(DCM.Resources.getResource("AlertMessagePlaceholderLabel"));
	
	instrumentHolder.setAttribute("data-alert-role", "instrument");
	row.setAttribute("data-alert-role", "conditions");
	
	alertMeWhenLabel.setAttribute("data-alert-role", "alert-me-when");
	alertMeWhenLabel.setText(DCM.Resources.getResource("AlertMeWhenLabel"));
	isLabel.setText(DCM.Resources.getResource("AlertIsLabel"));
	
	propertySelect.setValue("1");
	propertySelect.setWidth(135);
	propertySelect.addEventHandler("CHANGE", function() {
		
		var selected = propertySelect.getValue();
		
		if(selected==="1") {
			
		}
		else if(selected==="2") {
			
		}
		else if(selected==="3") {
			valueInput.setMin(0);
			valueInput.setMax(100);
		};
		
	});
	
	conditionSelect.setItem(DCM.Resources.getResource("AlertHigherThanLabel"), "1");
	conditionSelect.setItem(DCM.Resources.getResource("AlertLowerThanLabel"), "2");
	conditionSelect.setValue("1");
	conditionSelect.setWidth(112);

});