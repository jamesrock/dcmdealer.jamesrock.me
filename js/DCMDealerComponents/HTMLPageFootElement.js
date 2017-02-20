DCM.HTMLPageFootElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLPageFootElement() {
	
	var
	disclaimer = new DCM.HTMLDisclaimerElement(),
	listOfLinks = new DCM.HTMLInlineULElement(),
	linkItemOne = listOfLinks.addItem(),
	linkItemTwo = listOfLinks.addItem(),
	linkItemThree = listOfLinks.addItem(),
	linkOne = new DCM.HTMLAnchorElement(),
	linkTwo = new DCM.HTMLAnchorElement(),
	linkThree = new DCM.HTMLAnchorElement();
	
	linkOne.setText(DCM.Resources.getResource("TermsAndConditionsLabel"));
	linkOne.setHref("http://www.derwentcapitalmarkets.com/terms/");
	linkOne.setAttribute("target", "_blank");
	
	linkTwo.setText(DCM.Resources.getResource("PrivacyPolicyLabel"));
	linkTwo.setHref("http://www.derwentcapitalmarkets.com/privacy/");
	linkTwo.setAttribute("target", "_blank");
	
	linkThree.setText(DCM.Resources.getResource("ContactLabel"));
	linkThree.setHref("http://www.derwentcapitalmarkets.com/contact_us/");
	linkThree.setAttribute("target", "_blank");
	
	linkItemOne.append(linkOne);
	linkItemTwo.append(linkTwo);
	linkItemThree.append(linkThree);
	
	this.setType("HTMLPageFootElement");
	
	this.append(listOfLinks);
	this.append(disclaimer);
		
});