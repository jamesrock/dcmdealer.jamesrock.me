DCM.Signup = function Signup() {

	try {

		DCM.Platform.init();
		
		var 
		service = new DCM.OpenAccountService(),
		getEmailService = new DCM.GetEmailService(),
		openAccountButton = new DCM.HTMLButtonElement(),
		firstNameInput = new DCM.HTMLCustomInlineTextInputElement(),
		lastNameInput = new DCM.HTMLCustomInlineTextInputElement(),
		emailInput = new DCM.HTMLCustomTextInputElement(),
		passwordInput = new DCM.HTMLCustomPasswordInputElement(),
		signupForm = new DCM.HTMLLinearFormElement(),
		nameField = signupForm.addField(),
		emailField = signupForm.addField(),
		passwordField = signupForm.addField(),
		passwordLabel = new DCM.HTMLDivElement(),
		passwordHelperLabel = new DCM.HTMLDivElement(),
		passwordIndicator = new DCM.HTMLAdvancedPasswordStrengthElement(),
		passwordClear = new DCM.HTMLClearElement(),
		validPassword = false,
		invalidUser = false,
		checkForCompletion = function checkForCompletion() {
			
			var 
			firstName = firstNameInput.getValue(),
			lastName = lastNameInput.getValue(),
			email = emailInput.getValue();
			
			if(firstName&&lastName&&validPassword&&email&&!checkingEmail&&!invalidUser) {
				openAccountButton.enable();
			}
			else {
				openAccountButton.disable();
			};
			
		},
		doesExistLabel = new DCM.HTMLDivElement(),
		emailLabel = new DCM.HTMLDivElement(),
		emailClear = new DCM.HTMLClearElement(),
		brandIcon = new DCM.HTMLBrandIconElement(),
		panel = new DCM.HTMLPanelElement(),
		page = new DCM.HTMLPageElement(),
		pane = new DCM.HTMLPaneElement(),
		tagline = new DCM.HTMLDivElement(),
		disclaimer = new DCM.HTMLPageFootElement(),
		languageSelect = new DCM.HTMLLanguageSelectMenuElement(),
		nameLabel = new DCM.HTMLDivElement(),
		nameClear = new DCM.HTMLClearElement(),
		loader,
		signupServiceSuccessHandler = function signupServiceSuccessHandler() {
		
			DCM.Net.navigateToURL("/dcmdealer");
			
		},
		signupServiceErrorHandler = function signupServiceErrorHandler() {
		
			loader.destroy();
			
			var signupServiceErrorNotify = new DCM.HTMLAlertDialogElement();
			signupServiceErrorNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			signupServiceErrorNotify.setMessage(DCM.Resources.getResource("SignUpServiceError"));
			signupServiceErrorNotify.queue();
			
		},
		signupServiceExceptionHandler = function signupServiceExceptionHandler() {
		
			loader.destroy();
			
			var signupServiceExceptionNotify = new DCM.HTMLAlertDialogElement();
			signupServiceExceptionNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			signupServiceExceptionNotify.setMessage(DCM.Resources.getResource("SignUpServiceError"));
			signupServiceExceptionNotify.queue();
			
		},
		getEmailServiceSuccessHandler = function getEmailServiceSuccessHandler(data) {
		
			checkingEmail = false;
			
			invalidUser = data.doesExist;
			
			if(invalidUser) {
				doesExistLabel.setText("USER EXISTS");
			}
			else {
				doesExistLabel.setText("");
			};
			
			checkForCompletion();
			
		},
		getEmailServiceErrorHandler = function getEmailServiceErrorHandler() {
		
			checkingEmail = false;
			//checkForCompletion();
			
		},
		getEmailServiceExceptionHandler = function getEmailServiceExceptionHandler() {
		
			checkingEmail = false;
			//checkForCompletion();
			
		};
		
		languageSelect.setAttribute("data-signup-role", "language-select");
		nameLabel.setAttribute("data-signup-role", "name-label");
		
		tagline.setText(DCM.Resources.getResource("SignUpHeadingLabel"));
		
		DCM.body.append(page);
		
		page.append(pane);
		
		pane.head.append(brandIcon);
		pane.head.append(tagline);
		
		pane.body.append(panel);
		pane.foot.append(disclaimer);
		
		emailLabel.setText(DCM.Resources.getResource("EmailAddressLabel"));
		
		nameField.label.append(nameLabel);
		nameField.label.append(languageSelect);
		nameField.label.append(nameClear);
		
		nameLabel.setText(DCM.Resources.getResource("FullNameLabel"));
		
		emailField.label.append(emailLabel);
		emailField.label.append(doesExistLabel);
		emailField.label.append(emailClear);
		
		emailLabel.setAttribute("data-signup-role", "email-label");
		doesExistLabel.setAttribute("data-signup-role", "exists-label");
		
		passwordLabel.setText(DCM.Resources.getResource("PasswordLabel"));
		passwordLabel.setAttribute("data-signup-role", "password-label");
		
		passwordField.label.append(passwordLabel);
		//passwordField.label.append(passwordIndicator);
		passwordField.label.append(passwordClear);
		
		openAccountButton.disable();
		
		nameField.input.append(firstNameInput);
		nameField.input.append(lastNameInput);
		
		emailField.input.append(emailInput);
		
		passwordField.input.append(passwordInput);
		
		passwordField.input.append(passwordHelperLabel);
		passwordHelperLabel.setText(DCM.Resources.getResource("PasswordHelpLabel"));
		passwordHelperLabel.setAttribute("data-signup-role", "password-helper");
		
		panel.append(signupForm);
		panel.append(openAccountButton);
		
		firstNameInput.setPlaceholder(DCM.Resources.getResource("FirstNameLabel"));
		lastNameInput.setPlaceholder(DCM.Resources.getResource("LastNameLabel"));
		emailInput.setPlaceholder(DCM.Resources.getResource("EmailAddressLabel"));
		passwordInput.setPlaceholder(DCM.Resources.getResource("PasswordLabel"));
		
		emailInput.input.addEventListener(DCM.Event.change, function() {
			
			if(emailInput.getValue()) {
				checkingEmail = true;
				getEmailService.setParam("emailAddress", this.getValue());
				getEmailService.call();
			};
			
			checkForCompletion();
			
		});
		
		passwordInput.input.addEventListener(DCM.Event.keyup, function() {
		
			var 
			strengthObj = passwordIndicator.test(passwordInput.getValue());
			
			passwordIndicator.apply(strengthObj);
			
			//if(strengthObj.length&&strengthObj.lowercase&&strengthObj.uppercase&&strengthObj.number&&strengthObj.special) {
			
			if(passwordInput.getValue().length>4) {
				validPassword = true;
			}
			else {
				validPassword = false;
			};
			
			checkForCompletion();
			
		});
		
		firstNameInput.input.addEventListener(DCM.Event.keyup, function() {
		
			checkForCompletion();
			
		});
		
		lastNameInput.input.addEventListener(DCM.Event.keyup, function() {
		
			checkForCompletion();
			
		});
		
		openAccountButton.setText(DCM.Resources.getResource("SignUpSignupButtonLabel"));
		
		service.addEventHandler("SUCCESS", signupServiceSuccessHandler);
		service.addEventHandler("EXCEPTION", signupServiceExceptionHandler);
		service.addEventHandler("ERROR", signupServiceErrorHandler);
		
		openAccountButton.addEventListener(DCM.Event.click, function() {
			
			if(this.enabled) {
				
				service.setParam("firstname", firstNameInput.getValue());
				service.setParam("lastname", lastNameInput.getValue());
				service.setParam("emailAddress", emailInput.getValue());
				service.setParam("password", passwordInput.getValue());
				service.setParam("locale", "engb");
				
				loader = new DCM.HTMLLoadingAnimationElement();
				loader.setHeading(DCM.Resources.getResource("SignUpSigningupLabel"));
				
				service.call();
				
			};
			
		});
		
		getEmailService.addEventHandler("SUCCESS", getEmailServiceSuccessHandler);
		getEmailService.addEventHandler("ERROR", getEmailServiceErrorHandler);
		getEmailService.addEventHandler("EXCEPTION", getEmailServiceExceptionHandler);
		
	}
	catch(e) {
		
		DCM.warn("Signup", e);
		
	};
	
};