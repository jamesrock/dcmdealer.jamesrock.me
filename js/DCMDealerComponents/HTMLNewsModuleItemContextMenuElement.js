DCM.HTMLNewsModuleItemContextMenuElement = ROCK.createClass(DCM.HTMLContextMenuElement, function HTMLNewsModuleItemContextMenuElement(target) {

	var
	_this = this;
	
	this.inherits(target);
	
	this.setItem(DCM.Resources.getResource("OpenNewsArticle"), function() {
		
		_this.target.openArticle();
		
	});
	
});