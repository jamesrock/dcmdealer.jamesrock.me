(function() {

	// design better toast manager with better handling management

	try {

		var ToastManager = DCM.ToastManager = ROCK.createStatic(ROCK.createClass(Object, function() {

			this.toasts = [];

		}));
		ToastManager.prototype.createToast = function(label) {
			
			var toast = new DCM.HTMLToastElement();
			toast.setText(label);
			if(this.toasts.length) {
				this.toasts[toasts.length-1].close();
			};
			toast.open();
			this.toasts.push(toast);
			return toast;

		};

	}
	catch(e) {
		
		DCM.warn("ToastManager", e);
		
	};

})();