DCM.HTMLNewsModuleElement = ROCK.createClass(DCM.HTMLScrollableModuleElement, function HTMLNewsModuleElement() {
	
	var
	_this = this,
	lightstreamerHandler = _this.lightstreamerHandler = function lightstreamerHandler() {
		this.onItemUpdate = function(data) {
			_this.addItem(data.getValue("newsId"), data.getValue("news_title"));
		};
	};

	this.setIcon("news");
	this.setHeading(DCM.Resources.getResource("NewsPanelHeading"));
	this.setType("HTMLNewsModuleElement");
	
	this.subscribe();

});
DCM.HTMLNewsModuleElement.prototype.subscribe = function() {

	var newsSubscription = new Lightstreamer.Subscription("DISTINCT", "dcmnews_bussines", ["newsId", "news_title"]);
	newsSubscription.addListener(new this.lightstreamerHandler());
	newsSubscription.setDataAdapter("dcm_news");
	newsSubscription.setRequestedSnapshot("yes");
	DCM.sharingClient.subscribe(newsSubscription);
	
};
DCM.HTMLNewsModuleElement.prototype.addItem = function(id, title) {

	var item = new DCM.HTMLNewsModuleItemElement(id, title);
	
	this.scroller.body.prepend(item);
	
};