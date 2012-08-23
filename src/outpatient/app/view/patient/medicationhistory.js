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
 
 //view of medication history
 
Ext.define('RaxaEmr.Outpatient.view.patient.medicationhistory', {
    extend: 'Ext.ux.touch.grid.View',
    xtype: 'Medication-History',

    requires: ['Ext.ux.touch.grid.feature.Feature', 'Ext.field.Number', 'RaxaEmr.Outpatient.store.Grid'],

    config: {
        title: 'Medication History',
        id: 'medicationhistorygrid',
        store: 'medicationhistory',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                xtype: 'segmentedbutton',
                margin: '0 0 0 10',
                allowDepress: false,
                items: [{
                    xtype: 'button',
                    text: 'Sort By Drug Name',
                    id: 'medicationhistorysortbydrugname',
                    pressed: true,
                    width: 200,
                }, {
                    xtype: 'button',
                    id: 'medicationhistorysortbydrugreaction',
                    text: 'Sort By Drug Reaction',
                    width: 200,
                }]
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'searchfield',
                id: 'medicationhistorysearchfield',
                placeHolder: 'Search...'
            }]
        }],
        columns: [{
            header: 'Drug Name',
            dataIndex: 'drugname',
            width: '10%',
            cls: 'centered-cell',
            renderer: function (value, values) {
                return '<span>' + value + '</span>';
            }
        }, {
            header: 'Duration',
            dataIndex: 'duration',
            width: '10%',
            cls: 'centered-cell',
            renderer: function (value, values) {
                return '<span>' + value + '</span>';
            }
        }, {
            header: 'Last Filled',
            dataIndex: 'lastfilled',
            width: '10%',
            cls: 'centered-cell',
        }, {
            header: 'Prescriber',
            dataIndex: 'prescriber',
            width: '15%',
            cls: 'centered-cell'
        }, {
            header: 'Drug Reaction',
            dataIndex: 'drugreaction',
            width: '20%',
            cls: 'centered-cell',
        }, {
            header: 'Dosage',
            dataIndex: 'dosage',
            width: '15%',
            cls: 'centered-cell',
        }, {
            header: 'Route of Administration',
            dataIndex: 'routeofadministration',
            width: '20%',
            cls: 'centered-cell',
        }]
    }
});