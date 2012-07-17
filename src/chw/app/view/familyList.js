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
Ext.define('chw.view.familyList', {
    extend: 'Ext.tab.Panel',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            title: 'Family List',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                listeners: {
                    tap: function () {
                        helper.doBack()
                    }
                }
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        }, {
            title: 'Family',
            cls: 'demo-list',
            items: [{
                xtype: 'list',
                ui: 'round',
                layout: 'fit',
                grouped: true,
                pinHeaders: false,
                id: 'familyLists',
                store: 'familyStore',
                width: Ext.os.deviceType === 'Phone' ? '100%' : '100%',
                height: Ext.os.deviceType === 'Phone' ? '100%' : '100%',
                centered: true,
                loadingTest: 'Loading List...',
                emptyText: '</pre><div class="notes-list-empty-text">No patients found.</div><pre>',
//                itemTpl: [
//                    '<div class="headshot" style="background-image:url({familyImage});"</div>',
//                    '<div style="float:left;width:30%;">{familyName}</div>',
//                    '<div style="float:left;width:20%;"></div>'
//                ],
                itemTpl: [
                    // '<div style="background-image:url({familyImage});"</div>',
                    //'<div style="float:left;width:32px;height:32px"><img src="{familyImage}" height="80%" width="80%"/></div>',
                    '<div style="float:left;width:70%">',
                    '<div class="list-item-title">{familyName}</div>',
                    '<div class="list-item-narrative">{familyDescrip}</div>',
                    //'<div>{familyName}</div>',
                    //'<div style="font-size:12px">{familyDescrip}</div>',
                    '</div>',
                    // '<div style="font-size:10px">&nbsp&nbsp&nbsp{familyDescrip}</div>'
                ].join(''),
                // itemTpl: '<div class="headshot" style="background-image:url({familyImage});width:20%;height:100%"></div><div class="list-item-title" style="width:50%">{familyName}</div><div class="list-item-narrative">{familyDesrip}</div>',
                onItemDisclosure: function (record) {
                    helper.listDisclose('family', record)
                }
            }]
        }, {
            title: 'Disease',
            cls: 'demo-list',
            items: [{
                title: 'Family',
                cls: 'demo-list',
                items: [{
                    xtype: 'list',
                    ui: 'round',
                    grouped: true,
                    pinHeaders: false,
                    id: 'diseaseNames',
                    width: Ext.os.deviceType === 'Phone' ? '100%' : '100%',
                    height: Ext.os.deviceType === 'Phone' ? '100%' : '100%',
                    centered: true,
                    indexBar: true,
                    itemTpl: ['<div>{diseaseName}</div>'],
                    onItemDisclosure: function (record) {
                        helper.listDisclose('disease', record)
                    }
                }]
            }]
        }]
    }
})