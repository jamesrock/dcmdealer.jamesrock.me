DCM.Key = new function Key() {
	
	var
	_this = this,
	
	key32 = _this.key32 = "\u0020",
	keyShift32 = _this.keyShift32 = "\u0020",
	
	key38 = _this.key38 = "UP",
	key40 = _this.key40 = "DOWN",
	// 0
	key48 = _this.key48 = "\u0030",
	// )
	keyShift48 = _this.keyShift48 = "\u0029",
	// 1
	key49 = _this.key49 = "\u0031",
	// !
	keyShift49 = _this.keyShift49 = "\u0021",
	// 2
	key50 = _this.key50 = "\u0032",
	// "
	keyShift50 = _this.keyShift50 = "\u0022",
	// 3
	key51 = _this.key51 = "\u0033",
	// £
	keyShift51 = _this.keyShift51 = "\u00A3",
	// 4
	key52 = _this.key52 = "\u0034",
	// $
	keyShift52 = _this.keyShift52 = "\u0024",
	// 5
	key53 = _this.key53 = "\u0035",
	// %
	keyShift53 = _this.keyShift53 = "\u0025",
	// 6
	key54 = _this.key54 = "\u0036",
	// ^
	keyShift54 = _this.keyShift54 = "\u005E",
	// 7
	key55 = _this.key55 = "\u0037",
	// &
	keyShift55 = _this.keyShift55 = "\u0026",
	// 8
	key56 = _this.key56 = "\u0038",
	// *
	keyShift56 = _this.keyShift56 = "\u002A",
	// 9
	key57 = _this.key57 = "\u0039",
	// (
	keyShift57 = _this.keyShift57 = "\u0028",
	// ;
	key59 = _this.key59 = "\u003B",
	// :
	keyShift59 = _this.keyShift59 = "\u003A",
	// =
	key61 = _this.key61 = "\u003D",
	// +
	keyShift61 = _this.keyShift61 = "\u002B",
	
	key65 = _this.key65 = "a",
	keyShift65 = _this.keyShift65 = "A",
	
	key66 = _this.key66 = "b",
	keyShift66 = _this.keyShift66 = "B",
	
	key67 = _this.key67 = "c",
	keyShift67 = _this.keyShift67 = "C",
	
	key68 = _this.key68 = "d",
	keyShift68 = _this.keyShift68 = "D",
	
	key69 = _this.key69 = "e",
	keyShift69 = _this.keyShift69 = "E",
	
	key70 = _this.key70 = "f",
	keyShift70 = _this.keyShift70 = "F",
	
	key71 = _this.key71 = "g",
	keyShift71 = _this.keyShift71 = "G",
	
	key72 = _this.key72 = "h",
	keyShift72 = _this.keyShift72 = "H",
	
	key73 = _this.key73 = "i",
	keyShift73 = _this.keyShift73 = "I",
	
	key74 = _this.key74 = "j",
	keyShift74 = _this.keyShift74 = "J",
	
	key75 = _this.key75 = "k",
	keyShift75 = _this.keyShift75 = "K",
	
	key76 = _this.key76 = "l",
	keyShift76 = _this.keyShift76 = "L",
	
	key77 = _this.key77 = "m",
	keyShift77 = _this.keyShift77 = "M",
	
	key78 = _this.key78 = "n",
	keyShift78 = _this.keyShift78 = "N",
	
	key79 = _this.key79 = "o",
	keyShift79 = _this.keyShift79 = "O",
	
	key80 = _this.key80 = "p",
	keyShift80 = _this.keyShift80 = "P",
	
	key81 = _this.key81 = "q",
	keyShift81 = _this.keyShift81 = "Q",
	
	key82 = _this.key82 = "r",
	keyShift82 = _this.keyShift82 = "R",
	
	key83 = _this.key83 = "s",
	keyShift83 = _this.keyShift83 = "S",
	
	key84 = _this.key84 = "t",
	keyShift84 = _this.keyShift84 = "T",
	
	key85 = _this.key85 = "u",
	keyShift85 = _this.keyShift85 = "U",
	
	key86 = _this.key86 = "v",
	keyShift86 = _this.keyShift86 = "V",
	
	key87 = _this.key87 = "w",
	keyShift87 = _this.keyShift87 = "W",
	
	key88 = _this.key88 = "x",
	keyShift88 = _this.keyShift88 = "X",
	
	key89 = _this.key89 = "y",
	keyShift89 = _this.keyShift89 = "Y",
	
	key90 = _this.key90 = "z",
	keyShift90 = _this.keyShift90 = "Z",
	
	// 0
	key96 = _this.key96 = "\u0030",
	// 1
	key97 = _this.key97 = "\u0031",
	// 2
	key98 = _this.key98 = "\u0032",
	// 3
	key99 = _this.key99 = "\u0033",
	// 4
	key100 = _this.key100 = "\u0034",
	// 5 
	key101 = _this.key101 = "\u0035",
	// 6
	key102 = _this.key102 = "\u0036",
	// 7
	key103 = _this.key103 = "\u0037",
	// 8
	key104 = _this.key104 = "\u0038",
	// 9
	key105 = _this.key105 = "\u0039",
	// #
	key163 = _this.key163 = "\u0023",
	// ~
	keyShift163 = _this.keyShift163 = "\u007E",
	// -
	key173 = _this.key173 = "\u002D",
	// _
	keyShift173 = _this.keyShift173 = "\u005F",
	// ,
	key188 = _this.key188 = "\u002C",
	// <
	keyShift188 = _this.keyShift188 = "\u003C",
	// .
	key190 = _this.key190 = "\u002E",
	// >
	keyShift190 = _this.keyShift190 = "\u003E",
	// /
	key191 = _this.key191 = "\u002F",
	// ?
	keyShift191 = _this.keyShift191 = "\u003F",
	// 
	key192 = _this.key192 = "\u002F",
	// 
	keyShift192 = _this.keyShift192 = "\u003F",
	// [
	key219 = _this.key219 = "\u005B",
	// {
	keyShift219 = _this.keyShift219 = "\u007B",
	// backslash
	key220 = _this.key220 = "\u005C",
	// |
	keyShift220 = _this.keyShift220 = "\u007C",
	// ]
	key221 = _this.key221 = "\u005D",
	// }
	keyShift221 = _this.keyShift221 = "\u007D",
	// '
	key222 = _this.key222 = "\u0027",
	// @
	keyShift222 = _this.keyShift222 = "\u0040",
	
	getCharFromEvent = _this.getCharFromEvent = function(e) {
	
		var 
		charValue,
		getter = "key";
		
		if(e.shiftKey) {
			getter = "keyShift";
		};
		
		charValue = _this[getter + e.keyCode];
		
		if(!charValue) {
			charValue = "";
		};
		
		DCM.log("getCharFromEvent", e, charValue);
		
		return charValue;
		
	};
	
};