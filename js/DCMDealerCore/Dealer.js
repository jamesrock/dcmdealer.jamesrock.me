DCM.Dealer = function Dealer() {
	
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
		getSessionServiceSuccessHandler = function(data) {
		
			sharingClient.connectionDetails.setUser(data.un);
			sharingClient.connectionDetails.setPassword(data.pw);
			sharingClient.connect();
			
		},
		getUserPanelsSuccessHandler = function(data) {
		
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
	
};