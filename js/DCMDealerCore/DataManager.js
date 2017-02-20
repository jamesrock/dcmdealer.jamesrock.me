(function() {

	try {

		var DataManager = DCM.DataManager = ROCK.createClass(Object, function() {
			
			this.cache = {};
			this.data = [];

		});
		DataManager.prototype.setItem = function(_item) {
			
			this.data.push(_item);
			
		};
		DataManager.prototype.getDataByFilter = function(filter, cacheKey) {
		
			if(!filter) {
				return this.data;
			};
			
			if(this.cache[cacheKey]) {
				DCM.log("DataManager - fromCache");
				return this.cache[cacheKey];
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
			
			this.cache[cacheKey] = _return;
			DCM.log("DataManager - cache entry - ", cacheKey);
			
			return _return;
		
		};
		DataManager.prototype.setData = function setData(value) {
			
			this.data = value;
		
		};

	}
	catch(e) {
		
		DCM.warn("DataManager", e);
		
	};

})();