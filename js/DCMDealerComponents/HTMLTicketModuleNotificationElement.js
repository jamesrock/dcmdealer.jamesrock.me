DCM.HTMLTicketModuleNotificationElement = ROCK.createClass(function HTMLTicketModuleNotificationElement() {

	try {
		
		var
		head = this.head = new DCM.HTMLTicketModuleNotificationHeadElement(),
		body = this.body = new DCM.HTMLTicketModuleNotificationBodyElement(),
		foot = this.foot = new DCM.HTMLTicketModuleNotificationFootElement(),
		wrap = new DCM.HTMLTicketModuleNotificationWrapElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLTicketModuleNotificationElement");
		
		this.append(wrap);
		
		this.close = function close() {
			
			this.remove();
		
		};
		
		this.setHeading = function setHeading(value) {
			
			head.setText(value);
			
		};
		
		wrap.append(head);
		wrap.append(body);
		wrap.append(foot);
		
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleNotificationElement", e);
		
	};
	
};