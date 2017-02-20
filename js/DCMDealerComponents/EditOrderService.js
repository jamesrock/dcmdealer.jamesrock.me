DCM.EditOrderService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_order_modify");
	this.setParam("stopPrice", "");
	this.setParam("limitPrice", "");
	this.setParam("tstop", "");
	this.setParam("price", "");
	this.setParam("isOrderType", "");
	this.setParam("securityId", "");
	this.setParam("positionId", "");
	this.setParam("gtd", "");
	this.setErrorMessage(DCM.Resources.getResource("ERROR22"));

});