DCM.NoteManager = new function NoteManager() {

	try {
		
		var
		_this = this,
		notes = _this.notes = [],
		createNote = _this.createNote = function createNote(data) {
			var note = new DCM.HTMLNotesModuleItemElement(data);
			notes.push(note);
			return note;
		},
		createNoteFromInstrument = _this.createNoteFromInstrument = function createNoteFromInstrument(instrument) {
			
			authorNewNote(instrument.id, null, instrument.sellPrice, instrument.buyPrice, instrument.sentiment);
			
		},
		createNoteFromPosition = _this.createNoteFromPosition = function createNoteFromPosition(position) {
			
			authorNewNote(position.instrument.id, position.entryPrice, position.instrument.sellPrice, position.instrument.buyPrice, position.instrument.sentiment);
			
		},
		authorNewNote = _this.authorNewNote = function authorNewNote(instrumentSymbolDesc, entryPrice, bidPrice, askPrice, sentiLast) {
			
			var 
			_dialog = new DCM.HTMLNotesModuleItemCreateDialogElement(),
			instrumentSymbolDesc = (instrumentSymbolDesc||""),
			entryPrice = (entryPrice||""),
			bidPrice = (bidPrice||""),
			askPrice = (askPrice||""),
			sentiLast = (sentiLast||"");
			
			_dialog.addEventHandler("ACCEPT", function() {
			
				publishNewNote(_dialog.getValue(), instrumentSymbolDesc, entryPrice, bidPrice, askPrice, sentiLast);
				
			});
			
			_dialog.queue();
			
		},
		publishNewNote = _this.publishNewNote = function publishNewNote(noteBody, instrumentSymbolDesc, entryPrice, bidPrice, askPrice, sentiLast) {
		
			var 
			publishNewNoteService = new DCM.CreateNoteService(),
			publishNewNoteServiceSuccessHandler = function publishNewNoteServiceSuccessHandler(data) {
				
				DCM.ModuleManager.getModuleByType("HTMLNotesModuleElement").addNote(data.newNote);
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteCreateSuccessLabel"));
				
			},
			publishNewNoteServiceErrorHandler = function publishNewNoteServiceErrorHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteCreateErrorLabel"));
				
			},
			publishNewNoteServiceExceptionHandler = function publishNewNoteServiceExceptionHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteCreateErrorLabel"));
				
			};
			
			publishNewNoteService.setParam("noteContent", noteBody);
			publishNewNoteService.setParam("instrumentSymbolDesc", instrumentSymbolDesc);
			publishNewNoteService.setParam("entryPrice", entryPrice);
			publishNewNoteService.setParam("bidPrice", bidPrice);
			publishNewNoteService.setParam("askPrice", askPrice);
			publishNewNoteService.setParam("sentiLast", sentiLast);
			publishNewNoteService.addEventHandler("SUCCESS", publishNewNoteServiceSuccessHandler);
			publishNewNoteService.addEventHandler("ERROR", publishNewNoteServiceErrorHandler);
			publishNewNoteService.addEventHandler("EXCEPTION", publishNewNoteServiceExceptionHandler);
			publishNewNoteService.call();
			
		},
		authorDeleteNote = _this.authorDeleteNote = function authorDeleteNote(note) {
			
			var 
			authorDeleteNoteConfirm = new DCM.HTMLConfirmationDialogElement(),
			authorDeleteNoteConfirmAcceptHandler = function authorDeleteNoteConfirmAcceptHandler() {
			
				publishDeleteNote(note);
				
			};
			
			authorDeleteNoteConfirm.setHeading(DCM.Resources.getResource("NoteDeleteConfirmHeading"));
			authorDeleteNoteConfirm.setMessage(DCM.Resources.getResource("NoteDeleteConfirmMessage"));
			authorDeleteNoteConfirm.addEventHandler("ACCEPT", authorDeleteNoteConfirmAcceptHandler);
			authorDeleteNoteConfirm.queue();
			
		},
		publishDeleteNote = _this.publishDeleteNote = function publishDeleteNote(note) {
			
			var 
			publishDeleteNoteService = new DCM.DeleteNoteService(),
			publishDeleteNoteServiceSuccessHandler = function publishDeleteNoteServiceSuccessHandler(data) {
				
				note.destroy();
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteDeleteSuccessLabel"));
				
			},
			publishDeleteNoteServiceErrorHandler = function publishDeleteNoteServiceErrorHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteDeleteErrorLabel"));
				
			},
			publishDeleteNoteServiceExceptionHandler = function publishDeleteNoteServiceExceptionHandler() {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteDeleteErrorLabel"));
				
			};
			
			publishDeleteNoteService.setParam("noteId", note.id);
			publishDeleteNoteService.addEventHandler("SUCCESS", publishDeleteNoteServiceSuccessHandler);
			publishDeleteNoteService.addEventHandler("ERROR", publishDeleteNoteServiceErrorHandler);
			publishDeleteNoteService.addEventHandler("EXCEPTION", publishDeleteNoteServiceExceptionHandler);
			publishDeleteNoteService.call();
		
		},
		authorEditNote = _this.authorEditNote = function authorEditNote(note) {
			
			var 
			_dialog = new DCM.HTMLNotesModuleItemEditDialogElement(),
			authorEditNoteAcceptHandler = function authorEditNoteAcceptHandler() {
			
				publishEditNote(note, _dialog.getValue());
				
			};
			
			_dialog.setValue(note.noteBody);
			_dialog.addEventHandler("ACCEPT", authorEditNoteAcceptHandler);
			_dialog.queue();
			
		},
		publishEditNote = _this.publishEditNote = function publishEditNote(note, noteBody) {
			
			var 
			publishEditNoteService = new DCM.EditNoteService(),
			publishEditNoteServiceSuccessHandler = function publishEditNoteServiceSuccessHandler(data) {
				
				note.setNoteBody(noteBody);
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteEditSuccessLabel"));
				
			},
			publishEditNoteServiceErrorHandler = function publishEditNoteServiceErrorHandler(data) {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteEditErrorLabel"));
				
			},
			publishEditNoteServiceExceptionHandler = function publishEditNoteServiceExceptionHandler(data) {
				
				DCM.ToastManager.createToast(DCM.Resources.getResource("NoteEditErrorLabel"));
				
			};
			
			publishEditNoteService.setParam("noteId", note.id);
			publishEditNoteService.setParam("noteContent", noteBody);
			publishEditNoteService.addEventHandler("SUCCESS", publishEditNoteServiceSuccessHandler);
			publishEditNoteService.addEventHandler("ERROR", publishEditNoteServiceSuccessHandler);
			publishEditNoteService.addEventHandler("EXCEPTION", publishEditNoteServiceSuccessHandler);
			publishEditNoteService.call();
			
		};
		
		this._super = DCM.EventDispatcher;
		this._super();
		
	}
	catch(e) {
		
		DCM.warn("NoteManager", e);
		
	};
	
};