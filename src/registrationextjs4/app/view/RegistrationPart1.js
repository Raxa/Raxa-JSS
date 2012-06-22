/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 * 
 * This script defines the view RegistrationPart1 of the registration module
 */
Ext.define('Registration.view.RegistrationPart1', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.registrationpart1',
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
                    title: 'New Patient Registration (Patient Profile Info)',
                    fieldDefaults: {
                        msgTarget: 'side'
                    },
                    items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Old Patient Registration Number',
                        layout: 'hbox',
                        combineErrors: true,
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            xtype: 'numberfield',
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
                            id: 'dob',
                            emptyText: 'MM/DD/YYYY',
                            labelAlign: 'right',
                            labelPad: 20,
                            labelWidth: 250,
                            anchor: '75%',
                            allowBlank: false
                        }, {
                            name: 'Age',
                            xtype: 'numberfield',
                            fieldLabel: 'Current Patient Age',
                            id: 'patientAge',
                            flex: 1,
                            margins: '0 0 0 36',
                            emptyText: 'Patient\'s Current Age',
                            allowBlank: false
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
                            boxLabel: 'Male',
                            checked: true
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
                            xtype: 'combo',
                            name: 'education',
                            label: 'Education Details',
                            id: 'education',
                            layout: 'hbox',
                            store: new Ext.data.SimpleStore({
                                fields: ['education'],
                                data: [
                                    ['Uneducated'],
                                    ['5th Pass or Less'],
                                    ['6th - 9th Class'],
                                    ['10th and above'],
                                    ['Graduate and above']
                                ]
                            }),
                            displayField: 'education'
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
                            id: 'caste',
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
                        action: 'next'
                    }, {
                        xtype: 'button',
                        margin: '10 0 0 0',
                        width: 60,
                        text: 'Reset',
                        action: 'reset'
                    }]
                }]
            }]
        };
        this.callParent();
    }
});