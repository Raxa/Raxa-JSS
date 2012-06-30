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

Ext.define('RaxaEmr.Outpatient.view.patient.drugpanel', {
    extend: 'Ext.ux.touch.grid.View',
    xtype: 'Drug-Panel',

    requires: ['Ext.ux.touch.grid.feature.Feature'],

    config: {
        title: 'Medication History',
        store: 'drugpanel',
        columns: [{
            header: 'Drug Name',
            dataIndex: 'drugname',
            width: '20%',
            cls: 'centered-cell',
            renderer: function (value, values) {
                return '<span>' + value + '</span>';
            }
        }, {
            header: 'Strength',
            dataIndex: 'strength',
            width: '20%',
            cls: 'centered-cell',
            renderer: function (value, values) {
                return '<span>' + value + ' mg' + '</span>';
            }
        }, {
            header: 'Dosage',
            dataIndex: 'dosage',
            width: '20%',
            cls: 'centered-cell',
        }, {
            header: 'Instruction',
            dataIndex: 'instruction',
            width: '20%',
            cls: 'centered-cell',
        }, {
            header: 'Route of Administration',
            dataIndex: 'routeofadministration',
            width: '20.3%',
            cls: 'centered-cell',
        }]
    }
});