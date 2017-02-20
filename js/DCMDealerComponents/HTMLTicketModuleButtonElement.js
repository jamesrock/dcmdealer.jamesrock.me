DCM.HTMLTicketModuleButtonElement = ROCK.createClass(function HTMLTicketModuleButtonElement() {

	try {
		
		var
		label = this.label = new DCM.HTMLTicketModuleButtonLabelElement(),
		value = this.value = new DCM.HTMLTicketModuleButtonValueElement(),
		icon = this.icon = new DCM.HTMLIconElement();
		
		this._super = DCM.HTMLInlineButtonElement;
		this._super();
		
		this.setType("HTMLTicketModuleButtonElement");
		
		value.setText("-");
		
		this.append(label);
		this.append(value);
		this.append(icon);
		
		// not sure if this is needed
		label.setText(DCM.Resources.getResource("Default"));
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleButtonElement", e);
		
	};
	
};