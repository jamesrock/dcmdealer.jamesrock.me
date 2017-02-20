DCM.HTMLToolbarElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLToolbarElement() {

	var
	_this = this,
	modules = _this.modules = new DCM.HTMLToolbarItemElement(),
	//account = _this.account = new DCM.HTMLToolbarItemElement(),
	finder = _this.finder = new DCM.HTMLToolbarItemElement(),
	settings = _this.settings = new DCM.HTMLToolbarItemElement(),
	logout = _this.logout = new DCM.HTMLToolbarItemElement(),
	moduleMenuPopout = new DCM.HTMLToolbarPopoutElement(),
	finderPopout = new DCM.HTMLToolbarPopoutElement(),
	finderModule = new DCM.HTMLFinderModuleElement(),
	moduleMenu = modules.menu = new DCM.HTMLModuleMenuElement(),
	activateItem = _this.activateItem = function activateItem(itemName) {
		DCM.log("HTMLToolbarElement.activateItem()", arguments);
		if(moduleMenu[itemName]) {
			moduleMenu[itemName].activate();
		};
	},
	deactivateItem = _this.deactivateItem = function deactivateItem(itemName) {
		DCM.log("HTMLToolbarElement.deactivateItem()", arguments);
		if(moduleMenu[itemName]) {
			moduleMenu[itemName].deactivate();
		};
	},
	settingsPopout = new DCM.HTMLToolbarPopoutElement(),
	settingsModule = new DCM.HTMLSettingsModuleElement();
	
	modules.append(moduleMenuPopout);
	moduleMenuPopout.append(moduleMenu);
	
	finder.append(finderPopout);
	finderPopout.append(finderModule);
	
	modules.setLabel(DCM.Resources.getResource("ModulesToolbarItem"));
	modules.icon.setRole("add-module");
	modules.setRole("add-module");
	
	//account.setLabel(DCM.Resources.getResource("AccountToolbarItem"));
	//account.icon.setRole("my-account");
	//account.setRole("my-account");
	
	finder.setLabel(DCM.Resources.getResource("FinderToolbarItem"));
	finder.icon.setRole("finder");
	finder.setRole("finder");
	
	settings.setLabel(DCM.Resources.getResource("SettingsToolbarItem"));
	settings.icon.setRole("settings");
	settings.setRole("settings");
	
	settings.append(settingsPopout);
	settingsPopout.append(settingsModule);
	
	logout.setLabel(DCM.Resources.getResource("LogoutToolbarItem"));
	logout.icon.setRole("logout");
	logout.setRole("logout");
	
	logout.addEventListener(DCM.Event.click, function() {
	
		var logoutConfirmation = new DCM.HTMLConfirmationDialogElement();
		logoutConfirmation.setHeading(DCM.Resources.getResource("LogoutConfirmHeading"));
		logoutConfirmation.setMessage(DCM.Resources.getResource("LogoutConfirmMessage"));
		logoutConfirmation.addEventHandler("ACCEPT", function() {
			DCM.Net.navigateToURL("/logout");
		});
		logoutConfirmation.queue();
		
		return false;
		
	});
	
	_this.append(modules);
	//_this.append(account);
	_this.append(finder);
	_this.append(settings);
	_this.append(logout);
	
	_this.setType("HTMLToolbarElement");
	
});