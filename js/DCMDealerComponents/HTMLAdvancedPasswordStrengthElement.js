DCM.HTMLAdvancedPasswordStrengthElement = ROCK.createClass(DCM.HTMLRowElement, function() {

	var
	_this = this,
	passwordOneStrength,
	passwordTwoStrength,
	passwordThreeStrength,
	passwordFourStrength,
	passwordFiveStrength;
	
	passwordOneStrength = _this.addColumn();
	passwordTwoStrength = _this.addColumn();
	passwordThreeStrength = _this.addColumn();
	passwordFourStrength = _this.addColumn();
	passwordFiveStrength = _this.addColumn();
	
	passwordTwoStrength.setAttribute("title", "At least 1 lowercase character required");
	passwordThreeStrength.setAttribute("title", "At least 1 uppercase character required");
	passwordFourStrength.setAttribute("title", "At least 1 numeric character required");
	passwordFiveStrength.setAttribute("title", "At least 1 special character required");
	
	passwordTwoStrength.setText("abc");
	passwordThreeStrength.setText("ABC");
	passwordFourStrength.setText("123");
	passwordFiveStrength.setText("!&$");
	
	setMinLength(4);
	
	_this.setType("HTMLAdvancedPasswordStrengthElement");

});
DCM.HTMLAdvancedPasswordStrengthElement.prototype.setLength = function setLength(value) {
	
	this.setAttribute("data-length", value);

};
DCM.HTMLAdvancedPasswordStrengthElement.prototype.setLowercase = function setLowercase(value) {
	
	this.setAttribute("data-lowercase", value);

};
DCM.HTMLAdvancedPasswordStrengthElement.prototype.setUppercase = function setUppercase(value) {
	
	this.setAttribute("data-uppercase", value);

};
DCM.HTMLAdvancedPasswordStrengthElement.prototype.setNumber = function setNumber(value) {
	
	this.setAttribute("data-number", value);

};
DCM.HTMLAdvancedPasswordStrengthElement.prototype.setSpecial = function setSpecial(value) {
	
	this.setAttribute("data-special", value);

};
DCM.HTMLAdvancedPasswordStrengthElement.prototype.apply = function apply(strengthObj) {
	
	this.setLength(strengthObj.length);
	this.setLowercase(strengthObj.lowercase);
	this.setUppercase(strengthObj.uppercase);
	this.setNumber(strengthObj.number);
	this.setSpecial(strengthObj.special);
	
};
DCM.HTMLAdvancedPasswordStrengthElement.prototype.test = function test(password) {
		
	var 
	strength = 0,
	lowercase = false,
	uppercase = false,
	number = false,
	special = false,
	length = false;
	
	if(!password) {
		return {
			strength: -1,
			lowercase: lowercase,
			uppercase: uppercase,
			number: number,
			special: special,
			length: length
		};
	}
	else if(password.length>_this.minLength) {
		length = true;
	};
	
	if(password.match(/([a-z])/g)) {
		lowercase = true;
		strength += 1;
	};
	
	if(password.match(/([A-Z])/g)) {
		uppercase = true;
		strength += 1;
	};
	
	if(password.match(/([0-9])/g)) {
		number = true;
		strength += 1;
	};
	
	if(password.match(/([£,\.,!,%,&,@,#,$,^,*,?,_,~,\+,\=,\),\(,\-,\],\[,:,\',\/,\\,<,>])/g)) {
		special = true;
		strength += 1;
	};
	
	return {
		strength: strength,
		lowercase: lowercase,
		uppercase: uppercase,
		number: number,
		special: special,
		length: length
	};
	
};
DCM.HTMLAdvancedPasswordStrengthElement.prototype.setMinLength = function setMinLength(value) {
	
	this.minLength = value;
	passwordOneStrength.setAttribute("title", "Minimum-length " + value);
	passwordOneStrength.setText(">" + value);

};