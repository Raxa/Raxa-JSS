Ext.define('RaxaEmr.view.smartApp', {
    extend: 'Ext.Container',

    config: {
        title: 'Patient Communication Information',
        styleHtmlContent: true,
        xtype: 'patientScreen2',
        autoscroll: true,

        items: [{
            xtype: 'fieldset',
            centered: true,
            items: [{
                xtype: 'button',
                text: 'BMI GRAPH',
                id: 'bmiApp',
                width: 250,
                height:250,
 handler: function() {location.href='http://smartapps.raxa.org/static/framework/got_statins/';} 
     
            }]
        }]
    }





/*       fullscreen: true,
        padding: 10,
        items:{
            xtype: 'button',
            text: 'BMI GRAPH',
            align: 'center'
        }
        
        */
});

