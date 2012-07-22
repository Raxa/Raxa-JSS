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
 *  Viewport allows loading of different views on it
 */
Ext.define('Laboratory.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: {
        align: 'stretch',
        pack: 'center',
        type: 'hbox'
    },

    initComponent: function () {
        this.items = {
            dockedItems: [{
                xtype: 'toolbar',
                height: 40,
                dock: 'top',
                items: [{
                    xtype: 'image',
                    height: 35,
                    width: 40,
                    src: '../resources/img/icon.png'
                }, {
                    xtype: 'tbfill'
                }, {
                      xtype: 'button',
                      height: 40,
                      width: 200,
                      text: 'Laboratory Home Page',
                      handler: function () {
                      var l = Ext.getCmp('mainLabArea').getLayout();
                      l.setActiveItem(LAB_PAGES.HOME.value);
                      }
                } , {
                    xtype: 'tbtext',
                    text: 'Logged in as ' + username
                }, {
                    xtype: 'tbseparator'
                }, {
                    xtype: 'button',
                    width: 60,
                    text: 'Sign Out'
                }]
            }, {
                dock: 'bottom',
                xtype: 'toolbar',
                height: 40,
                items: [{
                    xtype: 'tbspacer',
                    width: 380
                }, {
                    xtype: 'image',
                    height: 35,
                    width: 40,
                    src: '../resources/img/icon.png'
                }]
            }],
            width: 800,
            id: 'mainLabArea',
            activeItem: 0,
            layout: {
                type: 'card'
            },
            margin: '2 0 2 0',
            region: 'center',
            items: [{
                xtype: 'Home'
            }, {
                xtype: 'PaperEntry1'
            }, {
                xtype: 'PaperEntry2'
            }, {
                xtype: 'PaperEntry3'
            }, {
                xtype: 'PaperEntry4'
            }, {
                xtype: 'BatchApproval'
            }, {
                xtype: 'QueueStatus'
            }, {
                xtype: 'ReportDelivery1'
            }, {
                xtype: 'ReportDelivery2'
            }, {
                xtype: 'ReportDelivery3'
            }, {
                xtype: 'ReportDelivery4'
            }, {
                xtype: 'ReportDelivery5'
            },{
                xtype: 'LabOrderCreation1'
            },{
                xtype: 'LabOrderCreation2'
            },{
                xtype: 'LabOrderCreation3'
            },{
                xtype: 'LabOrderCreation4'
            },{
                xtype: 'LabOrderCreation5'
            },{
                xtype: 'LabOrderCreation6'
            },{
                xtype: 'LabOrderCreation7'
            },{
                xtype: 'LabOrderCreation8'
            },{
                xtype: 'LabOrderCreation9'
            },{
                xtype: 'LabOrderCreation10'
            },{
                xtype: 'LabOrderCreation11'
            },{
                xtype: 'LabOrderCreation12'
            },{
                xtype: 'SpecimenCollection1'
            },{
                xtype: 'SpecimenCollection2'
            },{
                xtype: 'SpecimenCollection3'
            },{
                xtype: 'SpecimenCollection4'
            },{
                xtype: 'SpecimenCollection5'
            },{
                xtype: 'SpecimenCollection6'
            },{
                xtype: 'SpecimenCollection7'
            },{
                xtype: 'SpecimenCollection8'
            },{
                xtype: 'SpecimenCollection9'
            },{
                xtype: 'SpecimenCollection10'
            },{
                xtype: 'SpecimenCollection11'
            },{
                xtype: 'SpecimenCollection12'
            },{
                xtype: 'SpecimenCollection13'
            },{
                xtype: 'SpecimenRegistration1'
            },{
                xtype: 'SpecimenRegistration2'
            },{
                xtype: 'SpecimenRegistration3'
            },{
                xtype: 'SpecimenRegistration4'
            },{
                xtype: 'SpecimenRegistration5'
            },{
                xtype: 'SpecimenRegistration6'
            },{
                xtype: 'SpecimenRegistration7'
            },{
                xtype: 'SpecimenRegistration8'
            },{
                xtype: 'SpecimenRegistration9'
            },{
                xtype: 'SpecimenRegistration10'
            },{
                xtype: 'SpecimenRegistration11'
            },{
                xtype: 'SpecimenRegistration12'
            },{
                xtype: 'SpecimenRegistration13'
            },{
                xtype: 'ResultEntry1'
            },{
                xtype: 'ResultEntry2'
            },{
                xtype: 'ResultEntry3'
            },{
                xtype: 'ResultEntry4'
            }, {
                xtype: 'ResultEntry5'
            }, {
                xtype: 'ReportApproval1'
            }, {
                xtype: 'ReportApproval2'
            }, {
                xtype: 'ReportApproval3'
            }, {
                xtype: 'ReportApproval4'
            }]
        };
        this.callParent();
    }
});
