DCM.HTMLExpandCollapseToggleGraphicButtonElement = ROCK.createClass(DCM.HTMLGraphicButtonToggleElement, function HTMLExpandCollapseToggleGraphicButtonElement() {

	this.setRole("expand-collapse-toggle");
	this.setSize("2");
	this.setLabel(DCM.Resources.getResource("ExpandModuleLabel"));
	this.setType("HTMLExpandCollapseToggleGraphicButtonElement");
	
	this.addEventHandler("ACTIVE_CHANGE", function() {
		
		if(this.active) {
			this.setLabel(DCM.Resources.getResource("CollapseModuleLabel"));
		}
		else {
			this.setLabel(DCM.Resources.getResource("ExpandModuleLabel"));
		};
		
	});
		
};