Ext.define('RaxaEmr.Registration.view.Bmi', {
	extend: 'Ext.Container',
	xtype: 'bmipage',

	config: {
		title: 'BMI Value',
		iconCls: 'user',
		styleHtmlContent: true,

		items: [{
			id: 'BMIInput',
			xtype: 'fieldset',
			title: '<center>BMI Value<centre>',
			align: 'center',
			centered: true,
			items: [
				{
				xtype: 'numberfield',
				name: 'height(cms)',
				id:  'heightCmId',
				allowNegative : false,
				allowBlank: false,
				blankText: 'Empty is not allowed',
				label: 'Height(cms)',
				placeHolder: 'Height (in cms)',
				fieldLabel: 'heightCms',
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
				placeHolder: 'Weight(in Kg)',
				fieldLabel: 'weight',
				clearIcon: true
				},
				{
				id: 'BMIResult',
				items: [{
					xtype: 'button',
					text: 'Calculate BMI',
			   		action:'CalculateBmiAction',
					
					},
					{
					xtype: 'numberfield',
					name: 'BMITextField',
					id: 'BMITextFieldId',
					label: 'BMI Value',
					allowNegative : false,
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
