DCM.HTMLCustomNumericInputElement = ROCK.createClass(DCM.HTMLCustomInputElement, function HTMLCustomNumericInputElement() {

	this.setType("HTMLCustomNumericInputElement");
	this.setInputType("text");
	this.setRestricted(/([\[A-z\],\u0020,\u007B,\u007D,\u00A3,\u0022,\u007C,\u0021,\u0025,\u0026,\u0040,\u0023,\u0024,\u005E,\u002A,\u003F,\u005F,\u007E,\u002B,\u003D,\u0029,\u0028,\u002D,\u005D,\u003B,\u005B,\u003A,\u0027,\u002F,\u005C,\u003C,\u003E])/g);
		
});