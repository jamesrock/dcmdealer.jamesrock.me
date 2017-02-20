DCM.HTMLLabelElement = ROCK.createClass(DCM.HTMLSpanElement, function HTMLLabelElement() {

	this.setType("HTMLLabelElement");

});
DCM.HTMLLabelElement.prototype.setLabel = function(value) {
	
	this.setText(value);

};