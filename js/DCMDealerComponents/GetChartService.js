DCM.GetChartService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_charting_getlink");
	this.setErrorMessage(DCM.Resources.getResource("ERROR27"));

});