DCM.HTMLChartModuleElement = ROCK.createClass(DCM.HTMLModuleElement, function HTMLChartModuleElement(secutiryId) {
	
	var
	_this = this,
	getChartService = new DCM.GetChartService(),
	iframe = new DCM.HTMLIFrameElement(),
	closeChartService = new DCM.CloseChartService(),
	chartURL,
	openInNewWindowButton = new DCM.HTMLOpenInNewWindowGraphicButtonElement(),
	openInNewWindow = function openInNewWindow() {
		
		var newWindow = window.open(chartURL, "", "width=610,height=350");
		newWindow.onbeforeunload = function() {
			
			closeChartService.call();
			
		};
		suprressCloseCall = true;
		_this.close();
		
	},
	suprressCloseCall = false;
	
	_this.buttonWrap.append(openInNewWindowButton);
	
	DCM.log("new HTMLChartModuleElement()", _this);
	
	getChartService.setParam("securityId", secutiryId);
	getChartService.call();
	
	getChartService.addEventHandler("SUCCESS", function(data) {
	
		chartURL = data.link;
		
		iframe.setSrc(chartURL);
		
		_this.body.append(iframe);
		
	});
	
	getChartService.addEventHandler("EXCEPTION", function(data) {
	
		_this.body.setText(DCM.Resources.getResource(data));
		
	});
	
	getChartService.addEventHandler("ERROR", function() {
	
		DCM.log("getChartService.ERROR");
		
	});
	
	_this.setIcon("chart-module");
	_this.setHeading(DCM.Resources.getResource("ChartModuleHeading"));
	_this.setType("HTMLChartModuleElement");
	
	_this.addEventHandler("CLOSE", function() {
		
		if(!suprressCloseCall) {
			closeChartService.call();
		};
		
	});
	
	iframe.setWidth("596px");
	iframe.setHeight("350px");
	
	openInNewWindowButton.addEventListener(DCM.Event.click, function() {
		
		openInNewWindow();
		
	});
	
});