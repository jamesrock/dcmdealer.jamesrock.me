DCM.HTMLFormElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLFormElement() {

	this.setType("HTMLFormElement");

});
DCM.HTMLFormElement.prototype.addField = function() {
	
	var field = new DCM.HTMLFormFieldElement();
	this.append(field);
	return field;

};
DCM.HTMLFormElement.prototype.addGroup = function() {
	
	var group = new DCM.HTMLFormFieldGroupElement();
	this.append(group);
	return group;

};