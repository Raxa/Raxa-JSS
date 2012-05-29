Ext.require([
    'Ext.form.*',
    'Ext.layout.container.Absolute',
    'Ext.window.Window'
]);

Ext.onReady(function() {
    var form = Ext.create('Ext.form.Panel', {
        layout: 'absolute',
        id: 'bmiCalculator',
		name: 'bmiCalculator',
		title: 'Calculate BMI',
        defaultType: 'textfield',
        border: false,

        items: [{
            xtype: 'textfield',
			id: 'Weight',
			name: 'weight',
            fieldWidth: 60,
            msgTarget: 'side',
            allowBlank: false,
			blankText: 'Empty not allowed',
			regex: /^[1-9]{1}[0-9]{1,2}(.[0-9]{1,2})?$/,
			regexText: 'illegal weight input',
			placeHolder: 'Kgs',
			fieldLabel: 'Weight (Kgs)',
            x: 5,
            y: 5,
            name: 'Weight',
            anchor: '-5'  // anchor width by percentage
        }, 
		
		{
            xtype: 'textfield',
			id: 'Height',
			name: 'height',
            fieldWidth: 60,
			allowBlank: false,
            blankText: 'Empty not allowed',
			regex: /^[1-9]{1}[0-9]{1,2}(.[0-9]{1,2})?$/,
			regexText: 'illegal height input',
			placeHolder: 'Centimeters',
			fieldLabel: 'Height (cms)',
			x: 5,
            y: 35,
			anchor: '-5'  // anchor width by percentage
				
        }, 
		{
			xtype: 'textfield',
			id: 'bmiValue',
			name: 'bmiValue',
			label: 'BMI Value',
			x: 5,
			y: 95,
			fieldWidth: 60,
			regex: /^[1-9]{1}[0-9]{1,2}(.[0-9]{1,2})?$/,
			fieldLabel: 'BMI Value',
			readOnly: true,
		},
		]
		
    });

    var win = Ext.create('Ext.window.Window', {
        title: 'RAXA Registration Page',
        width: 350,
        height: 250,
        minWidth: 300,
        minHeight: 200,
        layout: 'fit',
        plain:true,
        items: form,

        buttons: [{
            text: 'Calculate BMI',
			onClick: 
			function() {

            		var h = Ext.getCmp('Height');
					var height = h.getValue();
					var w = Ext.getCmp('Weight');
					var weight = w.getValue();
					
					var bmi = 10000*weight/(height*height);
					var a = Ext.getCmp('bmiValue');
					a.setValue(bmi);
					}
				},
	]
    });

    win.show();
	
});
