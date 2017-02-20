DCM.ResetPassword = function ResetPassword() {

	try {
	
		DCM.Platform.init();
		
		var 
		service = new DCM.ResetPasswordService(),
		resetButton = new DCM.HTMLButtonElement(),
		passwordInput = new DCM.HTMLCustomPasswordInputElement(),
		passwordConfirmInput = new DCM.HTMLCustomPasswordInputElement(),
		resetPasswordForm = new DCM.HTMLLinearFormElement(),
		passwordField = resetPasswordForm.addField(),
		confirmPasswordField = resetPasswordForm.addField(),
		passwordLabel = new DCM.HTMLDivElement(),
		confirmPasswordLabel = new DCM.HTMLDivElement(),
		passwordClear = new DCM.HTMLClearElement(),
		checkForCompletion = function checkForCompletion() {
			
			var 
			password = passwordInput.getValue(),
			confirmPassword = passwordConfirmInput.getValue();
			
			if(password&&confirmPassword&&password===confirmPassword) {
				resetButton.enable();
			}
			else {
				resetButton.disable();
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
		loader,
		passwordIndicator = new DCM.HTMLAdvancedPasswordStrengthElement();
		
		languageSelect.setAttribute("data-login-role", "language-select");
		
		tagline.setText(DCM.Resources.getResource("ResetPasswordResetHeadingLabel"));
		
		DCM.body.append(page);
		
		page.append(pane);
		
		pane.head.append(brandIcon);
		pane.head.append(tagline);
		
		pane.body.append(panel);
		pane.foot.append(disclaimer);
		
		passwordLabel.setText(DCM.Resources.getResource("ResetPasswordPasswordLabel"));
		passwordLabel.setAttribute("data-login-role", "password-label");
		
		passwordField.label.append(passwordLabel);
		passwordField.label.append(passwordIndicator);
		passwordField.label.append(passwordClear);
		passwordField.input.append(passwordInput);
		
		passwordInput.setPlaceholder(DCM.Resources.getResource("PasswordLabel"));
		
		confirmPasswordField.label.setText(DCM.Resources.getResource("ResetPasswordConfirmPasswordLabel"));
		confirmPasswordField.input.append(passwordConfirmInput);
		passwordConfirmInput.setPlaceholder(DCM.Resources.getResource("PasswordLabel"));
		
		resetButton.disable();
		
		panel.append(resetPasswordForm);
		panel.append(resetButton);

		passwordInput.input.addEventListener(DCM.Event.keyup, function() {
		
			var 
			strengthObj = passwordIndicator.test(passwordInput.getValue());
			
			passwordIndicator.apply(strengthObj);
			
			if(strengthObj.length&&strengthObj.lowercase&&strengthObj.uppercase&&strengthObj.number&&strengthObj.special) {
				passwordConfirmInput.enable();
			};
			
			checkForCompletion();
			
		});
		
		passwordConfirmInput.disable();
		
		passwordConfirmInput.input.addEventListener(DCM.Event.keyup, function() {
			checkForCompletion();
		});
		
		resetButton.setText(DCM.Resources.getResource("ResetPasswordResetButtonLabel"));
		
		service.addEventHandler("SUCCESS", function() {
		
			DCM.log("SUCCESS");
		
			DCM.Net.navigateToURL("/dealer_platform_login");
			
		});
		
		service.addEventHandler("EXCEPTION", function(code) {
		
			var publishDeleteWatchlistNotify = new DCM.HTMLAlertDialogElement();
			publishDeleteWatchlistNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			publishDeleteWatchlistNotify.setMessage(DCM.Resources.getResource(code));
			
			loader.destroy();
			
		});
		
		service.addEventHandler("ERROR", function(code) {
		
			loader.destroy();
			
		});
		
		resetButton.addEventListener(DCM.Event.click, function() {
		
			service.setParam("newpassword", passwordInput.getValue());
			
			loader = new DCM.HTMLLoadingAnimationElement();
			loader.setHeading(DCM.Resources.getResource("ResetPasswordResetingLabel"));
			
			service.call();
			
		});
		
		checkForCompletion();
		
	}
	catch(e) {
		
		DCM.warn("ResetPassword", e);
		
	};
	
};