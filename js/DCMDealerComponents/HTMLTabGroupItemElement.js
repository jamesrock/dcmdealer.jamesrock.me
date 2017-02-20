DCM.HTMLTabGroupItemElement = ROCK.createClass(function HTMLTabGroupItemElement() {

	try {
		
		var 
		_this = this;
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTabGroupItemElement");
		
		this.addEventHandler("ENABLED_CHANGE", function() {
			
			_this.navItem.setEnabled(_this.enabled);
			
		});
		
		this.setID = function setID(value) {
			this.id = value;
		};
		
	}
	catch(e) {
	
		DCM.warn("HTMLTabGroupItemElement", e);
	
	};
	
};