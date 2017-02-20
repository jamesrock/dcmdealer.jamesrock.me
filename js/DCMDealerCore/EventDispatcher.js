(function() {

	try {

		var EventDispatcher = DCM.EventDispatcher = ROCK.createClass(Object, function() {

			this.handlers = new function Handlers() {};

		});
		EventDispatcher.prototype.addEventHandler = function(eventName, handler, preventBubble) {
			
			var 
			_this = this,
			dispatch = function dispatch(data) {
				
				handler.call(_this, data);
				
			},
			eventObject = this.handlers[eventName] = (this.handlers[eventName]||[]),
			event = {
				nativeHandler: handler,
				remove: function remove() {
					eventObject.splice(eventObject.indexOf(this), 1);
					if(eventObject.length===0) {
						delete _this.handlers[eventName];
					};
				},
				dispatch: dispatch
			};
			
			eventObject.push(event);
			
			return event;
			
		};
		EventDispatcher.prototype.removeEventHandler = function(event, handler) {
			
			var 
			targetEvent = this.handlers[event],
			targetEventLength = targetEvent&&targetEvent.length;
			
			if(targetEvent&&handler) {
				while(targetEventLength--) {
					if(targetEvent[targetEventLength].nativeHandler===handler) {
						targetEvent[targetEventLength].remove();
						break;
					};
				};
			}
			else if(targetEvent) {
				while(targetEvent[0]) {
					targetEvent[0].remove();
				};
			};
			
		};
		EventDispatcher.prototype.dispatchEventHandler = function(eventName, data, handler) {
			
			var targetEvent = this.handlers[eventName];
			
			if(targetEvent&&handler) {
				for(var prop in targetEvent) {
					if(targetEvent[prop].nativeHandler===handler) {
						targetEvent[prop].dispatch(data);
						break;
					};
				};
			}
			else if(targetEvent) {
				for(var prop in targetEvent) {
					targetEvent[prop].dispatch(data);
				};
			};
			
		};

	}
	catch(e) {
		
		DCM.warn("EventDispatcher", e);
		
	};

})();