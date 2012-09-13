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

 //info about the patient when we click on a patient like weight, height etc. is shown by this grid
 
Ext.define('RaxaEmr.Outpatient.view.patient.Grid', {
    extend: 'Ext.ux.touch.grid.View',
    xtype: 'grid-grid',

    requires: ['Ext.ux.touch.grid.feature.Feature', 'Ext.field.Number', 'RaxaEmr.Outpatient.store.Grid'],

    config: {
        title: 'Grid',
        store: 'Grid',
        scrollable: 'false',
        columns: [{
                /*header: 'Height',*/
                /*dataIndex: 'height',*/
                /*width: '10%',*/
                /*cls: 'centered-cell',*/
                /*renderer: function (value, values) {*/
                /*return '<span>' + value + ' cm' + '</span>';// to change the view of the data feched*/
                /*}*/
                /*}, {*/
                /*header: 'Weight',*/
                /*dataIndex: 'weight',*/
                /*width: '10%',*/
                /*cls: 'centered-cell',*/
                /*renderer: function (value, values) {*/
                /*return '<span>' + value + ' kg' + '</span>';// to change the view of the data feched*/
                /*}*/
                /*}, {*/
                /*header: 'BMI',*/
                /*dataIndex: 'bmi',*/
                /*width: '10%',*/
                /*cls: 'centered-cell',*/
                /*}, {*/
                header: 'Blood Pressure',
            dataIndex: 'bp',
            width: '20%',
            cls: 'centered-cell',
        }, {
            header: 'Pulse',
            dataIndex: 'pulse',
            width: '20%',
            cls: 'centered-cell',
        }, {
            header: 'Respiratory Rate',
            dataIndex: 'resrate',
            width: '20%',
            cls: 'centered-cell',
        }, {
            header: 'Temperature',
            dataIndex: 'temp',
            width: '20%',
            cls: 'centered-cell',
        }, {
            header: 'Oxygen Saturation',
            dataIndex: 'oxysat',
            width: '20%',
            cls: 'centered-cell',
        }]
    }
});
