DCM.HTMLHeadNavigationElement = ROCK.createClass(DCM.HTMLRowElement, function HTMLHeadNavigationElement() {

	var
	_this = this,
	linkItemOne,
	linkItemTwo,
	linkItemThree,
	linkOne = new DCM.HTMLAnchorElement(),
	linkTwo = new DCM.HTMLAnchorElement(),
	linkThree = new DCM.HTMLAnchorElement(),
	linkOneIcon = new DCM.HTMLIconElement(),
	linkTwoIcon = new DCM.HTMLIconElement(),
	linkThreeIcon = new DCM.HTMLIconElement(),
	linkOneLabel = new DCM.HTMLDivElement(),
	linkTwoLabel = new DCM.HTMLDivElement(),
	linkThreeLabel = new DCM.HTMLDivElement();
	
	linkItemOne = _this.addColumn();
	linkItemTwo = _this.addColumn();
	linkItemThree = _this.addColumn();
	
	linkOne.setHref("http://www.dcmcap.com/education/tutorial");
	linkOne.setAttribute("target", "_blank");
	linkOne.append(linkOneIcon);
	linkOne.append(linkOneLabel);
	linkOneLabel.setText(DCM.Resources.getResource("TutorialLabel"));
	linkOneIcon.setRole("navigation-tutorial");
	linkOneIcon.setSize("1");
	
	linkTwo.setHref("http://www.dcmcap.com/education");
	linkTwo.setAttribute("target", "_blank");
	linkTwo.append(linkTwoIcon);
	linkTwo.append(linkTwoLabel);
	linkTwoLabel.setText(DCM.Resources.getResource("EducationLabel"));
	linkTwoIcon.setRole("navigation-education");
	linkTwoIcon.setSize("1");
	
	linkThree.append(linkThreeIcon);
	linkThree.append(linkThreeLabel);
	linkThreeLabel.setText(DCM.Resources.getResource("FundingLabel"));
	linkThreeIcon.setRole("navigation-funds");
	linkThreeIcon.setSize("1");
	
	linkThree.addEventListener(DCM.Event.click, function() {
		
		if(DCM.AccountManager.isPreviewAccount()) {
			
			DCM.AccountManager.openSelectAccountTypeDialog();
		}
		else {
			
			var fundingDialog = new DCM.HTMLFundingDialogElement();
			fundingDialog.queue();
		
		};
		
		return false;
		
	});
	
	linkItemOne.append(linkOne);
	linkItemTwo.append(linkTwo);
	linkItemThree.append(linkThree);
	
	_this.setType("HTMLHeadNavigationElement");
	
});