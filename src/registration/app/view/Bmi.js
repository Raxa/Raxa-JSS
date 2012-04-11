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
//				allowBlank: false,
				blankText: 'Empty is not allowed',
//				regex: /^[1-9]{1}[0-9]{1,2}(.[0-9]{1,2})?$/,
//				regexText: 'illegal patient input',
				label: 'patientid',
				placeHolder: 'patientid ',
				fieldLabel: 'patient id',
				clearIcon: true
				},
				{
				xtype: 'numberfield',
				name: 'height(Feets)',
				id:  'heightFeetId',
				allowNegative : false,
				allowBlank: false,
				blankText: 'Empty is not allowed',
				label: 'Height',
				placeHolder: 'Feets',
				fieldLabel: 'heightfeet',
				clearIcon: true
				},
				{
				xtype: 'numberfield',
				name: 'height1',
				id: 'heightInchesId',
				allowNegative : false,
				allowBlank: false,
				blankText: 'Empty is not allowed',
				label: 'Height(Inches)',
				placeHolder: 'Inches',
				fieldLabel: 'heightinches',
				clearIcon: true
			},
			{
				xtype: 'numberfield',
				name: 'weight',
				id: 'weightId',
				allowNegative : false,
				allowBlank: false,
				blankText: 'Empty is not allowed',
				label: 'Weight(Kg)',
				placeHolder: 'kilograms',
				fieldLabel: 'weight',
				clearIcon: true
			},
			{
				id: 'BMIResult',
				items: [{
					xtype: 'button',
					text: 'Calculate BMI',
			        action:'calculatebmi',
					
					},
					{
					xtype: 'numberfield',
					name: 'BMITextField',
					id: 'BMITextFieldId',
					label: 'BMI Value',
					allowNegative : false,
			//		readOnly: true,
					align: 'centre',
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
            				id: 'bmiSlider',
            				value: 30,
            				minValue: 0,
            				maxValue: 60,
					readOnly: true,

            				
        		},
        		{
					xtype: 'textfield',
					name: 'BmiStatus',
					id: 'BmiStatusId',
					readOnly: true,
					draggable : false
	
			},
        				
			{
					xtype: 'button',
					text: 'Submit',
					action: 'submitbmi',
					
	
			}]
		}]
	}
});
