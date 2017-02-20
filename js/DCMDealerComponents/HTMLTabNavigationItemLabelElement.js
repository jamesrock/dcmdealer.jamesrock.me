DCM.HTMLTabNavigationItemLabelElement = ROCK.createClass(function HTMLTabNavigationItemLabelElement() {

	try {
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTabNavigationItemLabelElement");
		
	}
	catch(e) {
		
		DCM.warn("HTMLTabNavigationItemLabelElement", e);
		
	};
	
};