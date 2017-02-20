DCM.Event = new function Event() {

	var 
	hasParentOrIs = function hasParentOrIs(elm, parent) {
		var 
		target = elm.parentNode,
		_return = false;
		if(elm===parent) {
			return true;
		};
		while(target) {
			if(target===parent) {
				_return = true;
				break;
			};
			target = target.parentNode;
		};
		return _return;
	};

	this.mouseover = {
		condition: function(e) {
			return true;
		},
		name: "mouseover"
	};
	
	this.mouseout = {
		condition: function(e) {
			return true;
		},
		name: "mouseout"
	};
	
	this.mouseenter = {
		condition: function(e) {
			if(!e.relatedTarget||!hasParentOrIs(e.relatedTarget, e.currentTarget)) {
				return true;
			};
		},
		name: "mouseover"
	};
	
	this.mouseleave = {
		condition: function(e) {
			if(!e.relatedTarget||!hasParentOrIs(e.relatedTarget, e.currentTarget)) {
				return true;
			};
		},
		name: "mouseout"
	};
	
	this.click = {
		condition: function(e) {
			return true;
		},
		name: "click"
	};
	
	this.doubleclick = {
		condition: function(e) {
			return true;
		},
		name: "dblclick"
	};
	
	this.mousedown = {
		condition: function(e) {
			return true;
		},
		name: "mousedown"
	};
	
	this.mouseup = {
		condition: function(e) {
			return true;
		},
		name: "mouseup"
	};
	
	this.mousemove = {
		condition: function(e) {
			return true;
		},
		name: "mousemove"
	};
	
	this.keydown = {
		condition: function(e) {
			return true;
		},
		name: "keydown"
	};
	
	this.keyup = {
		condition: function(e) {
			return true;
		},
		name: "keyup"
	};
	
	this.keypress = {
		condition: function(e) {
			return true;
		},
		name: "keypress"
	};
	
	this.contextmenu = {
		condition: function(e) {
			return true;
		},
		name: "contextmenu"
	};
	
	this.change = {
		condition: function(e) {
			return true;
		},
		name: "change"
	};
	
	this.dragstart = {
		condition: function(e) {
			return true;
		},
		name: "dragstart"
	};
	
	this.dragend = {
		condition: function(e) {
			return true;
		},
		name: "dragend"
	};
	
	this.drop = {
		condition: function(e) {
			return true;
		},
		name: "drop"
	};
	
	this.drag = {
		condition: function(e) {
			return true;
		},
		name: "drag"
	};
	
	this.dragover = {
		condition: function(e) {
			return true;
		},
		name: "dragover"
	};
	
	this.dragenter = {
		condition: function(e) {
			return true;
		},
		name: "dragenter"
	};
	
	this.dragleave = {
		condition: function(e) {
			return true;
		},
		name: "dragleave"
	};
	
	this.mousewheel = {
		condition: function(e) {
			return true;
		},
		name: (function() {
			if(window.mozIndexedDB) {
				return "DOMMouseScroll";
			};
			return "mousewheel";
		})()
	};
	
	this.submit = {
		condition: function(e) {
			return true;
		},
		name: "submit"
	};
	
	this.adder = "addEventListener";
	this.remover = "removeEventListener";
	
	if(!window.addEventListener) {
	
		this.adder = "attachEvent";
		this.remover = "detachEvent";
		this.click.name = "onclick";
		this.doubleclick.name = "ondblclick";
		this.mousedown.name = "onmousedown";
		this.mouseup.name = "onmouseup";
		this.mousemove.name = "onmousemove";
		this.mouseenter.name = "onmouseenter";
		this.mouseleave.name = "onmouseleave";
		this.keydown.name = "onkeydown";
		this.keyup.name = "onkeyup";
		this.keypress.name = "onkeypress";
		this.contextmenu.name = "oncontextmenu";
		this.mousewheel.name = "onmousewheel";
		this.change.name = "onchange";
		this.submit.name = "onsubmit";
		this.dragstart.name = "ondragstart";
		this.dragend.name = "ondragend";
		this.drop.name = "ondrop";
		this.drag.name = "ondrag";
		this.dragover.name = "ondragover";
		this.dragenter.name = "ondragenter";
		this.dragleave.name = "ondragleave";
		
	};
	
};