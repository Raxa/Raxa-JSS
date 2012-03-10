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
				name: 'height',
				allowBlank: false,
				blankText: 'Empty is not allowed',
				regex: /^[1-9]{1}[0-9]{1,2}(.[0-9]{1,2})?$/,
				regexText: 'illegal height input',
				label: 'Height',
				placeHolder: 'centimeters',
				fieldLabel: 'height',
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
					handler: function() {
						// Calculate Bmi
					}
					//				ui: 'forward',
				},
				{
					xtype: 'textfield',
					name: 'BMI',
					label: 'BMI Value',
					readOnly: true,
					placeHolder: ''
				}]

			}]
		}]
	}
});

