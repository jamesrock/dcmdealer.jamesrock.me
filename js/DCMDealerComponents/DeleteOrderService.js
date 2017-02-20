DCM.DeleteOrderService = ROCK.createClass(DCM.ServiceCaller, function() {

	this.setMethod("/dcmdealer_order_remove_working");
	this.setErrorMessage(DCM.Resources.getResource("ERROR17"));

});