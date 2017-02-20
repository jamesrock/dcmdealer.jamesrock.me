DCM.HTMLTicketModuleSuccessNotificationElement = ROCK.createClass(function HTMLTicketModuleSuccessNotificationElement() {

	try {
		
		var
		_this = this,
		numberOfSharesHolder = new DCM.HTMLTicketModuleSuccessSharesElement(),
		sideHolder = new DCM.HTMLTicketModuleSuccessSideElement(),
		setNumberOfShares = _this.setNumberOfShares = function setNumberOfShares(value) {
			numberOfSharesHolder.setText(value);
		},
		setSide = _this.setSide = function setSide(value) {
			sideHolder.setText(value==="BUY"?"Bought":"Sold");
			sideHolder.setAttribute("data-direction", value);
		},
		setPrice = _this.setPrice = function setPrice(value) {
			priceValue.setText(value);
		},
		setStop = _this.setStop = function setStop(value) {
			if(!value) {
				return;
			};
			stopValue.setText(value);
		},
		setLimit = _this.setLimit = function setLimit(value) {
			if(!value) {
				return;
			};
			limitValue.setText(value);
		},
		setSize = _this.setSize = function setSize(value) {
			if(!value) {
				return;
			};
			sizeValue.setText(value);
		},
		setMarket = _this.setMarket = function setMarket(value) {
			if(!value) {
				return;
			};
			marketValue.setText(value);
		},
		setRef = _this.setRef = function setRef(value) {
			referenceValue.setText(value);
		},
		detailsTable = new DCM.HTMLDivElement(),
		priceRow = new DCM.HTMLRowElement(),
		marketRow = new DCM.HTMLRowElement(),
		sizeRow = new DCM.HTMLRowElement(),
		stopRow = new DCM.HTMLRowElement(),
		limitRow = new DCM.HTMLRowElement(),
		referenceRow = new DCM.HTMLRowElement(),
		priceHeading = priceRow.addColumn(),
		priceValue = priceRow.addColumn(),
		stopHeading = stopRow.addColumn(),
		stopValue = stopRow.addColumn(),
		limitHeading = limitRow.addColumn(),
		limitValue = limitRow.addColumn(),
		referenceHeading = referenceRow.addColumn(),
		referenceValue = referenceRow.addColumn(),
		marketHeading = marketRow.addColumn(),
		marketValue = marketRow.addColumn(),
		sizeHeading = sizeRow.addColumn(),
		sizeValue = sizeRow.addColumn();
		
		this._super = DCM.HTMLTicketModuleInteractiveNotificationElement;
		this._super();
		
		_this.setType("HTMLTicketModuleSuccessNotificationElement");
		
		priceHeading.setText("Price");
		referenceHeading.setText("Reference");
		stopHeading.setText("Stop");
		limitHeading.setText("Limit");
		sizeHeading.setText("Size");
		marketHeading.setText("Market");
		
		setStop("-");
		setLimit("-");
		
		_this.setHeading(DCM.Resources.getResource("TicketTransactionComplete"));
		
		_this.body.append(numberOfSharesHolder);
		_this.body.append(sideHolder);
		
		detailsTable.append(marketRow);
		detailsTable.append(sizeRow);
		detailsTable.append(priceRow);
		detailsTable.append(stopRow);
		detailsTable.append(limitRow);
		detailsTable.append(referenceRow);
		
		_this.body.append(detailsTable);
	
	}
	catch(e) {
		
		DCM.warn("HTMLTicketModuleSuccessNotificationElement", e);
		
	};
	
};