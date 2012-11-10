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
	      id:'Searchpart1', 
            width: 800,
            padding: 20,
            items: [{
                xtype: 'container',
                border: 0,
                bodyPadding: 10,
                items: [{
                    xtype: 'fieldset',
                    padding: 10,
                    title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.title'),
                    fieldDefaults: {
                        msgTarget: 'side'
                    },
                    items: [
                        //TODO: add these in when search layer is complete
                        //https://raxaemr.atlassian.net/browse/RAXAJSS-230
                        /*{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.OPRN'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.OPRN.emptytext'),
                            allowBlank: true
                        }]
                    }, */{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.PRN'),
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
                            fieldLabel: 'Raxa Patient Identifier',
                            width: 303,
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.PRN.emptytext'),
                            allowBlank: false
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.PN'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.PN.emptytext.1'),
                            id: 'patientFirstNameSearch',
                            width: 147,
                            allowBlank: false
                        }, {
                            name: 'lastName',
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.PN.emptytext.2'),
                            id: 'patientLastNameSearch',
                            width: 147,
                            margins: '0 0 0 6'
                        }]
                    }//TODO: add these in when search layer is complete
                    //https://raxaemr.atlassian.net/browse/RAXAJSS-230
                    /*
                    ,{
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.FHN'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.FHN.emptytext.1'),
                            id: 'relativeFirstNameSearch',
                            width: 147
                        }, {
                            name: 'lastName',
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.FHN.emptytext.2'),
                            id: 'relativeLastSearch',
                            width: 147,
                            margins: '0 0 0 6'
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.DOB'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.DOB.emptytext'),
                            labelAlign: 'right',
                            labelPad: 20,
                            labelWidth: 180,
                            anchor: '75%',
                            allowBlank: true
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.Town'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.Town'),
                            id: 'Town/Village/CitySearch',
                            labelAlign: 'right',
                            labelPad: 20,
                            labelWidth: 180,
                            width: 147,
                            anchor: '75%',
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.PHN'),
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
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.PN'),
                            vtype: 'phone',
                            labelAlign: 'right',
                            labelPad: 20,
                            labelWidth: 180,
                            width: 147,
                            anchor: '75%'
                        }]
                    }*/,{
                        xtype: 'button',
                        margin: '10 50 0 270',
                        // ui: 'raxa-orange-small',
                        text: 'Cancel',
                        action: 'cancel'
                    }, {
                        /*xtype: 'button',*/
                        /*margin: '10 50 0 270',*/
                        /*ui: 'raxa-orange-small',*/
                        /*text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.Reset'),*/
                        /*action: 'reset'*/
                        /*}, {*/
                        xtype: 'button',
                        /*margin: '10 0 0 0',*/
                        margin: '10 50 0 0',
				        id:'searchbutton1',
                        // ui: 'raxa-aqua-small',
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp1.Search'),
                        action: 'search'
                    }]
                }]
            }]
		
        };
        this.callParent();
	
	  

    }
});
