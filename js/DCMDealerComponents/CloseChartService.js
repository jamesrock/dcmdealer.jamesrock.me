DCM.CloseChartService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_charting_close");
	this.setErrorMessage(DCM.Resources.getResource("ERROR06"));

});