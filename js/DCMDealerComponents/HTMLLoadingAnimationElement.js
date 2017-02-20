DCM.HTMLLoadingAnimationElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLLoadingAnimationElement(data) {
	
	var
	_this = this,
	animation = new DCM.HTMLDivElement(),
	fader = new DCM.HTMLDivElement(),
	textWrap = new DCM.HTMLDivElement(),
	textHead = new DCM.HTMLDivElement(),
	brandIcon = new DCM.HTMLBrandIconElement();
	
	this.setType("HTMLLoadingAnimationElement");
	
	textWrap.append(brandIcon);
	textWrap.append(textHead);
	
	this.append(animation);
	animation.append(fader);
	this.append(textWrap);
	
	fader.setType("HTMLLoadingAnimationAnimationFaderElement");
	
	animation.setType("HTMLLoadingAnimationAnimationElement");
	
	textWrap.setType("HTMLLoadingAnimationTextElement");
	
	textHead.setType("HTMLLoadingAnimationTextHeadElement");
	
	this.setHeading("Processing");
	
	DCM.body.append(this);
	
});
DCM.HTMLLoadingAnimationElement.prototype.destroy = function() {
	
	this.remove();

};
DCM.HTMLLoadingAnimationElement.prototype.setHeading = function(value) {
	
	textHead.setText(value);

};