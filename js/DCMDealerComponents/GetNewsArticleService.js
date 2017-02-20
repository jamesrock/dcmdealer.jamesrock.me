DCM.GetNewsArticleService = ROCK.createClass(DCM.StandardServiceCaller, function() {

	this.setMethod("/dcmdealer_news_get");
	this.setErrorMessage(DCM.Resources.getResource("ERROR29"));

});