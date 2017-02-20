DCM.DeleteNoteService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_note_delete");
	this.setErrorMessage(DCM.Resources.getResource("ERROR16"));

});