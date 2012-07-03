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
Ext.define('mUserStories.view.vcNotifications', {
    extend: 'Ext.tab.Panel',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: 'Notifications'
        }, {
            xclass: 'mUserStories.view.vcToolbar'
        }, {
            xtype: 'formpanel',
            title: 'Compose',
            items: [{
                xtype: 'fieldset',
                title: 'Create Report',
                defaults: {
                    labelWidth: '35%'
                },
                items: [{
                    xtype: 'selectfield',
                    label: 'Type',
                    id: 'type_vcinb',
                    flex: 2,
                    required: true,
                    options: [{
                        text: '',
                        value: 'empty'
                    }, {
                        text: 'Emergency',
                        value: 'emergency'
                    }, {
                        text: 'Other',
                        value: 'otherreport'
                    }]
                }, {
                    xtype: 'textfield',
                    label: 'First',
                    id: 'first_rep',
                    required: true
                }, {
                    xtype: 'textfield',
                    label: 'Last',
                    id: 'last_rep',
                    required: true
                }, {
                    // TODO: Generate necessary fields dynamically
                    xtype: 'textfield',
                    label: 'Details',
                    id: 'details_rep',
                    labelAlign: 'top'
                }]
            }]
        }, {
            title: 'Unread',
            cls: 'demo-list',
            items: [{
                xtype: 'list',
                ui: 'round',
                grouped: true,
                pinHeaders: false,
                id: 'vcinbox_unread',
                width: Ext.os.deviceType == 'Phone' ? null : '80%',
                height: Ext.os.deviceType == 'Phone' ? null : '100%',
                centered: true,
                itemTpl: [],
                onItemDisclosure: function (record, btn, index) {}
            }]
        }, {
            title: 'All',
            cls: 'demo-list',
            items: [{
                xtype: 'list',
                ui: 'round',
                grouped: true,
                pinHeaders: false,
                id: 'vcinbox_all',
                width: Ext.os.deviceType == 'Phone' ? null : '80%',
                height: Ext.os.deviceType == 'Phone' ? null : '100%',
                centered: true,
                itemTpl: [],
                onItemDisclosure: function (record, btn, index) {}
            }]
        }]
    }
})