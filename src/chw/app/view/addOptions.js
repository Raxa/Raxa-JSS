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
Ext.define('mUserStories.view.addOptions', {
    extend: 'Ext.Panel',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: 'Add',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                id: 'back_add'
            }]
        }, {
            xclass: 'mUserStories.view.userToolbar'
        }, {
            xtype: 'container',
            layout: 'vbox',
            centered: true,
            items: [{
                xtype: 'button',
                text: 'Person',
                iconMask:true,
                id: 'add_reg',
                iconCls: 'user_add'
            }, {
                xtype: 'button',
                text: 'Reminder',
                id: 'add_rem',
                iconMask:true,
                iconCls:'time_repeat'
            }, {
                xtype: 'button',
                text: 'Appointment',
                id: 'add_app',
                iconMask:true,
                iconCls:'calendar_add'
            }]
        }]
    }
})