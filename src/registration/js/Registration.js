$(document).ready(function() {
	$("#RegisterForm").formToWizard({
		submitButton : 'SaveAccount'
	});
	populateNumericDropdown("heightFeet", 0, 10);
	populateNumericDropdown("heightInches", 0, 11);
	populateDropdownFromStorage();
});
$(function() {
	$("#datepicker").datepicker({
		showOn : "button",
		buttonImage : "image/calendar_31.png",
		buttonImageOnly : true
	});
});
function populateNumericDropdown(name, begin, end, step) {
	step = ( typeof step == "undefined") ? 1 : step;
	var dropdown = document.getElementById(name);
	dropdown.options.length = 0;
	for(var i = begin; i <= end; i += step) {
		var option = document.createElement("option");
		dropdown.options.add(option);
		option.text = i;
		option.value = i;
	}
}

function calcBMI() {
	var feet = document.getElementById("heightFeet");
	var f = feet.options[feet.selectedIndex].value;
	var inches = document.getElementById("heightInches").valueOf();
	var i = inches.options[inches.selectedIndex].value;
	var m = (f * 30.48 + i * 2.54) / 100;
	var weight = document.getElementById("weight");
	var kg = weight.value;
	var bmi = (kg / (m * m)).toFixed(2);
	var output = document.getElementById("bmiResult");
	output.value = bmi;
}

function populateDropdownFromStorage() {
	for(var v in dropdownData) {
		var menu = document.getElementById(v);
		var data = dropdownData[v];
		for(var i = 0; i < data.length; i++) {
			var option = document.createElement("option");
			menu.options.add(option);
			option.text = data[i].name;
			option.value = data[i].value;
		}
	}
}