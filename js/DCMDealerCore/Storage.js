(function() {

	try {

		var Storage = DCM.Storage = ROCK.createStatic(ROCK.createClass(function() {

			this.namespace = "DCM";

		}));
		Storage.prototype.set = function(name, value) {

			//log("Storage.set()", arguments);
			var 
			current = (get()||{}),
			_new = {};
			_new[name] = value;
			window.localStorage.setItem(this.namespace, JSON.stringify(extend(current, _new)));

		};
		Storage.prototype.get = function(name) {
			
			//log("Storage.get()", arguments);
			var _return = JSON.parse(window.localStorage.getItem(this.namespace));
			return name?_return[name]:_return;

		};
		Storage.prototype.remove = function(name) {
			
			//log("Storage.remove()", arguments);

		};
		Storage.prototype.clear = function() {
			
			//log("Storage.clear()", arguments);
			window.localStorage.setItem(this.namespace, "{}");
			
		};

	}
	catch(e) {
		
		DCM.warn("Storage", e);
		
	};

})();