DCM.HTMLSpanElement = ROCK.createClass(function HTMLSpanElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("span");
		
	}
	catch(e) {
		
		DCM.warn("HTMLSpanElement", e);
		
	};
	
};