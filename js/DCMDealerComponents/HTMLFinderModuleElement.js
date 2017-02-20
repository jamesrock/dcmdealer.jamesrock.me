DCM.HTMLFinderModuleElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLFinderModuleElement() {

	var
	_this = this,
	seachInput = new DCM.HTMLCustomTextInputElement(),
	seachOutput = new DCM.HTMLScrollPanelElement(),
	head = new DCM.HTMLFinderModuleHeadElement(),
	body = new DCM.HTMLFinderModuleBodyElement(),
	dataGetter = new DCM.GetInstrumentsService(),
	renderItemsFromData = function renderItemsFromData() {
	
		for(var prop in filteredData) {
		
			var 
			_prop = filteredData[prop],
			item = new DCM.HTMLFinderModuleItemElement(_prop);
			
			seachOutput.body.append(item);
			seachOutput.refresh();
			
		};
		
	},
	filteredData,
	dataManager = new DCM.DataManager(),
	categorySelect = new DCM.HTMLDynamicSelectMenuElement(),
	categoryToFilter = "all",
	find = function find() {
	
		seachOutput.body.empty();
		
		seachOutput.setScrollTop(0);
		
		var value = seachInput.getValue().toLowerCase();
		
		if(!value&&categoryToFilter==="all") {
		
			filteredData = dataManager.getDataByFilter();
			
		}
		else {
		
			var 
			nameRegex = new RegExp("^" + value),
			categoryRegex = new RegExp("^" + categoryToFilter + "$");
			
			filteredData = dataManager.getDataByFilter(function() {
				
				return this.name&&this.category&&nameRegex.test(this.name.toLowerCase())&&(categoryToFilter==="all"?true:categoryRegex.test(this.category.toLowerCase()));
				
			}, (value + "[" + categoryToFilter + "]"));
			
		};
	
		renderItemsFromData();
		
	},
	instrumentsGetterSuccessHandler = function instrumentsGetterSuccessHandler(data) {
		
		var instruments = data.insts;
		
		for(var prop in instruments) {
			var instrument = DCM.InstrumentManager.createInstrument(instruments[prop]);
			if(!categorySelect.getItemByValue(instrument.category.toLowerCase())) {
				categorySelect.setItem(instrument.category, instrument.category.toLowerCase());
			};
		};
		
		DCM.getUserPanels.call();
		
		dataManager.setData(DCM.InstrumentManager.instruments);
		
		filteredData = dataManager.getDataByFilter();
		
		renderItemsFromData();
		
	},
	categorySelectChangeHandler = function categorySelectChangeHandler() {
		
		categoryToFilter = categorySelect.getValue();		
		find();
		
	},
	searchKeyUpHandler = function searchKeyUpHandler() {
		
		find();
		
	};
	
	head.left.append(seachInput);

	seachInput.setAttribute("data-finder-role", "search-input");
	
	seachInput.addEventListener(DCM.Event.keyup, searchKeyUpHandler);
	
	head.right.append(categorySelect);
	
	categorySelect.setItem(DCM.Resources.getResource("FinderShowAllLabel"), "all");
	categorySelect.setValue("all");
	categorySelect.setWidth(200);
	categorySelect.addEventHandler("CHANGE", categorySelectChangeHandler);
	
	dataGetter.addEventHandler("SUCCESS", instrumentsGetterSuccessHandler);
	dataGetter.call();
	
	seachInput.setPlaceholder(DCM.Resources.getResource("FinderSearchPlaceholderLabel"));
	
	this.setType("HTMLFinderModuleElement");
	
	body.append(seachOutput);
	
	this.append(head);
	this.append(body);
	
});