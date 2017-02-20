DCM.HTMLNotesModuleContextMenuElement = ROCK.createClass(DCM.HTMLModuleContextMenuElement, function HTMLNotesModuleContextMenuElement(target) {

	this.inherits(target);
	
	this.setItem(DCM.Resources.getResource("CreateNoteLabel"), function() {
		
		DCM.NoteManager.authorNewNote();
		
	});
	
});