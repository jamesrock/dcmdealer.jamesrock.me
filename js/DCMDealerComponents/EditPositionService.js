DCM.EditPositionService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_position_modify");
	this.setParam("stopPrice", "");
	this.setParam("limitPrice", "");
	this.setParam("tstop", "");
	this.setParam("price", "");
	this.setParam("isOrderType", "");
	this.setParam("securityId", "");
	this.setParam("positionId", "");
	this.setErrorMessage(DCM.Resources.getResource("ERROR23"));

});