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
            title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.title1'),
            fieldDefaults: {
                msgTarget: 'side'
            },
            items:[{
                xtype: 'fieldcontainer',
                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.complaint'),
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
                    id: 'complaintarea',
                    width: 375,
                    height: 125,
                    scrollable: true,
                    allowBlank: true
                }]
            },{
                xtype: 'fieldcontainer',
                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.remarks'),
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
                    name: 'Remarks Area',
                    id: 'remarksarea',
                    width: 375,
                    height: 55,
                    scrollable: true,
                    allowBlank: true
                }]
            },{
                xtype: 'combobox',
                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.referred'),
                store: Ext.create('Registration.store.Doctors'),
                id: 'referredby',
                width: 475,
                allowBlank: true,
                editable: false,
                displayField: 'display',
                labelAlign: 'right',
                labelPad: 20,
                labelWidth: 200,
                defaults: {
                    hideLabel: 'true'
                }
            }]
        },{
            xtype: 'fieldset',
            //first element in bodyStyle is not working, passing it twice
            style:{
                bodyStyle:'border-right:none;border-right:none;border-bottom:none;border-left:none;'
            },
            padding: 5,
            title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.title2'),
            fieldDefaults: {
                msgTarget: 'side'
            },
            items:[{
                xtype: 'fieldcontainer',
                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.compname'),
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
                    xtype: 'textfield',
                    cls: 'raxa-form-panel',    
                    name: 'Companion Name',
                    id: 'companionname',
                    width: 375,
                    allowBlank: true
                }]
            },{
                xtype: 'fieldcontainer',
                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.phone'),
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
                    name: 'Phone Number',
                    id: 'phonenumber',
                    width: 255,
                    allowBlank: true
                }]
            },{
                xtype: 'fieldcontainer',
                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.relation'),
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
                    xtype: 'textfield',
                    cls: 'raxa-form-panel',    
                    name: 'Relation',
                    id: 'relationtopatient',
                    width: 255,
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
            title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.title3'),
            fieldDefaults: {
                msgTarget: 'side'
            },
            items:[{
                xtype: 'fieldcontainer',
                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.RF'),
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
                    id: 'registrationfeespaid',
                    width: 175,
                    allowBlank: false
                },{
                    xtype: 'radiogroup',
                    id: 'cashRadioGroup',
                    labelAlign: 'right',
                    labelPad: 20,
                    labelWidth: 200,
                    width: 370,
                    allowBlank: false,
                    items: [{
                        xtype: 'radiofield',
                        name: 'fees',
                        boxLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.collected'),
                        checked: true
                    }, {
                        xtype: 'radiofield',
                        name: 'fees',
                        boxLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.credit')
                    }]
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
                width: 60,
                text: 'Back',
                ui: 'raxa-aqua-small',
                action: 'back'
            },{
                xtype: 'button',
                margin: '30 0 0 30',
                width: 60,
                text: 'Cancel',
                ui: 'raxa-orange-small',
                action: 'cancel'
            }, {
                xtype: 'button',
                margin: '30 0 0 30',
                width: 60,
                text: 'Next',
                action: 'next'
            }]
        }]
    }]
})