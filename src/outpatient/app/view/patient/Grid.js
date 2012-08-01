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

Ext.define('RaxaEmr.Outpatient.view.patient.Grid', {
    extend: 'Ext.ux.touch.grid.View',
    xtype: 'grid-grid',

    requires: ['Ext.ux.touch.grid.feature.Feature', 'Ext.field.Number', 'RaxaEmr.Outpatient.store.Grid'],

    config: {
        title: 'Grid',
        store: 'Grid',
        scrollable: 'false',
        columns: [{
            header: 'Height',
            dataIndex: 'height',
            width: '10%',
            cls: 'centered-cell',
            renderer: function (value, values) {
                return '<span>' + value + ' cm' + '</span>';
            }
        }, {
            header: 'Weight',
            dataIndex: 'weight',
            width: '10%',
            cls: 'centered-cell',
            renderer: function (value, values) {
                return '<span>' + value + ' kg' + '</span>';
            }
        }, {
            header: 'BMI',
            dataIndex: 'bmi',
            width: '10%',
            cls: 'centered-cell',
        }, {
            header: 'Blood Pressure',
            dataIndex: 'bp',
            width: '15%',
            cls: 'centered-cell',
            renderer: function (value) {
                // TODO: Determine how to pass 2 BMI values into one grid panel
                var bmi = 68;
                return Ext.String.format('{0}/{1}', value, bmi);
            }
        }, {
            header: 'Pulse',
            dataIndex: 'pulse',
            width: '10%',
            cls: 'centered-cell',
        }, {
            header: 'Respiratory Rate',
            dataIndex: 'resrate',
            width: '15%',
            cls: 'centered-cell',
        }, {
            header: 'Temperature',
            dataIndex: 'temp',
            width: '15%',
            cls: 'centered-cell',
        }, {
            header: 'Oxygen Saturation',
            dataIndex: 'oxysat',
            width: '15%',
            cls: 'centered-cell',
        }]
    }
});
