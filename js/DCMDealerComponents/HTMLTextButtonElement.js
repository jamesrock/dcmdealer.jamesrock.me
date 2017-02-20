DCM.HTMLTextButtonElement = ROCK.createClass(function HTMLTextButtonElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTextButtonElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTextButtonElement", e);
		
	};
	
};