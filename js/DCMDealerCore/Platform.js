(function() {

	try {

		var Platform = DCM.Platform = ROCK.createStatic(ROCK.createClass(Object, function() {

			// stub

		}));
		Platform.prototype.init = function init() {
			
			DCM.AccountManager = new DCM.AccountManager();
			DCM.document = new DCM.DocumentElement();
			DCM.body = new DCM.HTMLBodyElement(document);
			DCM.head = new DCM.HTMLHeadElement(document);
			
		};

	}
	catch(e) {
		
		DCM.log("Platform", e);
		
	};

})();