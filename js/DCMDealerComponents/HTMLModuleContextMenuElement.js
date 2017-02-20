DCM.HTMLModuleContextMenuElement = ROCK.createClass(DCM.HTMLContextMenuElement, function HTMLModuleContextMenuElement(target) {

	var
	_this = this;
	
	this.inherits(target);
	
	if(_this.target.closeable) {
		_this.setItem(DCM.Resources.getResource("CloseModule"), function() {
			_this.target.close();
		});
	};
	
	if(_this.target.unpinable) {
		_this.setItem(DCM.Resources.getResource("UnpinFromDashboardLabel"), function() {
			_this.target.unpin();
		});
	};
	
	if(_this.target.pinable) {
		_this.setItem(DCM.Resources.getResource("PinToDashboardLabel"), function() {
			_this.target.pin();
		});
	};
	
	if(_this.target.resizeable&&_this.target.getCollapsed()) {
		_this.setItem(DCM.Resources.getResource("ExpandModuleLabel"), function() {
			_this.target.resize();
		});
	}
	else if(_this.target.resizeable) {
		_this.setItem(DCM.Resources.getResource("CollapseModuleLabel"), function() {
			_this.target.resize();
		});
	};
	
	if(DCM.Environment.getEnvironment()==="DEV") {
		
		_this.setItem("START MODULE (DEV)", function() {
			_this.target.start();
		});
		
		_this.setItem("STOP MODULE (DEV)", function() {
			_this.target.stop();
		});
		
		_this.setItem("UPDATE MODULE (DEV)", function() {
			_this.target.update();
		});
		
	};
	
});