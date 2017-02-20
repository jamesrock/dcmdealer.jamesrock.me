DCM.HTMLStaticPanelElement = ROCK.createClass(function HTMLStaticPanelElement() {

	try {

		var
		inner = new DCM.HTMLDivElement(),
		heading = new DCM.HTMLBrandIconElement(),
		accountDetailsPanel = new DCM.HTMLAccountDetailsPanelElement(),
		clearElement = new DCM.HTMLClearElement(),
		navigation = new DCM.HTMLHeadNavigationElement(),
		accountTypeToggle = new DCM.HTMLAccountTypeToggleElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLStaticPanelElement");
		
		this.append(inner);
		
		inner.append(heading);
		inner.append(accountTypeToggle);
		inner.append(navigation);
		inner.append(accountDetailsPanel);
		inner.append(clearElement);
		
	}
	catch(e) {
		
		DCM.warn("HTMLStaticPanelElement", e);
		
	};

};