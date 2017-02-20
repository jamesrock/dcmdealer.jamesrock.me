DCM.HTMLFinderModuleItemElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLFinderModuleItemElement(Instrument) {
		
	var
	_this = this,
	Instrument = _this.Instrument = Instrument,
	itemCategoryElement = new DCM.HTMLDivElement(),
	pinToDashboardButton = new DCM.HTMLPinGraphicButtonElement(),
	addToWatchlistButton = new DCM.HTMLAddToWatchlistGraphicButtonElement(),
	itemLeft = new DCM.HTMLDivElement(),
	itemRight = new DCM.HTMLDivElement(),
	itemClearer = new DCM.HTMLClearElement(),
	setCategory = function setCategory(value) {
		itemCategoryElement.setText(value);
	};
	
	addToWatchlistButton.addEventListener(DCM.Event.click, function(e) {
		
		DCM.WatchlistManager.authorAddToWatchlist(Instrument);
		
	});
	
	itemLeft.setAttribute("data-finder-item-role", "left");
	itemRight.setAttribute("data-finder-item-role", "right");
	
	itemLeft.setText(Instrument.getDisplayTextAsHTML());
	
	pinToDashboardButton.addEventListener(DCM.Event.click, function(e) {
		
		var ticket = Instrument.openTicket();
		ticket.dock();
		
		DCM.ToastManager.createToast(DCM.Resources.getResource("PinnedItemSuccessLabel"));
		
	});
	
	this.setAttribute("data-finder-role", "item");
	
	itemCategoryElement.setAttribute("data-finder-item-role", "itemCategory");
	
	itemRight.append(itemCategoryElement);
	itemRight.append(addToWatchlistButton);
	itemRight.append(pinToDashboardButton);
	
	this.append(itemLeft);
	this.append(itemRight);
	this.append(itemClearer);
	
	setCategory(Instrument.category);
	
	this.addEventListener(DCM.Event.contextmenu, function() {
		
		return false;
		
	});
	
	this.addEventListener(DCM.Event.doubleclick, function() {
	
		var ticket = Instrument.openTicket();
		
		return false;
		
	});
	
	this.setAttribute("title", DCM.Resources.getResource("FinderItemTooltipLabel"));

});