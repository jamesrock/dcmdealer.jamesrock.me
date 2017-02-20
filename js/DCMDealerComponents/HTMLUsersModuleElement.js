DCM.HTMLUsersModuleElement = ROCK.createClass(DCM.HTMLScrollableModuleElement, function HTMLUsersModuleElement() {
	
	var 
	_this = this,
	_table = new DCM.HTMLTableElement(),
	nameFilter = new DCM.HTMLCustomTextInputElement(),
	keyFilter = new DCM.HTMLCustomTextInputElement(),
	idFilter = new DCM.HTMLCustomTextInputElement(),
	instrumentsFilter = new DCM.HTMLCustomTextInputElement(),
	nameCol = _table.addColumnHeading(),
	idCol = _table.addColumnHeading("ID"),
	keyCol = _table.addColumnHeading("API Key"),
	statusCol = _table.addColumnHeading("Status"),
	instsCol = _table.addColumnHeading("Instruments"),
	addUser = function addUser(name, id, key, status, instruments) {
		
		var 
		instruments = (instruments||[]),
		_item = new DCM.HTMLUsersModuleItemElement(),
		numberOfInstruments = instruments.length;
		
		_item.setName(name);
		_item.setID(id);
		_item.setKey(key);
		_item.setStatus(status);
		
		while(numberOfInstruments--) {
			
			_item.attachInstrument(DCM.APIInstrumentManager.getInstrumentById(instruments[numberOfInstruments]));
			
		};
		
		_table.body.prepend(_item);
		
		DCM.APIUserManager.add(_item);
		dataManager.setItem(_item);
		
	},
	dataManager = new DCM.DataManager(),
	filter = function filter() {
		
		var 
		nameValue = nameFilter.getValue().toLowerCase(),
		nameRegex = new RegExp("^" + nameValue),
		
		idValue = idFilter.getValue().toLowerCase(),
		idRegex = new RegExp("^" + idValue),
		
		keyValue = keyFilter.getValue().toLowerCase(),
		keyRegex = new RegExp("^" + keyValue),
		
		instrumentsValue = instrumentsFilter.getValue().toLowerCase(),
		
		filteredData,
		toHide = dataManager.data.length,
		toShow;
		
		while(toHide--) {
			
			dataManager.data[toHide].setVisible(false);
			
		};
		
		filteredData = dataManager.getDataByFilter(function() {
			
			var 
			instruments = this.getInstrumentNames(),
			instrumentsRegex = new RegExp("(" + instruments + ")", "g");
			
			//console.log("instruments", instruments, typeof(instruments), instrumentsRegex, instrumentsRegex.test(instrumentsValue));
			
			return this.name&&nameRegex.test(this.name.toLowerCase());
			
		}, nameValue);
		
		toShow = filteredData.length;
		
		while(toShow--) {
			
			filteredData[toShow].setVisible(true);
			
		};
		
	},
	service = new DCM.GetAPIUsersService();
	
	_this.setUnpinable(false);
	_this.setAutoStart(false);
	_this.setHeading("Users");
	_this.setType("HTMLUsersModuleElement");
	_this.setMoveable(false);
	
	_this.scroller.body.append(_table);
	_this.scroller.setHeight(350);
	
	nameFilter.setPlaceholder("Name");
	nameFilter.addEventListener(DCM.Event.keyup, function() {
		
		filter();
		
	});
	
	keyFilter.setPlaceholder("API Key");
	
	idFilter.setPlaceholder("ID");
	
	instrumentsFilter.setPlaceholder("Instruments");
	instrumentsFilter.addEventListener(DCM.Event.keyup, function() {
		
		filter();
		
	});
	
	nameCol.append(nameFilter);
	
	DCM.log("dataManager", dataManager);
	
	DCM.APIInstrumentManager.addEventHandler("LOAD_COMPLETE", function() {
	
		service.call();
		
	});
	
	service.addEventHandler("SUCCESS", function(e) {
		
		var 
		users = e.users,
		numberOfUsers = users.length;
		
		while(numberOfUsers--) {
			
			var user = users[numberOfUsers];
			console.log("user", user);
			addUser(user.name, user.apiId, user.apiKey, user.enabled, user.myInsturments);
			
		};
		
	});
	
});