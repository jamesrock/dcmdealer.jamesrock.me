DCM.HTMLPortfoliosModuleElement = ROCK.createClass(DCM.HTMLScrollableModuleElement, function HTMLPortfoliosModuleElement() {

	var
	_this = this,
	clearDiv = new DCM.HTMLClearElement(),
	addPortfolioButton = new DCM.HTMLPortfolioAddElement(),
	barChartOptions = {
		width: 150,
		height: 90,
		backgroundColor: "transparent",
		vAxis: {
			gridlines: {
				count: 0
			},
			textPosition: "none",
			baselineColor: "#CCCCCC",
			viewWindow: {
				max: 100
			}
		},
		hAxis: {
			gridlines: {
				count: 0
			},
			textPosition: "none",
			baselineColor: "#CCCCCC"
		},
		chartArea: {
			height: 70
		},
		legend: {
			position: "none"
		},
		tooltip: {
			textStyle: {
				color: "#555555",
				fontSize: 11
			}
		}
	},
	chartOptions = {
		width: 400,
		height: 100,
		backgroundColor: "transparent",
		pieSliceText: "none",
		pieHole: 0.80,
		fontName: "OpenSansRegular,Arial,Helvetica,sans-serif",
		tooltip: {
			textStyle: {
				color: "#555555",
				fontSize: 11
			},
			text: "both"
		},
		chartArea: {
			height: 80,
			left: 0
		},
		legend: {
			left: 0
		}
	},
	addPortfolio = _this.addPortfolio = function addPortfolio(data) {
		
		var 
		portfolio = DCM.PortfolioManager.createPortfolio(data),
		profitLossChangeHandler = function profitLossChangeHandler() {
			updateBarChart();
		},
		considerationChangeHandler = function considerationChangeHandler() {
			updateChart();
		},
		portfolioDestoryHandler = function portfolioDestoryHandler() {
			
			portfolio.removeEventHandler("PROFITLOSS_CHANGE", profitLossChangeHandler);
			portfolio.removeEventHandler("CONSIDERATION_CHANGE", considerationChangeHandler);
			portfolio.removeEventHandler("DESTROY", portfolioDestoryHandler);
		
		};
		
		_this.scroller.body.prepend(portfolio);
		
		portfolio.addEventHandler("PROFITLOSS_CHANGE", profitLossChangeHandler);
		portfolio.addEventHandler("CONSIDERATION_CHANGE", considerationChangeHandler);
		portfolio.addEventHandler("DESTROY", portfolioDestoryHandler);
		
		updateChart();
		updateBarChart();
		return portfolio;
	
	},
	foot = _this.foot = new DCM.HTMLModuleFootElement(),
	considerationChartHolder = new DCM.HTMLDivElement(),
	profitAndLossChartHolder = new DCM.HTMLDivElement(),
	considerationChartWrap = new DCM.HTMLDivElement(),
	profitAndLossChartWrap = new DCM.HTMLDivElement(),
	considerationHeading = new DCM.HTMLDivElement(),
	profitAndLossHeading = new DCM.HTMLDivElement(),
	considerationChart = new google.visualization.PieChart(considerationChartHolder.displayObject),
	profitAndLossChart = new google.visualization.ColumnChart(profitAndLossChartHolder.displayObject),
	updateChart = _this.updateChart = function updateChart() {
		
		var data = new google.visualization.arrayToDataTable(DCM.PortfolioManager.getConsiderationData());
		considerationChart.draw(data, chartOptions);
		
	},
	updateBarChart = _this.updateBarChart = function updateBarChart() {
		
		var data = google.visualization.arrayToDataTable(DCM.PortfolioManager.getProfitAndLossData());
		profitAndLossChart.draw(data, barChartOptions);
		
	};
	
	_this.scroller.setHeight(215);
	
	_this.body.append(foot);
	
	considerationChartWrap.append(considerationHeading);
	//profitAndLossChartWrap.append(profitAndLossHeading);
	considerationChartWrap.append(considerationChartHolder);
	//profitAndLossChartWrap.append(profitAndLossChartHolder);
	
	foot.append(considerationChartWrap);
	foot.append(profitAndLossChartWrap);
	
	considerationHeading.setText(DCM.Resources.getResource("ConsiderationGraphHeadingLabel"));
	considerationHeading.setAttribute("title", DCM.Resources.getResource("ConsiderationTooltipLabel"));
	profitAndLossHeading.setText("Profit/Loss");
	
	considerationChartWrap.setAttribute("data-portfolio-role", "pie-chart");
	profitAndLossChartWrap.setAttribute("data-portfolio-role", "bar-chart");
	
	considerationHeading.setAttribute("data-portfolio-chart-role", "chart-heading");
	profitAndLossHeading.setAttribute("data-portfolio-chart-role", "chart-heading");
	
	_this.setIcon("my-portfolio");
	_this.setHeading(DCM.Resources.getResource("PortfoliosPanelHeading"));
	_this.setServiceCall("GetPortfoliosService");
	_this.setType("HTMLPortfoliosModuleElement");
	_this.setContextMenu("HTMLPortfoliosModuleContextMenuElement");
	_this.addEventHandler("UPDATE", function(data) {
	
		_this.refresh();
		
		var target = data.portfolios;
	
		for(var prop in target) {
		
			addPortfolio(target[prop]);
			
		};
		
		_this.scroller.body.append(clearDiv);
		
	});
	
	_this.update();
	
	_this.scroller.body.prepend(addPortfolioButton);
	addPortfolioButton.addEventListener(DCM.Event.click, function() {
		
		DCM.PortfolioManager.authorNewPortfolio();
		
	});

});