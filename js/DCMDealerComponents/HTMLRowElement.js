DCM.HTMLRowElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLRowElement() {
		
	var
	inc = this.inc = 0,
	clear = new DCM.HTMLClearElement();
	
	this.setType("HTMLRowElement");
	
});
DCM.HTMLRowElement.prototype.addColumn = function addColumn() {
	
	var column = new DCM.HTMLColumnElement();
	column.setId(this.inc);
	this.inc ++;
	this.append(column);
	this.append(clear);
	return column;

};