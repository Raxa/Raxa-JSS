Ext.define('Registration.view.SearchPatientScreen', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.searchPatientScreen',
    autoScroll : true,
    border: 0,
    padding: 10,
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
                    title: 'Returning Patient Registration Page',
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
                            id: 'oldPatientIdentifierSearchedPatient',
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
                            id: 'patientNameSearchedPatient',
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
                            name: 'relativeNameSearchedPatient',
                            id: 'relativeNameSearchedPatient',
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
                            id: 'ageSearchedPatient',
                            emptyText: 'Age (READ ONLY)',
                            flex: 1,
                            readOnly: true,
                            allowBlank: false
                        }]
                    },   {
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
                            id: 'sexSearchedPatient',
                            emptyText: 'Sex (READ ONLY)',
                            flex: 1,
                            readOnly: true,
                            allowBlank: false
                        }]
                     },  {
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
                            id: 'educationSearchedPatient',
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
                            id: 'casteSearchedPatient',
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
                            id: 'occuptionSearchedPatient',
                            emptyText: 'Occupation (READ ONLY)',

                            readOnly: true,
                            flex: 1,
                            allowBlank: false
                        }]
                    },    {
                        xtype: 'text',
                        id: 'blockSearchedPatient',
                        fieldLabel: 'Block/House/Door Number',
                        labelAlign: 'right',
                        emptyText: 'Block/House/Door Number (READ ONLY)',

                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'stretSearchedPatient',
                        fieldLabel: 'Street/Area/Locality/Mohala/Road',
                        labelAlign: 'right',
                        emptyText: 'Street/Area/Locality/Mohala/Road (READ ONLY)',

                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'townSearchedPatient',
                        fieldLabel: 'Town/Village/City',
                        labelAlign: 'right',
                        emptyText: 'Town/Village/City (READ ONLY)',

                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'postOfficeSearchedPatient',
                        fieldLabel: 'Post Office',
                        labelAlign: 'right',
                        emptyText: 'Post Office (READ ONLY)',

                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'pinSearchedPatient',
                        fieldLabel: 'Pin Code',
                        labelAlign: 'right',
                        emptyText: 'Pin Code (READ ONLY)',

                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'tehsilSearchedPatient',
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
                        id: 'districtSearchedPatient',
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
                            name: 'occuption',
                            id: 'phoneSearchedPatient',
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
                            id: 'patientPrimaryContactNumberSearchedPatient',

                            readOnly: true,
                            flex: 1,
                            allowBlank: false
                        }, {
                            name: 'lastName',
                            emptyText: 'Secondary Contact',
                            id: 'patientSecondaryContactNumberSearchedPatient',

                            readOnly: true,
                            flex: 1,
                            margins: '0 0 0 6',
                            allowBlank: false
                        }]
                    },
                    {
                        xtype: 'button',
                        margin: '10 10 0 200',
                        width: 120,
                        text: 'Cancel Search',
                        handler: function () {
                            var l = Ext.getCmp('mainregarea').getLayout();
                            l.setActiveItem(0); //going to home page
                        }
                    },
                     {
                        xtype: 'button',
                        margin: '10 0 0 0',
                        width: 160,
                        text: 'Return to search results',
                        handler: function () {
                            var l = Ext.getCmp('mainregarea').getLayout();
                            l.setActiveItem(5); //going result page
                        }
                    },
                    {
                        xtype: 'button',
                        margin: '10 0 0 10',
                        width: 160,
                        text: 'Continue to submit BMI'
                    }, ]
                }]
            }]
        };
        this.callParent();
    }
});
