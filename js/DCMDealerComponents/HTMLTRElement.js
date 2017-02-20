DCM.HTMLTRElement = ROCK.createClass(DCM.HTMLElement, function HTMLTRElement() {
	
	var addColumnInc = 1;
	
	this.displayObject = document.createElement("tr");
	
	this.addColumn = function addColumn(text) {
		var col = new DCM.HTMLTDElement();
		col.setColumn(addColumnInc);
		this.append(col);
		addColumnInc ++;
		if(text) {
			col.setText(text);
		};
		return col;
	};
	
	this.setRow = function setRow(value) {
		this.setAttribute("data-table-row-id", value);
	};

});