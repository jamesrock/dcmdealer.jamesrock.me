DCM.HTMLNewsModuleItemElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLNewsModuleItemElement(id, title) {
	
	var
	_this = this,
	id = _this.id = id,
	title = _this.title = title,	
	got = _this.got = false,
	service = _this.service = new DCM.GetNewsArticleService(),
	serviceSuccessHandler = function serviceSuccessHandler(data) {
	
		_this.got = true;
	
		var data = _this.data = data.news;
		
		setBody(data.description);
		setPublishedDate(data.published_at);
		setCategory(data.category);
		setCreatedDate(data.created_at);
		
		open();
		
	},
	serviceErrorHandler = function serviceErrorHandler() {
		
		DCM.ToastManager.createToast(DCM.Resources.getResource("NewsOpenError"));
		
	},
	serviceExceptionHandler = function serviceExceptionHandler() {
		
		DCM.ToastManager.createToast(DCM.Resources.getResource("NewsOpenError"));
		
	};
	
	service.setParam("id", _this.id);
	service.addEventHandler("SUCCESS", serviceSuccessHandler);
	service.addEventHandler("ERROR", serviceErrorHandler);
	service.addEventHandler("EXCEPTION", serviceExceptionHandler);
	
	_this.setText(title);
	_this.setType("HTMLNewsModuleItemElement");
	
	_this.addEventListener(DCM.Event.contextmenu, function(e) {
		
		var _contextMenu = new DCM.HTMLNewsModuleItemContextMenuElement(_this);
		_contextMenu.setX(e.clientX);
		_contextMenu.setY(e.clientY);
		
		return false;
	
	});
	
	_this.addEventListener(DCM.Event.click, function() {
		
		openArticle();
		return false;
		
	});
	
});
DCM.HTMLNewsModuleItemElement.prototype.setBody = function(value) {
	
	this.body = value;

};
DCM.HTMLNewsModuleItemElement.prototype.getPublishedDate = function() {
	
	return this.publishedDate.toDateString();

};
DCM.HTMLNewsModuleItemElement.prototype.setPublishedDate = function(value) {
	
	this.publishedDate = new Date(value);

};
DCM.HTMLNewsModuleItemElement.prototype.getCreatedDate = function() {
	
	return this.createdDate.toDateString();

};
DCM.HTMLNewsModuleItemElement.prototype.setCreatedDate = function(value) {
	
	this.createdDate = new Date(value);

};
DCM.HTMLNewsModuleItemElement.prototype.setCategory = function(value) {
	
	this.category = value;

};
DCM.HTMLNewsModuleItemElement.prototype.open = function() {
	
	var dialog = new DCM.HTMLNewsDialogElement();
	dialog.setHeading(this.title);
	dialog.setMessage(this.body);
	dialog.queue();
	
};
DCM.HTMLNewsModuleItemElement.prototype.openArticle = function() {

	DCM.log("HTMLNewsModuleItemElement[" + _this.id + "].openArticle()");
	
	if(!this.got) {
		
		this.service.call();

	}
	else {
		
		this.open();

	};
	
};