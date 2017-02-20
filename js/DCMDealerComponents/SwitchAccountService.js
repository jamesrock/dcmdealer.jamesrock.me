DCM.SwitchAccountService = ROCK.createClass(DCM.StandardServiceCaller, function SwitchAccountService() {
	
	this.setMethod("/dcmdealer_account_change");
	this.setErrorMessage(DCM.Resources.getResource("ERROR50"));
	
});