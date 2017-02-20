DCM.HTMLTHElement = ROCK.createClass(function HTMLTHElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.setColumn = function setColumn(value) {
			this.setAttribute("data-table-column-id", value);	
		};
		
		this.displayObject = document.createElement("th");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTHElement", e);
		
	};
	
};