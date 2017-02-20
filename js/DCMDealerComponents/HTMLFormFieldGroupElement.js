DCM.HTMLFormFieldGroupElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLFormFieldGroupElement() {

	var
	clear = new DCM.HTMLClearElement();

	this.setType("HTMLFormFieldGroupElement");
	
};
DCM.HTMLFormFieldGroupElement.prototype.addField = function() {
			
	var field = new DCM.HTMLFormFieldElement();
	this.append(field);
	this.append(clear);
	return field;
	
};