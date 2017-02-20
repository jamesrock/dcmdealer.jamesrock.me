DCM.HTMLToolbarItemElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLToolbarItemElement() {

	var
	icon = this.icon = new DCM.HTMLIconElement(),
	button = this.button = new DCM.HTMLGraphicButtonElement();
	
	icon.setSize("1");
	
	button.append(icon);
	this.append(button);
	
	this.setType("HTMLToolbarItemElement");
	
	this.setLabel = function(value) {
		icon.setText(value);
		icon.setAttribute("title", value);
		button.setAttribute("title", value);
	};

});