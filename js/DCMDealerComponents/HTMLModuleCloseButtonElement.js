DCM.HTMLModuleCloseButtonElement = ROCK.createClass(DCM.HTMLGraphicButtonElement, function HTMLModuleCloseButtonElement() {
	
	this.setText(DCM.Resources.getResource("CloseModule")); 
	this.setAttribute("title", DCM.Resources.getResource("CloseModule"));
	this.setRole("close");
	this.setSize("1");

});