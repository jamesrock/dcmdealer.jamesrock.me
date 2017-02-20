DCM.HTMLTicketModuleWizardElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLTicketModuleWizardElement() {
	
	var
	head = this.head = new DCM.HTMLTicketModuleWizardHeadElement(),
	body = this.body = new DCM.HTMLTicketModuleWizardBodyElement();
		
	this.setType("HTMLTicketModuleWizardElement");
	this.append(head);
	this.append(body);
	
});