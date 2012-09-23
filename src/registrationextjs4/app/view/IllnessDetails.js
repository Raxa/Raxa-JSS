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
            },{
                xtype: 'fieldcontainer',
//                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.remarks'),
				fieldLabel: 'Remarks',
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
                    id: 'remarksArea',
                    width: 375,
                    height: 55,
                    scrollable: true,
                    allowBlank: true
                }]
            },{
                xtype: 'combobox',
//                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.referred'),
				fieldLabel: 'Referred by',
                store: Ext.create('Registration.store.Doctors'),
                id: 'referredBy',
                width: 375,
                allowBlank: true,
                //editable: false,
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
//            title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.title2'),
			title : 'Companion Details',
            fieldDefaults: {
                msgTarget: 'side'
            },
            items:[{
                xtype: 'fieldcontainer',
//                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.compname'),
				fieldLabel: 'Name',
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
                    id: 'companionName',
                    width: 375,
                    allowBlank: true
                }]
            },{
                xtype: 'fieldcontainer',
//                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.phone'),
				fieldLabel: 'Phone No',
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
                    id: 'phoneNumber',
                    width: 375,
                    allowBlank: true
                }]
            },{
                xtype: 'fieldcontainer',
//                fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.relation'),
				fieldLabel: 'Relation to Patient',
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
                    id: 'relationToPatient',
                    width: 375,
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
//                        boxLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.collected'),
						boxLabel: 'Fees Collected',
                        checked: true
                    }, {
                        xtype: 'radiofield',
                        name: 'fees',
//                        boxLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.id.credit')
						boxLabel: 'On Credit'
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
                action: 'goToBMI'
            }]
        }]
    }]
})
