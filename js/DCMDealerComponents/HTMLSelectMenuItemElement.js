DCM.HTMLSelectMenuItemElement = ROCK.createClass(function HTMLSelectMenuItemElement(HTMLSelectMenuElement) {

	try {

		var
		label = new DCM.HTMLSelectMenuItemLabelElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		this.setType("HTMLSelectMenuItemElement");
		this.append(label);
		
		this.destroy = function destroy() {
			this.remove();
			HTMLSelectMenuElement.items.splice(DCM.getIndexOf(HTMLSelectMenuElement.items, this), 1);
			HTMLSelectMenuElement.items[HTMLSelectMenuElement.items.length-1].dispatchEventListener(DCM.Event.click);
		};
		
		this.setLabel = function setLabel(value) {
			label.setText(value);
			this.dispatchEventHandler("CHANGE");
		};
		
		this.setValue = function setValue(value) {
			this.value = value;
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLSelectMenuItemElement", e);
		
	};
	
};