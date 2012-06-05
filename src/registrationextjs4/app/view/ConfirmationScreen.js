Ext.define('Registration.view.ConfirmationScreen', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.confirmationScreen',
    border: 0,
    padding: 10,
    autoScroll: true,
    layout: {
        type: 'auto'
    },
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
                    title: 'New Patient Registration (Confirmation Screen)',
                    items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Old Patient Registration Number',
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
                            name: 'Old Patient Identifier',
                            fieldLabel: 'Old Patient Identifier',
                            flex: 1,
                            id: 'oldPatientIdentifierConfirm',
                            readOnly: true,
                            emptyText: 'Old Patient Identifier as filled in form (READ ONLY)',
                            allowBlank: true
                        }]
                    },

                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Patient Name',
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
                            name: 'patientName',
                            id: 'patientNameConfirm',
                            emptyText: 'Patient\'s Name as filled in form (READ ONLY)',
                            flex: 1,
                            readOnly: true,
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Father/Husband\'s name',
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
                            name: 'relativeNameConfirm',
                            id: 'relativeNameConfirm',
                            emptyText: 'Father/Husband\'s Name (READ ONLY)',
                            flex: 1,
                            readOnly: true,
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Age',
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
                            name: 'age',
                            id: 'ageConfirm',
                            emptyText: 'Age (READ ONLY)',
                            flex: 1,
                            readOnly: true,
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Sex',
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
                            name: 'sex',
                            id: 'sexConfirm',
                            emptyText: 'Sex (READ ONLY)',
                            flex: 1,
                            readOnly: true,
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Education Details',
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
                            name: 'age',
                            id: 'educationConfirm',
                            emptyText: 'Education Details (READ ONLY)',
                            flex: 1,
                            readOnly: true,
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Caste',
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
                            name: 'caste',
                            id: 'casteConfirm',
                            emptyText: 'Caste (READ ONLY)',
                            flex: 1,
                            readOnly: true,
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Occuption',
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
                            name: 'occuption',
                            id: 'occuptionConfirm',
                            emptyText: 'Occupation (READ ONLY)',

                            readOnly: true,
                            flex: 1,
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'textfield',
                        id: 'blockConfirm',
                        fieldLabel: 'Block/House/Door Number',
                        labelAlign: 'right',
                        emptyText: 'Block/House/Door Number (READ ONLY)',

                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'stretConfirm',
                        fieldLabel: 'Street/Area/Locality/Mohala/Road',
                        labelAlign: 'right',
                        emptyText: 'Street/Area/Locality/Mohala/Road (READ ONLY)',

                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'townConfirm',
                        fieldLabel: 'Town/Village/City',
                        labelAlign: 'right',
                        emptyText: 'Town/Village/City (READ ONLY)',

                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'postOfficeConfirm',
                        fieldLabel: 'Post Office',
                        labelAlign: 'right',
                        emptyText: 'Post Office (READ ONLY)',

                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'pinConfirm',
                        fieldLabel: 'Pin Code',
                        labelAlign: 'right',
                        emptyText: 'Pin Code (READ ONLY)',

                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'tehsilConfirm',
                        fieldLabel: 'Tehsil/Taluka/Mandal/Thana',
                        labelAlign: 'right',
                        emptyText: 'Tehsil/Taluka/Mandal/Thana (READ ONLY)',

                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'District',
                        id: 'districtConfirm',
                        emptyText: 'District (READ ONLY)',

                        readOnly: true,
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        hideTrigger: true,
                        anchor: '95%'
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Contact via phone',
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
                            name: 'phone',
                            id: 'phoneConfirm',
                            emptyText: 'Yes/No (READ ONLY)',
                            flex: 1,
                            readOnly: true,
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Contact Number',
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
                            name: 'primaryContact',
                            emptyText: 'Primary Contact',
                            id: 'patientPrimaryContactNumberConfirm',

                            readOnly: true,
                            flex: 1,
                            allowBlank: false
                        }, {
                            name: 'lastName',
                            emptyText: 'Secondary Contact',
                            id: 'patientSecondaryContactNumberConfirm',

                            readOnly: true,
                            flex: 1,
                            margins: '0 0 0 6',
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'button',
                        margin: '10 50 0 270',
                        width: 120,
                        text: 'Submit and Confirm',
                        handler: function () {
                            var l = Ext.getCmp('mainregarea').getLayout();
                            l.setActiveItem(4); //going to bmi page
                        }
                    }, {
                        xtype: 'button',
                        margin: '10 0 0 0',
                        width: 60,
                        text: 'Cancel',
                        handler: function () {
                            var l = Ext.getCmp('mainregarea').getLayout();
                            l.setActiveItem(0); //going to home page
                        }
                    }]
                }]
            }]
        };
        this.callParent();
    }
});
