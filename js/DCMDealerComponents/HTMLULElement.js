DCM.HTMLULElement = ROCK.createClass(DCM.HTMLElement, function HTMLULElement() {
		
	this.displayObject = document.createElement("ul");
	this.setType("HTMLULElement");
	
	this.addItem = function addItem() {
		var item = new DCM.HTMLLIElement();
		this.append(item);
		return item;
	};

});