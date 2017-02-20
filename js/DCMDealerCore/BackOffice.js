DCM.BackOffice = function BackOffice() {

	try {
	
		/*
		
		features to add...
		
		filtering of tags, users, instruments etc etc - not so desirable
		ability to enable/disable
		create tag
		create instrument
		create user
		
		*/
	
		DCM.Platform.init();
		
		var 		
		UserManager = function UserManager() {
	
			this.users = [];
			
			this.getUserById = function getUserById(userId) {
				
				var 
				_return,
				target = this.users,
				loop = target.length;
				while(loop--) {
					if(target[loop].id===userId) {
						_return = target[loop];
						break;
					};
				};
				return _return;
				
			};
			
			this.add = function add(user) {
				
				this.users.push(user);
				
			};
			
		},
		InstrumentManager = function InstrumentManager() {
			
			this.instruments = [];
			
			this.getInstrumentById = function getInstrumentById(instrumentId) {
				
				var 
				_return,
				target = this.instruments,
				loop = target.length;
				while(loop--) {
					if(target[loop].id===instrumentId) {
						_return = target[loop];
						break;
					};
				};
				return _return;
				
			};
			
			this.add = function add(instrument) {
				
				this.instruments.push(instrument);
				
			};
			
		},
		TagManager = function TagManager() {
			
			this.tags = [];
			
			this.getTagById = function getTagById(tagId) {
			
				var 
				_return,
				target = this.tags,
				loop = target.length;
				while(loop--) {
					if(target[loop].id===tagId) {
						_return = target[loop];
						break;
					};
				};
				return _return;
			
			};
			
			this.add = function add(tag) {
				
				this.tags.push(tag);
				
			};
			
		},
		APIUserManager = DCM.APIUserManager = new UserManager(),
		APIInstrumentManager = DCM.APIInstrumentManager = new InstrumentManager(),
		APITagManager = DCM.APITagManager = new TagManager(),
		_page = DCM.page = new DCM.HTMLPageElement(),
		usersModule = new DCM.HTMLUsersModuleElement(),
		instrumentsModule = new DCM.HTMLInstrumentsModuleElement(),
		tagsModule = new DCM.HTMLTagsModuleElement(),
		trashBar = new DCM.HTMLDivElement(),
		defaultTrashBarString = "Drag items here to delete";
		
		trashBar.setType("HTMLTrashElement");
		trashBar.setText(defaultTrashBarString);
		
		DCM.body.append(_page);
		DCM.body.append(trashBar);
		
		_page.append(usersModule);
		_page.append(instrumentsModule);
		_page.append(tagsModule);
		
		// DRAG AND DROP
		trashBar.addEventListener(DCM.Event.dragover, function(e) {
			
			return false;
			
		});
		
		trashBar.addEventListener(DCM.Event.drop, function(e) {
			
			e.preventDefault();
			
			var 
			instrumentId = e.dataTransfer.getData("InstrumentId"),
			userId = e.dataTransfer.getData("UserId"),
			tagId = e.dataTransfer.getData("tagId"),
			method = e.dataTransfer.getData("method"),
			instrument = DCM.APIInstrumentManager.getInstrumentById(instrumentId),
			user = DCM.APIUserManager.getUserById(userId),
			tag = DCM.APITagManager.getTagById(tagId);
			
			console.log("trashBar.drop", method);
			
			if(method==="MOVE_INSTRUMENT_USER_TAG") {
			
				instrument.removeUser(user);
				user.removeInstrument(instrument);
				
			}
			else if(method==="MOVE_USER_INSTRUMENT_TAG") {
				
				user.removeInstrument(instrument);
				instrument.removeUser(user);
				
			}
			else if(method==="MOVE_INSTRUMENT") {
				
				instrument.destroy();
				
			}
			else if(method==="MOVE_USER") {
				
				user.destroy();
				
			}
			else if(method==="MOVE_TAG") {
				
				tag.destroy();
				
			}
			else if(method==="MOVE_INSTRUMENT_TAG") {
				
				instrument.removeTag(tag);
				tag.removeInstrument(instrument);
				
			}
			else if(method==="MOVE_TAG_INSTRUMENT_TAG") {
			
				tag.removeInstrument(instrument);
				instrument.removeTag(tag);
			
			};
			
			this.setText(defaultTrashBarString);
			
			this.setAttribute("data-drag-hover", "false");
			
		});
		
		trashBar.addEventListener(DCM.Event.dragenter, function(e) {
			
			e.preventDefault();
			
			var 
			instrumentId = e.dataTransfer.getData("InstrumentId"),
			userId = e.dataTransfer.getData("UserId"),
			tagId = e.dataTransfer.getData("tagId"),
			method = e.dataTransfer.getData("method"),
			instrument = DCM.APIInstrumentManager.getInstrumentById(instrumentId),
			user = DCM.APIUserManager.getUserById(userId),
			tag = DCM.APITagManager.getTagById(tagId);
			
			console.log("trashBar.dragenter", method);
			
			if(method==="MOVE_INSTRUMENT_USER_TAG") {
			
				this.setText("Drop to REMOVE user <strong>" + user.name + "</strong> from instrument <strong>" + instrument.name + "</strong>");
				
			}
			else if(method==="MOVE_USER_INSTRUMENT_TAG") {
			
				this.setText("Drop to REMOVE instrument <strong>" + instrument.name + "</strong> from user <strong>" + user.name + "</strong>");
				
			}
			else if(method==="MOVE_INSTRUMENT") {
			
				this.setText("Drop to REMOVE instrument <strong>" + instrument.name + "</strong>");
				
			}
			else if(method==="MOVE_USER") {
				
				this.setText("Drop to REMOVE user <strong>" + user.name + "</strong>");
				
			}
			else if(method==="MOVE_INSTRUMENT_TAG") {
				
				this.setText("Drop to REMOVE tag <strong>" + tag.name + "</strong> from instrument <strong>" + instrument.name + "</strong>");
				
			}
			else if(method==="MOVE_TAG") {
			
				this.setText("Drop to REMOVE tag <strong>" + tag.name + "</strong>");
				
			}
			else if(method==="MOVE_TAG_INSTRUMENT_TAG") {
			
				this.setText("Drop to REMOVE instrument <strong>" + instrument.name + "</strong> from tag <strong>" + tag.name + "</strong>");
			
			};
			
			this.setAttribute("data-drag-hover", "true");
			
			return false;
			
		});
		
		trashBar.addEventListener(DCM.Event.dragleave, function(e) {
			
			e.preventDefault();
			
			this.setText(defaultTrashBarString);
			
			this.setAttribute("data-drag-hover", "false");
			
			return false;
			
		});
		
	}
	catch(e) {
		
		DCM.warn("BackOffice", e);
		
	};
	
};