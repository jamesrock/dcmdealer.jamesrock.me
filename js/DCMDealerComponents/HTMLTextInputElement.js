DCM.HTMLTextInputElement = ROCK.createClass(function HTMLTextInputElement() {

	try {
		
		this._super = DCM.HTMLInputElement;
		this._super();
		
		this.setAttribute("type", "text");
		
		this.setPlaceholder = function setPlaceholder(value) {
			this.setAttribute("placeholder", value);
		};
	
	}
	catch(e) {
		
		DCM.warn("HTMLTextInputElement", e);
		
	};
	
};