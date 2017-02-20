DCM.HTMLNotesModuleItemContextMenuElement = ROCK.createClass(DCM.HTMLContextMenuElement, function HTMLNotesModuleItemContextMenuElement(target) {

	var
	_this = this;

	this.inherits(target);
	
	this.setItem(DCM.Resources.getResource("DeleteNoteLabel"), function() {
	
		DCM.NoteManager.authorDeleteNote(_this.target);
		
	});
	
	this.setItem(DCM.Resources.getResource("EditNoteLabel"), function() {
	
		DCM.NoteManager.authorEditNote(_this.target);
		
	});
	
});