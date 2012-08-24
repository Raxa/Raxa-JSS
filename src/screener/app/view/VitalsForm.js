/**
 * This screen shows a drug order form 
 * with a button to add additional medications and a submit button.The left side shows patient
 * list
 */

// Listener to workaround maxLength bug in HTML5 numberfield with Sencha
// Number field fails to enforce maxLength, so must add JavaScript listener
// http://stackoverflow.com/questions/9613743/maxlength-attribute-of-numberfield-in-sencha-touch
// TODO: Move to Utils
var maxLengthListener = function(maxLength) {
	return {
		keyup: function(textfield, e, eOpts) {
			var value = textfield.getValue() + '';
			var length = value.length;

			var MAX_LENGTH = maxLength;
			if (length > MAX_LENGTH) {
				textfield.setValue(value.substring(0, MAX_LENGTH));
				return false;
			}
		}
	};
};

Ext.define("Screener.view.VitalsForm", {
	xtype: 'vitalsForm',
    id: 'vitalsForm',
	extend: 'Ext.form.Panel',
	config: {
		styleHtmlContent: false,
		autoscroll: true,
		layout: 'vbox',
		items: [{
			xtype: 'titlebar',
			docked: 'top',
			title: 'Vitals'
		},
		{
            // Need a separate panel here, so I can show/hide depending on
            // whether or not a patient is selected
			xtype: 'panel',
			layout: 'vbox',
			id: 'vitalsInput',
            // hidden: true, // TODO: Show form only if patient is selected
			items: [{
				xtype: 'panel',
				layout: 'hbox',
				items: [{
                    // Fieldset for inputting vitals
					xtype: 'fieldset',
					title: 'Input Vitals',
					items: [{
						// Systolic Blood Pressure
						xtype: 'numberfield',
						label: 'Systolic Blood Pressure',
						minValue: 0,
						maxValue: 300,
						stepValue: 1,
						name: 'systolicBloodPressureField',
						listeners: maxLengthListener(3)
					},
					{
						// Diastolic Blood Pressure
						xtype: 'numberfield',
						label: 'Diastolic Blood Pressure',
						minValue: 0,
						maxValue: 300,
						stepValue: 1,
						name: 'diastolicBloodPressureField',
						listeners: maxLengthListener(3)
					},
					{
						// Temperature
						xtype: 'numberfield',
						label: 'Temperature',
						minValue: 0,
						maxValue: 200,
						stepValue: 1,
						name: 'temperatureField',
						listeners: maxLengthListener(3)
					},
					{
						// Repiratory Rate
						xtype: 'numberfield',
						label: 'Respiratory Rate',
						minValue: 0,
						maxValue: 200,
						stepValue: 1,
						name: 'respiratoryRateField',
						listeners: maxLengthListener(3)
					},
					{
						// Pulse Rate
						xtype: 'numberfield',
						label: 'Pulse Rate',
						minValue: 0,
						maxValue: 200,
						stepValue: 1,
						name: 'pulseRateField',
						listeners: maxLengthListener(3)
					},
					{
						// Oxygen Saturation
						xtype: 'numberfield',
						label: 'Oxygen Saturation',
						minValue: 0,
						maxValue: 100,
						stepValue: 1,
						name: 'oxygenSaturationField',
						listeners: maxLengthListener(3)
					}]
				},{
                    xtype: 'spacer',
                    width: '30px'
				},{
                    // Fieldset to display most recent vitals readings
					xtype: 'fieldset',
					title: 'Most Recent Reading',
					items: [{
						// Systolic Blood Pressure
						xtype: 'textfield',
						disabled: true,
						value: '120 - August 20, 2012 (FAKE)',
						name: 'systolicBloodPressureRecentValue'
					},
					{
						// Diastolic Blood Pressure
						xtype: 'textfield',
						disabled: true,
						value: '-',
						name: 'diastolicBloodPressureRecentValue'
					},
					{
						// Temperature
						xtype: 'textfield',
						disabled: true,
						value: '-',
						name: 'temperatureRecentValue'
					},
					{
						// Repiratory Rate
						xtype: 'textfield',
						disabled: true,
						value: '-',
						name: 'respiratoryRateRecentValue'
					},
					{
						// Pulse Rate
						xtype: 'textfield',
						disabled: true,
						value: '-',
						name: 'pulseRateRecentValue'
					},
					{
						// Oxygen Saturation
						xtype: 'textfield',
						disabled: true,
						value: '-',
						name: 'oxygenSaturationRecentValue'
					}]
				}]
			},
			{
                // Submit Button
				xtype: 'button',
				ui: 'confirm',
				id: 'vitalsSubmitButton',
                height: '40px',
				text: 'submit',
                width: '100px'
			}]
		}]
	}
});

