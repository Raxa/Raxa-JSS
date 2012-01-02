$(document).ready(function() {
	$("#RegisterForm").formToWizard({
		submitButton : 'SaveAccount'
	});
	populateNumericDropdown("heightFeet", 0, 10);
	populateNumericDropdown("heightInches", 0, 11);
	populateDropdownFromStorage();
	setRequiredTitle();
	// calcBMI();
});
$(function() {
	$("#datepicker").datepicker({
		showOn : "button",
		buttonImage : "calendar.png",
		buttonImageOnly : true,
		changeMonth : true,
		changeYear : true,
		yearRange : '1900:2011'
	});

	$('#feeForm').dialog({
		autoOpen : false,
		modal : true,
		draggable : true,
		dialogClass : 'titleless',
		height : 240,
		width : 400,
		position : 'center',
		buttons : {
			"Submit" : function() {
				window.location = 'Success.html';
			}
		}
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
	// $('#calculateBMI').click(function() {
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
	// alert($("#heightFeet").val() + " " + $("#heightInches").val());
	// var output = document.getElementById("bmiResult");
	// output.value = 1;
	// });
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

function phoneAction() {
	var animationTime = 300;
	$('#phoneNo').hide(animationTime);
	$('.phone').change(function() {
		if($(this).val() == "yes") {
			$('#phoneNo').hide(animationTime);
			$('#yesPhoneChoice').hide();
			$('#phoneYes').show(animationTime, phoneYesPadding);
		} else {
			$('#phoneYes').hide(animationTime);
			$('#noPhoneNote').hide();
			$('#phoneNo').show(animationTime, phoneNoPadding);
		}
	});
}

function phoneNoPadding() {
	var animationTime = 300;
	$('.box').css('padding-top', '30px');
	$('.box').css('padding-right', '30px');
	$('.box').css('padding-left', '30px');
	$('.box').css('padding-bottom', '30px');
	$('#noPhoneNote').show(animationTime);
}

function phoneYesPadding() {
	var animationTime = 300;
	$('.box').css('padding-top', '10px');
	$('.box').css('padding-right', '10px');
	$('.box').css('padding-left', '10px');
	$('.box').css('padding-bottom', '10px');
	$('#yesPhoneChoice').show(animationTime);
}

function setRequiredTitle() {
	$('.requiredTitle').each(function() {
		if($(this).attr('title') !== "noStrong") {
			$(this).prepend('<span style="color:red">* </span>');
		}
	});
}

function verify(i) {
	var step = '#step' + i + ' .requiredTitle :input';
	var result = true;
	$(step).each(function() {
		var val = $(this).val();
		val = val.replace(/^\s+/, '').replace(/\s+$/, '');
		if(val === '') {
			result = false;
			alert("\"" + $(this).attr("name") + "\" is not completed!");
			return false;
		}
	});
	return result;
}

function selectFee() {
	$('#feeForm').dialog('open');
}