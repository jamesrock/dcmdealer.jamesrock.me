DCM.HTMLUpgradeAccountDialogElement = ROCK.createClass(DCM.HTMLUpgradeDialogElement, function HTMLUpgradeAccountDialogElement() {
	
	var 
	_this = this,
	tabGroup = new DCM.HTMLTabGroupElement(),
	personalDetailsTab = tabGroup.addTab(DCM.Resources.getResource("UpgradeAccountPersonalTabLabel"), "PERSONAL"),
	personalTabNumber = new DCM.HTMLDivElement(),
	addressTab = tabGroup.addTab(DCM.Resources.getResource("UpgradeAccountAddressTabLabel"), "ADDRESS"),
	addressTabNumber = new DCM.HTMLDivElement(),
	experianceTab = tabGroup.addTab(DCM.Resources.getResource("UpgradeAccountExperianceTabLabel"), "EXPERIANCE"),
	experianceTabNumber = new DCM.HTMLDivElement(),
	finaancialDetailsTab = tabGroup.addTab(DCM.Resources.getResource("UpgradeAccountFinancialTabLabel"), "FINANCIAL"),
	financialTabNumber = new DCM.HTMLDivElement(),
	finishTab = tabGroup.addTab(DCM.Resources.getResource("UpgradeAccountReviewTabLabel"), "FINISH"),
	finishTabNumber = new DCM.HTMLDivElement(),
	personalDetailsFrom = new DCM.HTMLFormElement(),
	addressForm = new DCM.HTMLFormElement(),
	experianceForm = new DCM.HTMLFormElement(),
	finaancialDetailsForm = new DCM.HTMLFormElement(),
	
	fullNameField = personalDetailsFrom.addField(),
	fullNameTitleInput = new DCM.HTMLCustomInlineTextInputElement(),
	fullNameFirstNameInput = new DCM.HTMLCustomInlineTextInputElement(),
	fullNameLastNameInput = new DCM.HTMLCustomInlineTextInputElement(),
	
	dateOfBirthField = personalDetailsFrom.addField(),
	dateOfBirthDayInput = new DCM.HTMLCustomInlineNumericInputElement(),
	dateOfBirthMonthInput = new DCM.HTMLCustomInlineNumericInputElement(),
	dateOfBirthYearInput = new DCM.HTMLCustomInlineNumericInputElement(),
	
	contactField = personalDetailsFrom.addField(),
	contactPrimaryNumberInput = new DCM.HTMLCustomInlineNumericInputElement(),
	contactMobileNumberInput = new DCM.HTMLCustomInlineNumericInputElement(),
	contactEmailInput = new DCM.HTMLCustomTextInputElement(),
	
	employmentField = personalDetailsFrom.addField(),
	employmentTypeRadioButtonGroup = new DCM.HTMLInlineRadioButtonGroupElement(),
	occupationInput = new DCM.HTMLCustomInlineTextInputElement(),
	industryInput = new DCM.HTMLCustomInlineTextInputElement(),
	
	addressField = addressForm.addField(),
	addressFirstLineInput = new DCM.HTMLCustomTextInputElement(),
	addressSecondLineInput = new DCM.HTMLCustomTextInputElement(),
	addressCityInput = new DCM.HTMLCustomInlineTextInputElement(),
	addressPostcodeInput = new DCM.HTMLCustomInlineTextInputElement(),
	addressCountryInput = new DCM.HTMLCustomInlineTextInputElement(),
	
	addressTimeAtField = addressForm.addField(),
	addressTimeAtYearsInput = new DCM.HTMLCustomInlineNumericInputElement(),
	addressTimeAtMonthsInput = new DCM.HTMLCustomInlineNumericInputElement(),
	
	previousAddressField = addressForm.addField(),
	previousAddressFirstLineInput = new DCM.HTMLCustomTextInputElement(),
	previousAddressSecondLineInput = new DCM.HTMLCustomTextInputElement(),
	previousAddressCityInput = new DCM.HTMLCustomInlineTextInputElement(),
	previousAddressPostcodeInput = new DCM.HTMLCustomInlineTextInputElement(),
	previousAddressCountryInput = new DCM.HTMLCustomInlineTextInputElement(),
	
	whatHaveYouTradedField = experianceForm.addField(),
	whatHaveYouTradedForm = new DCM.HTMLFormElement(),
	sharesOrBonds = whatHaveYouTradedForm.addField(),
	sharesOrBondsRadioGroup = new DCM.HTMLInlineRadioButtonGroupElement(),
	optionsTrading = whatHaveYouTradedForm.addField(),
	optionsTradingRadioGroup = new DCM.HTMLInlineRadioButtonGroupElement(),
	spreadBetting = whatHaveYouTradedForm.addField(),
	spreadBettingRadioGroup = new DCM.HTMLInlineRadioButtonGroupElement(),
	howHaveYouTradedField = experianceForm.addField(),
	howHaveYouTradedRadioGroup = new DCM.HTMLInlineRadioButtonGroupElement(),
	qualificationsField = experianceForm.addField(),
	qualificationsInput = new DCM.HTMLCustomTextInputElement(),
	occupationalExperianceCheckBox = new DCM.HTMLCheckboxElement(),
	qualificationsCheckBox = new DCM.HTMLCheckboxElement(),
	
	incomeBeforeTaxField = finaancialDetailsForm.addField(),
	incomeBeforeTaxInput = new DCM.HTMLCustomNumericInputElement(),
	savingsAndInvestmentsField = finaancialDetailsForm.addField(),
	savingsAndInvestmentsInput = new DCM.HTMLCustomNumericInputElement(),
	sourceOfFundsField = finaancialDetailsForm.addField(),
	sourceOfFundsRadioButtonGroup = new DCM.HTMLInlineRadioButtonGroupElement(),
	sourceOfFundsInput = new DCM.HTMLCustomTextInputElement(),
	statementsField = finaancialDetailsForm.addField(),
	statementsCheckBox = new DCM.HTMLCheckboxElement(),
	sendDataButton = new DCM.HTMLButtonElement(),
	finishMessage = new DCM.HTMLDivElement(),
	finishMessageFoot = new DCM.HTMLDivElement(),
	serviceCaller = new DCM.GenerateRegistrationFormService(),
	formURL,
	personalCompleteChecker = function personalCompleteChecker() {
		
		var 
		title = fullNameTitleInput.getValue(),
		firstName = fullNameFirstNameInput.getValue(),
		lastName = fullNameLastNameInput.getValue(),
		DOBDay = dateOfBirthDayInput.getValue(),
		DOBMonth = dateOfBirthMonthInput.getValue(),
		DOBYear = dateOfBirthYearInput.getValue(),
		contactNumber = contactPrimaryNumberInput.getValue(),
		email = contactEmailInput.getValue(),
		employmentStatus = employmentTypeRadioButtonGroup.getValue(),
		occupation = occupationInput.getValue(),
		industry = industryInput.getValue();
		
		if(title&&firstName&&lastName&&DOBDay&&DOBMonth&&DOBYear&&contactNumber&&email&&employmentStatus) {
			_this.forwardButton.enable();
			personalTabNumber.setAttribute("data-status", "complete");
			addressTab.enable();
		}
		else {
			_this.forwardButton.disable();
			personalTabNumber.setAttribute("data-status", "incomplete");
			addressTab.disable();
		};
		
	},
	addressCompleteChecker = function addressCompleteChecker() {
	
		var
		firtsLine = addressFirstLineInput.getValue(),
		secondLine = addressSecondLineInput.getValue(),
		town = addressCityInput.getValue(),
		postcode = addressPostcodeInput.getValue(),
		country = addressCountryInput.getValue(),
		timeAtYears = addressTimeAtYearsInput.getValue(),
		timeAtMonths = addressTimeAtMonthsInput.getValue();
		
		if(firtsLine&&town&&postcode&&country&&(timeAtYears||timeAtMonths)) {
			_this.forwardButton.enable();
			addressTabNumber.setAttribute("data-status", "complete");
			experianceTab.enable();
		}
		else {
			_this.forwardButton.disable();
			addressTabNumber.setAttribute("data-status", "incomplete");
			experianceTab.disable();
		};
		
	},
	experianceCompleteChecker = function experianceCompleteChecker() {
	
		var
		sharesOrBonds = sharesOrBondsRadioGroup.getValue(),
		exchangeTrading = optionsTradingRadioGroup.getValue(),
		OCTTrading = spreadBettingRadioGroup.getValue(),
		howTraded = howHaveYouTradedRadioGroup.getValue(),
		occupationalExp = occupationalExperianceCheckBox.getChecked(),
		qualifications = qualificationsCheckBox.getChecked(),
		releventExp = qualificationsInput.getValue();
		
		if(sharesOrBonds&&exchangeTrading&&OCTTrading&&howTraded&&(occupationalExp||qualifications||releventExp)) {
			_this.forwardButton.enable();
			experianceTabNumber.setAttribute("data-status", "complete");
			finaancialDetailsTab.enable();
		}
		else {
			_this.forwardButton.disable();
			experianceTabNumber.setAttribute("data-status", "incomplete");
			finaancialDetailsTab.disable();
		};
		
	},
	financialCompleteChecker = function financialCompleteChecker() {
		
		var
		income = incomeBeforeTaxInput.getValue(),
		savings = savingsAndInvestmentsInput.getValue(),
		fundSource = sourceOfFundsRadioButtonGroup.getValue(),
		otherFundSorce = sourceOfFundsInput.getValue();
		
		if(income&&savings&&(fundSource||otherFundSorce)) {
			_this.forwardButton.enable();
			financialTabNumber.setAttribute("data-status", "complete");
			finishTab.enable();
		}
		else {
			_this.forwardButton.disable();
			financialTabNumber.setAttribute("data-status", "incomplete");
			finishTab.disable();
		};
		
	},
	personalChangeHandler = function personalChangeHandler() {
		personalCompleteChecker();
	},
	addressChangeHandler = function addressChangeHandler() {
		addressCompleteChecker();
	},
	experianceChangeHandler = function experianceChangeHandler() {
		experianceCompleteChecker();
	},
	financialChangeHandler = function financialChangeHandler() {
		financialCompleteChecker();
	},
	lineElement = new DCM.HTMLDivElement(),
	tabGroupChangeHandler = function tabGroupChangeHandler() {
		
		switch(tabGroup.value) {
			case "PERSONAL":
				personalCompleteChecker();
				//DCM.log(DCM.accountType + "_Personal");
				_gaq.push(["_trackPageview", "/SB_Personal"]);
				_this.backButton.disable();
				//_this.forwardButton.enable();
			break;
			case "ADDRESS":
				addressCompleteChecker();
				//DCM.log(DCM.accountType + "_Address");
				_gaq.push(["_trackPageview", "/SB_Address"]);
				_this.backButton.enable();
				//_this.forwardButton.enable();
			break;
			case "EXPERIANCE":
				experianceCompleteChecker();
				//DCM.log(DCM.accountType + "_Experience");
				_gaq.push(["_trackPageview", "/SB_Experience"]);
				_this.backButton.enable();
				//_this.forwardButton.enable();
			break;
			case "FINANCIAL":
				financialCompleteChecker();
				//DCM.log(DCM.accountType + "_Financial");
				_gaq.push(["_trackPageview", "/SB_Financial"]);
				_this.backButton.enable();
				//_this.forwardButton.enable();
			break;
			case "FINISH":
				//DCM.log(DCM.accountType + "_Download");
				_gaq.push(["_trackPageview", "/SB_Download"]);
				_this.backButton.enable();
				_this.forwardButton.disable();
				
				serviceCaller.setParam("title", fullNameTitleInput.getValue());	
				serviceCaller.setParam("forename", fullNameFirstNameInput.getValue());
				serviceCaller.setParam("surname", fullNameLastNameInput.getValue());
				serviceCaller.setParam("dob", dateOfBirthDayInput.getValue() + "/" + dateOfBirthMonthInput.getValue() + "/" + dateOfBirthYearInput.getValue());
				serviceCaller.setParam("tele", contactPrimaryNumberInput.getValue());
				serviceCaller.setParam("mobile", contactMobileNumberInput.getValue());
				serviceCaller.setParam("emailAddress", contactEmailInput.getValue());
				serviceCaller.setParam("employState", employmentTypeRadioButtonGroup.getValue());
				serviceCaller.setParam("occupation", occupationInput.getValue());
				serviceCaller.setParam("industry", industryInput.getValue());
				serviceCaller.setParam("homeAddress", addressFirstLineInput.getValue() + " " + addressSecondLineInput.getValue());
				serviceCaller.setParam("city", addressCityInput.getValue());
				serviceCaller.setParam("postcode", addressPostcodeInput.getValue());
				serviceCaller.setParam("country", addressCountryInput.getValue());
				serviceCaller.setParam("timeAddY", addressTimeAtYearsInput.getValue());
				serviceCaller.setParam("timeAddM", addressTimeAtMonthsInput.getValue());
				serviceCaller.setParam("addressPrev", previousAddressFirstLineInput.getValue() + " " + previousAddressSecondLineInput.getValue());
				serviceCaller.setParam("cityPrev", previousAddressCityInput.getValue());
				serviceCaller.setParam("postcodePrev", previousAddressPostcodeInput.getValue());
				serviceCaller.setParam("countryPrev", previousAddressCountryInput.getValue());
				serviceCaller.setParam("income", incomeBeforeTaxInput.getValue());
				serviceCaller.setParam("investments", savingsAndInvestmentsInput.getValue());
				serviceCaller.setParam("fundSource", (function() {
					
					var 
					sourceOfFundsRadioButtonGroupValue = sourceOfFundsRadioButtonGroup.getValue(),
					_return = sourceOfFundsRadioButtonGroupValue;
					
					if(!_return) {
						_return = sourceOfFundsInput.getValue();
					};
					
					return _return;
					
				})());
				serviceCaller.setParam("statement", statementsCheckBox.getChecked());
				serviceCaller.setParam("expShares", sharesOrBondsRadioGroup.getValue());
				serviceCaller.setParam("expExchange", optionsTradingRadioGroup.getValue());
				serviceCaller.setParam("expOtc", spreadBettingRadioGroup.getValue());
				serviceCaller.setParam("occupational", occupationalExperianceCheckBox.getChecked());
				serviceCaller.setParam("occQual", qualificationsCheckBox.getChecked());
				serviceCaller.setParam("tradedBefore", howHaveYouTradedRadioGroup.getValue());
				serviceCaller.setParam("desOfQual", qualificationsInput.getValue());
				serviceCaller.setParam("accountTypeRequested", DCM.accountType);
				
				sendDataButton.setText(DCM.Resources.getResource("GeneratingApplicationFormLabel"));
				sendDataButton.disable();
			
				serviceCaller.call();
				
			break;
		};
		
	},
	previousHandler = function previousHandler() {
	
		switch(tabGroup.value) {
			case "FINISH":
				tabGroup.setValue("FINANCIAL");
			break;
			case "FINANCIAL":
				tabGroup.setValue("EXPERIANCE");
			break;
			case "EXPERIANCE":
				tabGroup.setValue("ADDRESS");
			break;
			case "ADDRESS":
				tabGroup.setValue("PERSONAL");
			break;
		};
		
		return false;
	
	},
	nextHandler = function nextHandler() {
	
		switch(tabGroup.value) {
			case "PERSONAL":
				tabGroup.setValue("ADDRESS");
			break;
			case "ADDRESS":
				tabGroup.setValue("EXPERIANCE");
			break;
			case "EXPERIANCE":
				tabGroup.setValue("FINANCIAL");
			break;
			case "FINANCIAL":
				tabGroup.setValue("FINISH");
			break;
			case "FINISH":
				finishTabNumber.setAttribute("data-status", "complete");
				_this.close();
			break;
		};
		
		return false;
	
	};
	
	lineElement.setAttribute("data-role", "step-line");
	
	tabGroup.nav.prepend(lineElement);
	
	personalTabNumber.setText("1");
	personalDetailsTab.navItem.prepend(personalTabNumber);
	
	addressTabNumber.setText("2");
	addressTab.navItem.prepend(addressTabNumber);
	
	experianceTabNumber.setText("3");
	experianceTab.navItem.prepend(experianceTabNumber);
	
	financialTabNumber.setText("4");
	finaancialDetailsTab.navItem.prepend(financialTabNumber);
	
	finishTabNumber.setText("5");
	finishTab.navItem.prepend(finishTabNumber);
	
	personalTabNumber.setAttribute("data-tab-role", "number");
	addressTabNumber.setAttribute("data-tab-role", "number");
	experianceTabNumber.setAttribute("data-tab-role", "number");
	financialTabNumber.setAttribute("data-tab-role", "number");
	finishTabNumber.setAttribute("data-tab-role", "number");
	
	addressTab.disable();
	experianceTab.disable();
	finaancialDetailsTab.disable();
	finishTab.disable();
	
	_this.body.append(tabGroup);
	_this.setHeading(DCM.Resources.getResource("UpgradeAccountLabel"));
	_this.setType("HTMLUpgradeAccountDialogElement");
	_this.setSuppressCloseOnContinue(true);
	
	personalCompleteChecker();
	
	tabGroup.setHeight("450px");
	
	tabGroup.addEventHandler("CHANGE", tabGroupChangeHandler);
	tabGroupChangeHandler();
	
	_this.addEventHandler("NEXT", nextHandler);
	_this.addEventHandler("PREVIOUS", previousHandler);
	
	personalDetailsTab.append(personalDetailsFrom);
	addressTab.append(addressForm);
	experianceTab.append(experianceForm);
	finaancialDetailsTab.append(finaancialDetailsForm);

	fullNameField.label.setText(DCM.Resources.getResource("FullNameLabel"));
	fullNameField.input.append(fullNameTitleInput);
	fullNameTitleInput.setPlaceholder(DCM.Resources.getResource("TitleLabel"));
	fullNameTitleInput.setAttribute("data-role", "title");
	fullNameTitleInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
	
	fullNameField.input.append(fullNameFirstNameInput);
	fullNameFirstNameInput.setPlaceholder(DCM.Resources.getResource("FirstNameLabel"));
	fullNameFirstNameInput.setAttribute("data-role", "first-name");
	fullNameFirstNameInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
	fullNameFirstNameInput.setValue(DCM.AccountManager.firstName);
	
	fullNameField.input.append(fullNameLastNameInput);
	fullNameLastNameInput.setPlaceholder(DCM.Resources.getResource("LastNameLabel"));
	fullNameLastNameInput.setAttribute("data-role", "last-name");
	fullNameLastNameInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
	fullNameLastNameInput.setValue(DCM.AccountManager.lastName);
	
	dateOfBirthField.label.setText(DCM.Resources.getResource("DateOfBirthLabel"));
	dateOfBirthField.input.append(dateOfBirthDayInput);
	dateOfBirthDayInput.setPlaceholder(DCM.Resources.getResource("DayLabel"));
	dateOfBirthDayInput.setMaxLength(2);
	dateOfBirthDayInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
	dateOfBirthDayInput.setAttribute("data-role", "dob-day");
	
	dateOfBirthField.input.append(dateOfBirthMonthInput);
	dateOfBirthMonthInput.setPlaceholder(DCM.Resources.getResource("MonthLabel"));
	dateOfBirthMonthInput.setMaxLength(2);
	dateOfBirthMonthInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
	dateOfBirthMonthInput.setAttribute("data-role", "dob-month");
	
	dateOfBirthField.input.append(dateOfBirthYearInput);
	dateOfBirthYearInput.setPlaceholder(DCM.Resources.getResource("YearLabel"));
	dateOfBirthYearInput.setMaxLength(4);
	dateOfBirthYearInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
	dateOfBirthYearInput.setAttribute("data-role", "dob-year");
	
	contactField.label.setText(DCM.Resources.getResource("ContactInformationLabel"));
	contactField.input.append(contactPrimaryNumberInput);
	contactPrimaryNumberInput.setPlaceholder(DCM.Resources.getResource("PrimaryNumberLabel"));
	contactPrimaryNumberInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
	contactPrimaryNumberInput.setAttribute("data-role", "contact-primary");
	
	contactField.input.append(contactMobileNumberInput);
	contactMobileNumberInput.setPlaceholder(DCM.Resources.getResource("MobileNumberLabel"));
	contactMobileNumberInput.setAttribute("data-role", "contact-mobile");
	
	contactField.input.append(contactEmailInput);
	contactEmailInput.setPlaceholder(DCM.Resources.getResource("EmailAddressLabel"));
	contactEmailInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
	contactEmailInput.setAttribute("data-role", "contact-email");
	contactEmailInput.setValue(DCM.AccountManager.emailAddress);
	
	employmentTypeRadioButtonGroup.setItem(DCM.Resources.getResource("EmployedLabel"), "EMPLOYED");
	employmentTypeRadioButtonGroup.setItem(DCM.Resources.getResource("SelfEmployedLabel"), "SELFEMPLOYED");
	employmentTypeRadioButtonGroup.setItem(DCM.Resources.getResource("UnemployedLabel"), "UNEMPLOYED");
	employmentTypeRadioButtonGroup.setItem(DCM.Resources.getResource("RetiredLabel"), "RETIRED");
	employmentField.label.setText(DCM.Resources.getResource("EmploymentStatusLabel"));
	employmentField.input.append(employmentTypeRadioButtonGroup);
	employmentTypeRadioButtonGroup.addEventHandler("CHANGE", personalChangeHandler);
	
	employmentField.input.append(occupationInput);
	occupationInput.setPlaceholder(DCM.Resources.getResource("OccupationLabel"));
	occupationInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
	occupationInput.setAttribute("data-role", "employment-occupation");
	employmentField.input.append(industryInput);
	industryInput.setPlaceholder(DCM.Resources.getResource("IndustryLabel"));
	industryInput.input.addEventListener(DCM.Event.change, personalChangeHandler);
	industryInput.setAttribute("data-role", "employment-industry");
	
	// ADDRESS
	addressField.label.setText(DCM.Resources.getResource("HomeAddressLabel"));
	addressField.input.append(addressFirstLineInput);
	addressFirstLineInput.setPlaceholder(DCM.Resources.getResource("FirstLineAddressLabel"));
	addressFirstLineInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
	
	addressField.input.append(addressSecondLineInput);
	addressSecondLineInput.setPlaceholder(DCM.Resources.getResource("SecondLineAddressLabel"));
	addressSecondLineInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
	
	addressField.input.append(addressCityInput);
	addressCityInput.setPlaceholder(DCM.Resources.getResource("TownCityLabel"));
	addressCityInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
	
	addressField.input.append(addressPostcodeInput);
	addressPostcodeInput.setPlaceholder(DCM.Resources.getResource("PostcodeLabel"));
	addressPostcodeInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
	
	addressField.input.append(addressCountryInput);
	addressCountryInput.setPlaceholder(DCM.Resources.getResource("CountryLabel"));
	addressCountryInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
	
	addressTimeAtField.label.setText(DCM.Resources.getResource("TimeAtCurrentAddressLabel"));
	addressTimeAtField.input.append(addressTimeAtYearsInput);
	addressTimeAtYearsInput.setPlaceholder(DCM.Resources.getResource("YearsLabel"));
	addressTimeAtYearsInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
	
	addressTimeAtField.input.append(addressTimeAtMonthsInput);
	addressTimeAtMonthsInput.setPlaceholder(DCM.Resources.getResource("MonthsLabel"));
	addressTimeAtMonthsInput.input.addEventListener(DCM.Event.change, addressChangeHandler);
	
	previousAddressField.label.setText(DCM.Resources.getResource("PreviousAddressLabel"));
	previousAddressField.input.append(previousAddressFirstLineInput);
	previousAddressFirstLineInput.setPlaceholder(DCM.Resources.getResource("FirstLineAddressLabel"));
	previousAddressField.input.append(previousAddressSecondLineInput);
	previousAddressSecondLineInput.setPlaceholder(DCM.Resources.getResource("SecondLineAddressLabel"));
	previousAddressField.input.append(previousAddressCityInput);
	previousAddressCityInput.setPlaceholder(DCM.Resources.getResource("TownCityLabel"));
	previousAddressField.input.append(previousAddressPostcodeInput);
	previousAddressPostcodeInput.setPlaceholder(DCM.Resources.getResource("PostcodeLabel"));
	previousAddressField.input.append(previousAddressCountryInput);
	previousAddressCountryInput.setPlaceholder(DCM.Resources.getResource("CountryLabel"));
	
	// EXPERIANCE
	whatHaveYouTradedField.label.setLabel(DCM.Resources.getResource("WhatHaveYouTradedLabel"));
	whatHaveYouTradedField.input.append(whatHaveYouTradedForm);
	
	sharesOrBonds.label.setText(DCM.Resources.getResource("SharesOrBondsLabel"));
	sharesOrBonds.input.append(sharesOrBondsRadioGroup);
	sharesOrBondsRadioGroup.setItem(DCM.Resources.getResource("FrequentlyLabel"), "FREQUENTLY");
	sharesOrBondsRadioGroup.setItem(DCM.Resources.getResource("SometimesLabel"), "SOMETIMES");
	sharesOrBondsRadioGroup.setItem(DCM.Resources.getResource("NeverLabel"), "RARELY");
	sharesOrBondsRadioGroup.addEventHandler("CHANGE", experianceChangeHandler);
	
	optionsTrading.label.setText(DCM.Resources.getResource("ExchangeTradedLabel"));
	optionsTrading.input.append(optionsTradingRadioGroup);
	optionsTradingRadioGroup.setItem(DCM.Resources.getResource("FrequentlyLabel"), "FREQUENTLY");
	optionsTradingRadioGroup.setItem(DCM.Resources.getResource("SometimesLabel"), "SOMETIMES");
	optionsTradingRadioGroup.setItem(DCM.Resources.getResource("NeverLabel"), "RARELY");
	optionsTradingRadioGroup.addEventHandler("CHANGE", experianceChangeHandler);
	
	spreadBetting.label.setText(DCM.Resources.getResource("SpreadbettingLabel"));
	spreadBetting.input.append(spreadBettingRadioGroup);
	spreadBettingRadioGroup.setItem(DCM.Resources.getResource("FrequentlyLabel"), "FREQUENTLY");
	spreadBettingRadioGroup.setItem(DCM.Resources.getResource("SometimesLabel"), "SOMETIMES");
	spreadBettingRadioGroup.setItem(DCM.Resources.getResource("NeverLabel"), "RARELY");
	spreadBettingRadioGroup.addEventHandler("CHANGE", experianceChangeHandler);
	
	howHaveYouTradedField.label.setText(DCM.Resources.getResource("HowHaveYouTradedLabel"));
	howHaveYouTradedField.input.append(howHaveYouTradedRadioGroup);
	howHaveYouTradedRadioGroup.setItem(DCM.Resources.getResource("ExcecutionOnlyLabel"), "EXCECUTION");
	howHaveYouTradedRadioGroup.setItem(DCM.Resources.getResource("ManagedLabel"), "MANAGED");
	howHaveYouTradedRadioGroup.setItem(DCM.Resources.getResource("NoneApplicableLabel"), "NONE");
	howHaveYouTradedRadioGroup.addEventHandler("CHANGE", experianceChangeHandler);

	qualificationsField.label.setText(DCM.Resources.getResource("ExperianceDetailsLabel"));
	qualificationsField.input.append(occupationalExperianceCheckBox);
	occupationalExperianceCheckBox.setLabel(DCM.Resources.getResource("OccupationalExperianceLabel"));
	occupationalExperianceCheckBox.addEventHandler("CHANGE", experianceChangeHandler);
	qualificationsField.input.append(qualificationsCheckBox);
	qualificationsCheckBox.setLabel(DCM.Resources.getResource("QualificationsLabel"));
	qualificationsCheckBox.addEventHandler("CHANGE", experianceChangeHandler);
	qualificationsField.input.append(qualificationsInput);
	qualificationsInput.setPlaceholder(DCM.Resources.getResource("OtherReleventExperianceLabel"));
	qualificationsInput.input.addEventListener(DCM.Event.change, experianceChangeHandler);
	
	// FINANCIAL
	incomeBeforeTaxField.label.setText(DCM.Resources.getResource("IncomeBeforeTaxLabel"));
	incomeBeforeTaxField.input.append(incomeBeforeTaxInput);
	incomeBeforeTaxInput.setPlaceholder(DCM.Resources.getResource("SpecifyAmountInGBPLabel"));
	incomeBeforeTaxInput.input.addEventListener(DCM.Event.change, financialChangeHandler);
	
	savingsAndInvestmentsField.label.setText(DCM.Resources.getResource("ValueOfSavingsLabel"));
	savingsAndInvestmentsField.input.append(savingsAndInvestmentsInput);
	savingsAndInvestmentsInput.setPlaceholder(DCM.Resources.getResource("SpecifyAmountInGBPLabel"));
	savingsAndInvestmentsInput.input.addEventListener(DCM.Event.change, financialChangeHandler);
	
	sourceOfFundsRadioButtonGroup.setItem(DCM.Resources.getResource("EmploymentLabel"), "EMPLOYMENT");
	sourceOfFundsRadioButtonGroup.setItem(DCM.Resources.getResource("InhreitanceLabel"), "INHREITANCE");
	sourceOfFundsRadioButtonGroup.setItem(DCM.Resources.getResource("InvestmentLabel"), "INVESTMENT");
	sourceOfFundsField.label.setText(DCM.Resources.getResource("SourceOfFundsLabel"));
	sourceOfFundsField.input.append(sourceOfFundsRadioButtonGroup);
	sourceOfFundsRadioButtonGroup.addEventHandler("CHANGE", financialChangeHandler);
	sourceOfFundsField.input.append(sourceOfFundsInput);
	sourceOfFundsInput.setPlaceholder(DCM.Resources.getResource("OtherLabel"));
	sourceOfFundsInput.input.addEventListener(DCM.Event.change, financialChangeHandler);
	
	statementsField.label.setText(DCM.Resources.getResource("StatementsLabel"));
	statementsField.input.append(statementsCheckBox);
	statementsCheckBox.setLabel(DCM.Resources.getResource("StatementsByPostLabel"));
	
	finishTab.append(finishMessage);
	finishTab.append(sendDataButton);
	//finishTab.append(finishMessageFoot);
	
	finishMessage.setText(DCM.Resources.getResource("UpgradeReviewLabel"));
	finishMessage.setAttribute("data-role", "message");
	
	//finishMessageFoot.setText(DCM.Resources.getResource("UpgradeReviewFootLabel"));
	//finishMessageFoot.setAttribute("data-role", "message");
	
	sendDataButton.setText(DCM.Resources.getResource("GenerateApplicationFormLabel"));
	sendDataButton.setAttribute("data-role", "download-form");
	
	sendDataButton.addEventListener(DCM.Event.click, function() {
	
		window.open(formURL);
	
	});
	
	serviceCaller.addEventHandler("SUCCESS", function(data) {
		
		DCM.log("data.accForm", data.accForm);
		
		formURL = data.accForm;
		
		sendDataButton.enable();
		
		sendDataButton.setText(DCM.Resources.getResource("GenerateApplicationFormLabel"));
		
		_gaq.push(["_trackPageview", "/SB_DownloadComplete"]);
		
	});

});