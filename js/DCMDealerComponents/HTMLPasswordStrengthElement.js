DCM.HTMLPasswordStrengthElement = ROCK.createClass(DCM.HTMLRowElement, function HTMLPasswordStrengthElement() {
	
	var
	passwordOneStrength,
	passwordTwoStrength,
	passwordThreeStrength,
	passwordOneStrength = this.addColumn(),
	passwordTwoStrength = this.addColumn(),
	passwordThreeStrength = this.addColumn();
	
	this.setStrength(-1);

	this.setType("HTMLPasswordStrengthElement");
	
});
DCM.HTMLPasswordStrengthElement.prototype.setStrength = function setStrength(value) {
	
	this.setAttribute("data-strength", value);

};