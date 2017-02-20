DCM.HTMLTabNavigationElement = ROCK.createClass(function HTMLTabNavigationElement() {

	try {
		
		var 
		clear = new DCM.HTMLClearElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTabNavigationElement");
		
		this.addItem = function addItem() {
			var item = new DCM.HTMLTabNavigationItemElement();
			this.append(item);
			this.append(clear);
			return item;
		};
	
	}
	catch(e) {
		
		DCM.warn("HTMLTabNavigationElement", e);
		
	};
	
};