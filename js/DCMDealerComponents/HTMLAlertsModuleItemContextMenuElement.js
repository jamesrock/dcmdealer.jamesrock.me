DCM.HTMLAlertsModuleItemContextMenuElement = ROCK.createClass(DCM.HTMLContextMenuElement, function() {

	var
	_this = this,
	setAsReadItem;
	
	this.inherits(target);
	
	this.setItem(DCM.Resources.getResource("DeleteAlertLabel"), function() {
	
		DCM.AlertManager.authorDeleteAlert(_this.target);
		
	});
	
	this.setItem(DCM.Resources.getResource("EditAlertLabel"), function() {
	
		DCM.AlertManager.authorEditAlert(_this.target);
		
	});
	
	setAsReadItem = this.setItem(DCM.Resources.getResource("AlertMarkAsRead"), function() {
	
		_this.target.setRead();
	
	});
	
	if(this.target.status==="READ") {
		
		setAsReadItem.disable();
		
	};

});