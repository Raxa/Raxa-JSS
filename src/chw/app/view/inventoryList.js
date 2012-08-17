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
Ext.define('chw.view.inventoryList', {
    extend: 'Ext.Panel',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.inventory'),
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.back'),
                action: 'goback'
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        }, {
            xtype: 'list',
            ui: 'round',
            layout: 'fit',
            grouped: true,
            pinHeaders: false,
            id: 'inventoryLists',
            store: 'pills',
            width: Ext.os.deviceType === 'Phone' ? '100%' : '100%',
            height: Ext.os.deviceType === 'Phone' ? '100%' : '100%',
            centered: true,
            loadingText: 'Loading List...',
            emptyText: '</pre><div class="notes-list-empty-text"><center><br>'+Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.inventoryEmpty')+'<br></center></div><pre>',
            itemTpl: [
                '<div style="float:left;width:32px;height:32px"><img src="{pillImage}" height="80%" width="80%"/></div>',
                '<div style="float:left;width:60%">',
                    '<div class="list-item-title"">{pillName}</div>',
                '</div>',
                '<div style="float:left;width:32px;height:32px">',
                    '<div class="list-item-title" style="color:{pillColor};">{pillAmount}</div>',
                '</div>'
            ].join(''),
            onItemDisclosure: function (record) {
                helper.listDisclose('inventory', record)
            }
        }]
    }
})