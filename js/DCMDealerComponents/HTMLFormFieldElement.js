DCM.HTMLFormFieldElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLFormFieldElement() {

	
	var
	label = this.label = new DCM.HTMLFormLabelElement(),
	input = this.input = new DCM.HTMLFormInputElement(),
	clear = new DCM.HTMLClearElement();
	
	this.setType("HTMLFormFieldElement");
	this.append(label);
	this.append(input);
	this.append(clear);
	
});