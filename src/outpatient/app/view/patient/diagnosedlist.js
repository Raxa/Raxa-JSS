/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 * 
 * This contains list of diagnosed diseases, items to which are added on clicking on search result list on diagnosis (Diagnosis Tab)
 */
 
Ext.define('RaxaEmr.Outpatient.view.patient.diagnosedlist', {
    extend: 'Ext.dataview.List',
    xtype: 'Diagnosed-List',
    config: {
        cls: 'x-diagnosed',
        id: 'diagnosedList',
        store: 'diagnosedDisease',
        itemTpl: ['<div id="{id}">', '<strong>{complain}</strong>', '</div>'],
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                xtype: 'spacer'
            },  {
                xtype: 'button',
                ui: 'plain',
                iconCls: 'trash',
                iconMask: true,
                hidden: false,
                id: 'deleteDiagnosed'
            }]
        }]
    },
});
