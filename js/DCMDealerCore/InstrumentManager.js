(function() {

	try {

		var InstrumentManager = DCM.InstrumentManager = ROCK.createStatic(ROCK.createClass(Object, function() {

			this.instruments = [];

		}));
		InstrumentManager.prototype.createInstrument = function(data) {
			
			var instrument = new DCM.Instrument(data);
			instruments.push(instrument);
			return instrument;

		};
		InstrumentManager.prototype.getInstrumentById = function(id) {
			
			var 
			loop = instruments.length,
			_return;
			while(loop--) {
				if(instruments[loop].id===id) {
					_return = instruments[loop];
					break;
				};
			};
			return _return;

		};

	}
	catch(e) {
		
		DCM.warn("InstrumentManager", e);
		
	};

})();