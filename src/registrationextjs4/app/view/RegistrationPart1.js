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
                    title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.title'),
                    fieldDefaults: {
                        msgTarget: 'side'
                    },
                    items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.OPRN'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.OPI.emptytext'),
                            allowBlank: true

                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.PN'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.PFN.emptytext'),
                            flex: 1,
                            allowBlank: false
                        }, {
                            name: 'lastName',
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.PLN.emptytext'),
                            id: 'patientLastName',
                            flex: 1,
                            margins: '0 0 0 6',
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.FHN'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.FHFN.emptytext'),
                            id: 'relativeFirstName',
                            flex: 1,

                            allowBlank: false
                        }, {
                            name: 'lastName',
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.FHLN.emptytext'),
                            id: 'relativeLastName',
                            flex: 1,
                            margins: '0 0 0 6',

                            allowBlank: false
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Age'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Age.emptytext1'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Age.emptytext2'),
                            allowBlank: false
                        },

                        ]
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Gender'),
                        id: 'sexRadioGroup',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        allowBlank: false,
                        items: [{
                            xtype: 'radiofield',
                            name: 'sex',
                            boxLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Gender.Male'),
                            checked: true
                        }, {
                            xtype: 'radiofield',
                            name: 'sex',
                            boxLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Gender.Female'),
                        }, {
                            xtype: 'radiofield',
                            name: 'sex',
                            boxLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Gender.Other'),
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.ED'),
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
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.ED.1')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.ED.2')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.ED.3')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.ED.4')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.ED.5')]
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
                            label: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Caste'),
                            id: 'caste',
                            layout: 'hbox',
                            store: new Ext.data.SimpleStore({
                                fields: ['caste'],
                                data: [
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Caste.1')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Caste.2')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Caste.3')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Caste.4')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Caste.5')]
                                ]
                            }),
                            displayField: 'caste'
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation'),
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
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.1')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.2')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.3')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.4')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.5')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.6')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.7')]
                                ]
                            }),
                            displayField: 'occupation'


                        }]
                    }, {
                        xtype: 'button',
                        margin: '10 50 0 270',
                        width: 60,
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Next'),
                        action: 'next'
                    }, {
                        xtype: 'button',
                        margin: '10 0 0 0',
                        width: 60,
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Reset'),
                        action: 'reset'
                    }]
                }]
            }]
        };
        this.callParent();
    }
});