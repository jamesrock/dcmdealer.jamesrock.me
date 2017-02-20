DCM.HTMLPortfolioAddElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLPortfolioAddElement() {

	var
	_this = this,
	addPortfolioButtonInner = new DCM.HTMLDivElement(),
	addPortfolioButtonHeading = new DCM.HTMLDivElement();
		
	this.setType("HTMLPortfolioAddElement");
	
	addPortfolioButtonInner.setAttribute("data-add-portfolio-role", "icon");
	addPortfolioButtonHeading.setAttribute("data-add-portfolio-role", "heading");
	
	addPortfolioButtonHeading.setText(DCM.Resources.getResource("CreatePortfolioLabel"));
	
	this.append(addPortfolioButtonInner);
	this.append(addPortfolioButtonHeading);

});