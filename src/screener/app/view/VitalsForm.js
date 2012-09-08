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
                    /*title: 'Input Vitals',*/
					id: 'vitalsFields',
					// TODO: For all inputs, get bounds from OpenMRS concept dictionary
					items: [{
						// Systolic Blood Pressure
						xtype: 'sliderfieldextended',
						label: 'Systolic Blood Pressure',
						minValue: 0,
						maxValue: 250,
                        value: 0,
						stepValue: 1,
						name: 'systolicBloodPressureField'
					},
					{
						// Diastolic Blood Pressure
						xtype: 'sliderfieldextended',
						label: 'Diastolic Blood Pressure',
						minValue: 0,
						maxValue: 150,
                        value: 0,
						stepValue: 1,
						name: 'diastolicBloodPressureField'
					},
					{
						// Temperature
						xtype: 'sliderfieldextended',
						label: 'Temperature',
                        id: 'tempSliderExt',
                        minValue: 25,   // TODO: Fix visual error in Slider. bar starts at far right and cant slide (this is a Sencha bug)
						maxValue: 43,
                        value: 25,
						stepValue: 0.1,
						name: 'temperatureField'
					},
					{
						// Repiratory Rate
						xtype: 'sliderfieldextended',
						label: 'Respiratory Rate',
						minValue: 0,
						maxValue: 200,
                        value: 0,
						stepValue: 1,
						name: 'respiratoryRateField'
					},
					{
						// Pulse
						xtype: 'sliderfieldextended',
						label: 'Pulse Rate',
						minValue: 0,
						maxValue: 230,
						stepValue: 1,
						name: 'pulseField'
					},
					{
						// Oxygen Saturation
						xtype: 'sliderfieldextended',
						label: 'Oxygen Saturation',
						minValue: 0,
						maxValue: 100,
						stepValue: 1,
						name: 'bloodOxygenSaturationField'
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

