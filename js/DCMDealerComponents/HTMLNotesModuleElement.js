DCM.HTMLNotesModuleElement = ROCK.createClass(DCM.HTMLScrollableModuleElement, function HTMLNotesModuleElement() {

	var
	_this = this,
	noNotesNotification = new DCM.HTMLNoItemsNotificationElement(),
	noteDeleteHandler = function noteDeleteHandler() {
	
		if(DCM.NoteManager.notes.length===0) {
			noNotesNotification.show();
		};
		
	};
	
	_this.setIcon("notes");
	_this.setHeading(DCM.Resources.getResource("NotesPanelHeading"));
	_this.setContextMenu("HTMLNotesModuleContextMenuElement");
	_this.setType("HTMLNotesModuleElement");
	_this.setServiceCall("GetNotesService");
	_this.addEventHandler("UPDATE", function(data) {
		
		for(var prop in data) {
			this.addNote(data[prop]);
		};
		
	});
	
	noNotesNotification.setText(DCM.Resources.getResource("NoNotesLabel"));
	_this.scroller.body.prepend(noNotesNotification);
	
	_this.update();
	
});
DCM.HTMLNotesModuleElement.prototype.addNote = function addNote(data) {
		
	var note = DCM.NoteManager.createNote(data);	
	_this.scroller.body.prepend(note);
	noNotesNotification.hide();
	
	note.addEventHandler("DESTROY", noteDeleteHandler);
	
	return note;

};