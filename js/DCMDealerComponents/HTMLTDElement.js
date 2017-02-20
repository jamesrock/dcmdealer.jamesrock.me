DCM.HTMLTDElement = ROCK.createClass(function HTMLTDElement() {

	try {
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("td");
		
		this.setColumn = function setColumn(value) {
			this.setAttribute("data-table-column-id", value);	
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLTDElement", e);
		
	};
	
};