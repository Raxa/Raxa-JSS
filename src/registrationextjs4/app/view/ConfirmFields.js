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
Ext.define('Registration.view.ConfirmFields', {
    extend: 'Ext.container.Container',
    alias: 'widget.confirmfields',
    config: {
        //items: [{
                //ui: 'raxa-panel',
                //xtype: 'panel',
                //width: 800,
                //padding: 20,
                items: [{
                        xtype: 'container',
                        border: 0,
                        bodyPadding: 10,
                        items: [{
                                //Title
                                xtype: 'fieldset',
                                padding: 10,
                                title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.title1'),

                    // Fields
                    items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.OPRN'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            name: 'Old Patient Identifier',
                            id: 'oldPatientIdentifierConfirm',
                        }]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.PN'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
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
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.FHN'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
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
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Age'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
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
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Gender'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
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
                        }]
                    }, {
                        xtype: 'fieldcontainer',
						fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Street'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                        id: 'stretConfirm',
                    }]},{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Town'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                        id: 'townConfirm'
                    }]},{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.ResidentialArea'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                        id: 'residentialAreaConfirm',
                    }]},{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Tehsil'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                        id: 'tehsilConfirm',
                    }]},{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.District'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                        id: 'districtConfirm',
                    }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.CN'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{                        
                            name: 'primaryContact',
                            id: 'patientPrimaryContactNumberConfirm',
                        }, {
                            name: 'secondaryContact',
                            id: 'patientSecondaryContactNumberConfirm',
                            margin: '0 0 0 10'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.ED'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            name: 'education',
                            id: 'educationConfirm',
                        }]
                    }, 
                       // Current registration system (used by JSS) has caste field in the form
                        {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Caste'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
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
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rc.Occupation'),
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'text',
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
                        }]
                    }]
                //},
                //// Navigation Buttons
                //{
                    //xtype: 'fieldset',
                    //padding: 10,
                    //border: false,
                    //items:[{
                        //xtype: 'button',
                        //margin: '30 0 0 400',
                        //text: 'Back',
                        //action: 'back'
                    //}, {
                        //xtype: 'button',
				        //id:'submitButton',
                        //margin: '30 0 0 30',
                        //text: 'Next',
                        //ui: 'raxa-aqua-small',
                        //action: 'submit'
                    //}]  
                    
                }]
        }]
    //}]
    }
});
