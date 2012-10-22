Ext.define('Registration.view.IllnessDetails', {
    extend: 'Ext.container.Container',
    alias: 'widget.illnessdetails',
    border: 0,
    padding: 50,
    autoScroll: true,
    layout: {
        type: 'hbox',
        pack: 'center'
    },
    items:[{
        xtype: 'panel',
        ui: 'raxa-panel',
        width: 800,
        padding: 20,
        items:[{
            xtype: 'fieldset',
            //first element in bodyStyle is not working, passing it twice
            style:{
                bodyStyle:'border-right:none;border-right:none;border-bottom:none;border-left:none;'
            },
            padding: 5,
//            title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.title1'),
			title: 'Illness Details',
            fieldDefaults: {
                msgTarget: 'side'
            },
            items:[{
                xtype: 'fieldcontainer',
//                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.complaint'),
                fieldLabel: 'Complaint',
                layout: 'hbox',
                combineErrors: true,
                labelAlign: 'right',
                labelPad: 20,
                labelWidth: 200,
                anchor: '95%',
                defaults: {
                    hideLabel: 'true'
                },
                items: [{
                    xtype: 'textareafield',
                    cls: 'raxa-form-panel',    
                    name: 'Complaint Area',
                    id: 'complaintArea',
                    width: 375,
                    height: 125,
                    scrollable: true,
                    allowBlank: true
                }]
            }]
        },{
            xtype: 'fieldset',
            //first element in bodyStyle is not working, passing it twice
            style:{
                bodyStyle:'border-right:none;border-right:none;border-bottom:none;border-left:none;'
            },
            padding: 5,
//            title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.title3'),
			title: 'New Registration',
            fieldDefaults: {
                msgTarget: 'side'
            },
            items:[{
                xtype: 'fieldcontainer',
//                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.RF'),
				fieldLabel: 'Registration Fees',
                layout: 'hbox',
                combineErrors: true,
                labelAlign: 'right',
                labelPad: 20,
                labelWidth: 200,
                anchor: '95%',
                defaults: {
                    hideLabel: 'true'
                },
                items: [{
                    xtype: 'numberfield',
                    cls: 'raxa-form-panel',    
                    name: 'Registration Fees',
                    id: 'registrationFeesPaid',
                    width: 175,
                    minValue: 0,
                    value: 10,
                    hideTrigger: true,
                    allowBlank: false
                }]
            }]
        },{
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            border: 0,
            padding: 0,
            width: 580,
            items: [{
                xtype: 'button',
                margin: '30 0 0 30',
                text: 'Next',
                // ui: 'raxa-aqua-small',
                action: 'goToBMI'
            }]
        }]
    }]
})
