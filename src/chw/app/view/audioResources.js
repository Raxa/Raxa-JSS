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
Ext.define('mUserStories.view.audioResources', {
    extend: 'Ext.Panel',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: 'Audios',
            items: [{
                xtype: 'button',
                id: 'back_aud',
                ui: 'back',
                text: 'Back'
            }]
        }, {
            xclass: 'mUserStories.view.userToolbar'
        }, {
            xtype: 'container',
            layout: 'vbox',
            centered: true,
            items: [{
                xtype: 'list',
                ui: 'round',
                pinHeaders: false,
                id: 'audioList',
                width: Ext.os.deviceType === 'Phone' ? null : '80%',
                height: Ext.os.deviceType === 'Phone' ? null : '100%',
                centered: true
                /*itemTpl: ['<div>{familyName}, {givenName}</div>'],
                onItemDisclosure: function (record, btn, index) {
                    helper.listDisclose(record);
                }*/
            }]
        }]
    }
})