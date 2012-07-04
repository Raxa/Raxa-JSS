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
Ext.define('mUserStories.view.userToolbar', {
    extend: 'Ext.Toolbar',
    config: {
        docked: 'bottom',
        defaults: {
            iconMask: true,
            ui: 'plain'
        },
        layout: {
            pack: 'center',
            align: 'center'
        },
        items: [{
            iconCls: 'add',
            id: 'menuButton'
        }, {
            iconCls:'inbox2',
            // iconCls: 'action',
            id: 'inboxButton'
        }, {
            // iconCls: 'arrow_down',
            iconCls:'cloud_black_upload1',
            id: 'downButton'
        }, {
            iconCls:'photos2',
            // iconCls: 'star',
            id: 'resourcesButton'
        }, {
            iconCls: 'delete',
            id: 'logoutButton'
        }]
    }
})