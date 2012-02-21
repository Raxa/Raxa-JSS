Ext.define('RaxaEmr.Registration.view.Vitals', {
    extend: 'Ext.Container',
    config: {
        fullscreen: true,
        items: [
        {
            xtype: 'fieldset',
            layout: 'vbox',
            title: 'PATIENT ID: 2154354342',
            style: 'padding-left: 20px; padding-right: 20px;',
            
            items:[{
                layout: 'vbox',
                style: 'padding-left: 20px; padding-right: 20px; padding-top: 20px; padding-bottom: 20px',
                items:[{
                    html: 'BMI VALUE'
                },{
                    xtype: 'spacer',
                    height: 20
                },{
                    layout: 'hbox',
                    items:[{
                        xtype: 'textfield',
                        flex: 1,
                        label: 'Height'
                    },{
                        xtype: 'spacer',
                        width: 20
                    },{
                        xtype: 'textfield',
                        flex: 1,
                        label: 'Weight'
                    }]
                },{
                    xtype: 'spacer',
                    height: 20
                },{
                    layout:'hbox',
                    items: [{
                        xtype: 'button',
                        text: 'Generate BMI'
                    },{
                        xtype: 'spacer',
                        width: 20
                    },{
                        xtype: 'textfield',
                        value: 'BMI: 25'
                    }]
                },{
                    xtype: 'spacer',
                    height: 20
                },{
                    xtype: 'fieldset',
                    items:[{
                        xtype: 'sliderfield',
                        label: 'BMI',
                        labelWidth: '10%',
                        style: 'background-image: -webkit-linear-gradient(left, yellow 4%, green 52%, red 100%);',
                        value: 50,
                        minValue: 0,
                        maxValue: 100
                    }]
                },{
                    layout: 'hbox',
                    items:[{
                        xtype: 'button',
                        text: 'SUBMIT',
                        flex: 0.1
                    },{
                        xtype: 'spacer'
                    }]
                }]
            }]
        }]
    }
});