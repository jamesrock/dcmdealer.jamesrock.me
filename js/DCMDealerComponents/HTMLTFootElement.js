DCM.HTMLTFootElement = ROCK.createClass(function HTMLTFootElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("tfoot");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTFootElement", e);
		
	};
	
};