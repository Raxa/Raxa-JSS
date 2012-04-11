/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
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
			
		/*
		{
            x:5,
            y: 65,
            xtype: 'textarea',
            style: 'margin:0',
            hideLabel: true,
            name: 'msg',
            anchor: '-5 -5'  // anchor width and height
        }
		*/
			
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
			//onclick="javascript:bmiCalculator(),
			onClick: 
			
			function() {

                    //BMI Calc
					
					//var height = parseDouble(document.bmiCalculator.Height.value);	
					//var weight = parseDouble(document.bmiCalculator.Weight.value);	
					//height = height.replace(',','.');
					//weight = weight.replace(',','.');
					//if(!useKg)weight = weight / 2.2;
					//if(!useCm)height = height * 2.54;
					
					//if(isNaN(height))return;
					//if(isNaN(weight))return;
					
					//height = height / 100;
					//var bmi = document.getElementById("bmiValue");
					//bmi.value = weight / (height*height);
					var h = Ext.getCmp('Height');
					var height = h.getValue();
					var w = Ext.getCmp('Weight');
					var weight = w.getValue();
					
					var bmi = 10000*weight/(height*height);
					
					//bmiCalculator.getForm().findField('bmiValue').setValue('bmi');
					//document.getElementById("bmiValue").text = "100";
					
					var a = Ext.getCmp('bmiValue');
					a.setValue(bmi);
					//alert('bmi');
						
									
					}
				},
	]
    });

    win.show();
	
});
