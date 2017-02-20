DCM.HTMLInstrumentsModuleElement = ROCK.createClass(DCM.HTMLScrollableModuleElement, function HTMLInstrumentsModuleElement() {
		
	// name
	// isin - one
	// epic - multi
	// tags
	// users 
	// filters
	
	// sentiment
	// change
	// high
	// low

	var 
	_this = this,
	_table = new DCM.HTMLTableElement(),
	nameFilter = new DCM.HTMLCustomTextInputElement(),
	nameCol = _table.addColumnHeading(),
	idCol = _table.addColumnHeading("ID"),
	isinCol = _table.addColumnHeading("isin"),
	epicsCol = _table.addColumnHeading("Epics"),
	filtersCol = _table.addColumnHeading("Filters"),
	tagsCol = _table.addColumnHeading("Tags"),
	usersCol = _table.addColumnHeading("Users"),	
	sentimentCol = _table.addColumnHeading("Sentiment"),
	changeCol = _table.addColumnHeading("Change"),
	highCol = _table.addColumnHeading("High"),
	lowCol = _table.addColumnHeading("Low"),	
	addInstrument = function addInstrument(name, ID, isin, tags, epics, filters) {
		
		var 
		_item = new DCM.HTMLInstrumentsModuleItemElement();
		
		_item.setName(name);
		_item.setID(ID);
		_item.setIsin(isin);
		
		// handle tagging
		
		_table.body.prepend(_item);
		
		DCM.APIInstrumentManager.add(_item);
		dataManager.setItem(_item);
		
	},
	dataManager = new DCM.DataManager();
	
	_this.setUnpinable(false);
	_this.setAutoStart(false);
	_this.setHeading("Instruments");
	_this.setType("HTMLInstrumentsModuleElement");
	_this.setMoveable(false);
	
	nameFilter.setPlaceholder("Name");
	nameFilter.addEventListener(DCM.Event.keyup, function() {
		
		var 
		value = this.getValue().toLowerCase(),
		nameRegex = new RegExp("^" + value),
		filteredData,
		toHide = dataManager.data.length,
		toShow;
		
		while(toHide--) {
			
			dataManager.data[toHide].setVisible(false);
			
		};
		
		filteredData = dataManager.getDataByFilter(function() {
			
			return this.name&&nameRegex.test(this.name.toLowerCase());
			
		}, value);
		
		toShow = filteredData.length;
		
		while(toShow--) {
			
			filteredData[toShow].setVisible(true);
			
		};
		
	}),
	service = new DCM.GetAPIInstrumentsService();
	
	nameCol.append(nameFilter);
	
	_this.scroller.body.append(_table);
	_this.scroller.setHeight(350);
	
	service.call();
	service.addEventHandler("SUCCESS", function(e) {
		
		var 
		instruments = e.insts,
		numberOfInstruments = instruments.length;
		
		while(numberOfInstruments--) {
			
			var intrument = instruments[numberOfInstruments];
			addInstrument(intrument.name, intrument.id, intrument.isin, intrument.myTags, intrument.epics, intrument.myFilters);
			
		};
		
		DCM.APIInstrumentManager.dispatchEventHandler("LOAD_COMPLETE");
	
	});
	
});