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
 * This script defines the view SearchPart1 of the registration module
 */
Ext.define('Registration.view.SearchPart1', {
    extend: 'Ext.container.Container',
    alias: 'widget.searchpart1',
    border: 0,
    padding: 10,
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
                    title: 'Search Registered Patients',
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
                        labelWidth: 180,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            name: 'Old Patient Identifier',
                            id: 'OldPatientIdentifierSearch',
                            fieldLabel: 'Old Patient Identifier',
                            width: 303,
                            emptyText: 'Old Patient Identifier',
                            allowBlank: true
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Patient Registration Number',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'textfield',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 180,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            name: 'Patient Identifier',
                            id: 'PatientIdentifierSearch',
                            fieldLabel: 'Patient Identifier',
                            width: 303,
                            emptyText: 'Patient Identifier',
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Patient Name',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'textfield',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 180,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            name: 'firstName',
                            emptyText: 'Patient\'s First Name',
                            id: 'patientFirstNameSearch',
                            width: 147,
                            allowBlank: false
                        }, {
                            name: 'lastName',
                            emptyText: 'Patient\'s Last Name',
                            id: 'patientLastNameSearch',
                            width: 147,
                            margins: '0 0 0 6'
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Father/Husband\'s name',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'textfield',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 180,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            name: 'firstName',
                            emptyText: 'First Name',
                            id: 'relativeFirstNameSearch',
                            width: 147
                        }, {
                            name: 'lastName',
                            emptyText: 'Last Name',
                            id: 'relativeLastSearch',
                            width: 147,
                            margins: '0 0 0 6'
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Date of Birth',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'textfield',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 180,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            xtype: 'datefield',
                            fieldLabel: 'DOB',
                            id: 'DOBSearch',
                            emptyText: 'MM/DD/YYYY',
                            labelAlign: 'right',
                            labelPad: 20,
                            labelWidth: 180,
                            anchor: '75%',
                            allowBlank: true
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Town/Village/City',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'textfield',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 180,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            xtype: 'textfield',
                            name: 'townSearch',
                            fieldLabel: 'Town/Village/City',
                            emptyText: 'Town/Village/City',
                            id: 'Town/Village/CitySearch',
                            labelAlign: 'right',
                            labelPad: 20,
                            labelWidth: 180,
                            width: 147,
                            anchor: '75%',
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Phone Number',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'textfield',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 180,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            xtype: 'textfield',
                            name: 'phoneNumberSearch',
                            id: 'phoneNumberSearch',
                            fieldLabel: 'Phone Number',
                            emptyText: 'Phone Number',
                            vtype: 'phone',
                            labelAlign: 'right',
                            labelPad: 20,
                            labelWidth: 180,
                            width: 147,
                            anchor: '75%'
                        }]
                    }, {
                        xtype: 'button',
                        margin: '10 50 0 270',
                        width: 60,
                        text: 'Search',
                        action: 'search'
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