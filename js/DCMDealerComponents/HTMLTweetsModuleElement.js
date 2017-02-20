DCM.HTMLTweetsModuleElement = ROCK.createClass(DCM.HTMLScrollableModuleElement, function HTMLTweetsModuleElement() {
	
	var
	_this = this,
	lightstreamerHandler = function lightstreamerHandler() {
		this.onItemUpdate = function(data) {
			addItem(data.getValue("newsId"), data.getValue("news_title"));
		};
	},
	subscribe = _this.subscribe = function subscribe() {
	
		var newsSubscription = new Lightstreamer.Subscription("DISTINCT", "dcmnews_bussines", ["newsId", "news_title"]);
		newsSubscription.addListener(new lightstreamerHandler());
		newsSubscription.setDataAdapter("dcm_news");
		newsSubscription.setRequestedSnapshot("yes");
		DCM.sharingClient.subscribe(newsSubscription);
		
	},
	addItem = _this.addItem = function addItem(id, title) {
	
		var item = new DCM.HTMLNewsModuleItemElement(id, title);
		
		_this.scroller.body.prepend(item);
		
	};
	
	this.setIcon("tweets");
	this.setHeading(DCM.Resources.getResource("TweetsPanelHeading"));
	this.setType("HTMLTweetsModuleElement");
	
	subscribe();
	
});