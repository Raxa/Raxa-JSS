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
Ext.define('mUserStories.view.okCancel', {
    extend: 'Ext.Container',
    config: {
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'middle'
        },
        items: [{
            xtype: 'container',
            layout: 'hbox',
            padding: '10px',
            width: "100%",
            items: [{
                xtype: 'label',
                flex: '2'
            }, {
                xtype: 'button',
                iconMask: true,
                iconCls: 'check2',
                id: 'okButton',
                ui: 'confirm'
            }, {
                xtype: 'label',
                flex: '2'
            }, {
                xtype: 'button',
                iconMask: true,
                iconCls: 'delete1',
                id: 'cancelButton',
                ui: 'decline'
            }, {
                xtype: 'label',
                flex: '2'
            }]
        }]
    }
})