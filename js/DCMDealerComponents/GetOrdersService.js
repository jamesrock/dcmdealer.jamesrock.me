DCM.GetOrdersService = ROCK.createClass(DCM.ServiceCaller, function() {

	this.setMethod("/dcmdealer_order_get_working");
	this.setErrorMessage(DCM.Resources.getResource("ERROR31"));
	this.setParam("prevOrderIds", "");

});