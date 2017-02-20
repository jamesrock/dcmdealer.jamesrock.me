DCM.OpenOrderService = ROCK.createClass(DCM.StandardServiceCaller, function OpenOrderService() {
		
	this.setMethod("/dcmdealer_order_open_place");
	this.setErrorMessage(DCM.Resources.getResource("ERROR43"));
	this.setParam("securityId", "");
	this.setParam("currency", "");
	this.setParam("size", "");
	this.setParam("price", "");
	this.setParam("side", "");
	this.setParam("stopPrice", "");
	this.setParam("limitPrice", "");
	this.setParam("gtd", "");
	this.setParam("type", "");
	this.setParam("trailing", "");

});