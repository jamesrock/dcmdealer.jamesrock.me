DCM.EditNoteService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_note_modify");
	this.setErrorMessage(DCM.Resources.getResource("ERROR21"));
	this.setParam("title", "");

});