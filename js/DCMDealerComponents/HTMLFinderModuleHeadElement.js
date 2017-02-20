DCM.HTMLFinderModuleHeadElement = ROCK.createClass(DCM.HTMLDivElement, function HTMLFinderModuleHeadElement() {

	var
	headLeft = this.left = new DCM.HTMLFinderModuleHeadLeftElement(),
	headRight = this.right = new DCM.HTMLFinderModuleHeadRightElement(),
	headClear = new DCM.HTMLClearElement();
	
	this.setType("HTMLFinderModuleHeadElement");
	
	this.append(headLeft);
	this.append(headRight);
	this.append(headClear);
	
});