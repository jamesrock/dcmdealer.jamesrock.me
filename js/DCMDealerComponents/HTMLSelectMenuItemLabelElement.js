DCM.HTMLSelectMenuItemLabelElement = ROCK.createClass(function HTMLSelectMenuItemLabelElement() {

	try {

		this._super = DCM.HTMLSpanElement;
		this._super();
		
		this.setType("HTMLSelectMenuItemLabelElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLSelectMenuItemLabelElement", e);
		
	};
	
};