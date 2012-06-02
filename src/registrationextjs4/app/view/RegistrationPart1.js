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
                    title: 'New Patient Registration (Patient Profile Info)',
                    fieldDefaults: {
                        msgTarget: 'side'
                    },
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
                            id: 'oldPatientIdentifier',
                            fieldLabel: 'Old Patient Identifier',
                            flex: 1,
                            emptyText: 'Old Patient Identifier',
                            allowBlank: true
                        }]
                    }, {
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
                            name: 'firstName',
                            id: 'patientFirstName',
                            emptyText: 'Patient\'s First Name',
                            flex: 1,
                            allowBlank: false
                        }, {
                            name: 'lastName',
                            emptyText: 'Patient\'s Last Name',
                            id: 'patientLastName',
                            flex: 1,
                            margins: '0 0 0 6',
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
                            name: 'firstName',
                            emptyText: 'Father/Husband\'sFirst Name',
                            id: 'relativeFirstName',
                            flex: 1,

                            allowBlank: false
                        }, {
                            name: 'lastName',
                            emptyText: 'Last Name',
                            id: 'relativeLastName',
                            flex: 1,
                            margins: '0 0 0 6',

                            allowBlank: false
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Age (Enter DOB or Current Age)',
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
                            xtype: 'datefield',
                            fieldLabel: 'DOB',
                            emptyText: 'MM/DD/YYYY',
                            labelAlign: 'right',
                            labelPad: 20,
                            labelWidth: 250,
                            anchor: '75%',
                            allowBlank: true
                        }, {
                            name: 'Age',
                            fieldLabel: 'Current Patient Age',
                            id: 'patientAge',
                            flex: 1,
                            margins: '0 0 0 36',
                            emptyText: 'Patient\'s Current Age',
                            allowBlank: true
                        },

                        ]
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: 'Sex',
                        id: 'sexRadioGroup',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
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
                        xtype: 'radiogroup',
                        fieldLabel: 'Education Details',
                        id: 'EducationRadioGroup',
                        layout: 'vbox',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        allowBlank: false,
                        items: [{
                            xtype: 'radiofield',
                            name: 'education',
                            boxLabel: 'Uneducated'
                        }, {
                            xtype: 'radiofield',
                            name: 'education',
                            boxLabel: '5th Pass or Less'
                        }, {
                            xtype: 'radiofield',
                            name: 'education',
                            boxLabel: '6th - 9th Class'
                        }, {
                            xtype: 'radiofield',
                            name: 'education',
                            boxLabel: '10th and below'
                        }, {
                            xtype: 'radiofield',
                            name: 'education',
                            boxLabel: 'Graduate and above'
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
                            xtype: 'combo',
                            name: 'caste',
                            label: 'Caste',
                            layout: 'hbox',
                            store: new Ext.data.SimpleStore({
                                fields: ['caste'],
                                data: [
                                    ['First'],
                                    ['Second'],
                                    ['Third'],
                                    ['Fourth'],
                                    ['Not Mentioned', 'Not Mentioned']
                                ]
                            }),
                            displayField: 'caste'
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Occupation',
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
                            xtype: 'combo',
                            name: 'occupation',
                            id: 'occupation',
                            layout: 'hbox',
                            store: new Ext.data.SimpleStore({
                                fields: ['occupation'],
                                data: [
                                    ['Unemployed'],
                                    ['Student'],
                                    ['Agriculture Related'],
                                    ['Bank Related'],
                                    ['Medical Related'],
                                    ['Engineering Related'],
                                    ['Not Mentioned']
                                ]
                            }),
                            displayField: 'occupation'


                        }]
                    }, {
                        xtype: 'button',
                        margin: '10 50 0 270',
                        width: 60,
                        text: 'Next',
                        handler: function () {
                            var l = Ext.getCmp('mainregarea').getLayout();
                            l.setActiveItem(2); //going to registration part-2 page
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
