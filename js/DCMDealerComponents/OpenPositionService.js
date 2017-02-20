DCM.OpenPositionService = ROCK.createClass(DCM.StandardServiceCaller, function OpenPositionService() {
		
	this.setMethod("/dcmdealer_order_place");
	this.setErrorMessage(DCM.Resources.getResource("ERROR44"));
	this.setParam("securityId", "");
	this.setParam("currency", "");
	this.setParam("size", "");
	this.setParam("side", "");
	this.setParam("stopPrice", "");
	this.setParam("limitPrice", "");
	this.setParam("trailing", "");
	
});