DCM.HTMLTBodyElement = ROCK.createClass(function HTMLTBodyElement() {
	
	try {
	
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("tbody");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTBodyElement", e);
		
	};
	
};