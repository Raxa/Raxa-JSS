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
                    title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.title1'),
                    items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.OPRN'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.OPRN.emptytext'),
                        }]
                    },
 
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.PN'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.PN.emptytext'),
                            flex: 1,
                            readOnly: true
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.FHN'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.FHN.emptytext'),
                            flex: 1,
                            readOnly: true
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Age'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Age.emptytext'),
                            flex: 1,
                            readOnly: true
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Gender'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Gender.emptytext'),
                            flex: 1,
                            readOnly: true
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.ED'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.ED.emptytext'),
                            flex: 1,
                            readOnly: true
                        }]
                    }, /* TODO: add back in caste
                       // Current registration system (used by JSS) has caste field in the form
                        {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Caste'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Caste.emptytext'),
                            flex: 1,
                            readOnly: true
                        }]
                    }, */{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Occupation'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Occupation.emptytext'),
 
                            readOnly: true,
                            flex: 1
                        }]
                    }, {
                        xtype: 'textfield',
                        id: 'blockConfirm',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Block'),
                        labelAlign: 'right',
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Block.emptytext'),
 
                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'stretConfirm',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Street'),
                        labelAlign: 'right',
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Street.emptytext'),
 
                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'townConfirm',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Town'),
                        labelAlign: 'right',
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Town.emptytext'),
 
                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'tehsilConfirm',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Tehsil'),
                        labelAlign: 'right',
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Tehsil.emptytext'),
 
                        readOnly: true,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.District'),
                        id: 'districtConfirm',
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.District.emptytext'),
 
                        readOnly: true,
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        hideTrigger: true,
                        anchor: '95%'
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.CM'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.CM.emptytext'),
                            flex: 1,
                            readOnly: true
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.CN'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.CN.emptytext1'),
                            id: 'patientPrimaryContactNumberConfirm',
 
                            readOnly: true,
                            flex: 1
                        }, {
                            name: 'lastName',
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.CN.emptytext2'),
                            id: 'patientSecondaryContactNumberConfirm',
 
                            readOnly: true,
                            flex: 1,
                            margins: '0 0 0 6'
                        }]
                    }]
                },{
                    xtype: 'fieldset',
                    padding: 10,
                    title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.title2'),
                    items:[{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.RF'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.RF'),
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
				id:'submitbutton',
                        margin: '10 50 0 270',
                        width: 130,
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.SC'),
                        ui: 'raxa-aqua-small',
                        action: 'submit'
                    }, {
                        xtype: 'button',
                        margin: '10 0 0 0',
                        width: 60,
                        ui: 'raxa-orange-small',
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Cancel'),
                        action: 'cancel'
                    }]  
                    
                }]
            }]
        };
        this.callParent();
 
    }
});