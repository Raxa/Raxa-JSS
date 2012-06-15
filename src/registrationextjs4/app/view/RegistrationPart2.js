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
 * This script defines the view RegistrationPart2 of the registration module
 */
Ext.define('Registration.view.RegistrationPart2', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.registrationpart2',
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
                    title: 'New Patient Registration (Patient Communication Info)',
                    items: [{
                        xtype: 'textfield',
                        id: 'block',
                        fieldLabel: 'Block/House/Door Number',
                        emptyText: 'Block/House/Door Number',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        allowBlank: false,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Street/Area/Locality/Mohala/Road',
                        emptyText: 'Street/Area/Locality/Mohala/Road',
                        labelAlign: 'right',
                        id: 'street',
                        labelPad: 20,
                        labelWidth: 250,
                        allowBlank: false,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Town/Village/City',
                        emptyText: 'Town/Village/City',
                        labelAlign: 'right',
                        labelPad: 20,
                        allowBlank: false,
                        id: 'town',
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Post Office',
                        emptyText: 'Post Office',
                        labelAlign: 'right',
                        labelPad: 20,
                        id: 'postoffice',
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Pin Code',
                        emptyText: 'Pin Code',
                        labelAlign: 'right',
                        id: 'pincode',
                        allowBlank: false,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Tehsil/Taluka/Mandal/Thana',
                        emptyText: 'Tehsil/Taluka/Mandal/Thana',
                        id: 'tehsil',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'District',
                        emptyText: 'District',
                        id: 'district',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        hideTrigger: true,
                        anchor: '95%'
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: 'Contact me via phone',
                        id: 'phoneContactInformation',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        allowBlank: true,
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
                        labelWidth: 250,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: [{
                            name: 'primaryContact',
                            emptyText: 'Primary Contact',
                            id: 'patientPrimaryContact',
                            flex: 1,
                            allowBlank: true
                        }, {
                            name: 'lastName',
                            emptyText: 'Secondary Contact',
                            id: 'patientSecondaryContact',
                            flex: 1,
                            margins: '0 0 0 6',
                            allowBlank: true
                        }]
                    }, {
                        xtype: 'button',
                        margin: '30 0 0 250',
                        width: 60,
                        text: 'Back',
						action: 'back'
                    }, {
                        xtype: 'button',
                        margin: '30 0 0 30',
                        width: 60,
                        text: 'Continue',
                        action: 'continue'
                    }, {
                        xtype: 'button',
                        margin: '30 0 0 30',
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
