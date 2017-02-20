DCM.HTMLScrollableModuleElement = ROCK.createClass(DCM.HTMLModuleElement, function HTMLScrollableModuleElement() {

	var
	_this = this,
	scroller = _this.scroller = new DCM.HTMLScrollPanelElement(),
	refresh = _this.refresh = function() {
		scroller.refresh();
	};
	
	_this.body.append(scroller);
	_this.setType("HTMLScrollableModuleElement");
	
	// set module body to HTMLScrollPanelElement.body - may not be best approach but works well for now
	//_this.body = scroller.body;
	
});