DCM.HTMLTabNavigationItemElement = ROCK.createClass(function HTMLTabNavigationItemElement() {

	try {
		
		var 
		label = this.label = new DCM.HTMLTabNavigationItemLabelElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTabNavigationItemElement");
		
		this.append(label);
		
		this.setComplete = function setComplete() {
			this.setStatus("complete");
		};
		
		this.setStatus = function setStatus(value) {
			this.setAttribute("data-status", value);
		};
		
		this.setActive = function setActive(value) {
			this.setAttribute("data-active", value);
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLTabNavigationItemElement", e);
		
	};
	
};