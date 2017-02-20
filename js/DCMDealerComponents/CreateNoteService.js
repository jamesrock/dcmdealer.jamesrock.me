DCM.CreateNoteService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_note_add");
	this.setErrorMessage(DCM.Resources.getResource("ERROR10"));
	this.setParam("title", "x");

});