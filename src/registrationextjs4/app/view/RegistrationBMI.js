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
    extend: 'Ext.panel.Panel',
    alias: 'widget.registrationbmi',
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
                    title: 'BMI Calculator',
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Patient Identifier',
//                      TODO: Patient Identifier Comes Here
                        value: 'Patient ID comes here',
                        id: 'bmiPatientID',
                        readOnly: true,
                        labelAlign: 'right'
                    }, {
                        xtype: 'label',
                        text: 'BMI Value'
                    }, {
                        xtype: 'form',
                        id: 'heightWeightID',
                        border: 0,
                        layout: {
                            align: 'stretch',
                            type: 'hbox'
                        },
                        bodyPadding: 10,
                        items: [{
                            xtype: 'numberfield',
                            fieldLabel: 'Height',
                            id: 'heightIDcm',
                            emptyText: 'Enter Height in cm',
                            labelPad: 20,
                            labelWidth: 70,
                            labelAlign: 'right',
                            anchor: '95%',
                            margin: '0 10 0 0',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            nanText: 'Invalid Input'
                        }, {
                            xtype: 'label',
                            text: 'cm'
                        }, {
                            xtype: 'numberfield',
                            fieldLabel: 'Weight',
                            id: 'weightIDkg',
                            emptyText: 'Enter Weight in Kg',
                            labelPad: 20,
                            labelWidth: 70,
                            labelAlign: 'right',
                            anchor: '95%',
                            margin: '0 10 0 0',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            nanText: 'Invalid Input'
                        }, {
                            xtype: 'label',
                            text: 'Kg'
                        }]
                    }, {
                        xtype: 'numberfield',
                        width: 140,
                        fieldLabel: 'BMI',
                        emptyText: 'BMI Value',
                        id: 'bmiNumberfieldID',
                        readOnly: true,
                        labelAlign: 'right',
                        labelWidth: 70,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        nanText: 'Invalid Input'
                    }, {
                        xtype: 'fieldcontainer',
                        maintainFlex: true,
                        layout: {
                            pack: 'center',
                            type: 'hbox'
                        },
                        items: [{
                            xtype: 'label',
                            text: 'BMI Chart'
                        }]
                    }, {
                        xtype: 'panel',
                        height: 40,
                        border: 0,
                        layout: {
                            align: 'stretch',
                            pack: 'center',
                            type: 'vbox',
                            padding: 30
                        },
                        items: {
                            xtype: 'slider',
                            id: 'bmiSliderID',
                            disabledCls: 'x-form-readonly',
                            readOnly: true,
                            minValue: 1,
                            maxValue: BMI_MAX
                        }
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
                            flex: 1,
                            emptyText: 'BMI Status Value',
                            allowBlank: true
                        }
                    }, {
                        xtype: 'button',
                        margin: '30 0 0 30',
                        width: 60,
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
