Ext.define('Registration.view.RegistrationPart1', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.registrationpart1',
    border: 0,
    padding: 10,
    layout: {
        type: 'auto'
    },
    requires: ['Ext.tab.*', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', ],
    initComponent: function () {
        this.items = {
            border: 0,
            items: [{
                xtype: 'panel',
                border: 0,
                bodyPadding: 10,
                items: [{
                    xtype: 'fieldset',
                    padding: 10,
                    title: 'New Patient Registration (Part 1)',
                    fieldDefaults: {
                        msgTarget: 'side'
                    },
                    items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Self',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'textfield',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            name: 'firstName',
                            fieldLabel: 'First Name',
                            flex: 1,
                            emptyText: 'First Name',
                            allowBlank: false
                        }, {
                            name: 'middleName',
                            fieldLabel: 'Middle Name',
                            flex: 1,
                            margins: '0 0 0 6',
                            emptyText: 'Middle Name',
                        }, {
                            name: 'lastName',
                            fieldLabel: 'Last Name',
                            flex: 1,
                            margins: '0 0 0 6',
                            emptyText: 'Last Name',
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Father/Husband',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'textfield',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            name: 'firstName',
                            fieldLabel: 'First Name',
                            flex: 1,
                            emptyText: 'First Name',
                            allowBlank: false
                        }, {
                            name: 'middleName',
                            fieldLabel: 'Middle Name',
                            flex: 1,
                            margins: '0 0 0 6',
                            emptyText: 'Middle Name',
                        }, {
                            name: 'lastName',
                            fieldLabel: 'Last Name',
                            flex: 1,
                            margins: '0 0 0 6',
                            emptyText: 'Last Name',
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Village',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '75%',
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Occupation',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '75%',
                        allowBlank: false
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Mobile/Phone Number',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        hideTrigger: true,
                        anchor: '75%',
                        allowBlank: false
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Family Card Number',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        hideTrigger: true,
                        anchor: '75%',
                        allowBlank: false
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Weight',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        hideTrigger: true,
                        anchor: '75%',
                        allowBlank: false
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Height',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        hideTrigger: true,
                        anchor: '75%',
                        allowBlank: false
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: 'Sex',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '65%',
                        allowBlank: false,
                        items: [{
                            xtype: 'radiofield',
                            name: 'sex',
                            boxLabel: 'Male'
                        }, {
                            xtype: 'radiofield',
                            name: 'sex',
                            boxLabel: 'Female'
                        }, {
                            xtype: 'radiofield',
                            name: 'sex',
                            boxLabel: 'Other'
                        }]
                    }, {
                        xtype: 'datefield',
                        fieldLabel: 'DOB',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '75%',
                        allowBlank: false
                    }, {
                        xtype: 'button',
                        margin: '10 50 0 270',
                        width: 60,
                        text: 'Next',
                        handler: function () {
                            var l = Ext.getCmp('mainregarea').getLayout();
                            l.setActiveItem(2);
                        }
                    }, {
                        xtype: 'button',
                        margin: '10 0 0 0',
                        width: 60,
                        text: 'Reset'
                    }]
                }]
            }]
        };
        this.callParent();
    }
});