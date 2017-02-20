DCM.HTMLLanguageSelectMenuElement = ROCK.createClass(DCM.HTMLSelectMenuElement, function HTMLLanguageSelectMenuElement() {

	var
	_this = this,
	itemOne,
	itemTwo,
	itemThree,
	itemFour,
	itemFive,
	flagOne = new DCM.HTMLFlagIconElement(),
	flagTwo = new DCM.HTMLFlagIconElement(),
	flagThree = new DCM.HTMLFlagIconElement(),
	flagFour = new DCM.HTMLFlagIconElement(),
	flagFive = new DCM.HTMLFlagIconElement();
	
	itemOne = _this.itemOne = _this.setItem("Eng", "ENG");
	itemTwo = _this.itemOne = _this.setItem("Ger", "GER");
	itemThree = _this.itemOne = _this.setItem("Fra", "FRA");
	itemFour = _this.itemOne = _this.setItem("Nor", "NOR");
	itemFive = _this.itemOne = _this.setItem("Swe", "SWE");
	
	flagOne.setAttribute("data-culture", "ENG");
	flagTwo.setAttribute("data-culture", "GER");
	flagThree.setAttribute("data-culture", "FRA");
	flagFour.setAttribute("data-culture", "NOR");
	flagFive.setAttribute("data-culture", "SWE");
	
	itemTwo.disable();
	itemThree.disable();
	itemFour.disable();
	itemFive.disable();
	
	itemOne.prepend(flagOne);
	itemTwo.prepend(flagTwo);
	itemThree.prepend(flagThree);
	itemFour.prepend(flagFour);
	itemFive.prepend(flagFive);
	
	_this.setValue("ENG");
	_this.setType("HTMLLanguageSelectMenuElement");
	_this.setWidth(80);
	
});