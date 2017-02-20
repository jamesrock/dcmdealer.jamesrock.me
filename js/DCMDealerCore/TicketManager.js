(function() {

	try {

		var TicketManager = DCM.TicketManager = ROCK.createStatic(ROCK.createClass(Object, function() {

			// change to Collection

			this.tickets = [];

		}));
		TicketManager.prototype.createTicket = function(params) {
			
			var 
			ticket = DCM.ModuleManager.createModule("HTMLTicketModuleElement", params, true);

			this.tickets.push(ticket);
			
			return ticket;

		};
		TicketManager.prototype.getDealTicketByMarketId = function(id) {
			
			var loop = this.tickets.length;
			
			while(loop--) {
				if(this.tickets[loop].position.id===id) {
					_return = this.tickets[loop];
					break;
				};
			};
			
			return _return;

		};

	}
	catch(e) {
		
		DCM.warn("TicketManager", e);
		
	};

})();