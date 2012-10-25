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
                    style: {
                        bodyStyle: 'border-right:none;border-right:none;border-bottom:none;border-left:none;'
                    },
                    padding: 5,
                    title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.title'),
                    fieldDefaults: {
                        msgTarget: 'side'
                    },

                    layout: {
                        type: 'hbox'
                    },

                    items: [{
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
                                allowBlank: false,
                                layout: 'hbox',
                                width: 172,
		                        typeAhead: true,
		                        minChars: 1,
		                        queryMode: 'local',
                                store: new Ext.data.SimpleStore({
                                    fields: ['centre'],
                                    data: [
                                        [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Centre.1')],
                                        [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Centre.2')],
                                        [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Centre.3')],
                                        [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Centre.4')], ]
                                }),
                                displayField: 'centre'
                            }]
                        }, {
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
                                width: 172,
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.OPI.emptytext'),
                                allowBlank: true

                            }]
                        }, {
                            xtype: 'fieldcontainer',
                            html:'1,2',
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
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.FN.emptytext'),
                                width: 172,
                                allowBlank: false,
                                listeners: {
                                    'blur': function () {
                                        autoTextFormat(this);
                                    }
                                }
                            }, {
                                xtype: 'textfield',
                                name: 'lastName',
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.LN.emptytext'),
                                id: 'patientLastName',
                                width: 172,
                                margins: '0 0 0 6',
                                allowBlank: false,
                                listeners: {
                                    'blur': function () {
                                        autoTextFormat(this);
                                    }
                                }
                            }]
                        }, {
                            xtype: 'fieldcontainer',
                            fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.PFNHindi'),
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
                                id: 'patientFirstNameHindi',
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.FNHindi.emptytext'),
                                width: 172,
                                allowBlank: true,
                                listeners: {
                                    'blur': function () {
                                        autoTextFormat(this);
                                    }
                                }
                            }, {
                                xtype: 'textfield',
                                name: 'lastNameHindi',
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.LNHindi.emptytext'),
                                id: 'patientLastNameHindi',
                                width: 172,
                                margins: '0 0 0 6',
                                allowBlank: true,
                                listeners: {
                                    'blur': function () {
                                        autoTextFormat(this);
                                    }
                                }
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
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.FN.emptytext'),
                                id: 'relativeFirstName',
                                width: 172,
                                allowBlank: true,
                                listeners: {
                                    'blur': function () {
                                        autoTextFormat(this);
                                    }
                                }
                            }, {
                                xtype: 'textfield',
                                name: 'lastName',
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.LN.emptytext'),
                                id: 'relativeLastName',
                                width: 172,
                                margins: '0 0 0 6',
                                allowBlank: true,
                                listeners: {
                                    'blur': function () {
                                        autoTextFormat(this);
                                    }
                                }
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
                                name: 'Age',
                                xtype: 'numberfield',
                                id: 'patientAge',
                                minValue: 0,
                                maxValue: MAX_AGE_OF_PATIENT,
                                hideTrigger: true,
                                width: 40,
                                maxLength: 3,
                                enforceMaxLength: true,
                                emptyText: 'Years',
                                allowBlank: false,
                                allowDecimals: false
                            }]
                        }, {
                            xtype: 'fieldcontainer',
                            fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.DOB'),
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
                                xtype: 'dobdatefield',
                                fieldLabel: 'DOB',
                                id: 'dob',
                                format: 'd/m/Y',
                                emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.DOB.emptytext'),
                                labelAlign: 'right',
                                labelPad: 20,
                                labelWidth: 150,
                                anchor: '75%',
                                width: 110,
                                allowBlank: false
                            }]
                        }, {
                            xtype: 'combo',
                            fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Gender'),
                            id: 'sexComboBox',
                            labelAlign: 'right',
                            labelPad: 20,
                            labelWidth: 200,
                            allowBlank: true,
                            store: new Ext.data.SimpleStore({
                                fields: ['gender'],
                                data: [
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Gender.Male')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Gender.Female')],
                                    [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Gender.Other')]
                                ]
                            }),
                            displayField: 'gender'
                        }]
                    }, {
                        xtype: 'panel',
                        ui: 'raxa-panel',
                        margin: 5,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [{
                            html: "<img border=\"0\" src=\"../resources/img/camera.png\" alt=\"Patient Image\" width=\"100\" height=\"82\" />"
                        }, {
                            xtype: 'button',
                            width: 80,
                            text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.TakePhoto'),
                            action: 'takePhoto'
                        }]
                    }]
                }]
            }, {
                xtype: 'container',
                border: 0,
                bodyPadding: 0,
                items: [{
                    xtype: 'fieldset',
                    style: {
                        bodyStyle: 'border-right:none;border-right:none;border-bottom:none;border-left:none;'
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
                        width: 573,
                        listeners: {
                            'blur': function () {
                                autoTextFormat(this);
                            }
                        }
                    }, {
                        xtype: 'textfield',
                        id: 'residentialArea',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.ResidentialArea'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.ResidentialArea'),
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
                        width: 573,
                        hidden: true,   // Hiding to preserve logic, while JSS decides for sure if they want this field
                        allowBlank: true,
                        listeners: {
                            'blur': function () {
                                autoTextFormat(this);
                            }
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Tehsil'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Tehsil'),
                        id: 'tehsil',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
                        width: 573,
                        listeners: {
                            'blur': function () {
                                autoTextFormat(this);
                            }
                        }
                    }, {
                        xtype: 'combo',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.District'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.District'),
                        id: 'district',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
                        hideTrigger: true,
                        width: 573,
                        typeAhead: true,
                        minChars: 2,
                        queryMode: 'local',
                        store: Ext.create('Registration.store.autoCompleteAddress'),
                        displayField: 'district',
                        listeners: {
                            //Sets corresponding state for selected district
                            scope: this,
                            'select': function() {
                                Ext.getCmp('state').setValue(Ext.getCmp('district').lastSelection[0].data.state);
                            },
                            'change': function() {
                                Ext.getCmp('state').setValue('');
                            }
                        }
                    },{
                        xtype: 'combo',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.State'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.State'),
                        id: 'state',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 200,
                        hideTrigger: true,
                        width: 573,
                        typeAhead: true,
                        minChars: 1,
                        queryMode: 'local',
                        store: new Ext.data.SimpleStore({
                            fields: ['stateid','stateName'],
                            data: [
									[1,'Andhra Pradesh'],
									[2,'Arunachal Pradesh'],
									[3,'Assam'],
									[4,'Bihar'],
									[5,'Chhattisgarh'],
									[6,'Goa'],
									[7,'Gujarat'],
									[8,'Haryana'],
									[9,'Himachal Pradesh'],
									[10,'Jammu and Kashmir'],
									[11,'Jharkhand'],
									[12,'Karnataka'],
									[13,'Kerala'],
									[14,'Madhya Pradesh'],
									[15,'Maharashtra'],
									[16,'Manipur'],
									[17,'Meghalaya'],
									[18,'Mizoram'],
									[19,'Nagaland'],
									[20,'Orissa'],
									[21,'Punjab'],
									[22,'Rajasthan'],
									[23,'Sikkim'],
									[24,'Tamil Nadu'],
									[25,'Tripura'],
									[26,'Uttar Pradesh'],
									[27,'Uttarakhand'],
									[28,'West Bengal'],
									['A','Andaman and Nicobar'],
									['B','Chandigarh'],
									['C','Dadra and Nagar Haveli'],
									['D','Daman and Diu'],
									['E','Lakshadweep'],
									['F','Delhi'],
									['G','Pondicherry']
                            ]
                        }),
                        displayField: 'stateName'
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
                            width: 172,
                            allowBlank: true,
                            listeners: {
                                'blur': function () {
                                    UtilExtJs.validatePhoneNumber('patientPrimaryContact');
                                }
                            }
                        }, {
                            name: 'lastName',
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.CNo.2'),
                            id: 'patientSecondaryContact',
                            width: 172,
                            margins: '0 0 0 9',
                            allowBlank: true,
                            listeners: {
                                'blur': function () {
                                    UtilExtJs.validatePhoneNumber('patientSecondaryContact');
                                }
                            }
                        }]
                    }]
                }]
            }, {
                xtype: 'container',
                border: 0,
                bodyPadding: 0,
                items: [{
                    xtype: 'fieldset',
                    style: {
                        bodyStyle: 'border-right:none;border-right:none;border-bottom:none;border-left:none;'
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
                            typeAhead: true,
                            minChars: 1,
                            queryMode: 'local',
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
                            typeAhead: true,
                            minChars: 1,
                            queryMode: 'local',
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
                            typeAhead: true,
                            minChars: 1,
                            queryMode: 'local',
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
                    // TODO: https://raxaemr.atlassian.net/browse/RAXAJSS-613
                    //     xtype: 'fieldcontainer',
                    //     fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Religion'),
                    //     layout: 'hbox',
                    //     combineErrors: true,
                    //     defaultType: 'textfield',
                    //     labelAlign: 'right',
                    //     labelPad: 20,
                    //     labelWidth: 200,
                    //     anchor: '95%',
                    //     defaults: {
                    //         hideLabel: 'true'
                    //     },
                    //     items: [{
                    //         xtype: 'combo',
                    //         name: 'religion',
                    //         id: 'religion',
                    //         layout: 'hbox',
                    //         width: 172,
                    //         typeAhead: true,
                    //         minChars: 1,
                    //         queryMode: 'local',
                    //         store: new Ext.data.SimpleStore({
                    //             fields: ['religion'],
                    //             data: [
                    //                 [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Religion.1')],
                    //                 [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Religion.2')],
                    //                 [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Religion.3')],
                    //                 [Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp1.Religion.4')]
                    //             ]
                    //         }),
                    //         displayField: 'religion'

                    //     }]
                    // }, {
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
                            action: 'cancel'
                        }, {
                            xtype: 'button',
                            margin: '30 0 0 30',
                            width: 60,
                            id: 'continuebutton',
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
