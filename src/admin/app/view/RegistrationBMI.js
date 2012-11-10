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
 * This script defines the view RegistrationBMI of the registration module
 */
Ext.define('Registration.view.RegistrationBMI', {
    extend: 'Ext.container.Container',
    alias: 'widget.registrationbmi',
    border: 0,
    padding: 10,
    autoScroll: true,
    layout: {
        type: 'hbox',
        pack: 'center'
    },
    initComponent: function () {
        localStorage.setItem('printtaken', false);
        this.items = {
            xtype: 'panel',
            ui: 'raxa-panel',
            width: 800,
            padding: 20,
            border: 0,
            items: [{
                xtype: 'container',
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Patient Identifier',
                    value: 'Patient ID comes here',
                    id: 'bmiPatientID',
                    readOnly: true
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Patient Name',
                    value: 'Patient Name comes here',
                    readOnly: true,
                    id: 'bmiPatientName',
                    padding: '0 0 40 0'
                },{
                    xtype: 'fieldset',
                    title: 'Enter Measures for Body Mass Index',
                    style:{
                        bodyStyle:'border-right:none;border-right:none;border-bottom:none;border-left:none;'
                    },
                    items: [{
                        xtype: 'container',
                        id: 'heightWeightID',
                        // ui: 'raxa-panel',
                        border: 0,
                        layout: {
                            align: 'stretch',
                            type: 'hbox'
                        },
                        items: [{
                            xtype: 'numberfield',
                            fieldLabel: 'Height (cm)',
                            id: 'heightIDcm',
                            emptyText: 'Enter Height in cm',
                            labelPad: 20,
                            labelWidth: 70,
                            labelAlign: 'right',
                            anchor: '95%',
                            minValue: 10,
                            maxValue: 228,
                            width: 172,
                            margin: '0 10 0 0',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            nanText: 'Invalid Input'
                        }, {
                            xtype: 'numberfield',
                            fieldLabel: 'Weight (kg)',
                            id: 'weightIDkg',
                            emptyText: 'Enter Weight in Kg',
                            labelPad: 20,
                            labelWidth: 95,
                            labelAlign: 'right',
                            minValue: 0,
                            maxValue: 250,
                            width: 200,
                            anchor: '95%',
                            margin: '0 10 0 0',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            nanText: 'Invalid Input',
                            padding: '20 0 40 0'
                        }]
                    }]
                },{
                    xtype: 'fieldset',
                    title: 'BMI',
                    style:{
                        bodyStyle:'border-right:none;border-right:none;border-bottom:none;border-left:none;'
                    },
                    items: [{
                        xtype: 'numberfield',
                        labelPad: 20,
                        fieldLabel: 'BMI',
                        emptyText: 'BMI Value',
                        id: 'bmiNumberfieldID',
                        readOnly: true,
                        width: 172,
                        minValue: 0,
                        maxValue: 100,
                        labelAlign: 'right',
                        labelWidth: 70,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        nanText: 'Invalid Input'
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'BMI Status',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'textfield',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 70,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: {
                            name: 'bmiStatus',
                            id: 'bmiStatusID',
                            fieldLabel: 'BMI Status',
                            readOnly: true,
                            width: 295,
                            emptyText: 'BMI Status Value',
                            allowBlank: true
                        }
                    }]
                },
                {
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
                        align: 'right',
                        action: 'printPatientCard',
                        id: 'printPatientCard',
                        text: 'Print Patient Card' // Does not post BMI, just launches a pop-up window
                    },{
                        xtype: 'button',
                        margin: '30 0 0 30',
                        align: 'right',
                        // ui: 'raxa-aqua-small',
                        action: 'bmiSubmit',
                        id: 'submitBMI',
                        text: 'Submit' //Going Back to Home Page - BMI to be Posted Here
                    }]
                }]
            }]
        };
        this.callParent();
    }
});
