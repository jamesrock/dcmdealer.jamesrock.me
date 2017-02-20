DCM.HTMLUsersModuleItemDialogElement = ROCK.createClass(DCM.HTMLDynamicDialogElement, function HTMLUsersModuleItemDialogElement() {

	var 
	_this = this,
	form = new DCM.HTMLFormElement(),
	formNameGroup = form.addField(),
	formNameInput = new DCM.HTMLCustomTextInputElement(),
	formEnabledGroup = form.addField(),
	formEnabledRadioButtons = new DCM.HTMLRadioButtonGroupElement();
	
	formEnabledRadioButtons.setItem("Enabled", "ENABLED");
	formEnabledRadioButtons.setItem("Disabled", "DISABLED");
	
	formNameGroup.label.setText("Name");
	formNameGroup.input.append(formNameInput);
	
	formEnabledGroup.label.setText("Status");
	formEnabledGroup.input.append(formEnabledRadioButtons);
	
	this.setHeading("User");
	
	this.body.append(form);
	
});