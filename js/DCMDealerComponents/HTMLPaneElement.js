DCM.HTMLPaneElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLPaneElement() {
	
	var	
	head = this.head = new DCM.HTMLPaneHeadElement(),
	body = this.body = new DCM.HTMLPaneBodyElement(),
	foot = this.foot = new DCM.HTMLPaneFootElement();
	
	this.setType("HTMLPaneElement");
	
	this.append(head);
	this.append(body);
	this.append(foot);
		
});