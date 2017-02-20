(function() {

	var Environment = DCM.Environment = ROCK.createStatic(ROCK.createClass(Object, function() {

		this.environment = null;

	}));
	Environment.prototype.getEnvironment = function() {
		
		var _return = this.environment;
		return _return;

	};
	Environment.prototype.setEnvironment = function(value) {
		
		this.environment = value;

	};

})();