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
 * This script defines the view RegistrationConfirm of the registration module
 */
Ext.define('Registration.view.RegistrationConfirm', {
    extend: 'Ext.container.Container',
    alias: 'widget.registrationconfirm',
    border: 0,
    padding: 50,
    autoScroll: true,
    layout: {
        type: 'hbox',
        pack: 'center'
    },
    initComponent: function () {
        this.items = {
            xtype: 'panel',
            ui: 'raxa-panel',
            width: 800,
            padding: 20,
            items: [{
                xtype: 'container',
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
                            emptyText: 'Old Patient Identifier as filled in form (READ ONLY)'
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
                            readOnly: true
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
                            readOnly: true
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
                            readOnly: true
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
                            readOnly: true
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
                            readOnly: true
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
                            readOnly: true
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
                            id: 'occupationConfirm',
                            emptyText: 'Occupation (READ ONLY)',
 
                            readOnly: true,
                            flex: 1
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
                        xtype: 'textfield',
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
                            readOnly: true
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
                            flex: 1
                        }, {
                            name: 'lastName',
                            emptyText: 'Secondary Contact',
                            id: 'patientSecondaryContactNumberConfirm',
 
                            readOnly: true,
                            flex: 1,
                            margins: '0 0 0 6'
                        }]
                    }]
                },{
                    xtype: 'fieldset',
                    padding: 10,
                    title: 'New Registration',
                    items:[{
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Registration Fees',
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
                            xtype: 'numberfield',
                            fieldLabel: 'Registration Fees Paid',
                            id: 'registrationfeespaid',
                            emptyText: 'Registration fees',
                            defaultValue: 0,
                            labelPad: 20,
                            labelWidth: 70,
                            labelAlign: 'right',
                            anchor: '95%',
                            margin: '0 10 0 0',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            nanText: 'Invalid Input'
                        }]  
                    }]
                },{
                    xtype: 'fieldset',
                    padding: 10,
                    border: false,
                    items:[{
                        xtype: 'button',
                        margin: '10 50 0 270',
                        width: 120,
                        text: 'Submit and Confirm',
                        action: 'submit'
                    }, {
                        xtype: 'button',
                        margin: '10 0 0 0',
                        width: 60,
                        text: 'Cancel',
                        action: 'cancel'
                    }]  
                    
                }]
            }]
        };
        this.callParent();
    }
});