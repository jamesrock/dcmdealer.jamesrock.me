DCM.HTMLTabGroupElement = ROCK.createClass(function HTMLTabGroupElement() {

	try {
		
		var 
		_this = this,
		tabs = [],
		nav = _this.nav = new DCM.HTMLTabNavigationElement(),
		addTab = _this.addTab = function addTab(label, id) {
		
			var 
			tab = new DCM.HTMLTabGroupItemElement(),
			navItem = tab.navItem = nav.addItem();
			
			navItem.label.setText(label);
			tab.setID(id);
			tab.enable();
			
			navItem.addEventListener(DCM.Event.click, function() {
				
				if(tab.enabled) {
					setValue(id);
				};
				
			});
			
			tabs.push(tab);
			_this.append(tab);
			
			setValue(tabs[0].id, true);
			
			return tab;
			
		},
		setValue = _this.setValue = function setValue(value, forced) {
		
			if(!forced&&value===_this.value) {
				return;
			};
			
			var 
			loop = tabs.length,
			targetTab;
			
			while(loop--) {
				tabs[loop].hide();
				tabs[loop].navItem.setActive(false);
			};
			
			targetTab = getTabByID(value);
			targetTab.show();
			targetTab.navItem.setActive(true);
			
			_this.active = targetTab;
			_this.value = value;
			_this.dispatchEventHandler("CHANGE");
			
		},
		getTabByID = function getTabByID(id) {
			var 
			loop = tabs.length,
			_return;
			
			while(loop--) {
				if(tabs[loop].id===id) {
					_return = tabs[loop];
					break;
				};
			};
			
			return _return;
		};
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		_this.append(nav);
		_this.setType("HTMLTabGroupElement");
	
	}
	catch(e) {
	
		DCM.warn("HTMLTabGroupElement", e);
	
	};
	
};