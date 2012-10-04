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
 
//bottom half view of the patient details (history , examination, diagnosis and treatment tab)
 
//enum to swich the tabs
 
var TABS = {
    HISTORY: 0,
    EXAMINATION: 1,
    DIAGNOSIS: 2,
    TREATMENT: 3
}

Ext.define('RaxaEmr.Outpatient.view.patient.work', {
    extend: 'Ext.Container',
    xtype: 'work',
    requires: ['RaxaEmr.Outpatient.view.patient.history', 'RaxaEmr.Outpatient.view.patient.examination', 'RaxaEmr.Outpatient.view.patient.treatment', 'RaxaEmr.Outpatient.view.patient.diagnosis'],
    config: {
        layout: {
            type: 'hbox'
        },
        height: 490,
        items: [
        {
            xtype: 'tabpanel',
            style: 'background-color: #0f0',
            animation: 'flip',
            flex: 1,
            id: 'maintabs',
            tabBar: {
                docked: 'left',
            },
            items: [{
                xtype: 'history-panel',
                style: 'background-color:red;',
                title : '<div style ="height:105px;-webkit-transform:rotate(270deg);-moz-transform:rotate(90deg);-o-transform: rotate(90deg);">History</div>',
            }, {
                xtype: 'examination-panel',
                title : '<div style ="height:105px;-webkit-transform:rotate(270deg);-moz-transform:rotate(90deg);-o-transform: rotate(90deg);">Examination</div>', 
            }, {
                xtype: 'diagnosis-panel',
                title : '<div style ="height:105px;-webkit-transform:rotate(270deg);-moz-transform:rotate(90deg);-o-transform: rotate(90deg);">Diagnosis</div>', 
            }, {
                xtype: 'treatment-panel',
                title : '<div style ="height:105px;-webkit-transform:rotate(270deg);-moz-transform:rotate(90deg);-o-transform: rotate(90deg);">Treatment</div>', 
            }],
           
        },
        ]
    }
});