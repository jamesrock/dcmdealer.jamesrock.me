DCM.PageNotFound = function PageNotFound() {

	try {
	
		DCM.Platform.init();
		
		var 
		brandIcon = new DCM.HTMLBrandIconElement(),
		page = new DCM.HTMLPageElement(),
		pane = new DCM.HTMLPaneElement(),
		tagline = new DCM.HTMLDivElement(),
		disclaimer = new DCM.HTMLPageFootElement();
		
		tagline.setText("<strong>Sorry!</strong><br />The page you attempted to open could not be found.<br /><a href=\"/dealer_platform_login\">Click here to return to login page.<a/>");
		
		DCM.body.append(page);
		
		page.append(pane);
		
		pane.head.append(brandIcon);
		pane.head.append(tagline);
		
		pane.foot.append(disclaimer);
		
	}
	catch(e) {
		
		DCM.warn("PageNotFound", e);
		
	};
	
};