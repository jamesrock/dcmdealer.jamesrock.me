DCM.HTMLTextAreaElement = ROCK.createClass(function HTMLTextAreaElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("textarea");
		
		this.getValue = function getValue() {
			return this.displayObject.value;
		};
		
		this.setValue = function setValue(value) {
			this.displayObject.value = value;
		};
		
		this.setPlaceholder = function setPlaceholder(value) {
			this.setAttribute("placeholder", value);
		};
	
	}
	catch(e) {
		
		DCM.warn("HTMLTextAreaElement", e);
		
	};
	
};