DCM.HTMLNotesModuleItemElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLNotesModuleItemElement(data) {

	var
	_this = this,
	bodyHolder = new DCM.HTMLDivElement(),
	dateHolder = new DCM.HTMLDivElement(),
	instrumentHolder = new DCM.HTMLDivElement(),
	createdDate = new Date(data.createdAtTimestamp),
	left = new DCM.HTMLDivElement(),
	clear = new DCM.HTMLClearElement(),
	data = _this.data = data,
	instrument;
	
	_this.setType("HTMLNotesModuleItemElement");
	
	left.setAttribute("data-notes-item-role", "left");
	
	_this.append(left);
	_this.append(clear);
	
	left.append(bodyHolder);
	left.append(dateHolder);
	left.append(instrumentHolder);
	
	setNoteBody(data.content);
	dateHolder.setText(createdDate.toDateString());
	
	if(data.metaTitle) {
		instrument = _this.instrument = DCM.InstrumentManager.getInstrumentById(data.metaTitle);
		instrumentHolder.setText(instrument.getDisplayTextAsHTML());
	};
	
	setId(data.id);
	
	_this.addEventListener(DCM.Event.contextmenu, function(e) {
		
		var _contextMenu = new DCM.HTMLNotesModuleItemContextMenuElement(_this);
		_contextMenu.setX(e.clientX);
		_contextMenu.setY(e.clientY);
		
		return false;
	
	});
	
	_this.addEventListener(DCM.Event.doubleclick, function() {
		
		DCM.NoteManager.authorEditNote(_this);
		
		return false;
	
	});
	
});
DCM.HTMLNotesModuleItemElement.prototype.setId = function(value) {
	
	this.id = value;

};
DCM.HTMLNotesModuleItemElement.prototype.setNoteBody = function(value) {
	
	this.noteBody = value;
	bodyHolder.setText(value);

};
DCM.HTMLNotesModuleItemElement.prototype.destroy = function() {
	
	this.remove();
	DCM.NoteManager.notes.splice(DCM.getIndexOf(DCM.NoteManager.notes, this), 1);
	this.dispatchEventHandler("DESTROY");

};