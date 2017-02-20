DCM.HTMLSentiballElement = ROCK.createClass(function HTMLSentiballElement(size, frames) {

	try {
	
		var
		_this = this,
		imagePath = ("/images/sentiball" + size + ".png"),
		interval,
		framerate = 60,
		currentFrame = 0,
		isReverse,
		getLeftValueFromFrame = function(frame) {
			var 
			_return = ("-" + (frame*size) + "px");
			return _return;
		},
		reversePercentage = function reversePercentage(value) {
			var _return = Math.floor(100-value);
			//DCM.log("reversePercentage(" + value + ")", _return);
			return _return;
		},
		getFrameFromSentiment = function getFrameFromSentiment(value) {
			var _return = DCM.getPercent(value, frames);
			//DCM.log("getFrameFromSentiment(" + value + ")", _return);
			return _return;
		},
		setSentiment = _this.setSentiment = function setSentiment(value) {
			DCM.log("HTMLSentiballElement.setSentiment(" + value + ")");
			if(!value) {
				return;
			};
			_this.sentiment = value;
			sentimentValueLabel.setText(value);
			goToAndStop(getFrameFromSentiment(reversePercentage(value)));
		},
		goToAndStop = function goToAndStop(frame) {
		
			stop();
		
			isReverse = (frame<currentFrame);
			
			interval = setInterval(function() {
			
				sentiballImage.setStyle("left", getLeftValueFromFrame(currentFrame));
				
				if(currentFrame===frame) {
					
					stop();
					
				};
				
				if(isReverse) {
					currentFrame -= 1;
				}
				else {
					currentFrame += 1;
				};
				
			}, (1000/framerate));
			
		},
		stop = function stop() {
			
			clearInterval(interval);
			
		},
		sentiballImage = new DCM.HTMLImageElement(),
		sentimentValueLabel = new DCM.HTMLSentiballValueElement();
		
		this._super = DCM.HTMLDivElement;
		this._super();
		
		sentiballImage.setAttribute("src", imagePath);
		sentiballImage.setStyle("position", "relative");
		
		_this.append(sentiballImage);
		_this.append(sentimentValueLabel);
		
		_this.setType("HTMLSentiballElement");
		
		_this.setWidth(size + "px");
		_this.setHeight(size + "px");
		_this.setStyle("overflow", "hidden");
		
		setSentiment(50);
	
	}
	catch(e) {
		
		DCM.warn("HTMLSentiballElement", e);
		
	};
	
};