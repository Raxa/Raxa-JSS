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
Ext.define('chw.view.addOptions', {
    extend: 'Ext.Panel',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            title: 'Add',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                action: 'goback'
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        }, {
            xtype: 'container',
            layout: 'vbox',
            centered: true,
            items: [{
                xtype: 'button',
                text: 'Family',
                // action: 'add_rem',
                iconMask: true,
                iconCls: 'team',
                listeners: {
                    tap: function () {
                        Ext.getCmp('viewPort').setActiveItem(PAGES.addFamily)
                    }
                }
            }, {
                xtype: 'button',
                text: 'Patient',
                iconMask: true,
                // action: 'add_reg',
                iconCls: 'user_add',
                listeners: {
                    tap: function () {
                        Ext.getCmp('viewPort').setActiveItem(PAGES.addPatient)
                    }
                }
            }]
        }]
    }
})