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
Ext.define('chw.view.resourceList', {
    extend: 'Ext.tab.Panel',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [/*{
            xclass: 'mUserStories.view.titlebar'
        }, */{
            xtype: 'titlebar',
            title: 'Resources',
            id: 'title_res',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                id: 'back_res',
                listeners: {
                    tap: function () {
                        helper.doBack('list')
                    }
                }
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        }, {
            width: '100%',
            height: '100%',
            xtype: 'list',
            ui: 'round',
            grouped: true,
            centered: true,
            id: 'resourceList',
            pinHeaders: false,
            store: 'resources',
            loadingText: 'Loading List...',
            emptyText: '</pre><div class="notes-list-empty-text"><center><br>No resources found.<br></center></div><pre>',
            onItemDisclosure: function (record) {
                helper.listDisclose('resources',record);
            },
            itemTpl: '<div>{resourceName}</div>'
        }]
    }
})