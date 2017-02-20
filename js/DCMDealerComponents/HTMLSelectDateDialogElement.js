DCM.HTMLSelectDateDialogElement = ROCK.createClass(DCM.HTMLDynamicMessageDialogElement, function HTMLSelectDateDialogElement() {

	// date handling could be improved

	var 
	_this = this,
	month = new DCM.HTMLDataStepperElement(),
	date = new DCM.HTMLDataStepperElement(),
	year = new DCM.HTMLDataStepperElement(),
	hours = new DCM.HTMLDataStepperElement(),
	minutes = new DCM.HTMLDataStepperElement(),
	seconds = new DCM.HTMLDataStepperElement(),
	actualDate = new Date(),
	currentMonth = actualDate.getMonth(),
	currentYear = actualDate.getFullYear(),
	currentDate = actualDate.getDate(),
	currentHours = actualDate.getHours(),
	currentMinutes = actualDate.getMinutes(),
	getMonthValue = function getMonthValue(month) {
		
		var 
		values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
		_return = values[month];
		
		return _return;
		
	},
	getMonthsAsData = function getMonthsAsData() {
	
		return ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	},
	getDateValue = function getDateValue(date) {
		
		var 
		values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
		_return = values[date];
		
		return _return;
		
	},
	getDaysOfMonthAsData = function getDaysOfMonthAsData(monthValue, yearValue) {
		
		var 
		tempDate = new Date(),
		inc = 1,
		_return = [],
		numberOfDaysInMonth;
		
		tempDate.setMonth(monthValue+1);
		tempDate.setYear(yearValue);
		tempDate.setDate(0);
		
		numberOfDaysInMonth = tempDate.getDate();
		
		while(numberOfDaysInMonth--) {
			_return.unshift(numberOfDaysInMonth+1);
		};
		
		return _return;
		
	},
	getYearsAsData = function getYearsAsData() {
		
		var 
		maxYear = (currentYear + 10),
		incYear = currentYear,
		_return = [];
		
		while(incYear<maxYear) {
			_return.push(incYear);
			incYear ++;
		};
		
		return _return;
		
	},
	getHoursAsData = function getHoursAsData() {
		
		return ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "23"];
		
	},
	getMinutesAsData = function getMinutesAsData() {
		
		return ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
		
	},
	getSecondsAsData = function getSecondsAsData() {
		
		return ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
		
	},
	dateGroup = new DCM.HTMLDivElement(),
	timeGroup = new DCM.HTMLDivElement(),
	getDate = _this.getDate = function getDate() {
		
		//YYYYMMDD-HH:MM:SS
		
		var
		yearValue = year.getLabel(),
		monthValue = getMonthValue(month.getValue()),
		dateValue = getDateValue(date.getValue()),
		hoursValue = hours.getLabel(),
		minutesValue = minutes.getLabel(),
		secondsValue = seconds.getLabel(),
		_return = (yearValue + "" + monthValue + "" + dateValue + "-" + hoursValue + "" + minutesValue + "" + secondsValue);
		
		return _return;
		
	},
	getDisplayDate = _this.getDisplayDate = function getDisplayDate() {
		
		var
		yearValue = year.getLabel(),
		monthValue = getMonthValue(month.getValue()),
		dateValue = getDateValue(date.getValue()),
		hoursValue = hours.getLabel(),
		minutesValue = minutes.getLabel(),
		secondsValue = seconds.getLabel(),
		_return = (dateValue + " " + monthValue + " " + yearValue + " @ " + hoursValue + ":" + minutesValue + ":" + secondsValue);
		
		return _return;
		
	},
	dateHeading = new DCM.HTMLHeadingElement(),
	timeHeading = new DCM.HTMLHeadingElement();
	
	//DCM.log("currentMonth", currentMonth);
	//DCM.log("currentYear", currentYear);
	//DCM.log("currentDate", currentDate);
	
	dateHeading.setText(DCM.Resources.getResource("DateLabel"));
	timeHeading.setText(DCM.Resources.getResource("TimeLabel"));
	
	month.setData(getMonthsAsData());
	month.setValue(currentMonth);
	month.addEventHandler("CHANGE", function() {
		
		date.setData(getDaysOfMonthAsData(month.value, year.value));
		date.setValue(currentDate-1);
		
	});
	
	date.setData(getDaysOfMonthAsData(currentMonth, currentYear));
	date.setValue(currentDate-1);
	
	year.setData(getYearsAsData());
	year.addEventHandler("CHANGE", function() {
		
		date.setData(getDaysOfMonthAsData(month.value, year.value));
		//date.setValue(date.value);
		
	});
	
	hours.setData(getHoursAsData());
	hours.setValue(12);
	
	minutes.setData(getMinutesAsData());
	minutes.setValue(6);
	
	seconds.setData(getSecondsAsData());
	
	_this.setHeading(DCM.Resources.getResource("DateSelectHeading"));
	//_this.setMessage();
	
	_this.setType("HTMLSelectDateDialogElement");
	
	dateGroup.append(month);
	dateGroup.append(date);
	dateGroup.append(year);
	
	timeGroup.append(hours);
	timeGroup.append(minutes);
	timeGroup.append(seconds);
	
	_this.body.append(dateHeading);
	_this.body.append(dateGroup);
	_this.body.append(timeHeading);
	_this.body.append(timeGroup);
	
});