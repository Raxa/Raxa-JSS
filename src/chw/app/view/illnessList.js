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
Ext.define('chw.view.illnessList', {
    extend: 'Ext.Panel',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.diseaseList'),
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
            pinHeaders: false,
            id: 'illnessList',
            width: '100%',
            height: '80%',
            centered: true,
            indexBar: true,
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
                helper.listDisclose('ipatient',record)
            }
        }]
    }
})