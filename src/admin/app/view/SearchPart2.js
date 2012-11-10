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
                            text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.Age'),
                            dataIndex: 'age'
                        }, {
                            xtype: 'gridcolumn',
                            text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.PI'),
                            dataIndex: 'oldPatientIdentifier'
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
									//All fields are initially set to '-' if data is not available, they remain same otherwise take respective values			
                                    // TODO: https://raxaemr.atlassian.net/browse/RAXAJSS-613
                                    // 'religionSearchedPatient'
									var itemsToReset = ['patientNameSearchedPatient','ageSearchedPatient','sexSearchedPatient','residentialAreaSearchedPatient','stretSearchedPatient','townSearchedPatient','oldPatientIdentifierSearchedPatient','occupationSearchedPatient','relativeNameSearchedPatient','tehsilSearchedPatient','secondaryContactNumberSearchedPatient','primaryContactNumberSearchedPatient','districtSearchedPatient','stateSearchedPatient','casteSearchedPatient','educationSearchedPatient'];
									for(var j=0 ; j < itemsToReset.length ; j++)
									{
										Ext.getCmp(itemsToReset[j]).setValue('-');
									};

                                    var temp = this.getSelectionModel().getSelection()[0].getData()
                                    //saving uuid's here so we can access them in the controllers for encounter POST
                                    localStorage.setItem('searchUuid',temp.uuid)
                                    localStorage.setItem('newPatientUuid', temp.uuid)

//									Sets full Gender string
									if(temp.gender=="M")
										temp.gender = "Male";
									else
										if(temp.gender=="F")
											temp.gender = "Female";
										else 
											if(temp.gender=="O")
												temp.gender= "Other";

                                    Ext.getCmp('patientNameSearchedPatient').setValue(temp.givenName + " " + temp.familyName)
                                    Ext.getCmp('ageSearchedPatient').setValue(temp.age)
                                    Ext.getCmp('sexSearchedPatient').setValue(temp.gender)
                                    Ext.getCmp('stretSearchedPatient').setValue(temp.address1)
                                    Ext.getCmp('residentialAreaSearchedPatient').setValue(temp.address2)
//									Postal Code Removed from New Patient Registration, so removed from Patient Search Result as well				
//                                  Ext.getCmp('pinSearchedPatient').setValue(temp.postalCode)
                                    Ext.getCmp('townSearchedPatient').setValue(temp.cityVillage)
									Ext.getCmp('stateSearchedPatient').setValue(temp.stateProvince)
//									Sets Patient Attributes at right place in the form
                                    for(var i=0;i<temp.attributes.length;i++)
                                    {
                                    	//search function on string returns position of match (if fouund), otherwise returns -1
										if(temp.attributes[i].attributeType.display.search('Old Patient Identification Number')>=0)
										{
											Ext.getCmp('oldPatientIdentifierSearchedPatient').setValue(temp.attributes[i].value);
										}
										if(temp.attributes[i].attributeType.display.search('Occupation')>=0)
										{
											Ext.getCmp('occupationSearchedPatient').setValue(temp.attributes[i].value);
										}
										if(temp.attributes[i].attributeType.display.search('Primary Relative')>=0)
										{
											Ext.getCmp('relativeNameSearchedPatient').setValue(temp.attributes[i].value);
										}
										if(temp.attributes[i].attributeType.display.search('Tehsil')>=0)
										{
											Ext.getCmp('tehsilSearchedPatient').setValue(temp.attributes[i].value);
										}
										if(temp.attributes[i].attributeType.display.search('Secondary Contact')>=0)
										{
											Ext.getCmp('secondaryContactNumberSearchedPatient').setValue(temp.attributes[i].value);
										}
										if(temp.attributes[i].attributeType.display.search('Primary Contact')>=0)
										{
											Ext.getCmp('primaryContactNumberSearchedPatient').setValue(temp.attributes[i].value);
										}
										if(temp.attributes[i].attributeType.display.search('District')>=0)
										{
											Ext.getCmp('districtSearchedPatient').setValue(temp.attributes[i].value);
										}
										if(temp.attributes[i].attributeType.display.search('Caste')>=0)
										{
											Ext.getCmp('casteSearchedPatient').setValue(temp.attributes[i].value);
										}
										if(temp.attributes[i].attributeType.display.search('Education')>=0)
										{
											Ext.getCmp('educationSearchedPatient').setValue(temp.attributes[i].value);
										}
                                        // TODO: https://raxaemr.atlassian.net/browse/RAXAJSS-613
										// if(temp.attributes[i].attributeType.display.search('Religion')>=0)
                                        // {
                                        //     Ext.getCmp('religionSearchedPatient').setValue(temp.attributes[i].value);
                                        // }
                                    }
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
                        // ui: 'raxa-aqua-small',
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.sp2.MS'),
                        action: 'modifySearch'
                    }]
                }]
            }]
        };
        this.callParent();
    }
});
