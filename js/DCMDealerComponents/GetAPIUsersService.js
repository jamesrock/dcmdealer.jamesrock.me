DCM.GetAPIUsersService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_user_getAll");
	this.setErrorMessage(DCM.Resources.getResource("ERROR45"));

});