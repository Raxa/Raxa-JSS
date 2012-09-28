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
    extend: 'Ext.container.Container',
    alias: 'widget.registrationpart1',
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
                bodyPadding: 0,
		    
                items: [{
                    xtype: 'fieldset',
                    //first element in bodyStyle is not working, passing it twice
                    style:{
                        bodyStyle:'border-right:none;border-right:none;border-bottom:none;border-left:none;'
                    },
                    padding: 5,
                    title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.title'),
                    fieldDefaults: {
                        msgTarget: 'side'
                    },
                    	
                    layout: {	  	
                        type: 'hbox'
                    },

                    items: [
						{
                        xtype: 'container',
                        items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Centre Id',
                        layout: 'hbox',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true',
                            value: 'GAN'
                        },
                        items: [{
                            xtype: 'combo',
                            name: 'Centre ID',
                            label: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Centre'),
                            id: 'centreId',
                            layout: 'hbox',
                            width: 172,
                            store: new Ext.data.SimpleStore({
                                fields: ['centre'],
                                data: [
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Centre.1')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Centre.2')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Centre.3')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Centre.4')],
                                ]
                            }),
                            displayField: 'centre'
                        }]
                    },{
                            xtype: 'fieldcontainer',	  	
                            fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.OPRN'),	  	
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
                                xtype: 'textfield',
                                cls: 'raxa-form-panel',    
                                name: 'Old Patient Identifier',
                                id: 'oldPatientIdentifier',
                                fieldLabel: 'Old Patient Identifier',
                                width: 353,
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
                            labelWidth: 200,
                            anchor: '95%',
                            defaults: {
                                hideLabel: 'true'
                            },
                            items: [{
                                xtype: 'textfield',
                                cls: 'raxa-form-panel',    
                                name: 'firstName',
                                id: 'patientFirstName',
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.PFN.emptytext'),
                                width: 172,
                                allowBlank: false
                            }, {
                                xtype: 'textfield',                            
                                name: 'lastName',
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.PLN.emptytext'),
                                id: 'patientLastName',
                                width: 172,
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
                            labelWidth: 200,
                            anchor: '95%',
                            defaults: {
                                hideLabel: 'true'
                            },
                            items: [{
                                xtype: 'textfield',                            
                                name: 'firstName',
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.FHFN.emptytext'),
                                id: 'relativeFirstName',
                                width:172,

                                allowBlank: true
                            }, {
                                xtype: 'textfield',                            
                                name: 'lastName',
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.FHLN.emptytext'),
                                id: 'relativeLastName',
                                width:172,
                                margins: '0 0 0 6',

                                allowBlank: true
                            }]
                        }, {
                            xtype: 'fieldcontainer',
                            fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Age'),
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
                                format: 'd/m/Y',
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Age.emptytext1'),
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
                                width: 172,
                                margins: '0 0 0 6',
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Age.emptytext2'),
                                allowBlank: false,
                                allowDecimals: false
                            },

                            ]
                        }, {
                            xtype: 'radiogroup',
                            fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Gender'),
                            id: 'sexRadioGroup',
                            labelAlign: 'right',
                            labelPad: 20,
                            labelWidth: 200,
                            width: 570,
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
                        }]
                    },{
                        xtype: 'panel',
                        ui: 'raxa-panel',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items:[{
                            html: "<img border=\"0\" src=\"/Raxa-JSS/src/resources/img/camera.png\" alt=\"Patient Image\" width=\"100\" height=\"82\" />"
                        },{
                            xtype: 'button',
                            ui: 'raxa-aqua-small',
                            xtype: 'button',
                            width: 80,
                            text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.TakePhoto'),
                            action: 'takePhoto'                            
                        }]
                    }]
                }]
            },{
                xtype: 'container',
                border: 0,
                bodyPadding: 0,
                items: [{
                    xtype: 'fieldset',
                    style:{
                        bodyStyle:'border-right:none;border-right:none;border-bottom:none;border-left:none;'
                    },
                    padding: 5,
                    title: 'Address and Contact Details',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Street'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Street'),
                        labelAlign: 'right',
                        id: 'street',
                        labelPad: 20,
                        labelWidth: 200,
                        allowBlank: true,
                        width: 573
                    }, {
                        xtype: 'textfield',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Town'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Town'),
                        labelAlign: 'right',
                        labelPad: 20,
                        allowBlank: true,
                        id: 'town',
                        labelWidth: 200,
                        width: 573
                    }, {
                        xtype: 'textfield',
                        id: 'residentialArea',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.ResidentialArea'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.ResidentialArea'),
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
                        width: 573,
                        allowBlank: true,
                    //anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Tehsil'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Tehsil'),
                        id: 'tehsil',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
                        width: 573
                    }, {
                        xtype: 'textfield',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.District'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.District'),
                        id: 'district',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
                        hideTrigger: true,
                        width: 573
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.CNo'),
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
                            name: 'primaryContact',
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.CNo.1'),
                            id: 'patientPrimaryContact',
                            width:172,
                            allowBlank: true
                        }, {
                            name: 'lastName',
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.CNo.2'),
                            id: 'patientSecondaryContact',
                            width:172,
                            margins: '0 0 0 6',
                            allowBlank: true
                        }]
                    }]
                }]
            },{
                xtype: 'container',
                border: 0,
                bodyPadding: 0,
                items: [{
                    xtype: 'fieldset',
                    style:{
                        bodyStyle:'border-right:none;border-right:none;border-bottom:none;border-left:none;'
                    },
                    padding: 5,
                    title: 'Secondary Information',
                    items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.ED'),
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
                            fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.ED'),
                            id: 'education',
                            layout: 'hbox',
                            width: 172,
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
                    }, 
                        {
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
                            label: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Caste'),
                            id: 'caste',
                            layout: 'hbox',
                            width: 172,
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
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.1')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.2')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.3')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.4')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.5')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.6')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.7')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.8')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.9')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Occupation.10')]
                                ]
                            }),
                            displayField: 'occupation'
					
                        }]
                    }, {
                        xtype: 'container',
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
                            ui: 'raxa-orange-small',
                            action: 'cancel'
				    
                        }, {
                            xtype: 'button',
                            margin: '30 0 0 30',
                            width: 60,
                            id:'continuebutton',
                            text: 'Next',
                            ui: 'raxa-aqua-small',
                            action: 'continue'
                        }]
                    }]
                }]
            }]
        };
        this.callParent();
    }
});
	
