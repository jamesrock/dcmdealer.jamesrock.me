DCM.HTMLInstrumentsModuleItemElement = ROCK.createClass(DCM.HTMLTRElement, function HTMLInstrumentsModuleItemElement() {
	
	var 
	_this = this,
	nameCol = this.addColumn(),
	idCol = this.addColumn(),
	isinCol = this.addColumn(),
	expicsCol = this.addColumn(),
	filtersCol = this.addColumn(),
	tagsCol = this.addColumn(),
	usersCol = this.addColumn(),
	
	sentimentCol = this.addColumn(),
	changeCol = this.addColumn(),
	highCol = this.addColumn(),
	lowCol = this.addColumn(),
	
	instrumentAddHandler = function instrumentAddHandler() {
		
		_this.setUser(this);
		
	},
	renderUserTags = function renderUserTags() {
		
		usersCol.empty();
		
		var 
		target = _this.users,
		numberOfUsers = target.length;
		
		while(numberOfUsers--) {
			
			var 
			tag = new DCM.HTMLTagElement(),
			user = target[numberOfUsers];
			
			tag.id = user.id;
			tag.setText(user.name);
			
			usersCol.prepend(tag);
			
			tag.addEventListener(DCM.Event.dragstart, function(e) {
		
				console.log("tag.dragstart");
				
				e.stopPropagation();
				
				e.dataTransfer.setData("method", "MOVE_INSTRUMENT_USER_TAG");
				e.dataTransfer.setData("UserId", this.id);
				e.dataTransfer.setData("InstrumentId", _this.id);
				
			});
			
			tag.addEventListener(DCM.Event.dragend, function(e) {
				
				console.log("tag.dragend");
				
				e.stopPropagation();
				
			});
			
		};
		
	},
	renderTagTags = function renderTagTags() {
		
		console.log("renderTagTags", renderTagTags, _this.tags);
		
		tagsCol.empty();
		
		var 
		target = _this.tags,
		numberOfTags = target.length;
		
		while(numberOfTags--) {
			
			var 
			tagNode = new DCM.HTMLTagElement(),
			tag = target[numberOfTags];
			
			tagNode.id = tag.id;
			tagNode.setText(tag.name);
			
			tagsCol.prepend(tagNode);
			
			tagNode.addEventListener(DCM.Event.dragstart, function(e) {
		
				console.log("tag.dragstart");
				
				e.stopPropagation();
				
				e.dataTransfer.setData("method", "MOVE_INSTRUMENT_TAG");
				e.dataTransfer.setData("tagId", this.id);
				e.dataTransfer.setData("InstrumentId", _this.id);
				
			});
			
			tagNode.addEventListener(DCM.Event.dragend, function(e) {
				
				console.log("tag.dragend");
				
				e.stopPropagation();
				
			});
			
		};
		
	};
	
	this.tags = [];
	this.users = [];
	this.filters = [];
	this.epics = [];
	
	this.addEventListener(DCM.Event.dragstart, function(e) {
		
		console.log("instrument.dragstart");
		
		e.dataTransfer.setData("method", "MOVE_INSTRUMENT");
		e.dataTransfer.setData("InstrumentId", this.id);
		
	});
	
	this.addEventListener(DCM.Event.dragend, function(e) {
		
		console.log("instrument.dragend");
		
	});
	
	this.addEventListener(DCM.Event.dragover, function(e) {
		
		return false;
		
	});
	
	this.addEventListener(DCM.Event.drop, function(e) {
	
		e.preventDefault();
		
		var 
		userID = e.dataTransfer.getData("UserId"),
		tagID = e.dataTransfer.getData("tagId"),
		method = e.dataTransfer.getData("method"),
		tag = DCM.APITagManager.getTagById(tagID),
		user = DCM.APIUserManager.getUserById(userID);
		
		console.log("instrument.drop", method);
		
		if(method==="MOVE_USER"||method==="MOVE_INSTRUMENT_USER_TAG") {
			
			this.setUser(user);
			
		}
		else if(method==="MOVE_TAG"||method==="MOVE_INSTRUMENT_TAG") {
		
			this.setTag(tag);
			
		};
		
		this.setAttribute("data-drag-hover", "false");
		
	});
	
	this.addEventListener(DCM.Event.dragenter, function(e) {
		
		e.preventDefault();
		
		var 
		method = e.dataTransfer.getData("method");
		
		if(method==="MOVE_USER"||method==="MOVE_INSTRUMENT_USER_TAG"||method==="MOVE_TAG"||method==="MOVE_INSTRUMENT_TAG") {
			
			this.setAttribute("data-drag-hover", "true");
			
		};
		
	});
	
	this.addEventListener(DCM.Event.dragleave, function(e) {
		
		e.preventDefault();
		
		this.setAttribute("data-drag-hover", "false");
		
	});
	
	this.setAttribute("draggable", "true");
	
});
DCM.HTMLInstrumentsModuleItemElement.prototype.setEpic = function() {
	
	// stub
	
};
DCM.HTMLInstrumentsModuleItemElement.prototype.setFilter = function() {
	
	// stub
	
};
DCM.HTMLInstrumentsModuleItemElement.prototype.setIsin = function(value) {
	
	this.isin = value;
	isinCol.setText(value);

};
DCM.HTMLInstrumentsModuleItemElement.prototype.destroy = function() {
		
	console.log("HTMLInstrumentsModuleItemElement.destroy()");
	
	this.remove();
	
	this.dispatchEventHandler("DESTROY");
	
	DCM.APIInstrumentManager.instruments.splice(DCM.getIndexOf(DCM.APIInstrumentManager.instruments, this), 1);
	
};
DCM.HTMLInstrumentsModuleItemElement.prototype.setName = function(value) {
	
	this.name = value;
	nameCol.setText(value);

};
DCM.HTMLInstrumentsModuleItemElement.prototype.setID = function(value) {
	
	this.id = value;
	idCol.setText(value);

};
DCM.HTMLInstrumentsModuleItemElement.prototype.setTag = function(tag) {
	
	if(DCM.getIndexOf(this.tags, tag)>-1) {
	
		DCM.ToastManager.createToast(tag.name + " is already a tag of " + this.name);
		
		return;
		
	};
	
	this.tags.push(tag);
	tag.setInstrument(this);
	
	tag.addEventHandler("DESTROY", function() {
	
		_this.removeTag(tag);
		
	});
	
	renderTagTags();

};
DCM.HTMLInstrumentsModuleItemElement.prototype.removeTag = function(tag) {
		
	var toRemove = DCM.getIndexOf(this.tags, tag);
	
	this.tags.splice(toRemove, 1);
	tag.removeInstrument(this);
	
	renderTagTags();
	
};
DCM.HTMLInstrumentsModuleItemElement.prototype.setUser = function(user) {
		
	if(DCM.getIndexOf(this.users, user)>-1) {
	
		DCM.ToastManager.createToast("<strong>" + user.name + "</strong> is already a user of <strong>" + this.name + "</strong>");
		
		return;
		
	};
	
	this.users.push(user);
	user.setInstrument(this);
	
	user.addEventHandler("DESTROY", function() {
	
		_this.removeUser(user);
		
	});
	
	renderUserTags();
	
};
DCM.HTMLInstrumentsModuleItemElement.prototype.attachUser = function(user) {
		
	if(DCM.getIndexOf(this.users, user)>-1) {
	
		DCM.ToastManager.createToast("<strong>" + user.name + "</strong> is already a user of <strong>" + this.name + "</strong>");
		
		return;
		
	};
	
	this.users.push(user);
	
	user.addEventHandler("DESTROY", function() {
	
		_this.removeUser(user);
		
	});
	
	renderUserTags();
	
};
DCM.HTMLInstrumentsModuleItemElement.prototype.removeUser = function(user) {
		
	DCM.log("removeUser()");
	
	var toRemove = DCM.getIndexOf(this.users, user);
	
	this.users.splice(toRemove, 1);
	user.removeInstrument(this);
	
	renderUserTags();
	
};