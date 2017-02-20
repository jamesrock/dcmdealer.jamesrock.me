DCM.AccessDenied = function AccessDenied() {

	try {
	
		DCM.Platform.init();
		
		var 
		brandIcon = new DCM.HTMLBrandIconElement(),
		page = new DCM.HTMLPageElement(),
		pane = new DCM.HTMLPaneElement(),
		tagline = new DCM.HTMLDivElement(),
		disclaimer = new DCM.HTMLPageFootElement();
		
		tagline.setText("<strong>Sorry!</strong><br />You are not permitted to view this page.<br /><a href=\"/dealer_platform_login\">Click here to return to login page.<a/>");
		
		DCM.body.append(page);
		
		page.append(pane);
		
		pane.head.append(brandIcon);
		pane.head.append(tagline);
		
		pane.foot.append(disclaimer);
		
	}
	catch(e) {
		
		DCM.warn("AccessDenied", e);
		
	};
	
};DCM.BackOffice = function BackOffice() {

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
	
};DCM.DataManager = function DataManager() {

	try {
		
		var
		cache = {};
		
		this.data = [];
		
		this.setItem = function setItem(_item) {
			
			this.data.push(_item);
			
		};
		
		this.getDataByFilter = function getDataByFilter(filter, cacheKey) {
		
			if(!filter) {
				return this.data;
			};
			
			if(cache[cacheKey]) {
				DCM.log("DataManager - fromCache");
				return cache[cacheKey];
			};
			
			var 
			_return = [],
			target = this.data,
			loop = target.length;
			
			while(loop--) {
				if(filter.call(target[loop])===true) {
					_return.unshift(target[loop]);
				};
			};
			
			cache[cacheKey] = _return;
			DCM.log("DataManager - cache entry - ", cacheKey);
			
			return _return;
		
		};
		
		this.setData = function setData(value) {
			
			this.data = value;
		
		};
	
	}
	catch(e) {
		
		DCM.warn("DataManager", e);
		
	};
	
};DCM.Dealer = function Dealer() {
	
	try {
		
		DCM.Platform.init();
		
		_gaq.push(["_setAccount", "UA-11989015-1"]);
		_gaq.push(["_setDomainName", "dcmdealer.dcmcap.com"]);
		_gaq.push(["_setAllowLinker", true]);
		_gaq.push(["_trackPageview"]);

		var 
		protocolToUse = document.location.protocol!=="file:"?document.location.protocol:"http:",
		//sharingClient = DCM.sharingClient = new Lightstreamer.LightstreamerClient((protocolToUse + "//10.10.100.7:8082"), "DCM"),
		//sharingClient = DCM.sharingClient = new Lightstreamer.LightstreamerClient((protocolToUse + "//10.10.100.6:8082"), "DCM"),
		sharingClient = DCM.sharingClient = new Lightstreamer.LightstreamerClient((protocolToUse + "//push.dcmdealer.dcmcap.com"), "DCM"),
		_page = DCM.page = new DCM.HTMLPageElement(),
		getUserPanels = DCM.getUserPanels = new DCM.GetUserPanelsService(),
		getSessionService = new DCM.GetSessionService(),
		toolbar = DCM.toolbar = new DCM.HTMLToolbarElement(),
		staticPanel = new DCM.HTMLStaticPanelElement(),
		getSessionServiceSuccessHandler = function getSessionServiceSuccessHandler(data) {
		
			sharingClient.connectionDetails.setUser(data.un);
			sharingClient.connectionDetails.setPassword(data.pw);
			sharingClient.connect();
			
		},
		getUserPanelsSuccessHandler = function getUserPanelsSuccessHandler(data) {
		
			for(var prop in data) {
			
				var _prop = data[prop];
				
				DCM.ModuleManager.createModule(_prop.panelType, _prop.params);
				
			};
			
			$(DCM.page.displayObject).sortable({
				handle: "[data-type=\"HTMLModuleHeadElement\"]",
				items: "[data-type~=\"HTMLModuleElement\"][data-moveable=\"true\"]",
				cancel: "[data-type~=\"HTMLModuleElement\"] [data-type~=\"HTMLModuleElement\"] [data-type=\"HTMLModuleHeadElement\"]",
				scroll: false,
				opacity: 0.6,
				stop: function() {
					
					DCM.log("POSITION OF MODULES HAS CHANGED");
					
					// save position of modules
					
				}
			});
			
		};
		
		DCM.AccountManager.start();
		
		DCM.AccountManager.userDetailsService.call();
		
		getSessionService.call();
		getSessionService.addEventHandler("SUCCESS", getSessionServiceSuccessHandler);
		
		DCM.body.append(_page);
		
		DCM.document.addEventListener({
			name: "contextmenu",
			condition: function() {
				return true;
			}
		}, function(e) {
			
			var _contextMenu = new DCM.HTMLDocumentContextMenuElement();
			_contextMenu.setX(e.clientX);
			_contextMenu.setY(e.clientY);
			
			return false;
			
		});
		
		getUserPanels.addEventHandler("SUCCESS", getUserPanelsSuccessHandler);
		
		DCM.body.append(staticPanel);
		DCM.body.append(toolbar);
		
	}
	catch(e) {
	
		DCM.warn("Dealer", e);
		
	};
	
};DCM.DialogManager = new function DialogManager() {

	try {
		
		var
		_this = this,
		dialogs = _this.dialogs = [],
		queueDialog = _this.queueDialog = function queueDialog(dialog) {
			dialogs.unshift(dialog);
			if(dialogs.length===1) {
				dialogs[0].open();
			};
		},
		openFirstInQueue = _this.openFirstInQueue = function openFirstInQueue() {
			if(dialogs.length>0) {
				setTimeout(function() {
					dialogs[0].open();
				}, 150);
			};
		};
		
	}
	catch(e) {
		
		DCM.warn("DialogManager", e);
		
	};
	
};DCM.Environment = new function Environment() {

	var 
	_this = this,
	environment = null,
	getEnvironment = _this.getEnvironment = function getEnvironment() {
		var _return = environment;
		return _return;
	},
	setEnvironment = _this.setEnvironment = function setEnvironment(value) {
		environment = value;
	};
	
	//setEnvironment("DEV");
	
};DCM.Event = new function Event() {

	var 
	hasParentOrIs = function hasParentOrIs(elm, parent) {
		var 
		target = elm.parentNode,
		_return = false;
		if(elm===parent) {
			return true;
		};
		while(target) {
			if(target===parent) {
				_return = true;
				break;
			};
			target = target.parentNode;
		};
		return _return;
	};

	this.mouseover = {
		condition: function(e) {
			return true;
		},
		name: "mouseover"
	};
	
	this.mouseout = {
		condition: function(e) {
			return true;
		},
		name: "mouseout"
	};
	
	this.mouseenter = {
		condition: function(e) {
			if(!e.relatedTarget||!hasParentOrIs(e.relatedTarget, e.currentTarget)) {
				return true;
			};
		},
		name: "mouseover"
	};
	
	this.mouseleave = {
		condition: function(e) {
			if(!e.relatedTarget||!hasParentOrIs(e.relatedTarget, e.currentTarget)) {
				return true;
			};
		},
		name: "mouseout"
	};
	
	this.click = {
		condition: function(e) {
			return true;
		},
		name: "click"
	};
	
	this.doubleclick = {
		condition: function(e) {
			return true;
		},
		name: "dblclick"
	};
	
	this.mousedown = {
		condition: function(e) {
			return true;
		},
		name: "mousedown"
	};
	
	this.mouseup = {
		condition: function(e) {
			return true;
		},
		name: "mouseup"
	};
	
	this.mousemove = {
		condition: function(e) {
			return true;
		},
		name: "mousemove"
	};
	
	this.keydown = {
		condition: function(e) {
			return true;
		},
		name: "keydown"
	};
	
	this.keyup = {
		condition: function(e) {
			return true;
		},
		name: "keyup"
	};
	
	this.keypress = {
		condition: function(e) {
			return true;
		},
		name: "keypress"
	};
	
	this.contextmenu = {
		condition: function(e) {
			return true;
		},
		name: "contextmenu"
	};
	
	this.change = {
		condition: function(e) {
			return true;
		},
		name: "change"
	};
	
	this.dragstart = {
		condition: function(e) {
			return true;
		},
		name: "dragstart"
	};
	
	this.dragend = {
		condition: function(e) {
			return true;
		},
		name: "dragend"
	};
	
	this.drop = {
		condition: function(e) {
			return true;
		},
		name: "drop"
	};
	
	this.drag = {
		condition: function(e) {
			return true;
		},
		name: "drag"
	};
	
	this.dragover = {
		condition: function(e) {
			return true;
		},
		name: "dragover"
	};
	
	this.dragenter = {
		condition: function(e) {
			return true;
		},
		name: "dragenter"
	};
	
	this.dragleave = {
		condition: function(e) {
			return true;
		},
		name: "dragleave"
	};
	
	this.mousewheel = {
		condition: function(e) {
			return true;
		},
		name: (function() {
			if(window.mozIndexedDB) {
				return "DOMMouseScroll";
			};
			return "mousewheel";
		})()
	};
	
	this.submit = {
		condition: function(e) {
			return true;
		},
		name: "submit"
	};
	
	this.adder = "addEventListener";
	this.remover = "removeEventListener";
	
	if(!window.addEventListener) {
	
		this.adder = "attachEvent";
		this.remover = "detachEvent";
		this.click.name = "onclick";
		this.doubleclick.name = "ondblclick";
		this.mousedown.name = "onmousedown";
		this.mouseup.name = "onmouseup";
		this.mousemove.name = "onmousemove";
		this.mouseenter.name = "onmouseenter";
		this.mouseleave.name = "onmouseleave";
		this.keydown.name = "onkeydown";
		this.keyup.name = "onkeyup";
		this.keypress.name = "onkeypress";
		this.contextmenu.name = "oncontextmenu";
		this.mousewheel.name = "onmousewheel";
		this.change.name = "onchange";
		this.submit.name = "onsubmit";
		this.dragstart.name = "ondragstart";
		this.dragend.name = "ondragend";
		this.drop.name = "ondrop";
		this.drag.name = "ondrag";
		this.dragover.name = "ondragover";
		this.dragenter.name = "ondragenter";
		this.dragleave.name = "ondragleave";
		
	};
	
};DCM.EventDispatcher = function EventDispatcher() {

	try {

		var
		_this = this;
		
		this.handlers = new function Handlers() {};
		
		this.addEventHandler = function addEventHandler(eventName, handler, preventBubble) {
		
			var 
			dispatch = function dispatch(data) {
				
				handler.call(_this, data);
				
			},
			eventObject = this.handlers[eventName] = (this.handlers[eventName]||[]),
			event = {
				nativeHandler: handler,
				remove: function remove() {
					eventObject.splice(eventObject.indexOf(this), 1);
					if(eventObject.length===0) {
						delete _this.handlers[eventName];
					};
				},
				dispatch: dispatch
			};
			
			eventObject.push(event);
			
			return event;
			
		};
		
		this.removeEventHandler = function removeEventHandler(event, handler) {
		
			var 
			targetEvent = this.handlers[event],
			targetEventLength = targetEvent&&targetEvent.length;
			
			if(targetEvent&&handler) {
				while(targetEventLength--) {
					if(targetEvent[targetEventLength].nativeHandler===handler) {
						targetEvent[targetEventLength].remove();
						break;
					};
				};
			}
			else if(targetEvent) {
				while(targetEvent[0]) {
					targetEvent[0].remove();
				};
			};
			
		};
		
		this.dispatchEventHandler = function dispatchEventHandler(eventName, data, handler) {
		
			var targetEvent = this.handlers[eventName];
			
			if(targetEvent&&handler) {
				for(var prop in targetEvent) {
					if(targetEvent[prop].nativeHandler===handler) {
						targetEvent[prop].dispatch(data);
						break;
					};
				};
			}
			else if(targetEvent) {
				for(var prop in targetEvent) {
					targetEvent[prop].dispatch(data);
				};
			};
			
		};
		
	}
	catch(e) {
		
		DCM.warn("EventDispatcher", e);
		
	};
	
};DCM.InstrumentManager = new function InstrumentManager() {

	try {
		
		var
		_this = this,
		instruments = _this.instruments = [],
		createInstrument = _this.createInstrument = function createInstrument(data) {
			var instrument = new DCM.Instrument(data);
			instruments.push(instrument);
			return instrument;
		},
		getInstrumentById = _this.getInstrumentById = function getInstrumentById(id) {
			var 
			loop = instruments.length,
			_return;
			while(loop--) {
				if(instruments[loop].id===id) {
					_return = instruments[loop];
					break;
				};
			};
			return _return;
		};
		
	}
	catch(e) {
		
		DCM.warn("InstrumentManager", e);
		
	};
	
};DCM.Key = new function Key() {
	
	var
	_this = this,
	
	key32 = _this.key32 = "\u0020",
	keyShift32 = _this.keyShift32 = "\u0020",
	
	key38 = _this.key38 = "UP",
	key40 = _this.key40 = "DOWN",
	// 0
	key48 = _this.key48 = "\u0030",
	// )
	keyShift48 = _this.keyShift48 = "\u0029",
	// 1
	key49 = _this.key49 = "\u0031",
	// !
	keyShift49 = _this.keyShift49 = "\u0021",
	// 2
	key50 = _this.key50 = "\u0032",
	// "
	keyShift50 = _this.keyShift50 = "\u0022",
	// 3
	key51 = _this.key51 = "\u0033",
	// £
	keyShift51 = _this.keyShift51 = "\u00A3",
	// 4
	key52 = _this.key52 = "\u0034",
	// $
	keyShift52 = _this.keyShift52 = "\u0024",
	// 5
	key53 = _this.key53 = "\u0035",
	// %
	keyShift53 = _this.keyShift53 = "\u0025",
	// 6
	key54 = _this.key54 = "\u0036",
	// ^
	keyShift54 = _this.keyShift54 = "\u005E",
	// 7
	key55 = _this.key55 = "\u0037",
	// &
	keyShift55 = _this.keyShift55 = "\u0026",
	// 8
	key56 = _this.key56 = "\u0038",
	// *
	keyShift56 = _this.keyShift56 = "\u002A",
	// 9
	key57 = _this.key57 = "\u0039",
	// (
	keyShift57 = _this.keyShift57 = "\u0028",
	// ;
	key59 = _this.key59 = "\u003B",
	// :
	keyShift59 = _this.keyShift59 = "\u003A",
	// =
	key61 = _this.key61 = "\u003D",
	// +
	keyShift61 = _this.keyShift61 = "\u002B",
	
	key65 = _this.key65 = "a",
	keyShift65 = _this.keyShift65 = "A",
	
	key66 = _this.key66 = "b",
	keyShift66 = _this.keyShift66 = "B",
	
	key67 = _this.key67 = "c",
	keyShift67 = _this.keyShift67 = "C",
	
	key68 = _this.key68 = "d",
	keyShift68 = _this.keyShift68 = "D",
	
	key69 = _this.key69 = "e",
	keyShift69 = _this.keyShift69 = "E",
	
	key70 = _this.key70 = "f",
	keyShift70 = _this.keyShift70 = "F",
	
	key71 = _this.key71 = "g",
	keyShift71 = _this.keyShift71 = "G",
	
	key72 = _this.key72 = "h",
	keyShift72 = _this.keyShift72 = "H",
	
	key73 = _this.key73 = "i",
	keyShift73 = _this.keyShift73 = "I",
	
	key74 = _this.key74 = "j",
	keyShift74 = _this.keyShift74 = "J",
	
	key75 = _this.key75 = "k",
	keyShift75 = _this.keyShift75 = "K",
	
	key76 = _this.key76 = "l",
	keyShift76 = _this.keyShift76 = "L",
	
	key77 = _this.key77 = "m",
	keyShift77 = _this.keyShift77 = "M",
	
	key78 = _this.key78 = "n",
	keyShift78 = _this.keyShift78 = "N",
	
	key79 = _this.key79 = "o",
	keyShift79 = _this.keyShift79 = "O",
	
	key80 = _this.key80 = "p",
	keyShift80 = _this.keyShift80 = "P",
	
	key81 = _this.key81 = "q",
	keyShift81 = _this.keyShift81 = "Q",
	
	key82 = _this.key82 = "r",
	keyShift82 = _this.keyShift82 = "R",
	
	key83 = _this.key83 = "s",
	keyShift83 = _this.keyShift83 = "S",
	
	key84 = _this.key84 = "t",
	keyShift84 = _this.keyShift84 = "T",
	
	key85 = _this.key85 = "u",
	keyShift85 = _this.keyShift85 = "U",
	
	key86 = _this.key86 = "v",
	keyShift86 = _this.keyShift86 = "V",
	
	key87 = _this.key87 = "w",
	keyShift87 = _this.keyShift87 = "W",
	
	key88 = _this.key88 = "x",
	keyShift88 = _this.keyShift88 = "X",
	
	key89 = _this.key89 = "y",
	keyShift89 = _this.keyShift89 = "Y",
	
	key90 = _this.key90 = "z",
	keyShift90 = _this.keyShift90 = "Z",
	
	// 0
	key96 = _this.key96 = "\u0030",
	// 1
	key97 = _this.key97 = "\u0031",
	// 2
	key98 = _this.key98 = "\u0032",
	// 3
	key99 = _this.key99 = "\u0033",
	// 4
	key100 = _this.key100 = "\u0034",
	// 5 
	key101 = _this.key101 = "\u0035",
	// 6
	key102 = _this.key102 = "\u0036",
	// 7
	key103 = _this.key103 = "\u0037",
	// 8
	key104 = _this.key104 = "\u0038",
	// 9
	key105 = _this.key105 = "\u0039",
	// #
	key163 = _this.key163 = "\u0023",
	// ~
	keyShift163 = _this.keyShift163 = "\u007E",
	// -
	key173 = _this.key173 = "\u002D",
	// _
	keyShift173 = _this.keyShift173 = "\u005F",
	// ,
	key188 = _this.key188 = "\u002C",
	// <
	keyShift188 = _this.keyShift188 = "\u003C",
	// .
	key190 = _this.key190 = "\u002E",
	// >
	keyShift190 = _this.keyShift190 = "\u003E",
	// /
	key191 = _this.key191 = "\u002F",
	// ?
	keyShift191 = _this.keyShift191 = "\u003F",
	// 
	key192 = _this.key192 = "\u002F",
	// 
	keyShift192 = _this.keyShift192 = "\u003F",
	// [
	key219 = _this.key219 = "\u005B",
	// {
	keyShift219 = _this.keyShift219 = "\u007B",
	// backslash
	key220 = _this.key220 = "\u005C",
	// |
	keyShift220 = _this.keyShift220 = "\u007C",
	// ]
	key221 = _this.key221 = "\u005D",
	// }
	keyShift221 = _this.keyShift221 = "\u007D",
	// '
	key222 = _this.key222 = "\u0027",
	// @
	keyShift222 = _this.keyShift222 = "\u0040",
	
	getCharFromEvent = _this.getCharFromEvent = function(e) {
	
		var 
		charValue,
		getter = "key";
		
		if(e.shiftKey) {
			getter = "keyShift";
		};
		
		charValue = _this[getter + e.keyCode];
		
		if(!charValue) {
			charValue = "";
		};
		
		DCM.log("getCharFromEvent", e, charValue);
		
		return charValue;
		
	};
	
};DCM.Login = function Login() {

	try {
	
		DCM.Platform.init();
		
		var 
		service = new DCM.LoginService(),
		requestPasswordService = new DCM.RequestPasswordService(),
		loginButton = new DCM.HTMLButtonElement(),
		emailInput = new DCM.HTMLCustomTextInputElement(),
		passwordInput = new DCM.HTMLCustomPasswordInputElement(),
		signupForm = new DCM.HTMLLinearFormElement(),
		emailField = signupForm.addField(),
		passwordField = signupForm.addField(),
		passwordLabel = new DCM.HTMLDivElement(),
		passwordClear = new DCM.HTMLClearElement(),
		validPassword = false,
		invalidUser = false,
		checkForCompletion = function checkForCompletion() {
			
			var 
			email = emailInput.getValue(),
			password = passwordInput.getValue();
			
			if(email&&password) {
				loginButton.enable();
			}
			else {
				loginButton.disable();
			};
			
		},
		emailLabel = new DCM.HTMLDivElement(),
		emailClear = new DCM.HTMLClearElement(),
		brandIcon = new DCM.HTMLBrandIconElement(),
		panel = new DCM.HTMLPanelElement(),
		page = new DCM.HTMLPageElement(),
		pane = new DCM.HTMLPaneElement(),
		tagline = new DCM.HTMLDivElement(),
		disclaimer = new DCM.HTMLPageFootElement(),
		languageSelect = new DCM.HTMLLanguageSelectMenuElement(),
		forgottenLink = new DCM.HTMLDivElement(),
		loader,
		supplyPasswordPromptAcceptHandler = function supplyPasswordPromptAcceptHandler() {
			
			requestPasswordService.setParam("emailaddress", this.getValue());
			requestPasswordService.call();
			
		},
		resetPasswordPromptAcceptHandler = function resetPasswordPromptAcceptHandler() {
			
			if(emailInput.getValue()) {
				
				requestPasswordService.setParam("emailaddress", emailInput.getValue());
				requestPasswordService.call();
				
			}
			else {
			
				var supplyPasswordPrompt = new DCM.HTMLPromptTextFieldDialogElement();
				
				supplyPasswordPrompt.setHeading(DCM.Resources.getResource("EmailAddressLabel"));
				supplyPasswordPrompt.queue();
				supplyPasswordPrompt.addEventHandler("ACCEPT", supplyPasswordPromptAcceptHandler);
			
			};
			
		},
		requestPasswordServiceSuccessHandler = function requestPasswordServiceSuccessHandler() {
		
			var 
			requestPasswordSuccessNotify = new DCM.HTMLNotifyDialogElement();
			
			requestPasswordSuccessNotify.setHeading(DCM.Resources.getResource("ResetPasswordRequestSuccessNotifyHeadingLabel"));
			requestPasswordSuccessNotify.setMessage(DCM.Resources.getResource("ResetPasswordRequestSuccessLabel"));
			requestPasswordSuccessNotify.queue();
			
		},
		requestPasswordServiceErrorHandler = function requestPasswordServiceErrorHandler() {
			
			var 
			requestPasswordErrorNotify = new DCM.HTMLNotifyDialogElement();
			
			requestPasswordErrorNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			requestPasswordErrorNotify.setMessage(DCM.Resources.getResource("PasswordRequestServiceError"));
			requestPasswordErrorNotify.queue();
			
		},
		requestPasswordServiceExceptionHandler = function requestPasswordServiceExceptionHandler() {
			
			var 
			requestPasswordSuccessNotify = new DCM.HTMLNotifyDialogElement();
			
			requestPasswordSuccessNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			requestPasswordSuccessNotify.setMessage(DCM.Resources.getResource("LoginEmailNotRecognised"));
			requestPasswordSuccessNotify.queue();
			
		},
		forgottenLinkClickHandler = function forgottenLinkClickHandler() {
			
			var 
			resetPasswordPrompt = new DCM.HTMLConfirmationDialogElement();
			
			resetPasswordPrompt.setHeading(DCM.Resources.getResource("ResetPasswordRequestHeadingLabel"));
			resetPasswordPrompt.setMessage(DCM.Resources.getResource("ResetPasswordConfirmLabel", [
				{
					placeholder: "EMAIL_ADDRESS",
					label: emailInput.getValue()
				}
			]));
			resetPasswordPrompt.addEventHandler("ACCEPT", resetPasswordPromptAcceptHandler);
			resetPasswordPrompt.queue();
			
			return false;
			
		},
		loginServiceSuccessHandler = function loginServiceSuccessHandler() {
		
			DCM.Net.navigateToURL("/dcmdealer");
			
		},
		loginServiceExceptionHandler = function loginServiceExceptionHandler(code) {
		
			loader.destroy();
			
			var loginServiceExceptionNotify = new DCM.HTMLAlertDialogElement();
			loginServiceExceptionNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			loginServiceExceptionNotify.setMessage(DCM.Resources.getResource(code));
			loginServiceExceptionNotify.queue();
			
		},
		loginServiceErrorHandler = function loginServiceErrorHandler(code) {
		
			loader.destroy();
			
			var loginServiceErrorNotify = new DCM.HTMLAlertDialogElement();
			loginServiceErrorNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			loginServiceErrorNotify.setMessage(DCM.Resources.getResource("LoginServiceError"));
			loginServiceErrorNotify.queue();
			
		},
		loginButtonClickHandler = function loginButtonClickHandler() {
		
			service.setParam("username", emailInput.getValue());
			service.setParam("password", passwordInput.getValue());
			
			loader = new DCM.HTMLLoadingAnimationElement();
			loader.setHeading(DCM.Resources.getResource("SigningInLabel"));
			
			service.call();
			
		},
		formNode = new DCM.HTMLNativeFormElement();
		
		requestPasswordService.addEventHandler("SUCCESS", requestPasswordServiceSuccessHandler);
		requestPasswordService.addEventHandler("ERROR", requestPasswordServiceErrorHandler);
		requestPasswordService.addEventHandler("EXCEPTION", requestPasswordServiceExceptionHandler);
		
		service.addEventHandler("SUCCESS", loginServiceSuccessHandler);
		service.addEventHandler("EXCEPTION", loginServiceExceptionHandler);
		service.addEventHandler("ERROR", loginServiceErrorHandler);
		
		forgottenLink.setText(DCM.Resources.getResource("ResetPasswordForgottenButtonLabel"));
		forgottenLink.setAttribute("data-login-role", "forgotten");
		forgottenLink.addEventListener(DCM.Event.click, forgottenLinkClickHandler);
		
		languageSelect.setAttribute("data-login-role", "language-select");
		
		tagline.setText(DCM.Resources.getResource("SignInHeadingLabel"));
		
		DCM.body.append(page);
		
		page.append(formNode);
		
		formNode.append(pane);
		
		pane.head.append(brandIcon);
		pane.head.append(tagline);
		pane.body.append(panel);
		pane.foot.append(disclaimer);
		
		emailLabel.setText(DCM.Resources.getResource("EmailAddressLabel"));
		emailLabel.setAttribute("data-login-role", "email-label");
		
		emailField.label.append(emailLabel);
		emailField.label.append(languageSelect);
		emailField.label.append(emailClear);
		emailField.input.append(emailInput);
		emailInput.setPlaceholder(DCM.Resources.getResource("EmailAddressLabel"));
		emailInput.input.addEventListener(DCM.Event.change, function() {
			checkForCompletion();
		});
		
		passwordLabel.setText(DCM.Resources.getResource("PasswordLabel"));
		passwordLabel.setAttribute("data-login-role", "password-label");
		
		passwordField.label.append(passwordLabel);
		passwordField.label.append(forgottenLink);
		passwordField.label.append(passwordClear);
		passwordField.input.append(passwordInput);
		passwordInput.setPlaceholder(DCM.Resources.getResource("PasswordLabel"));
		passwordInput.input.addEventListener(DCM.Event.keyup, function() {
			checkForCompletion();
		});
		
		panel.append(signupForm);
		panel.append(loginButton);
		
		loginButton.disable();
		loginButton.setText(DCM.Resources.getResource("SignInButtonLabel"));
		loginButton.addEventListener(DCM.Event.click, loginButtonClickHandler);
		
		checkForCompletion();
		
		formNode.addEventListener(DCM.Event.submit, function() {
			
			return false;
			
		});
		
	}
	catch(e) {
		
		DCM.warn("Login", e);
		
	};
	
};DCM.ModuleManager = new function ModuleManager() {

	try {
		
		var
		_this = this,
		modules = _this.modules = [],
		panelNameMap = {
			"ACCOUNT_OVERVIEW": "HTMLAccountOverviewModuleElement",
			"DEAL_TICKET": "HTMLTicketModuleElement",
			"ALERTS": "HTMLAlertsModuleElement",
			"NOTES": "HTMLNotesModuleElement",
			"GLOBAL_WATCHLIST": "HTMLWatchlistModuleElement",
			"OPEN_POSITIONS": "HTMLPositionsModuleElement",
			"CLOSED_POSITIONS": "HTMLClosedPositionsModuleElement",
			"NEWS": "HTMLNewsModuleElement",
			"MY_PORTFOLIO": "HTMLPortfoliosModuleElement",
			"PORTFOLIO": "HTMLPortfolioModuleElement",
			"TRADING_WIZARD": "HTMLTradingWizardModuleElement",
			"ORDERS": "HTMLOrdersModuleElement"
		},
		createModule = _this.createModule = function createModule(panelType, data, bypassMapping) {
			var
			module = new DCM[(bypassMapping?panelType:panelNameMap[panelType])](data);
			modules.push(module);
			module.open();
			return module;
		},
		stopAll = _this.stopAll = function stopAll() {
			for(var prop in modules) {
				modules[prop].stop();
			};
		},
		startAll = _this.startAll = function startAll() {
			for(var prop in modules) {
				modules[prop].start();
			};
		},
		updateAll = _this.updateAll = function updateAll() {
			for(var prop in modules) {
				modules[prop].update();
			};
		},
		getModuleByType = _this.getModuleByType = function getModuleByType(moduleType) {
			var 
			_return,
			loop = modules.length;
			while(loop--) {
				if(modules[loop].type===moduleType) {
					_return = modules[loop];
					break;
				};
			};
			return _return;
		},
		updateModule = _this.updateModule = function updateModule(moduleType) {
			getModuleByType(moduleType).update();
		},
		closeModule = _this.closeModule = function closeModule(moduleType) {
			getModuleByType(moduleType).close();
		},
		toggleModule = _this.toggleModule = function toggleModule(moduleType) {
			getModuleByType(moduleType).toggle();
		};
		
	}
	catch(e) {
		
		DCM.warn("ModuleManager", e);
	
	};
	
};DCM.Net = new function Net() {

	try {
	
		var
		_this = this,
		navigateToURL = _this.navigateToURL = function navigateToURL(URL) {
			window.location.href = URL;
		},
		refresh = _this.refresh = function refresh() {
			navigateToURL(window.location.href);
		};
		
	}
	catch(e) {
		
		DCM.warn("Net", e);
		
	};
	
};DCM.PageNotFound = function PageNotFound() {

	try {
	
		DCM.Platform.init();
		
		var 
		brandIcon = new DCM.HTMLBrandIconElement(),
		page = new DCM.HTMLPageElement(),
		pane = new DCM.HTMLPaneElement(),
		tagline = new DCM.HTMLDivElement(),
		disclaimer = new DCM.HTMLPageFootElement();
		
		tagline.setText("<strong>Sorry!</strong><br />The page you attempted to open could not be found.<br /><a href=\"/dealer_platform_login\">Click here to return to login page.<a/>");
		
		DCM.body.append(page);
		
		page.append(pane);
		
		pane.head.append(brandIcon);
		pane.head.append(tagline);
		
		pane.foot.append(disclaimer);
		
	}
	catch(e) {
		
		DCM.warn("PageNotFound", e);
		
	};
	
};DCM.Platform = new function Platform() {

	try {

		var
		_this = this,
		init = _this.init = function init() {
		
			DCM.AccountManager = new DCM.AccountManager();
			DCM.document = new DCM.DocumentElement();
			DCM.body = new DCM.HTMLBodyElement(document);
			DCM.head = new DCM.HTMLHeadElement(document);
			
		};
		
	}
	catch(e) {
		
		DCM.log("Platform", e);
		
	};
	
};DCM.ResetPassword = function ResetPassword() {

	try {
	
		DCM.Platform.init();
		
		var 
		service = new DCM.ResetPasswordService(),
		resetButton = new DCM.HTMLButtonElement(),
		passwordInput = new DCM.HTMLCustomPasswordInputElement(),
		passwordConfirmInput = new DCM.HTMLCustomPasswordInputElement(),
		resetPasswordForm = new DCM.HTMLLinearFormElement(),
		passwordField = resetPasswordForm.addField(),
		confirmPasswordField = resetPasswordForm.addField(),
		passwordLabel = new DCM.HTMLDivElement(),
		confirmPasswordLabel = new DCM.HTMLDivElement(),
		passwordClear = new DCM.HTMLClearElement(),
		checkForCompletion = function checkForCompletion() {
			
			var 
			password = passwordInput.getValue(),
			confirmPassword = passwordConfirmInput.getValue();
			
			if(password&&confirmPassword&&password===confirmPassword) {
				resetButton.enable();
			}
			else {
				resetButton.disable();
			};
			
		},
		emailLabel = new DCM.HTMLDivElement(),
		emailClear = new DCM.HTMLClearElement(),
		brandIcon = new DCM.HTMLBrandIconElement(),
		panel = new DCM.HTMLPanelElement(),
		page = new DCM.HTMLPageElement(),
		pane = new DCM.HTMLPaneElement(),
		tagline = new DCM.HTMLDivElement(),
		disclaimer = new DCM.HTMLPageFootElement(),
		languageSelect = new DCM.HTMLLanguageSelectMenuElement(),
		loader,
		passwordIndicator = new DCM.HTMLAdvancedPasswordStrengthElement();
		
		languageSelect.setAttribute("data-login-role", "language-select");
		
		tagline.setText(DCM.Resources.getResource("ResetPasswordResetHeadingLabel"));
		
		DCM.body.append(page);
		
		page.append(pane);
		
		pane.head.append(brandIcon);
		pane.head.append(tagline);
		
		pane.body.append(panel);
		pane.foot.append(disclaimer);
		
		passwordLabel.setText(DCM.Resources.getResource("ResetPasswordPasswordLabel"));
		passwordLabel.setAttribute("data-login-role", "password-label");
		
		passwordField.label.append(passwordLabel);
		passwordField.label.append(passwordIndicator);
		passwordField.label.append(passwordClear);
		passwordField.input.append(passwordInput);
		
		passwordInput.setPlaceholder(DCM.Resources.getResource("PasswordLabel"));
		
		confirmPasswordField.label.setText(DCM.Resources.getResource("ResetPasswordConfirmPasswordLabel"));
		confirmPasswordField.input.append(passwordConfirmInput);
		passwordConfirmInput.setPlaceholder(DCM.Resources.getResource("PasswordLabel"));
		
		resetButton.disable();
		
		panel.append(resetPasswordForm);
		panel.append(resetButton);

		passwordInput.input.addEventListener(DCM.Event.keyup, function() {
		
			var 
			strengthObj = passwordIndicator.test(passwordInput.getValue());
			
			passwordIndicator.apply(strengthObj);
			
			if(strengthObj.length&&strengthObj.lowercase&&strengthObj.uppercase&&strengthObj.number&&strengthObj.special) {
				passwordConfirmInput.enable();
			};
			
			checkForCompletion();
			
		});
		
		passwordConfirmInput.disable();
		
		passwordConfirmInput.input.addEventListener(DCM.Event.keyup, function() {
			checkForCompletion();
		});
		
		resetButton.setText(DCM.Resources.getResource("ResetPasswordResetButtonLabel"));
		
		service.addEventHandler("SUCCESS", function() {
		
			DCM.log("SUCCESS");
		
			DCM.Net.navigateToURL("/dealer_platform_login");
			
		});
		
		service.addEventHandler("EXCEPTION", function(code) {
		
			var publishDeleteWatchlistNotify = new DCM.HTMLAlertDialogElement();
			publishDeleteWatchlistNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			publishDeleteWatchlistNotify.setMessage(DCM.Resources.getResource(code));
			
			loader.destroy();
			
		});
		
		service.addEventHandler("ERROR", function(code) {
		
			loader.destroy();
			
		});
		
		resetButton.addEventListener(DCM.Event.click, function() {
		
			service.setParam("newpassword", passwordInput.getValue());
			
			loader = new DCM.HTMLLoadingAnimationElement();
			loader.setHeading(DCM.Resources.getResource("ResetPasswordResetingLabel"));
			
			service.call();
			
		});
		
		checkForCompletion();
		
	}
	catch(e) {
		
		DCM.warn("ResetPassword", e);
		
	};
	
};DCM.Resources = new function Resources() {

	var
	_this = this,
	setResourceGroup = _this.setResourceGroup = function setResourceGroup(name, obj) {
		_this[name] = obj;
	},
	setCulture = _this.setCulture = function setCulture(value) {
		_this.culture = value;
	},
	getResource = _this.getResource = function getResource(label, replacements) {
	
		var _return = _this[_this.culture][label];
		
		if(!_return) {
			_return = ("MISSING RESOURCE[" + label + "]");
		};
		
		if(replacements) {
		
			var loop = replacements.length;
			
			while(loop--) {
			
				_return = _return.replace(replacements[loop].placeholder, replacements[loop].label);
				
			};
			
		};
		
		return _return;
	
	};
	
	setCulture("en-GB");
	
	setResourceGroup("en-GB", {
		"L0001": "Your email address is not recognised - please do try again",
		"L0002": "Your password is incorrect - please do try again",
		"L0003": "Your account is currently disabled. Please contact customer services",
		"C0002": "You have exceeded your maximum number of charts - please close a chart in order to open a new chart.",
		"E0001": "Server error - generic response error",
		"U0002": "Your application is currently being processed.<br />If you have any enquires please email newaccounts@dcmcap.com",
		"C0001": "Server error - chart could not be loaded at this time",
		"U0002Heading": "Account application processing",
		"ERROR01": "Server error - Instruments library could not be loaded at this time",
		"ERROR02": "Server error - instrument could not be loaded at this time",
		"ERROR03": "Server error - no response",
		"ERROR04": "Server error - item could not be added to your portfolio at this time",
		"ERROR05": "Server error - item could not be added to your watchlist at this time",
		"ERROR06": "Server error - chart could not be closed at this time",
		"ERROR07": "Server error - order could not be cancelled at this time",
		"ERROR08": "Server error - position could not be closed at this time",
		"ERROR09": "Server error - alert could not be created at this time",
		"ERROR10": "Server error - note could not be created at this time",
		"ERROR11": "Server error - portfolio could not be created at this time",
		"ERROR12": "Server error - watchlist could not be created at this time",
		"ERROR13": "Server error - alert could not be deleted at this time",
		"ERROR14": "Server error - item could not be removed from your portfolio at this time",
		"ERROR15": "Server error - item could not be removed from your watchlist at this time",
		"ERROR16": "Server error - note could not be deleted at this time",
		"ERROR17": "Server error - order could not be deleted at this time",
		"ERROR18": "Server error - portfolio could not be deleted at this time",
		"ERROR19": "Server error - watchlist could not be deleted at this time",
		"ERROR20": "Server error - alert could not be edited at this time",
		"ERROR21": "Server error - note could not be edited at this time",
		"ERROR22": "Server error - order could not be edited at this time",
		"ERROR23": "Server error - position could not be edited at this time",
		"ERROR24": "Server error - registration form could not be created at this time",
		"ERROR25": "Server error - account details could not be loaded at this time",
		"ERROR26": "Server error - alerts could not be loaded at this time",
		"ERROR27": "Server error - chart could not be loaded at this time",
		"ERROR28": "Server error - account could not be created at this time",
		"ERROR29": "Server error - news item could not be loaded at this time",
		"ERROR30": "Server error - notes could not be loaded at this time",
		"ERROR31": "Server error - orders could not be loaded at this time",
		"ERROR32": "Server error - portfolio could not be loaded at this time",
		"ERROR33": "Server error - portfolios could not be loaded at this time",
		"ERROR34": "Server error - open positions could not be loaded at this time",
		"ERROR35": "Server error - a session could not be created at this time",
		"ERROR36": "Server error - settings could not be loaded at this time",
		"ERROR37": "Server error - modules could not be loaded at this time",
		"ERROR38": "Server error - account details could not be loaded at this time",
		"ERROR39": "Server error - watchlist could not be loaded at this time",
		"ERROR40": "Server error - watchlists could not be loaded",
		"ERROR41": "Server error - you could not be logged in at this time",
		"ERROR42": "Server error - account could not be created at this time",
		"ERROR43": "Server error - order could not be opened at this time",
		"ERROR44": "Server error - position could not be opened at this time",
		"ERROR45": "Server error - watchlist could not be renamed at this time",
		"ERROR46": "Server error - password could not be requested at this time",
		"ERROR47": "Server error - password could not be reset at this time",
		"ERROR48": "Server error - alert could not be marked as read at this time",
		"ERROR49": "Server error - settings could not be saved at this time",
		"ERROR50": "Server error - account could not be changed at this time",
		"Default": "XXX",
		"CloseLabel": "Close",
		"ContinueLabel": "Continue",
		"DefaultModuleHeading": "Module",
		"AccountOverviewPanelHeading": "Account Overview",
		"AlertsPanelHeading": "Alerts",
		"GlobalWatchlistPanelHeading": "Global Watchlist",
		"OpenPositionsPanelHeading": "Positions",
		"DealTicketPanelHeading": "Ticket",
		"NewsPanelHeading": "Live News",
		"PortfoliosPanelHeading": "Portfolios",
		"NotesPanelHeading": "Notes",
		"ClosedPositionsPanelHeading": "Closed Positions",
		"TradingWizardModuleHeading": "Trading Wizard",
		"OrdersPanelHeading": "Orders",
		"CloseModule": "Close",
		"ShowSentiball": "Show Sentiball",
		"HideSentiball": "Hide Sentiball",
		"ShowGraph": "Show graph",
		"ShowNews": "Show news",
		"ShowNotes": "Show notes",
		"ResizePanel": "Resize module",
		"ExpandModuleLabel": "Expand module",
		"CollapseModuleLabel": "Collapse module",
		// Unpin
		"WatchlistsModuleUnpin": "Watchlists - unpin from dashboard",
		"PortfoliosModuleUnpin": "Portfolios - unpin from dashboard",
		"NewsModuleUnpin": "News - unpin from dashboard",
		"NotesModuleUnpin": "Notes - unpin from dashboard",
		"AlertsModuleUnpin": "Alerts - unpin from dashboard",
		"OrdersModuleUnpin": "Orders - unpin from dashboard",
		// Pin
		"WatchlistsModulePin": "Watchlists - pin to dashboard",
		"PortfoliosModulePin": "Portfolios - pin to dashboard",
		"NewsModulePin": "News - pin to dashboard",
		"NotesModulePin": "Notes - pin to dashboard",
		"AlertsModulePin": "Alerts - pin to dashboard",
		"OrdersModulePin": "orders - pin to dashboard",
		
		"ModulesToolbarItem": "Module manager",
		"AccountToolbarItem": "My account",
		"FinderToolbarItem": "Finder",
		"BalanceToolbarItem": "Balance",
		"SettingsToolbarItem": "Settings",
		"LogoutToolbarItem": "Logout",
		"ForceOpenLabel": "Force-open",
		"StandardStop": "Standard stop",
		"GuaranteedStop": "Guaranteed stop",
		"TrailingStop": "Trailing-stop",
		"PointsLabel": "PTS.",
		"StopLabel": "Stop",
		"LimitLabel": "Limit",
		"SellLabel": "Sell",
		"BuyLabel": "Buy",
		"EmployedLabel": "Employed",
		"EmploymentLabel": "Employment",
		"SelfEmployedLabel": "Self-employed",
		"RetiredLabel": "Retired",
		"UnemployedLabel": "Unemployed",
		"InhreitanceLabel": "Inhreitance",
		"InvestmentLabel": "Investment",
		"FrequentlyLabel": "Frequently",
		"SometimesLabel": "Sometimes",
		"NeverLabel": "Never",
		"StatementsByPostLabel": "I would prefer to recieve my statements by post. Your statements will be sent by email as standard, however, you may opt to receive statements by post, for a charge of &pound;1 per statement.",
		"ManagedLabel": "Managed",
		"ExcecutionOnlyLabel": "Excecution-only and/or advisory",
		"OccupationalExperianceLabel": "Occupational experience - I have good knowledge of OTC, leveraged derivatives through working in the financial sector.",
		"QualificationsLabel": "Qualifications - I have a good knowledge of OTC, leveraged derivatives because of relevent professional qualification and/or my education or relevent training.",
		"ContactInformationLabel": "Contact information",
		"EmploymentStatusLabel": "Employment status",
		"HomeAddressLabel": "Home Address",
		"TimeAtCurrentAddressLabel": "Time at current address",
		"PreviousAddressLabel": "Previous address - if less than 3 years at current address",
		"WhatHaveYouTradedLabel": "To what extent over the past 3 years have you traded the following?",
		"SharesOrBondsLabel": "Shares and/or bonds",
		"ExchangeTradedLabel": "Exchange-traded derivatives (e.g. warrents, futures or options)",
		"SpreadbettingLabel": "OCT derivatives (e.g. CFD's spread betting, forex, binaries)",
		"HowHaveYouTradedLabel": "How have you mostly traded these products?",
		"NoneApplicableLabel": "None-applicable",
		"ExperianceDetailsLabel": "Please provide details of any particular experience or qualifications which would assit your understanding of the services provided by DCM",
		"IncomeBeforeTaxLabel": "Approx. annual income before tax",
		"ValueOfSavingsLabel": "Approx. value of savings and investments (excluding property)",
		"SourceOfFundsLabel": "Source of funds you intend to use with DCM Dealer",
		"StatementsLabel": "Statements",
		"FullNameLabel": "Full name",
		"DateOfBirthLabel": "Date of birth",
		"TitleLabel": "Title",
		"FirstNameLabel": "First Name",
		"LastNameLabel": "Last Name",
		"DayLabel": "Day",
		"MonthLabel": "Month",
		"YearLabel": "Year",
		"PrimaryNumberLabel": "Primary number",
		"MobileNumberLabel": "Mobile number",
		"EmailAddressLabel": "Email address",
		"OccupationLabel": "Occupation",
		"IndustryLabel": "Industry",
		"FirstLineAddressLabel": "First-line address",
		"SecondLineAddressLabel": "Second-line address",
		"TownCityLabel": "Town/City",
		"PostcodeLabel": "Postcode",
		"CountryLabel": "Country",
		"YearsLabel": "Years",
		"MonthsLabel": "Months",
		"OtherReleventExperianceLabel": "Other relevent experience",
		"SpecifyAmountInGBPLabel": "Specify amount in GBP",
		"OtherLabel": "Other",
		"TimeLabel": "Time",
		"CancelledLabel": "Cancelled",
		"CurrencyLabel": "Currency",
		"DisclaimerLabel": "<em>Risk Warning</em> - Spread Betting and CFDs are high risk investments and it is possible to lose more than your initial deposit. Spread Betting and CFDs are not suitable for all investors and you should ensure that you understand the <a href=\"http://www.derwentcapitalmarkets.com/help/#Ans12\" target=\"_blank\">risks involved</a> and, if necessary, obtain independent financial advice to ensure that these products fit your investment objectives. Tax law can be changed or may differ if you pay tax in a jurisdiction other than the UK. DCM Capital Ltd. is a company registered in England and Wales under register number 08064018 . DCM Capital Ltd is Authorised and Regulated by the UK Financial Services Authority Reg. No: 584376.<br /><br /><em>Disclaimer</em> - The information on this site is not directed at residents of the United States and is not intended for distribution to, or use by, any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation.",
		"ChartModuleHeading": "Chart",
		"UpgradeReviewLabel": "Thank you - please wait a moment while we gather your details in order to generate a <em>pre-populated application form</em>.<br /><br />Your application form is required to be <em>printed</em>, <em>reviewed</em> and <em>signed</em> before being sent to us by one of the methods detailed on the application cover sheet.<br /><br />A copy of your application form will also be emailed to you directly.",
		"GenerateApplicationFormLabel": "Open application form",
		"GeneratingApplicationFormLabel": "Generating application form...",
		"OpenApplicationFormLabel": "Open application form",
		"UpgradeReviewFootLabel": "We'll also email you a copy of your application form, if for any reason you are unable to download.",
		"UpgradeSuccessLabel": "Thank you - you will be notified when your application is processed. Applications typically take 7 days to process.<br /><br />All the best.<br />Team DCM.",
		"ResetPasswordConfirmPasswordLabel": "Confirm new password",
		"ResetPasswordPasswordLabel": "New password",
		"PasswordLabel": "Password",
		//"PasswordHelpLabel": "At DCM Capital we are serious about online security. In order to protect your details it's important you chose a strong password. Please ensure your password contains at least 5 characters, a lower case letter, an upper case letter, a number and a symbol such as !%@*. Once all the boxes above turn green your password choice is sufficiently secure. An example of a secure password would be 'P@55w0rd'",
		"PasswordHelpLabel": "Password must contain at least 5 characters",
		"ResetPasswordForgottenButtonLabel": "Forgotten?",
		"ResetPasswordResetButtonLabel": "Reset password",
		"ResetPasswordResetingLabel": "Resetting password",
		"ResetPasswordResetHeadingLabel": "Reset your password",
		"ResetPasswordConfirmLabel": "Would you like to send a password-reset email to <strong>EMAIL_ADDRESS</strong>?",
		"ResetPasswordRequestSuccessLabel": "If you have not recieved the email within 5 minutes; please check your junk-mail folder.",
		"ResetPasswordRequestSuccessNotifyHeadingLabel": "Password-reset email sent",
		"ResetPasswordRequestHeadingLabel": "Password reset",
		"SuccessLabel": "Success",
		"SignInButtonLabel": "Sign-in",
		"SignInHeadingLabel": "Not registered with DCM Capital?<br /><a href=\"/dealer_platform_open_account\">Create your <em>Free Demo Account</em> here!</a>",
		"SignUpHeadingLabel": "Create your <em>Free Preview Account</em> today and see all the features DCM Dealer has to offer!",
		"SignUpSignupButtonLabel": "Open preview account",
		"SignUpSigningupLabel": "Signing-up",
		"ProfitLossLabel": "Profit/Loss",
		"FundsLabel": "Funds",
		"MarginLabel": "Margin",
		"EquityLabel": "Equity",
		"MarketLabel": "Market",
		"MarketPriceLabel": "M.Price",
		"SizeLabel": "Size",
		"EntryPriceLabel": "E.Price",
		"TypeLabel": "Type",
		"TrailingStopLabel": "T.Stop",
		"GoodTillLabel": "Good till",
		"CreatePortfolioLabel": "Create new portfolio",
		"LowLabel": "Low",
		"HighLabel": "High",
		"UpdatedLabel": "Updated",
		"ChangeLabel": "Change",
		"SentimentLabel": "Sentiment",
		"BuyPriceLabel": "Buy price",
		"SellPriceLabel": "Sell price",
		"AlertMeWhenLabel": "Alert me when...",
		"AlertIsLabel": "is",
		"AlertMessagePlaceholderLabel": "Message",
		"AlertHigherThanLabel": "Higher than",
		"AlertLowerThanLabel": "Lower than",
		"AlertNotifyEmailLabel": "Email",
		"AlertNotifySMSLabel": "SMS",
		"AlertTriggeredLabel": "Alert triggered",
		"SettingsStopsAndLimitsTypeLabel": "Stops/Limits type",
		"SettingsStopsAndLimitsTypePointsLabel": "Points",
		"FinderSearchPlaceholderLabel": "Search by market name or code...",
		"FinderShowAllLabel": "All categories",
		"TicketTransactionComplete": "Transaction Complete",
		"TicketOrderClosed": "Order closed",
		"TicketOrderOpened": "Order opened",
		"TicketOrderModified": "Order modified",
		"TicketServerError": "Unknown error",
		"TicketPositionClosed": "Position closed",
		"TicketPositionModified": "Position modified",
		"NoOrdersLabel": "You currently have no orders - orders are used to automatically open positions when a market meets a given price. To create an order; open a ticket and select the 'order' tab.",
		"NoWatchlistItemsLabel": "You currently have no items in your watchlist - add items by right-clicking on an instrument and selecting 'add to watchlist'.",
		"NoAlertsLabel": "You currently have no alerts - alerts are used to notify you of market activity. To create an alert; right-click on an instrument and select 'add alert'.",
		"NoNotesLabel": "You currently have no notes - notes are used to help you manage your trading activity. To create a note; either right-click on an instrument and select 'add note', or  right-clicking in this module and selecting 'create note'.",
		"NoPositionsLabel": "You currently have no positions.",
		"AddToWatchlistLabel": "Add to watchlist",
		"PinToDashboardLabel": "Pin to dashboard",
		"UnpinFromDashboardLabel": "Unpin from dashboard",
		"OpenInNewWindowLabel": "Open in new window",
		"addNoteLabel": "Add note",
		"SentiballHeadingLabel": "Sentiball&#8482;",
		"SentiballSubHeadingLabel": "Live Sentiment Analysis",
		"UpgradeAccountMessageLabel": "<em>Thank you</em> for opening a preview account with DCM Capital.<br />Before you can begin trading; you are required to upgrade your account.",
		"UpgradeAccountHeadingLabel": "Upgrade to a live account!",
		"UpgradeAccountCFDTradingLabel": "open a CFD trading account with<br />DCM Capital &amp; IG Markets",
		"UpgradeAccountSpreadBettingLabel": "open a spread-betting account with<br />DCM Capital &amp; IG Index",
		"UpgradeAccountSpreadBettingNameLabel": "Spread betting",
		"UpgradeAccountCFDTradingNameLabel": "CFD trading",
		"EditPositionLabel": "Edit position",
		"AddToPortfolioLabel": "Add to portfolio",
		"CancelOrderLabel": "Cancel order",
		"EditOrderLabel": "Edit order",
		"RemoveFromWatchlistLabel": "Remove from watchlist",
		"OpenTicketLabel": "Open ticket",
		"PinTicketToDashboard": "Pin ticket to dashboard",
		"FundingDialogHeading": "Funding",
		"FundingDialogHead": "<em>How do I make a payment into my account?</em><br /><br />Funding line: <em>+44 203 475 4737</em><br />Account number: <em>ACCOUNT_NUMBER</em><br /><br />To fund your account using a <em>debit card</em>, <em>Visa</em> or <em>MasterCard</em>; call our funding line with your card details ready, quoting your account number when prompted.",
		
		"FundingDialogBody": "Alternatively, you may deposit funds into your account via a same-day bank transfer to IG's Lloyds bank account. Most high-street banks provide same-day cash transfer up to a daily limit of &pound;10,000 (fast pay service). For amounts greater than &pound;10,000, the CHAPS service (available through your bank) also provides same-day payment. Please note that BACS payments, by contrast, can take up to four business days to clear. Payments will be allocated to your account shortly after IG receive the funds. As a reference, please attach your name and IG account number to all bank transfers. The segregated sterling bank details for are detailed below.",
		
		//"FundingDialogFoot": "<strong>Please note:</strong> we will charge a 1.5% administration fee for all credit card and non-UK debit card payments. Your card issuer may treat a payment to us as a cash advance. We have no control over this. For legal reasons we are unable to accept cards where the cardholder is a US resident and we are unable to accept MasterCard payments from Singapore residents. To register, or manage additional cards, please contact our Helpdesk on +44 203 475 4737.",
		
		"FundingDialogFoot": "&nbsp;",
		"OpenChartLabel": "Open chart",
		"PinChartToDashboardLabel": "Pin chart to dashboard",
		
		// portfolio delete
		"PortfolioDeleteSuccessLabel": "Portfolio successfully deleted",
		"PortfolioDeleteErrorLabel": "Sorry - your portfolio could not be deleted at this time",
		"PortfolioDeleteConfirmHeading": "Delete portfolio",
		"DeletePortfolioLabel": "Delete portfolio",
		"PortfolioDeleteConfirmMessage": "Are you sure you wish to delete this portfolio?",
		// portfolio create
		"PortfolioCreatedSuccessLabel": "Portfolio successfully created",
		"PortfolioCreatedErrorLabel": "Sorry - portfolio could not be created at this time",
		"PortfolioCreateConfirmHeading": "Create portfolio",
		"PortfolioCreateConfirmMessage": "Portfolio name",
		// item added to portfolio
		"ItemAddedToPortfolioSuccessLabel": "Item successfully added to your portfolio",
		"ItemAddedToPortfolioErrorLabel": "Sorry - item could not be added to your portfolio at this time",
		"PortfolioAddToConfirmHeading": "Add to portfolio",
		"PortfolioAddToConfirmMessage": "Select the portfolio you'd like to place this item in",
		// item removed from portfolio
		"ItemDeletedFromPortfolioSuccessLabel": "Item successfully removed from your portfolio",
		"ItemDeletedFromPortfolioErrorLabel": "Sorry - item could not be removed from your portfolio at this time",
		"PortfolioRemoveFromConfirmHeading": "Remove from portfolio",
		"PortfolioRemoveFromConfirmMessage": "Are you sure you wish to remove this item from your portfolio?",
		
		// watchlist delete
		"WatchlistDeleteSuccessLabel": "Watchlist successfully deleted",
		"WatchlistDeleteErrorLabel": "Sorry - your watchlist could not be deleted at this time",
		"DeleteWatchlistConfirmHeading": "Delete watchlist",
		"DeleteWatchlistLabel": "Delete watchlist",
		"DeleteWatchlistConfirmMessage": "Are you sure you wish to delete your <strong>WATCHLISTNAME</strong> watchlist?",
		// watchlist create
		"WatchlistCreateSuccessLabel": "Watchlist successfully created",
		"WatchlistCreateErrorLabel": "Sorry - watchlist could not be created at this time",
		"CreateWatchlistConfirmHeading": "Create new watchlist",
		"CreateWatchlistLabel": "Create watchlist",
		"CreateWatchlistConfirmMessage": "Watchlist name",
		// watchlist rename
		"WatchlistRenameSuccessLabel": "Watchlist successfully renamed",
		"WatchlistRenameErrorLabel": "Sorry - watchlist could not be renamed at this time",
		"RenameWatchlistHeading": "Rename watchlist",
		"RenameWatchlistMessage": "New watchlist name",
		// add to watchlist
		"AddToWatchlistHeading": "Add to watchlist",
		"AddToWatchlistMessage": "Select the watchlist you'd like to place this item in",
		"ItemAddedToWatchlistSuccessLabel": "Item successfully added to your watchlist",
		"ItemAddedToWatchlistErrorLabel": "Sorry - item could not be added to your watchlist at this time",
		// remove from watchlist
		"RemoveFromWatchlistHeading": "Remove from watchlist",
		"RemoveFromWatchlistMessage": "Are you sure you wish to remove <strong>ITEMNAME</strong> from your <strong>WATCHLISTNAME</strong> watchlist?",
		"ItemRemovedFromWatchlistSuccessLabel": "Item successfully removed from your watchlist",
		"ItemRemovedFromWatchlistErrorLabel": "Sorry - item could not be removed from your watchlist at this time",
		
		// alert create
		"AddAlertLabel": "Add alert",
		"AlertCreateSuccessLabel": "Alert successfully created",
		"AlertCreateErrorLabel": "Sorry - your alert could not be created at this time",
		// alert delete
		"DeleteAlertLabel": "Delete alert",
		"AlertDeleteSuccessLabel": "Alert successfully deleted",
		"AlertDeleteErrorLabel": "Sorry - your alert could not be deleted at this time",
		"AlertDeleteConfirmHeading": "Delete alert",
		"AlertDeleteConfirmMessage": "Are you sure you wish to delete this alert?",
		// alert edit
		"EditAlertLabel": "Edit alert",
		"AlertEditSuccessLabel": "Alert successfully edited",
		"AlertEditErrorLabel": "Sorry - your alert could not be edited at this time",
		
		// note edit
		"EditNoteLabel": "Edit note",
		"NoteEditSuccessLabel": "Note successfully edited",
		"NoteEditErrorLabel": "Sorry - your note could not be edited at this time",
		// note delete
		"DeleteNoteLabel": "Delete note",
		"NoteDeleteSuccessLabel": "Note successfully deleted",
		"NoteDeleteErrorLabel": "Sorry - your note could not be deleted at this time",
		"NoteDeleteConfirmHeading": "Delete note",
		"NoteDeleteConfirmMessage": "Are you sure you wish to delete this note?",
		// note create
		"CreateNoteLabel": "Create note",
		"NoteCreateSuccessLabel": "Note successfully created",
		"NoteCreateErrorLabel": "Sorry - your note could not be created at this time",
		
		// news
		"NewsOpenError": "Sorry - news article could not be opened at this time",
		
		// sign-up
		"SignUpServiceError": "Sorry - your details could not be submitted at this time",
		
		// login
		"LoginServiceError": "Sorry - you could not be logged in at this time",
		
		// request password
		"PasswordRequestServiceError": "Sorry - your password request could not be sent in at this time",
		
		"PositionOpenSuccess": "Transaction complete",
		"PositionCloseSuccessLabel": "Position successfully closed",
		"PositionCloseErrorLabel": "Sorry - your position could not be closed at this time",
		"OrderCloseSuccessLabel": "Order successfully closed",
		"OrderCloseErrorLabel": "Sorry - your order could not be closed at this time",
		"LevelLabel": "Level",
		"PinnedItemSuccessLabel": "Ticket pinned to bottom of dashboard",
		"PeriodLabel": "Period",
		"SentimentChangeLabel": "Change",
		"LogoutConfirmHeading": "Logout",
		"LogoutConfirmMessage": "Are you sure you wish to log out?",
		"TweetsPanelHeading": "Live Tweets",
		"PriceLabel": "Price",
		"PlaceTradeLabel": "Place trade",
		"PlaceOrderLabel": "Place order",
		"ModifyPositionLabel": "Modify position",
		"ModifyOrderLabel": "Modify order",
		"CloseOrderLabel": "Close order",
		"ClosePositionLabel": "Close position",
		"TutorialLabel": "Tutorial",
		"EducationLabel": "Education",
		"FundingLabel": "Funding",
		"AccountIDLabel": "Account ID",
		"PositionClosedNotificationHeading": "Position closed",
		"PositionClosedNotificationBody": "Summary of details at time of close",
		"ReferenceNumberLabel": "Reference number",
		"DirectionLabel": "Direction",
		"ConsiderationGraphHeadingLabel": "Portfolio consideration",
		"SorryHeadingLabel": "Sorry!",
		"SigningInLabel": "Signing-in",
		"QuantityLabel": "Quantity",
		"MinimumAbbrLabel": "min.",
		"UpgradeAccountDisclaimerLinksLabel": "By opening an account with DCM Capital Ltd you agree to the content of the following documents: <a href=\"http://www.dcmcap.com/forms/dcm-client-agreement/DCMCAV1.pdf\" target=\"_blank\">DCM Client Agreement</a>, <a href=\"http://a.c-dn.net/c/content/dam/publicsites/1347047355881/igm/files/account/120900_IGM_UK_RDN.pdf\" target=\"_blank\">IG Risk Disclosure Notice</a>, <a href=\"http://a.c-dn.net/c/content/dam/publicsites/1347047337620/igm/files/account/CustomerAgreement_igm_en_GB.pdf\" target=\"_blank\">IG Customer Agreement</a>, <a href=\"http://a.c-dn.net/c/content/dam/publicsites/1347047364512/igm/files/account/uk-igm-order-execution.pdf\" target=\"_blank\">IG Summary Order Execution Policy</a>, <a href=\"http://a.c-dn.net/c/content/dam/publicsites/1347047363815/igm/files/account/uk-igm-conflicts.pdf\" target=\"_blank\">IG Summary Conflicts Policy</a>",
		"DateLabel": "Date",
		"TimeLabel": "Time",
		"DateSelectHeading": "Select date and time",
		"RemoveFromPortfolioLabel": "Remove from portfolio",
		
		"LoginEmailNotRecognised": "The email address provided is not recognised - please amend and try again.",
		"SettingsStopsAndLimitsTypeDiscliamerLabel": "* Please note the increments of the stops and limits may vary depending on the instrument you are trading, please take time to observe the minimum increment values before placing your trade",
		"UpgradeAccountPersonalTabLabel": "Personal",
		"UpgradeAccountAddressTabLabel": "Address",
		"UpgradeAccountExperianceTabLabel": "Experience",
		"UpgradeAccountFinancialTabLabel": "Financial",
		"UpgradeAccountReviewTabLabel": "Complete",
		"TicketTradeTabLabel": "Trade",
		"TicketOrderTabLabel": "Order",
		"TicketWizardTabLabel": "Wizard",
		"SwitchAccountCFDTradingLabel": "CFD Trading",
		"SwitchAccountSpreadBettingLabel": "Spread Betting",
		"SwitchAccountConfirmHeading": "Switch account",
		"SwitchAccountConfirmMessage": "Are you sure you wish to switch to your ACCOUNT_NAME account",
		"SwitchAccountRejectNotifyHeading": "Switch account",
		"SwitchAccountRejectNotifyMessage": "In order to access a ACCOUNT_NAME account; you are required to register a second time.",
		// descriptive tooltips 
		"ConsiderationTooltipLabel": "Consideration - average profit/loss",
		"QuantityTooltipLabel": "Quanitity [required] - profit/loss per point movement is calculated by multiplying price by quantity",
		"PriceTooltipLabel": "Price - profit/loss per point movement is calculated by multiplying price by quantity",
		"StopTooltipLabel": "Maximum loss value",
		"LimitTooltipLabel": "Maximum profit value",
		"ForceOpenTooltipLabel": "",
		"GoodTIllTooltipLabel": "Good till - the point at which your order is to expire",
		"GoodTillCancelledTooltipLabel": "Good till cancelled - order remains open until manually closed or filled, whichever comes first",
		"GoodTillTimeTooltipLabel": "Good till time - order is automacially closed at a given time and date",
		"TypeTooltipLabel": "",
		"ProfitLossTooltipLabel": "Profit/Loss",
		"EntryPriceTooltipLabel": "Entry price",
		"MarketPriceTooltipLabel": "Market price",
		"SizeTooltipLabel": "Size/Direction",
		"SellTooltipLabel": "Sell price",
		"BuyTooltipLabel": "Buy price",
		"PiceChangeTooltipLabel": "Price daily-change",
		"PiceLowTooltipLabel": "Price low",
		"PiceHighTooltipLabel": "Price high",
		"UpdateTimeTooltipLabel": "Update time",
		"MarketTooltipLabel": "Market name",
		"SentimentTooltipLabel": "Live Sentiment",
		"SentimentChangeTooltipLabel": "Sentiment daily-change",
		"TicketTradeTooltipLabel": "Trade - enter into market immediatly",
		"TicketOrderTooltipLabel": "Order - enter into market when a set of given criteria are met",
		"FinderItemTooltipLabel": "Double-click to open ticket",
		
		"TermsAndConditionsLabel": "Terms &amp; Conditions",
		"PrivacyPolicyLabel": "Privacy policy",
		"ContactLabel": "Contact",
		"IncrementLabel": "Increment",
		"DecrementLabel": "Decrement",
		"OpenNewsArticle": "Open article",
		"AlertMarkAsRead": "Mark as read",
		"DockTicketLabel": "Dock ticket",
		"UpgradeAccountLabel": "Upgrade account",
		"NextLabel": "Next",
		"PreviousLabel": "Previous",
		"UpgradeAccountFootLabel": "<strong data-color=\"orange\">PREVIEW ACCOUNT</strong> - IN ORDER TO BEGIN TRADING; YOU ARE REQUIRED TO UPGRADE TO A LIVE ACCOUNT.",
		"UpgradeAccountFootButtonLabel": "Upgrade to a live account",
		"ApplyOnlineLabel": "Apply online"
		
	});
	
};DCM.Signup = function Signup() {

	try {

		DCM.Platform.init();
		
		var 
		service = new DCM.OpenAccountService(),
		getEmailService = new DCM.GetEmailService(),
		openAccountButton = new DCM.HTMLButtonElement(),
		firstNameInput = new DCM.HTMLCustomInlineTextInputElement(),
		lastNameInput = new DCM.HTMLCustomInlineTextInputElement(),
		emailInput = new DCM.HTMLCustomTextInputElement(),
		passwordInput = new DCM.HTMLCustomPasswordInputElement(),
		signupForm = new DCM.HTMLLinearFormElement(),
		nameField = signupForm.addField(),
		emailField = signupForm.addField(),
		passwordField = signupForm.addField(),
		passwordLabel = new DCM.HTMLDivElement(),
		passwordHelperLabel = new DCM.HTMLDivElement(),
		passwordIndicator = new DCM.HTMLAdvancedPasswordStrengthElement(),
		passwordClear = new DCM.HTMLClearElement(),
		validPassword = false,
		invalidUser = false,
		checkForCompletion = function checkForCompletion() {
			
			var 
			firstName = firstNameInput.getValue(),
			lastName = lastNameInput.getValue(),
			email = emailInput.getValue();
			
			if(firstName&&lastName&&validPassword&&email&&!checkingEmail&&!invalidUser) {
				openAccountButton.enable();
			}
			else {
				openAccountButton.disable();
			};
			
		},
		doesExistLabel = new DCM.HTMLDivElement(),
		emailLabel = new DCM.HTMLDivElement(),
		emailClear = new DCM.HTMLClearElement(),
		brandIcon = new DCM.HTMLBrandIconElement(),
		panel = new DCM.HTMLPanelElement(),
		page = new DCM.HTMLPageElement(),
		pane = new DCM.HTMLPaneElement(),
		tagline = new DCM.HTMLDivElement(),
		disclaimer = new DCM.HTMLPageFootElement(),
		languageSelect = new DCM.HTMLLanguageSelectMenuElement(),
		nameLabel = new DCM.HTMLDivElement(),
		nameClear = new DCM.HTMLClearElement(),
		loader,
		signupServiceSuccessHandler = function signupServiceSuccessHandler() {
		
			DCM.Net.navigateToURL("/dcmdealer");
			
		},
		signupServiceErrorHandler = function signupServiceErrorHandler() {
		
			loader.destroy();
			
			var signupServiceErrorNotify = new DCM.HTMLAlertDialogElement();
			signupServiceErrorNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			signupServiceErrorNotify.setMessage(DCM.Resources.getResource("SignUpServiceError"));
			signupServiceErrorNotify.queue();
			
		},
		signupServiceExceptionHandler = function signupServiceExceptionHandler() {
		
			loader.destroy();
			
			var signupServiceExceptionNotify = new DCM.HTMLAlertDialogElement();
			signupServiceExceptionNotify.setHeading(DCM.Resources.getResource("SorryHeadingLabel"));
			signupServiceExceptionNotify.setMessage(DCM.Resources.getResource("SignUpServiceError"));
			signupServiceExceptionNotify.queue();
			
		},
		getEmailServiceSuccessHandler = function getEmailServiceSuccessHandler(data) {
		
			checkingEmail = false;
			
			invalidUser = data.doesExist;
			
			if(invalidUser) {
				doesExistLabel.setText("USER EXISTS");
			}
			else {
				doesExistLabel.setText("");
			};
			
			checkForCompletion();
			
		},
		getEmailServiceErrorHandler = function getEmailServiceErrorHandler() {
		
			checkingEmail = false;
			//checkForCompletion();
			
		},
		getEmailServiceExceptionHandler = function getEmailServiceExceptionHandler() {
		
			checkingEmail = false;
			//checkForCompletion();
			
		};
		
		languageSelect.setAttribute("data-signup-role", "language-select");
		nameLabel.setAttribute("data-signup-role", "name-label");
		
		tagline.setText(DCM.Resources.getResource("SignUpHeadingLabel"));
		
		DCM.body.append(page);
		
		page.append(pane);
		
		pane.head.append(brandIcon);
		pane.head.append(tagline);
		
		pane.body.append(panel);
		pane.foot.append(disclaimer);
		
		emailLabel.setText(DCM.Resources.getResource("EmailAddressLabel"));
		
		nameField.label.append(nameLabel);
		nameField.label.append(languageSelect);
		nameField.label.append(nameClear);
		
		nameLabel.setText(DCM.Resources.getResource("FullNameLabel"));
		
		emailField.label.append(emailLabel);
		emailField.label.append(doesExistLabel);
		emailField.label.append(emailClear);
		
		emailLabel.setAttribute("data-signup-role", "email-label");
		doesExistLabel.setAttribute("data-signup-role", "exists-label");
		
		passwordLabel.setText(DCM.Resources.getResource("PasswordLabel"));
		passwordLabel.setAttribute("data-signup-role", "password-label");
		
		passwordField.label.append(passwordLabel);
		//passwordField.label.append(passwordIndicator);
		passwordField.label.append(passwordClear);
		
		openAccountButton.disable();
		
		nameField.input.append(firstNameInput);
		nameField.input.append(lastNameInput);
		
		emailField.input.append(emailInput);
		
		passwordField.input.append(passwordInput);
		
		passwordField.input.append(passwordHelperLabel);
		passwordHelperLabel.setText(DCM.Resources.getResource("PasswordHelpLabel"));
		passwordHelperLabel.setAttribute("data-signup-role", "password-helper");
		
		panel.append(signupForm);
		panel.append(openAccountButton);
		
		firstNameInput.setPlaceholder(DCM.Resources.getResource("FirstNameLabel"));
		lastNameInput.setPlaceholder(DCM.Resources.getResource("LastNameLabel"));
		emailInput.setPlaceholder(DCM.Resources.getResource("EmailAddressLabel"));
		passwordInput.setPlaceholder(DCM.Resources.getResource("PasswordLabel"));
		
		emailInput.input.addEventListener(DCM.Event.change, function() {
			
			if(emailInput.getValue()) {
				checkingEmail = true;
				getEmailService.setParam("emailAddress", this.getValue());
				getEmailService.call();
			};
			
			checkForCompletion();
			
		});
		
		passwordInput.input.addEventListener(DCM.Event.keyup, function() {
		
			var 
			strengthObj = passwordIndicator.test(passwordInput.getValue());
			
			passwordIndicator.apply(strengthObj);
			
			//if(strengthObj.length&&strengthObj.lowercase&&strengthObj.uppercase&&strengthObj.number&&strengthObj.special) {
			
			if(passwordInput.getValue().length>4) {
				validPassword = true;
			}
			else {
				validPassword = false;
			};
			
			checkForCompletion();
			
		});
		
		firstNameInput.input.addEventListener(DCM.Event.keyup, function() {
		
			checkForCompletion();
			
		});
		
		lastNameInput.input.addEventListener(DCM.Event.keyup, function() {
		
			checkForCompletion();
			
		});
		
		openAccountButton.setText(DCM.Resources.getResource("SignUpSignupButtonLabel"));
		
		service.addEventHandler("SUCCESS", signupServiceSuccessHandler);
		service.addEventHandler("EXCEPTION", signupServiceExceptionHandler);
		service.addEventHandler("ERROR", signupServiceErrorHandler);
		
		openAccountButton.addEventListener(DCM.Event.click, function() {
			
			if(this.enabled) {
				
				service.setParam("firstname", firstNameInput.getValue());
				service.setParam("lastname", lastNameInput.getValue());
				service.setParam("emailAddress", emailInput.getValue());
				service.setParam("password", passwordInput.getValue());
				service.setParam("locale", "engb");
				
				loader = new DCM.HTMLLoadingAnimationElement();
				loader.setHeading(DCM.Resources.getResource("SignUpSigningupLabel"));
				
				service.call();
				
			};
			
		});
		
		getEmailService.addEventHandler("SUCCESS", getEmailServiceSuccessHandler);
		getEmailService.addEventHandler("ERROR", getEmailServiceErrorHandler);
		getEmailService.addEventHandler("EXCEPTION", getEmailServiceExceptionHandler);
		
	}
	catch(e) {
		
		DCM.warn("Signup", e);
		
	};
	
};DCM.Storage = new function Storage() {

	try {
		
		var 
		storage = this,
		namespace = "DCM",
		set = storage.set = function(name, value) {
			//log("Storage.set()", arguments);
			var 
			current = (get()||{}),
			_new = {};
			_new[name] = value;
			window.localStorage.setItem(namespace, JSON.stringify(extend(current, _new)));
		},
		get = storage.get = function(name) {
			//log("Storage.get()", arguments);
			var _return = JSON.parse(window.localStorage.getItem(namespace));
			return name?_return[name]:_return;
		},
		remove = storage.remove = function(name) {
			//log("Storage.remove()", arguments);
		},
		clear = storage.clear = function() {
			//log("Storage.clear()", arguments);
			window.localStorage.setItem(namespace, "{}");
		};
	
	}
	catch(e) {
		
		DCM.warn("Storage", e);
		
	};
	
};DCM.TicketManager = new function TicketManager() {
	
	try {
	
		var
		_this = this,
		tickets = _this.tickets = [],
		createTicket = _this.createTicket = function createTicket(params) {
			var 
			ticket = DCM.ModuleManager.createModule("HTMLTicketModuleElement", params, true);
			tickets.push(ticket);
			return ticket;
		},
		getDealTicketByMarketId = _this.getDealTicketByMarketId = function getDealTicketByMarketId(id) {
			var loop = tickets.length;
			while(loop--) {
				if(tickets[loop].position.id===id) {
					_return = tickets[loop];
					break;
				};
			};
			return _return;
		};
		
	}
	catch(e) {
		
		DCM.warn("TicketManager", e);
		
	};
	
};DCM.ToastManager = new function ToastManager() {

	// design better toast manager with better handling management

	try {
		
		var
		_this = this,
		toasts = _this.toasts = [],
		createToast = _this.createToast = function createToast(label) {
			var toast = new DCM.HTMLToastElement();
			toast.setText(label);
			if(toasts.length) {
				toasts[toasts.length-1].close();
			};
			toast.open();
			toasts.push(toast);
			return toast;
		};
		
	}
	catch(e) {
		
		DCM.warn("ToastManager", e);
		
	};
	
};DCM.WatchlistManager = new function WatchlistManager() {

	try {
		
		var
		_this = this,
		watchlists = _this.watchlists = [],
		getAllNames = _this.getAllNames = function getAllNames() {
			var
			_return = [],
			loop = watchlists.length;
			while(loop--) {
				_return.unshift(watchlists[loop].name);
			};
			return _return;
		},
		createWatchlist = _this.createWatchlist = function createWatchlist(data, module) {
			var 
			watshlist = new DCM.HTMLWatchlistElement(data, module);
			watchlists.push(watshlist);
			return watshlist;
		},
		getWatchlistByName = _this.getWatchlistByName = function getWatchlistByName(watchlistName) {
			var 
			_return,
			loop = watchlists.length;
			while(loop--) {
				if(watchlists[loop].name===watchlistName) {
					_return = watchlists[loop];
					break;
				};
			};
			return _return;
		},
		authorDeleteWatchlist = _this.authorDeleteWatchlist = function authorDeleteWatchlist(watchlist) {
		
			var 
			authorDeleteWatchlistConfirm = new DCM.HTMLConfirmationDialogElement(),
			authorDeleteWatchlistConfirmAccept = function authorDeleteWatchlistConfirmAccept() {
			
				publishDeleteWatchlist(watchlist);
				
			};
			
			authorDeleteWatchlistConfirm.setHeading(DCM.Resources.getResource("DeleteWatchlistConfirmHeading"));
			authorDeleteWatchlistConfirm.setMessage(DCM.Resources.getResource("DeleteWatchlistConfirmMessage", [
				{
					placeholder: "WATCHLISTNAME",
					label: watchlist.name
				}
			]));
			authorDeleteWatchlistConfirm.addEventHandler("ACCEPT", authorDeleteWatchlistConfirmAccept);
			authorDeleteWatchlistConfirm.queue();
		
		},
		publishDeleteWatchlist = _this.publishDeleteWatchlist = function publishDeleteWatchlist(watchlist) {
		
			var 
			publishDeleteWatchlistService = new DCM.DeleteWatchlistService(),
			publishDeleteWatchlistServiceSuccessHandler = function publishDeleteWatchlistServiceSuccessHandler(data) {
			
				watchlist.destroy();
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("WatchlistDeleteSuccessLabel"));
				
			},
			watchlistName = watchlist.name;
			
			publishDeleteWatchlistService.setParam("watchlist", watchlistName);
			publishDeleteWatchlistService.addEventHandler("SUCCESS", publishDeleteWatchlistServiceSuccessHandler);
			publishDeleteWatchlistService.call();
		
		},
		authorNewWatchlist = _this.authorNewWatchlist = function authorNewWatchlist(module) {
			
			var 
			authorNewWatchlistPrompt = new DCM.HTMLPromptTextFieldDialogElement(),
			authorNewWatchlistPromptAcceptHandler = function authorNewWatchlistPromptAcceptHandler() {
			
				publishNewWatchlist(authorNewWatchlistPrompt.getValue(), module);
				
			};
			
			authorNewWatchlistPrompt.setHeading(DCM.Resources.getResource("CreateWatchlistConfirmHeading"));
			authorNewWatchlistPrompt.setMessage(DCM.Resources.getResource("CreateWatchlistConfirmMessage"));
			authorNewWatchlistPrompt.addEventHandler("ACCEPT", authorNewWatchlistPromptAcceptHandler);
			authorNewWatchlistPrompt.queue();
			
		},
		publishNewWatchlist = _this.publishNewWatchlist = function publishNewWatchlist(watchlistName, module) {
		
			var 
			publishNewWatchlistService = new DCM.CreateWatchlistService(),
			publishNewWatchlistServiceSuccessHandler = function publishNewWatchlistServiceSuccessHandler(data) {
				
				module.addWatchlist({
					name: watchlistName
				});
				module.dataChanger.setValue(watchlistName);
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("WatchlistCreateSuccessLabel"));
				
			};
			
			publishNewWatchlistService.setParam("watchlist", watchlistName);
			publishNewWatchlistService.addEventHandler("SUCCESS", publishNewWatchlistServiceSuccessHandler);
			publishNewWatchlistService.call();
			
		},
		authorAddToWatchlist = _this.authorAddToWatchlist = function authorAddToWatchlist(instrument) {
		
			var 
			selectWatchlistDialog = new DCM.HTMLPromptSelectDialogElement(),
			watchlistNames = DCM.WatchlistManager.getAllNames(),
			selectWatchlistDialogAcceptHandler = function selectWatchlistDialogAcceptHandler() {
				
				publishAddToWatchlist(instrument, selectWatchlistDialog.getValue());
			
			};
			
			selectWatchlistDialog.setHeading(DCM.Resources.getResource("AddToWatchlistHeading"));
			selectWatchlistDialog.setMessage(DCM.Resources.getResource("AddToWatchlistMessage"));
			
			for(watchlistName in watchlistNames) {
				selectWatchlistDialog.setItem(watchlistNames[watchlistName], watchlistNames[watchlistName]);
			};
			
			selectWatchlistDialog.setValue(watchlistNames[0]);
			selectWatchlistDialog.addEventHandler("ACCEPT", selectWatchlistDialogAcceptHandler);
			selectWatchlistDialog.queue();
		
		},
		publishAddToWatchlist = _this.publishAddToWatchlist = function publishAddToWatchlist(instrument, watchlistToAddTo) {
			
			var 
			publishAddToWatchlistService = new DCM.AddToWatchlistService(),
			id = instrument.id,
			addToWatchlistServiceSuccessHandler = function addToWatchlistServiceSuccessHandler(data) {
			
				getWatchlistByName(watchlistToAddTo).addItem({
					securityID: id
				});
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("ItemAddedToWatchlistSuccessLabel"));
				
			};
			
			publishAddToWatchlistService.setParam("watchlist", watchlistToAddTo);
			publishAddToWatchlistService.setParam("securityId", id);
			publishAddToWatchlistService.addEventHandler("SUCCESS", addToWatchlistServiceSuccessHandler);
			publishAddToWatchlistService.call();
			
		},
		authorDeleteFromWatchlist = _this.authorDeleteFromWatchlist = function authorDeleteFromWatchlist(watchlistItem) {
		
			var 
			authorDeleteFromWatchlistConfirm = new DCM.HTMLConfirmationDialogElement(),
			watchlistName = watchlistItem.watchlist.name,
			authorDeleteFromWatchlistConfirmAcceptHandler = function authorDeleteFromWatchlistConfirmAcceptHandler() {
				
				publishDeleteFromWatchlist(watchlistItem);
				
			};
			
			authorDeleteFromWatchlistConfirm.setHeading(DCM.Resources.getResource("RemoveFromWatchlistHeading"));
			authorDeleteFromWatchlistConfirm.setMessage(DCM.Resources.getResource("RemoveFromWatchlistMessage", [
				{
					placeholder: "ITEMNAME",
					label: watchlistItem.instrument.getName()
				},
				{
					placeholder: "WATCHLISTNAME",
					label: watchlistName
				}
			]));
			authorDeleteFromWatchlistConfirm.addEventHandler("ACCEPT", authorDeleteFromWatchlistConfirmAcceptHandler);
			authorDeleteFromWatchlistConfirm.queue();
			
		},
		publishDeleteFromWatchlist = _this.publishDeleteFromWatchlist = function publishDeleteFromWatchlist(watchlistItem) {
		
			var 
			publishDeleteFromWatchlistService = new DCM.DeleteFromWatchlistService(),
			watchlistName = watchlistItem.watchlist.name,
			publishDeleteFromWatchlistServiceSuccessHandler = function publishDeleteFromWatchlistServiceSuccessHandler(data) {
			
				watchlistItem.destroy();
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("ItemRemovedFromWatchlistSuccessLabel"));
				
			};
			
			publishDeleteFromWatchlistService.setParam("watchlist", watchlistName);
			publishDeleteFromWatchlistService.setParam("securityId", watchlistItem.instrument.id);
			publishDeleteFromWatchlistService.addEventHandler("SUCCESS", publishDeleteFromWatchlistServiceSuccessHandler);
			publishDeleteFromWatchlistService.call();
			
		},
		authorWatchlistRename = _this.authorWatchlistRename = function authorWatchlistRename(watchlist) {
		
			var 
			authorWatchlistRenamePrompt = new DCM.HTMLPromptTextFieldDialogElement(),
			authorWatchlistRenameAcceptHandler = function authorWatchlistRenameAcceptHandler() {
			
				publishWatchlistRename(watchlist, authorWatchlistRenamePrompt.getValue());
				
			};
			
			authorWatchlistRenamePrompt.setHeading(DCM.Resources.getResource("RenameWatchlistHeading"));
			authorWatchlistRenamePrompt.setMessage(DCM.Resources.getResource("RenameWatchlistMessage"));
			authorWatchlistRenamePrompt.addEventHandler("ACCEPT", authorWatchlistRenameAcceptHandler);
			authorWatchlistRenamePrompt.queue();
		
		},
		publishWatchlistRename = _this.publishWatchlistRename = function publishWatchlistRename(watchlist, newName) {
		
			var 
			publishWatchlistRenameService = new DCM.RenameWatchlistService(),
			watchlistName = watchlist.name,
			publishDeleteFromWatchlistServiceSuccessHandler = function publishDeleteFromWatchlistServiceSuccessHandler(data) {
				
				watchlist.rename(newName);
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("WatchlistRenameSuccessLabel"));
				
			};
			
			publishWatchlistRenameService.setParam("watchlist", watchlistName);
			publishWatchlistRenameService.setParam("newName", newName);
			publishWatchlistRenameService.addEventHandler("SUCCESS", publishDeleteFromWatchlistServiceSuccessHandler);
			publishWatchlistRenameService.call();
			
		};
		
	}
	catch(e) {
		
		DCM.warn(e);
		
	};
	
};