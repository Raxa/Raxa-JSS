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
 * This script defines the view SearchPart2 of the registration module
 */
Ext.define('Registration.view.SearchPart2', {
    extend: 'Ext.container.Container',
    alias: 'widget.searchpart2',
    border: 0,
    autoScroll: true,
    padding: 10,
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
                    title: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.title'),
                    fieldDefaults: {
                        msgTarget: 'side'
                    },
                    items: [{
                        xtype: 'gridpanel',
                        selType: 'rowmodel',
                        id: 'patientGrid',
                        align: 'centre',
                        margin: '10 0 0 10',
                        forceFit: true,
                        store: 'search',
                        hideHeaders: false,
                        columns: [{
                            xtype: 'gridcolumn',
                            text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.SN'),
                            dataIndex: 'id'
                        }, {
                            xtype: 'gridcolumn',
                            text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.FN'),
                            dataIndex: 'givenName'
                        }, {
                            xtype: 'gridcolumn',
                            text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.LN'),
                            dataIndex: 'familyName'
                        }, {
                            xtype: 'gridcolumn',
                            text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.Gender'),
                            dataIndex: 'gender'
                        }, {
                            xtype: 'gridcolumn',
                            text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.DOB'),
                            renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                            dataIndex: 'birthdate'
                        }, {
                            xtype: 'gridcolumn',
                            text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.PI'),
                        }, {
                            xtype: 'gridcolumn',
                            text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.HFN'),
                            forceFit: true
                        }, {
                            xtype: 'gridcolumn',
                            text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.Village'),
                            dataIndex: 'cityVillage'
                        }, {
                            xtype: 'gridcolumn',
                            text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.Town'),
                        }], 
                        //was needed to see the patient profile as we click on one of the patient
                        listeners: {
                            cellClick: {
                                fn: function () {
                                    var temp = this.getSelectionModel().getSelection()[0].getData()
                                    localStorage.setItem('searchUuid',temp.uuid)
                                    Ext.getCmp('patientNameSearchedPatient').setValue(temp.givenName + " " + temp.familyName)
                                    Ext.getCmp('ageSearchedPatient').setValue(temp.age)
                                    Ext.getCmp('sexSearchedPatient').setValue(temp.gender)
                                    Ext.getCmp('blockSearchedPatient').setValue(temp.address1)
                                    Ext.getCmp('stretSearchedPatient').setValue(temp.address2)
                                    Ext.getCmp('pinSearchedPatient').setValue(temp.postalCode)
                                    Ext.getCmp('townSearchedPatient').setValue(temp.cityVillage)
                                    /*  var i;
                                     *  Please reference this ticket: https://raxaemr.atlassian.net/browse/RAXAJSS-206 
                                     *  wherever attributes are required
                                    for(i=0;temp.attributes.length;i++){
                                        if(temp.attributes[i].attributeType == casteuuid) Ext.getCmp('casteSearchedPatient').setValue(temp.attributes[i].value)
                                        // TODO- make similars "if" conditions for other attributes
                                    } */
                                    var l = Ext.getCmp('mainRegArea').getLayout();
                                    l.setActiveItem(REG_PAGES.SEARCH_CONFIRM.value);
                                }
                            }
                        },
                        viewConfig: {
                            emptyText: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.NoResult.emptytext'),
                            stripeRows: false
                        }
                    }, {
                        xtype: 'button',
                        margin: '10 50 0 270',
                        width: 120,
                        ui: 'raxa-orange-small',
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.MS'),
                        action: 'modifySearch'
                    }]
                }]
            }]
        };
        this.callParent();
    }
});