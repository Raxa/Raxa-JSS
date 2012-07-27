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
    padding: 50,
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
                bodyPadding: 0,
                items: [{
                    xtype: 'fieldset',
                    //first element in bodyStyle is not working, passing it twice
                    style:{bodyStyle:'border-right:none;border-right:none;border-bottom:none;border-left:none;'},
                    padding: 5,
                    title: 'Primary Information',
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
                        labelWidth: 200,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            xtype: 'numberfield',
                            name: 'Old Patient Identifier',
                            id: 'oldPatientIdentifier',
                            fieldLabel: 'Old Patient Identifier',
                            width: 353,
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
                        labelWidth: 200,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            name: 'firstName',
                            id: 'patientFirstName',
                            emptyText: 'Patient\'s First Name',
                            width:172,
                            allowBlank: false
                        }, {
                            name: 'lastName',
                            emptyText: 'Patient\'s Last Name',
                            id: 'patientLastName',
                            width: 172,
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
                        labelWidth: 200,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            name: 'firstName',
                            emptyText: 'Father/Husband\'sFirst Name',
                            id: 'relativeFirstName',
                            width:172,

                            allowBlank: false
                        }, {
                            name: 'lastName',
                            emptyText: 'Last Name',
                            id: 'relativeLastName',
                            width:172,
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
                        labelWidth: 200,
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
                            labelWidth: 200,
                            anchor: '75%',
                            width:172,
                            allowBlank: false
                        }, {
                            name: 'Age',
                            xtype: 'numberfield',
                            fieldLabel: 'Current Patient Age',
                            id: 'patientAge',
                            width:172,
                            margins: '0 0 0 6',
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
                        labelWidth: 200,
                        width: 570,
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
                    }]
                }]
            },{
                xtype: 'panel',
                border: 0,
                bodyPadding: 0,
                items: [{
                    xtype: 'fieldset',
                    style:{bodyStyle:'border-right:none;border-right:none;border-bottom:none;border-left:none;'},
                    padding: 5,
                    title: 'Address and Contact Details',
                    items: [{
                        xtype: 'textfield',
                        id: 'block',
                        fieldLabel: 'Block/House/Door Number',
                        emptyText: 'Block/House/Door Number',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
                        width: 573,
                        allowBlank: false,
                        //anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Street/Area/Locality/Mohala/Road',
                        emptyText: 'Street/Area/Locality/Mohala/Road',
                        labelAlign: 'right',
                        id: 'street',
                        labelPad: 20,
                        labelWidth: 200,
                        allowBlank: false,
                        width: 573
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Town/Village/City',
                        emptyText: 'Town/Village/City',
                        labelAlign: 'right',
                        labelPad: 20,
                        allowBlank: false,
                        id: 'town',
                        labelWidth: 200,
                        width: 573
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Tehsil/Taluka/Mandal/Thana',
                        emptyText: 'Tehsil/Taluka/Mandal/Thana',
                        id: 'tehsil',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
                        width: 573
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'District',
                        emptyText: 'District',
                        id: 'district',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
                        hideTrigger: true,
                        width: 573
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: 'Contact me via phone',
                        id: 'phoneContactInformation',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
                        allowBlank: true,
                        width: 573,
                        items: [{
                            xtype: 'radiofield',
                            name: 'contact',
                            boxLabel: 'Yes'
                        }, {
                            xtype: 'radiofield',
                            name: 'contact',
                            boxLabel: 'No'
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Contact Number',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'numberfield',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            name: 'primaryContact',
                            emptyText: 'Primary Contact',
                            id: 'patientPrimaryContact',
                            width:172,
                            allowBlank: true
                        }, {
                            name: 'lastName',
                            emptyText: 'Secondary Contact',
                            id: 'patientSecondaryContact',
                            width:172,
                            margins: '0 0 0 6',
                            allowBlank: true
                        }]
                    }]
                }]
            },{
                xtype: 'panel',
                border: 0,
                bodyPadding: 0,
                items: [{
                    xtype: 'fieldset',
                    style:{bodyStyle:'border-right:none;border-right:none;border-bottom:none;border-left:none;'},
                    padding: 5,
                    title: 'Secondary Information',
                    items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Education Details',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'textfield',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
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
                            width: 172,
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
                        labelWidth: 200,
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
                            width: 172,
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
                        labelWidth: 200,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            xtype: 'combo',
                            name: 'occupation',
                            id: 'occupation',
                            layout: 'hbox',
                            width: 172,
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
                        xtype: 'panel',
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
                            text: 'Cancel',
                            action: 'cancel'
                        }, {
                            xtype: 'button',
                            margin: '30 0 0 30',
                            width: 60,
                            text: 'Next',
                            action: 'continue'
                        }]
                    }]
                }]
            }]
        };
        this.callParent();
    }
});