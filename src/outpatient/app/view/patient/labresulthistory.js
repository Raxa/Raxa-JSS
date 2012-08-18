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
 */
 
 //view of lab result history
 
Ext.define('RaxaEmr.Outpatient.view.patient.labresulthistory', {
    extend: 'Ext.dataview.List',
    xtype: 'Lab-Result-History',
    config: {
        store: 'labresulthistory',
        ui: 'round',
        id: 'labResultHistoryList',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                xtype: 'segmentedbutton',
                margin: '0 0 0 10',
                allowDepress: false,
                items: [{
                    xtype: 'button',
                    text: 'Completed',
                    pressed: true,
                    width: 150,
                }, {
                    xtype: 'button',
                    text: 'Pending',
                    width: 150,
                }]
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'searchfield',
                id: 'labordersearchfield',
                placeHolder: 'Search...'
            }]
        }],
        itemTpl: ['<div>{labtesttype}/Lab Order No: {laborderno}</br>Specimen ID: {specimenid}</br>Date: {labtestdate}</div>']
    }

});