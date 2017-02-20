(function() {

	try {

		var DialogManager = DCM.DialogManager = ROCK.createStatic(ROCK.createClass(Object, function() {

			this.dialogs = [];

		}));
		DialogManager.prototype.queueDialog = function(dialog) {
			
			this.dialogs.unshift(dialog);
			
			if(this.dialogs.length===1) {
				
				this.dialogs[0].open();
			
			};

		};
		DialogManager.prototype.openFirstInQueue = function() {
			
			if(dialogs.length>0) {
				
				setTimeout(function() {
					
					this.dialogs[0].open();

				}, 150);

			};
		
		};
	
	}
	catch(e) {
		
		DCM.warn("DialogManager", e);
		
	};

})();