DCM.HTMLTableElement = ROCK.createClass(function HTMLTableElement() {

	try {
		
		var
		head = this.head = new DCM.HTMLTHeadElement(),
		body = this.body = new DCM.HTMLTBodyElement(),
		foot = this.foot = new DCM.HTMLTFootElement(),
		addColumnHeadingInc = 1,
		addRowInc = 1;
		
		this._super = DCM.HTMLElement;
		this._super();
		
		this.displayObject = document.createElement("table");
		
		this.append(head);
		this.append(body);
		this.append(foot);
		
		this.addRow = function addRow() {
			var row = new DCM.HTMLTRElement();
			row.setRow(addRowInc);
			body.append(row);
			addRowInc ++;
			return row;
		};
		
		this.addColumnHeading = function addColumnHeading(text) {
			var th = new DCM.HTMLTHElement();
			th.setColumn(addColumnHeadingInc);
			head.append(th);
			addColumnHeadingInc ++;
			if(text) {
				th.setText(text);
			};
			return th;
		};
		
	}
	catch(e) {
		
		DCM.warn("HTMLTableElement", e);
		
	};
	
};