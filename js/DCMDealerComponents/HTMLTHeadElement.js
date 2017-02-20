DCM.HTMLTHeadElement = ROCK.createClass(function HTMLTHeadElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("thead");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTHeadElement", e);
		
	};
	
};