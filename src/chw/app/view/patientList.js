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
Ext.define('mUserStories.view.patientList', {
    extend: 'Ext.tab.Panel',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [/*{
            xclass: 'mUserStories.view.titlebar'
        }, */{
            xtype: 'titlebar',
            title: 'Patient List',
            id: 'title_plist',
            docked: 'top'/*,
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                id: 'back_add_appt'
            }]*/
        }, {
            xclass: 'mUserStories.view.userToolbar'
        }, {
            title: 'All',
            cls: 'demo-list',
            items: [{
                xtype: 'list',
                ui: 'round',
                grouped: true,
                pinHeaders: false,
                id: 'patientlistid',
                width: Ext.os.deviceType === 'Phone' ? '100%' : '100%',
                height: Ext.os.deviceType === 'Phone' ? '100%' : '100%',
                centered: true,
                indexBar: true,
                itemTpl: ['<div>{familyName}, {givenName}</div>'],
                onItemDisclosure: function (record, btn, index) {
                    helper.listDisclose(record);
                }
            }]
        }, {
            title: 'Current',
            cls: 'demo-list',
            items: [{
                xtype: 'list',
                ui: 'round',
                grouped: true,
                pinHeaders: false,
                id: 'patientcurrid',
                width: Ext.os.deviceType === 'Phone' ? null : '100%',
                height: Ext.os.deviceType === 'Phone' ? null : '100%',
                centered: true,
                itemTpl: ['<div>{familyName}, {givenName}</div>'],
                onItemDisclosure: function (record, btn, index) {
                    helper.listDisclose(record);
                }
            }]
        }]
    }
})