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
                    title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.title'),
                    items: [{
                        xtype: 'textfield',
                        id: 'block',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Block'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Block'),
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        allowBlank: false,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Street'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Street'),
                        labelAlign: 'right',
                        id: 'street',
                        labelPad: 20,
                        labelWidth: 250,
                        allowBlank: false,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Town'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Town'),
                        labelAlign: 'right',
                        labelPad: 20,
                        allowBlank: false,
                        id: 'town',
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.PO'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.PO'),
                        labelAlign: 'right',
                        labelPad: 20,
                        id: 'postoffice',
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.PC'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.PC'),
                        labelAlign: 'right',
                        id: 'pincode',
                        allowBlank: false,
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Tehsil'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Tehsil'),
                        id: 'tehsil',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.District'),
                        emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.District'),
                        id: 'district',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        hideTrigger: true,
                        anchor: '95%'
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.CM'),
                        id: 'phoneContactInformation',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 250,
                        allowBlank: true,
                        items: [{
                            xtype: 'radiofield',
                            name: 'contact',
                            boxLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.CM.1')
                        }, {
                            xtype: 'radiofield',
                            name: 'contact',
                            boxLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.CM.2')
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.CNo'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.CNo.1'),
                            id: 'patientPrimaryContact',
                            flex: 1,
                            allowBlank: true
                        }, {
                            name: 'lastName',
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.CNo.2'),
                            id: 'patientSecondaryContact',
                            flex: 1,
                            margins: '0 0 0 6',
                            allowBlank: true
                        }]
                    }, {
                        xtype: 'button',
                        margin: '30 0 0 250',
                        width: 60,
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Back'),
						action: 'back'
                    }, {
                        xtype: 'button',
                        margin: '30 0 0 30',
                        width: 60,
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Continue'),
                        action: 'continue'
                    }, {
                        xtype: 'button',
                        margin: '30 0 0 30',
                        width: 60,
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.rp2.Classes'),
                        action: 'cancel'
                    }]
                }]
            }]
        };
        this.callParent();
    }
});
