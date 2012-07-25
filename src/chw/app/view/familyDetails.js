/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
Ext.define('chw.view.familyDetails', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.familyDetails',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            itemId: 'familyTitle',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.back'),
                action: 'goback'
            }]
        }, {
            xtype: 'container',
            height: '100%',
            width: '100%',
            scrollable: true,
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.summary'),
            layout:{
                type:'vbox'
            },
            items: [{
                xtype: 'label',
                html: '<center><img src="resources/home.png"/></center>',
                height: '20%',
                width: '100%',
                padding: '10px'
            }, {
                xtype: 'container',
                padding: '10px',
                items: [{
                    xtype: 'fieldset',
                    itemId: 'familyDescripLabel',
                    title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.familyDescription'),
                    defaults: {
                        labelWidth: '35%',
                        disabled: true
                    },
                    items: [{
                        xtype: 'textfield',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.familyID'),
                        itemId: 'familyIdLabel'
                    }, {
                        xtype: 'textfield',
                        itemId: 'familyAddressLabel',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.address'),
                        placeHolder: 'Hogwarts'
                    }, {
                        xtype: 'textfield',
                        itemId: 'familyNumberLabel',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.childTotal'),
                        placeHolder: '2/4'
                    }, {
                        xtype: 'textfield',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.lastVisit'),
                        placeHolder: '12/7/2012'
                    }]
                }]
            }, {
                xtype: 'button',
                text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.startCheckup'),
                ui: 'confirm-round'
            }, {
                xtype: 'label',
                html: ' <br><br>'
            }]
        }, {
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.members'),
            xtype: 'container',
            items: [{
                title: 'Family Members',
                xtype: 'list',
                ui: 'round',
                pinHeaders: false,
                id: 'familyMembersList',
                width: '100%',
                height: '80%',
                centered: true,
                itemTpl: [
                    '<div style="float:left;width:32px;height:32px"><img src="{patientImage}" height="80%" width="80%"/></div>',
                    '<div style="float:left;width:60%">',
                    '<div class="list-item-title" style="font-size:15px;">{firstName} {familyName}</div>',
                    '<div class="list-item-narrative" style="font-size:10px;">Age: {patientAge} Gender: {patientGender}</div>',
                    '</div>',
                    '<div style="float:left;width:32px;height:32px">',
                    '<img src=resources/circle.png height="80%" width="80%"/>',
                    '</div>'
                ].join(''),
                onItemDisclosure: function (record) {
                    helper.listDisclose('patient',record)
                }
            }, {
                xtype: 'container',
                height: '20%',
                docked: 'bottom',
                padding: '0px 80px 20px 80px',
                items: [{
                    xtype: 'button',
                    text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.newPatient'),
                    action: 'goToAddPatient',
                    iconMask: true,
                    iconCls: 'user_add'
//                    listeners: {
//                        tap: function () {
//                            // TODO: need to remember which family it is
//                            Ext.getCmp('viewPort').setActiveItem(PAGES.addPatient)
//                        }
//                    }
                }]
            }]
        },{
            xtype: 'container',
            layout: {
                type: 'fit'
            },
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.map'),
            items: [{
                xtype: 'map',
                height: '100%'
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        }]
    }

});
