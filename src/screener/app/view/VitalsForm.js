/**
 * This screen shows a drug order form 
 * with a button to add additional medications and a submit button.The left side shows patient
 * list
 */

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
            // Need a separate panel here, so I can show/hide/disable
			xtype: 'panel',
			layout: 'vbox',
			id: 'vitalsInput',
			items: [{
				xtype: 'panel',
				layout: 'hbox',
				items: [{
                    // Fieldset for inputting vitals
					xtype: 'fieldset',
					title: 'Input Vitals',
                    id: 'vitalsFields',
					items: [{
						// Systolic Blood Pressure
						xtype: 'numberfield',
						label: 'Systolic Blood Pressure',
						minValue: 0,
						maxValue: 300,
						stepValue: 1,
						name: 'systolicBloodPressureField',
						listeners: Util.maxLengthListener(3)
					},
					{
						// Diastolic Blood Pressure
						xtype: 'numberfield',
						label: 'Diastolic Blood Pressure',
						minValue: 0,
						maxValue: 300,
						stepValue: 1,
						name: 'diastolicBloodPressureField',
						listeners: Util.maxLengthListener(3)
					},
					{
						// Temperature
						xtype: 'numberfield',
						label: 'Temperature',
                        // TODO: For all inputs, get bounds from OpenMRS concept dictionary
						minValue: 25, 
						maxValue: 43,
						stepValue: 0.1,
						name: 'temperatureField',
						listeners: Util.maxLengthListener(4)
					},
					{
						// Repiratory Rate
						xtype: 'numberfield',
						label: 'Respiratory Rate',
						minValue: 0,
						maxValue: 200,
						stepValue: 1,
						name: 'respiratoryRateField',
						listeners: Util.maxLengthListener(3)
					},
					{
						// Pulse
						xtype: 'numberfield',
						label: 'Pulse Rate',
						minValue: 0,
						maxValue: 200,
						stepValue: 1,
						name: 'pulseField',
						listeners: Util.maxLengthListener(3)
					},
					{
						// Oxygen Saturation
						xtype: 'numberfield',
						label: 'Oxygen Saturation',
						minValue: 0,
						maxValue: 100,
						stepValue: 1,
						name: 'bloodOxygenSaturationField',
						listeners: Util.maxLengthListener(3)
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
						name: 'pulseRecentValue'
					},
					{
						// Oxygen Saturation
						xtype: 'textfield',
						disabled: true,
						value: '-',
						name: 'bloodOxygenSaturationRecentValue'
					}]
				}]
			},
			{
                // Submit Button
				xtype: 'button',
				ui: 'confirm',
				id: 'submitVitalsButton',
                height: '40px',
				text: 'submit',
                width: '100px'
			}]
		}]
	}
});

