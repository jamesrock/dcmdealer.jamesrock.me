DCM.GetNotesService = ROCK.createClass(DCM.ServiceCaller, function() {

	this.setMethod("/dcmdealer_note_getAll");
	this.setErrorMessage(DCM.Resources.getResource("ERROR30"));

});