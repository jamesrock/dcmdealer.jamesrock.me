(function() {

	try {

		var Net = DCM.Net = ROCK.createStatic(ROCK.createClass(Object, function() {

			// stub

		}));
		Net.prototype.navigateToURL = function(URL) {
			
			window.location.href = URL;

		};
		Net.prototype.refresh = function() {
			
			navigateToURL(window.location.href);

		};

	}
	catch(e) {
		
		DCM.warn("Net", e);
		
	};

})();