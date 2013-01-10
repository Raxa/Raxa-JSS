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
Ext.define('chw.view.userToolbar', {
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
            iconCls: 'user',
            action: 'newPatient'
        },
        {
            iconCls: 'list',
            action: 'listButton'
        }/*, {
            iconCls:'cloud_black_upload1',
            action: 'syncButton'
        }, {
            iconCls: 'locate',
            action: 'locateButton'
        }*/, {
            iconCls: 'shop2',
            action: 'inventoryButton'
        }, {
            iconCls: 'photos2',
            action: 'resourceButton'
        }//, {
         //   iconCls: 'delete',
         //   action: 'logoutButton'
         //}
        ]
    }
})