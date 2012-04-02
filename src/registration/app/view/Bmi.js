Ext.define('RaxaEmr.Registration.view.Bmi', {
	extend: 'Ext.Container',
	xtype: 'bmipage',
	id: 'bmiCalculator',

	config: {
		title: 'Calculate BMI',
		iconCls: 'user',
		styleHtmlContent: true,

		items: [{
			id: 'BMIInput',
			xtype: 'fieldset',
			title: 'BMI Value',
			align: 'center',
			centered: true,
			items: [{
				xtype: 'textfield',
				name: 'patient id ',
				allowBlank: false,
				blankText: 'Empty is not allowed',
				regex: /^[1-9]{1}[0-9]{1,2}(.[0-9]{1,2})?$/,
				regexText: 'illegal height input',
				label: 'patientid',
				placeHolder: 'patientid ',
				fieldLabel: 'patient id',
				clearIcon: true
				},
				{
				xtype: 'textfield',
				name: 'height',
				allowBlank: false,
				blankText: 'Empty is not allowed',
				regex: /^[1-9]{1}[0-9]{1,2}(.[0-9]{1,2})?$/,
				regexText: 'illegal height input',
				label: 'Height',
				placeHolder: 'Feets',
				fieldLabel: 'height',
				clearIcon: true
				},
				{
				xtype: 'textfield',
				name: 'height1',
				allowBlank: false,
				blankText: 'Empty is not allowed',
				regex: /^[1-9]{1}[0-9]{1,2}(.[0-9]{1,2})?$/,
				regexText: 'illegal height input',
				label: 'Height',
				placeHolder: 'Inches',
				fieldLabel: 'height1',
				clearIcon: true
			},
			{
				xtype: 'textfield',
				name: 'weight',
				allowBlank: false,
				blankText: 'Empty is not allowed',
				regex: /^[1-9][0-9]{0,2}(.[0-9]{1,2})?$/,
				regexText: 'illegal weight input',
				label: 'Weight:',
				placeHolder: 'kilograms',
				fieldLabel: 'weight',
				clearIcon: true
			},
			{
				id: 'BMIResult',
				items: [{
					xtype: 'button',
					text: 'Calculate BMI',
					action: 'calculatebmi',					
					},
					{
					xtype: 'textfield',
					name: 'BMI',
					label: 'BMI Value',
					readOnly: true,
					placeHolder: 'Press above to Calculate'
					}]
			},		
			{
 					xtype: 'label',
    					html: '<div align="center"><b>BMI Index</div>',
    			},
			{
 					xtype: 'label',
    					html: '<div align="center">0 5 10 15 20 25 30 35 40 45 50 55 60</div>',
    			
			},
			{
				        xtype: 'sliderfield',
            				align: 'center',
            				value: 30,
            				minValue: 0,
            				maxValue: 60,
            				
        		},		
			{
					xtype: 'button',
					text: 'Submit',
					action: 'submitbmi'
	
			}]
		}]
	}
});
