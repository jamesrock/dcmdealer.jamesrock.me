DCM.HTMLColumnElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLColumnElement() {

	this.setType("HTMLColumnElement");

});
DCM.HTMLColumnElement.prototype.setId = function(value) {
	
	this.setAttribute("data-column-id", value);

};