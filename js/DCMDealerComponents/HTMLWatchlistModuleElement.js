DCM.HTMLWatchlistModuleElement = ROCK.createClass(DCM.HTMLScrollableModuleElement, function HTMLWatchlistModuleElement() {

	var 
	_this = this,
	dataChanger = _this.dataChanger = new DCM.HTMLDynamicSelectMenuElement(),
	watchlistsGetter = new DCM.GetWatchlistsService(),
	addWatchlist = _this.addWatchlist = function addWatchlist(data) {
		DCM.WatchlistManager.createWatchlist(data, _this);
	},
	setActiveWatchlist = _this.setActiveWatchlist = function setActiveWatchlist(value) {
		_this.activeWatchlist = value;
	},
	dataChangerChangeHandler = function dataChangerChangeHandler() {
	
		_this.scroller.body.empty();
		
		var toLoad = DCM.WatchlistManager.getWatchlistByName(dataChanger.getValue());
		setActiveWatchlist(toLoad);
		
		_this.scroller.body.append(toLoad);
		
		toLoad.service.call();
		
	},
	watchlistsGetterSuccessHandler = function watchlistsGetterSuccessHandler(data) {
	
		var target;
		
		target = data.wls;
	
		for(var prop in target) {
	
			addWatchlist(target[prop]);
			
		};
		
		dataChanger.setValue(target[0].name);
		
	};
	
	//_this.setSize(4);
	_this.setIcon("global-watchlist");
	_this.setType("HTMLWatchlistModuleElement");
	_this.setResizeable(true);
	_this.setContextMenu("HTMLWatchlistModuleContextMenuElement");
	
	_this._headingHolder.empty();
	_this._headingHolder.append(dataChanger);
	
	dataChanger.addEventHandler("CHANGE", dataChangerChangeHandler);
	
	watchlistsGetter.addEventHandler("SUCCESS", watchlistsGetterSuccessHandler);
	watchlistsGetter.call();

});