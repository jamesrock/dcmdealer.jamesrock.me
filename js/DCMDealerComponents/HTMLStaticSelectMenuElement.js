DCM.HTMLStaticSelectMenuElement = ROCK.createClass(function HTMLStaticSelectMenuElement() {

	try {
		
		this._super = DCM.HTMLSelectMenuElement;
		this._super();
		
		this.reorder = false;
		
	}
	catch(e) {
		
		DCM.warn("HTMLStaticSelectMenuElement", e);
		
	};
	
};