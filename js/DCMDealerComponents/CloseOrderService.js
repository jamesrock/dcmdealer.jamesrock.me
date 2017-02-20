DCM.CloseOrderService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_order_cancel");
	this.setErrorMessage(DCM.Resources.getResource("ERROR07"));

});