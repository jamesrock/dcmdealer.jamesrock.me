DCM.GetPositionsService = ROCK.createClass(DCM.ServiceCaller, function() {

	this.setMethod("/dcmdealer_positions_getAllOpen");
	this.setErrorMessage(DCM.Resources.getResource("ERROR34"));
	this.setParam("isAggregate", "");
	this.setParam("prevPositionsIds", "");

});