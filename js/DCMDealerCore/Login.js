DCM.Login = function Login() {

	try {
	
		DCM.Platform.init();
		
		var 
		service = new DCM.LoginService(),
		requestPasswordService = new DCM.RequestPasswordService(),
		loginButton = new DCM.HTMLButtonElement(),
		emailInput = new DCM.HTMLCustomTextInputElement(),
		passwordInput = new DCM.HTMLCustomPasswordInputElement(),
		signupForm = new DCM.HTMLLinearFormElement(),
		emailField = signupForm.addField(),
		passwordField = signupForm.addField(),
		passwordLabel = new DCM.HTMLDivElement(),
		passwordClear = new DCM.HTMLClearElement(),
		validPassword = false,
		invalidUser = false,
		checkForCompletion = function checkForCompletion() {
			
			var 
			email = emailInput.getValue(),
			password = passwordInput.getValue();
			
			if(email&&password) {
				loginButton.enable();
			}
			else {
				loginButton.disable();
			};
			
		},
		emailLabel = new DCM.HTMLDivElement(),
		emailClear = new DCM.HTMLClearElement(),
		brandIcon = new DCM.HTMLBrandIconElement(),
		panel = new DCM.HTMLPanelElement(),
		page = new DCM.HTMLPageElement(),
		pane = new DCM.HTMLPaneElement(),
		tagline = new DCM.HTMLDivElement(),
		disclaimer = new DCM.HTMLPageFootElement(),
		languageSelect = new DCM.HTMLLanguageSelectMenuElement(),
		forgottenLink = new DCM.HTMLDivElement(),
		loader,
		supplyPasswordPromptAcceptHandler = function supplyPasswordPromptAcceptHandler() {
			
			requestPasswordService.setParam("emailaddress", this.getValue());
			requestPasswordService.call();
			
		},
		resetPasswordPromptAcceptHandler = function resetPasswordPromptAcceptHandler() {
			
			if(emailInput.getValue()) {
				
				requestPasswordService.setParam("emailaddress", emailInput.getValue());
				requestPasswordService.call();
				
			}
			else {
			
				var supplyPasswordPrompt = new DCM.HTMLPromptTextFieldDialogElement();
				
				supplyPasswordPrompt.setHeading(DCM.Resources.getResource("EmailAddressLabel"));
				supplyPasswordPrompt.queue();
				supplyPasswordPrompt.addEventHandler("ACCEPT", supplyPasswordPromptAcceptHandler);
			
			};
			
		},
		requestPasswordServiceSuccessHandler = function requestPasswordServiceSuccessHandler() {
		
			var 
			requestPasswordSuccessNotify = new DCM.HTMLNotifyDialogElement();
			
			requestPasswordSuccessNotify.setHeading(DCM.Resources.getResource("ResetPasswordRequestSuccessNotifyHeadingLabel"));
			requestPasswordSuccessNotify.setMessage(DCM.Resources.getResource("ResetPasswordRequestSuccessLabel"));
			requestPasswordSuccessNotify.queue();
			
		},
		requestPasswordServiceErrorHandler = function requestPasswordServiceErrorHandler() {
			
			var 
			requestPasswordErrorNotify = new DCM.HTMLNotifyDialogElement();
			
			requestPasswordErrorNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			requestPasswordErrorNotify.setMessage(DCM.Resources.getResource("PasswordRequestServiceError"));
			requestPasswordErrorNotify.queue();
			
		},
		requestPasswordServiceExceptionHandler = function requestPasswordServiceExceptionHandler() {
			
			var 
			requestPasswordSuccessNotify = new DCM.HTMLNotifyDialogElement();
			
			requestPasswordSuccessNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			requestPasswordSuccessNotify.setMessage(DCM.Resources.getResource("LoginEmailNotRecognised"));
			requestPasswordSuccessNotify.queue();
			
		},
		forgottenLinkClickHandler = function forgottenLinkClickHandler() {
			
			var 
			resetPasswordPrompt = new DCM.HTMLConfirmationDialogElement();
			
			resetPasswordPrompt.setHeading(DCM.Resources.getResource("ResetPasswordRequestHeadingLabel"));
			resetPasswordPrompt.setMessage(DCM.Resources.getResource("ResetPasswordConfirmLabel", [
				{
					placeholder: "EMAIL_ADDRESS",
					label: emailInput.getValue()
				}
			]));
			resetPasswordPrompt.addEventHandler("ACCEPT", resetPasswordPromptAcceptHandler);
			resetPasswordPrompt.queue();
			
			return false;
			
		},
		loginServiceSuccessHandler = function loginServiceSuccessHandler() {
		
			DCM.Net.navigateToURL("/dcmdealer");
			
		},
		loginServiceExceptionHandler = function loginServiceExceptionHandler(code) {
		
			loader.destroy();
			
			var loginServiceExceptionNotify = new DCM.HTMLAlertDialogElement();
			loginServiceExceptionNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			loginServiceExceptionNotify.setMessage(DCM.Resources.getResource(code));
			loginServiceExceptionNotify.queue();
			
		},
		loginServiceErrorHandler = function loginServiceErrorHandler(code) {
		
			loader.destroy();
			
			var loginServiceErrorNotify = new DCM.HTMLAlertDialogElement();
			loginServiceErrorNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			loginServiceErrorNotify.setMessage(DCM.Resources.getResource("LoginServiceError"));
			loginServiceErrorNotify.queue();
			
		},
		loginButtonClickHandler = function loginButtonClickHandler() {
		
			service.setParam("username", emailInput.getValue());
			service.setParam("password", passwordInput.getValue());
			
			loader = new DCM.HTMLLoadingAnimationElement();
			loader.setHeading(DCM.Resources.getResource("SigningInLabel"));
			
			service.call();
			
		},
		formNode = new DCM.HTMLNativeFormElement();
		
		requestPasswordService.addEventHandler("SUCCESS", requestPasswordServiceSuccessHandler);
		requestPasswordService.addEventHandler("ERROR", requestPasswordServiceErrorHandler);
		requestPasswordService.addEventHandler("EXCEPTION", requestPasswordServiceExceptionHandler);
		
		service.addEventHandler("SUCCESS", loginServiceSuccessHandler);
		service.addEventHandler("EXCEPTION", loginServiceExceptionHandler);
		service.addEventHandler("ERROR", loginServiceErrorHandler);
		
		forgottenLink.setText(DCM.Resources.getResource("ResetPasswordForgottenButtonLabel"));
		forgottenLink.setAttribute("data-login-role", "forgotten");
		forgottenLink.addEventListener(DCM.Event.click, forgottenLinkClickHandler);
		
		languageSelect.setAttribute("data-login-role", "language-select");
		
		tagline.setText(DCM.Resources.getResource("SignInHeadingLabel"));
		
		DCM.body.append(page);
		
		page.append(formNode);
		
		formNode.append(pane);
		
		pane.head.append(brandIcon);
		pane.head.append(tagline);
		pane.body.append(panel);
		pane.foot.append(disclaimer);
		
		emailLabel.setText(DCM.Resources.getResource("EmailAddressLabel"));
		emailLabel.setAttribute("data-login-role", "email-label");
		
		emailField.label.append(emailLabel);
		emailField.label.append(languageSelect);
		emailField.label.append(emailClear);
		emailField.input.append(emailInput);
		emailInput.setPlaceholder(DCM.Resources.getResource("EmailAddressLabel"));
		emailInput.input.addEventListener(DCM.Event.change, function() {
			checkForCompletion();
		});
		
		passwordLabel.setText(DCM.Resources.getResource("PasswordLabel"));
		passwordLabel.setAttribute("data-login-role", "password-label");
		
		passwordField.label.append(passwordLabel);
		passwordField.label.append(forgottenLink);
		passwordField.label.append(passwordClear);
		passwordField.input.append(passwordInput);
		passwordInput.setPlaceholder(DCM.Resources.getResource("PasswordLabel"));
		passwordInput.input.addEventListener(DCM.Event.keyup, function() {
			checkForCompletion();
		});
		
		panel.append(signupForm);
		panel.append(loginButton);
		
		loginButton.disable();
		loginButton.setText(DCM.Resources.getResource("SignInButtonLabel"));
		loginButton.addEventListener(DCM.Event.click, loginButtonClickHandler);
		
		checkForCompletion();
		
		formNode.addEventListener(DCM.Event.submit, function() {
			
			return false;
			
		});
		
	}
	catch(e) {
		
		DCM.warn("Login", e);
		
	};
	
};