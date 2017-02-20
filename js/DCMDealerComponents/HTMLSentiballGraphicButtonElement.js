DCM.HTMLSentiballGraphicButtonElement = ROCK.createClass(function HTMLSentiballGraphicButtonElement() {

	try {
		
		var
		_this = this;
		
		this._super = DCM.HTMLGraphicButtonToggleElement;
		this._super();
		
		this.setRole("sentiball");
		this.setSize("2");
		this.setLabel(DCM.Resources.getResource("ShowSentiball"));
		this.setType("HTMLSentiballGraphicButtonElement");
		
		this.addEventHandler("ACTIVE_CHANGE", function() {
			
			if(_this.active) {
				_this.setLabel(DCM.Resources.getResource("HideSentiball"));
			}
			else {
				_this.setLabel(DCM.Resources.getResource("ShowSentiball"));
			};
			
		});
		
	}
	catch(e) {
		
		DCM.warn("HTMLSentiballGraphicButtonElement", e);
		
	};
	
};