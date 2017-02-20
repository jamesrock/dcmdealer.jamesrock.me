(function() {

	try {

		var WatchlistManager = DCM.WatchlistManager = ROCK.createStatic(ROCK.createClass(Object, function() {

			this.watchlists = [];

		}));
		WatchlistManager.prototype.getAllNames = function() {
			
			var
			_return = [],
			loop = watchlists.length;
			while(loop--) {
				_return.unshift(watchlists[loop].name);
			};
			return _return;

		};
		WatchlistManager.prototype.createWatchlist = function(data, module) {
			
			var 
			watshlist = new DCM.HTMLWatchlistElement(data, module);
			watchlists.push(watshlist);
			return watshlist;

		};
		WatchlistManager.prototype.getWatchlistByName = function(watchlistName) {
			
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

		};
		WatchlistManager.prototype.authorDeleteWatchlist = function(watchlist) {
			
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
		
		};
		WatchlistManager.prototype.publishDeleteWatchlist = function(watchlist) {
			
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
		
		};
		WatchlistManager.prototype.authorNewWatchlist = function(module) {
				
			var 
			authorNewWatchlistPrompt = new DCM.HTMLPromptTextFieldDialogElement(),
			authorNewWatchlistPromptAcceptHandler = function authorNewWatchlistPromptAcceptHandler() {
			
				publishNewWatchlist(authorNewWatchlistPrompt.getValue(), module);
				
			};
			
			authorNewWatchlistPrompt.setHeading(DCM.Resources.getResource("CreateWatchlistConfirmHeading"));
			authorNewWatchlistPrompt.setMessage(DCM.Resources.getResource("CreateWatchlistConfirmMessage"));
			authorNewWatchlistPrompt.addEventHandler("ACCEPT", authorNewWatchlistPromptAcceptHandler);
			authorNewWatchlistPrompt.queue();
			
		};
		WatchlistManager.prototype.publishNewWatchlist = function(watchlistName, module) {
			
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
			
		};
		WatchlistManager.prototype.authorAddToWatchlist = function(instrument) {
			
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
		
		};
		WatchlistManager.prototype.publishAddToWatchlist = function(instrument, watchlistToAddTo) {
				
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
			
		};
		WatchlistManager.prototype.authorDeleteFromWatchlist = function(watchlistItem) {
			
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
			
		};
		WatchlistManager.prototype.publishDeleteFromWatchlist = function(watchlistItem) {
			
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
			
		};
		WatchlistManager.prototype.authorWatchlistRename = function(watchlist) {
			
			var 
			authorWatchlistRenamePrompt = new DCM.HTMLPromptTextFieldDialogElement(),
			authorWatchlistRenameAcceptHandler = function authorWatchlistRenameAcceptHandler() {
			
				publishWatchlistRename(watchlist, authorWatchlistRenamePrompt.getValue());
				
			};
			
			authorWatchlistRenamePrompt.setHeading(DCM.Resources.getResource("RenameWatchlistHeading"));
			authorWatchlistRenamePrompt.setMessage(DCM.Resources.getResource("RenameWatchlistMessage"));
			authorWatchlistRenamePrompt.addEventHandler("ACCEPT", authorWatchlistRenameAcceptHandler);
			authorWatchlistRenamePrompt.queue();
		
		};
		WatchlistManager.prototype.publishWatchlistRename = function(watchlist, newName) {
		
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
		
		DCM.warn("WatchlistManager", e);
		
	};

})();